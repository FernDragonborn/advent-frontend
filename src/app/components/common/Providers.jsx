'use client';

import { isServer, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { makeQueryClient } from '@/utils';

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
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-grotesque), sans-serif',
        }}
      />
    </>
  );
};

export default Providers;
