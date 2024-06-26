'use client';

import { DefineProps } from '@/types';
import { Select } from '../ui/Select';
import { OrderStatus } from '@/consts/order-status';
import { firstToUpperCase } from '@/lib/utils/first-to-upper-case';

export type OrderStatusSelectProps = Omit<
  DefineProps<
    {
      status: OrderStatus | undefined;
    },
    HTMLButtonElement
  >,
  'onChange'
> & {
  onChange: (status: OrderStatus | undefined) => any;
};

const OPTIONS = Object.values(OrderStatus).map((id) => ({
  id,
  label: firstToUpperCase(id),
}));

export const OrderStatusSelect = ({
  status,
  onChange,
}: OrderStatusSelectProps) => {
  return (
    <Select
      value={status}
      onChange={onChange}
      options={OPTIONS}
      canBeEmpty
      emptyLabel='All Statuses'
    />
  );
};
