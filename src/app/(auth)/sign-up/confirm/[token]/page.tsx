'use client';

import { Loader2Icon, AlertCircleIcon, MailCheckIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import flatry from 'await-to-js';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { PagePropsWithParams } from '@/types/page-props';
import { Button } from '@/components/ui/Button';
import { trpcClient } from '@/lib/trpc';
import { wait } from '@/lib/utils/wait';

export default function SignUpConfirmPage({
  params: { token },
}: PagePropsWithParams<{
  token: string;
}>) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const onConfirmAccount = async () => {
    setIsLoading(true);

    try {
      const [err] = await flatry(
        trpcClient.auth.confirmSignUp.mutate({
          token,
        })
      );

      if (err) {
        setError(err);

        toast.error(err.message);

        return;
      }

      setError(null);

      // forcing delay for decoration only
      await wait(1e3);

      await router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onConfirmAccount();
  }, []);

  if (isLoading) {
    return (
      <>
        <Loader2Icon className='size-44 animate-spin stroke-1 text-slate-600' />

        <p className='mt-6 font-light text-lg'>Confirming your account...</p>
      </>
    );
  } else if (error) {
    return (
      <>
        <AlertCircleIcon className='size-44 text-red-400 stroke-1' />

        <p className='mt-6 font-light text-lg'>Ops, something went wrong..</p>

        <Button
          className='text-base mt-10'
          variant={'secondary'}
          onClick={onConfirmAccount}
        >
          Try again
        </Button>
      </>
    );
  } else {
    return (
      <>
        <MailCheckIcon className='size-44 stroke-1 text-primary' />

        <p className='mt-6 font-light text-lg w-1/4 text-center'>
          Congratulations ! Your account has been confirmed successfully
          confirmed !
        </p>

        <p className='mt-5 flex items-center space-x-2 text-gray-500 font-light text-lg'>
          <span>Redirecting</span>

          <Loader2Icon className='w-[1em] mt-1 animate-spin' />
        </p>
      </>
    );
  }
}
