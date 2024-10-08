import { useRef, type JSX } from 'react';
import { Transition, SwitchTransition } from 'react-transition-group';

import type { DefineProps } from '@/types';
import { cn } from '@/lib/utils/cn';
import { defineTransitionClasses } from '@/lib/utils/define-transition-classes';

export type TransitionFadeProps<K extends string> = Omit<
  DefineProps<
    {
      transitionKey: K;
      duration?: number;
    },
    HTMLDivElement
  >,
  'children'
> & {
  children: (transitionKey: K) => JSX.Element;
};

const TRANSITION_CLASSES = defineTransitionClasses({
  entering: 'opacity-1',
  exiting: 'opacity-0',
});

function TransitionFade<K extends string>({
  transitionKey,
  children,
  duration = 3e2,
  className,
  style,
  ...attrs
}: TransitionFadeProps<K>) {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <SwitchTransition>
      <Transition nodeRef={nodeRef} key={transitionKey} timeout={duration}>
        {(state) => {
          return (
            <div
              {...attrs}
              ref={nodeRef}
              className={cn(
                'transition-opacity',
                className,
                TRANSITION_CLASSES[state],
              )}
              style={{
                ...style,
                transitionDuration: `${duration}ms`,
              }}
            >
              {children(transitionKey)}
            </div>
          );
        }}
      </Transition>
    </SwitchTransition>
  );
}

export default TransitionFade;
