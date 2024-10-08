import type { FC } from 'react';

export function defineEmailComponent<Props extends Record<string, any>>(
  Component: FC<Props>,
  defaultProps: Props,
) {
  const CustomizedComponent = ({ style, ...props }: Props) => {
    const mergedProps = {
      ...defaultProps,
      ...props,
      style: {
        ...defaultProps.style,
        ...style,
      },
    } as Props;

    return <Component {...mergedProps} />;
  };

  CustomizedComponent.displayName = Component.displayName;

  return CustomizedComponent;
}
