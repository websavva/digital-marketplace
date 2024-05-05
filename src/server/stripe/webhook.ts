import type { RequestHandler } from 'express';
import type { PayloadRequest } from 'payload/types';
import type Stripe from 'stripe';

import type { User } from '#server/cms/collections/types';

import { stripeApi } from './api';
import { ctx } from '../context';
import { CMS } from '../cms';

export const stripeWebhookHandler: RequestHandler = async (_req, res) => {
  const req = _req as PayloadRequest<User>;

  const { 'stripe-signature': stripeSignature = '' } = req.headers;

  let event: Stripe.Event;

  try {
    event = stripeApi.webhooks.constructEvent(
      req.body,
      stripeSignature,
      // ctx.env.STRIPE.API_KEY
      'whsec_9754d99131bf8195948d79b0c96ad2f32dc7bb815170eb2d12c5759c5c68ef92'
    );
  } catch (err) {
    return res.status(400).json({
      error: `Webhook Error: ${
        err instanceof Error ? err?.message : 'Unknown Error'
      }`,
    });
  }

  if (event.type === 'checkout.session.completed') {
    const { metadata: sessionPayload } = event?.data?.object || {};

    const { orderId = null, userId = null } = sessionPayload || {};

    if (!orderId || !userId) {
      return res
        .status(400)
        .json({ error: 'Webhook Error: Metadata is incomplete' });
    }

    const { docs: users } = await CMS.client.find({
      collection: 'users',
      where: {
        id: {
          equals: +userId,
        },
      },

      req,
    });

    const [user] = users;

    if (!user) return res.status(404).json({ error: 'No such user exists.' });

    req.user = user as any;

    const { docs: orders } = await CMS.client.find({
      collection: 'orders',
      depth: 2,
      where: {
        id: {
          equals: +orderId,
        },
      },

      req,
    });

    const [order] = orders;

    if (!order) {
      return res.status(404).json({ error: 'No such order exists.' });
    } else if (order._isPaid) {
      return res.status(400).json({
        error: 'Order has been paid already !',
      });
    }

    try {
      const paidOrder = await CMS.client.update({
        collection: 'orders',
        data: {
          _isPaid: true,
        },

        id: +orderId,

        req,
      })

      // TODO sending email
      const text = `You have successfully paid order "${orderId}"`;

      await CMS.client
        .sendEmail({
          from: ctx.env.SMTP.FROM_ADDRESS,
          subject: 'Thanks for your order! This is your receipt.',
          to: user.email,
          text,
          html: text,
          date: new Date(),
        })
        .catch(() => {
          console.error(
            `Receipt email was not sent to user ${user.email} for order ${order.id}`
          );
        });

      return res.status(200).json({
        orderId,
      });
    } catch (err) {
      return res.status(500).json({
        orderId,

        error:
          (err as any)?.message ||
          'Order was not paid due to issues on server !',
      });
    }
  }

  return res.status(200).send();
};