import type { RequestHeaders } from 'redaxios';

import { loadAuthContext } from '../auth/load';

export const loadAppContext = async (headers?: RequestHeaders) => {
  const [authContextValue] = await Promise.all([loadAuthContext(headers)]);

  return {
    authContextValue,
  };
};

export type AppContext = Awaited<ReturnType<typeof loadAppContext>>;
