'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { isServer, QueryClientProvider } from '@tanstack/react-query';

import { makeQueryClient } from '@/utils';
import { StyledToastContainer } from '@/app/components';

let browserQueryClient;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}

const Providers = ({ children }) => {
  const queryClient = getQueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          {children}
        </GoogleOAuthProvider>
      </QueryClientProvider>
      <StyledToastContainer />
    </>
  );
};

export default Providers;
