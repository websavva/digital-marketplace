import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
} from '@react-email/components';
import { PropsWithChildren } from 'react';

import { publicEnv } from '#server/env/public';

import { Text } from './Text';
import { Logo } from './Logo';
import { Link } from './Link';

export type LayoutProps = PropsWithChildren<{
  previewText: string;
}>;

export const Layout = ({ previewText, children }: LayoutProps) => (
  <Html>
    <Head>
      <title>{previewText}</title>
    </Head>

    <Preview>{previewText}</Preview>
    <Body style={{ backgroundColor: '#fff', color: '#212121' }}>
      <Container
        style={{ padding: '20px', margin: '0 auto', backgroundColor: '#eee' }}
      >
        <Section style={{ backgroundColor: '#fff' }}>
          <Section
            style={{
              backgroundColor: '#252f3d',
              display: 'flex',
              padding: '20px 0',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Logo width='75' height='auto' />
          </Section>

          {children}
        </Section>

        <Text style={{ fontSize: '12px', padding: '0 20px' }}>
          This message was produced and distributed by Digital Markeplace
          <br />©{new Date().getFullYear()} All rights reserved.
          <br />
          <Link href={publicEnv.BASE_URL} style={{ fontSize: 'inherit' }}>
            DigitalMarkeplace.com
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
);
