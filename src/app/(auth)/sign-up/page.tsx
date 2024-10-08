import type { Metadata } from 'next';

import { AuthFormFrame } from '@/components/AuthFormFrame';
import { SignUpForm } from '@/components/Auth/SignUpForm';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export const middlewares = ['guest'];

export default function SignUpPage() {
  return (
    <AuthFormFrame
      heading='Create an account'
      linkHref='/login'
      linkText='Already have an account? Sign-in'
    >
      <SignUpForm />
    </AuthFormFrame>
  );
}
