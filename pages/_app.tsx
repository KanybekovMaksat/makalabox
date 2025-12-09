import type { AppProps } from 'next/app';

import { HeroUIProvider } from '@heroui/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/router';
import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query';
import { fontSans, fontMono } from '@/config/fonts';
import { queryClient } from '@/shared/lib/react-query/react-query.lib';
import { ToastContainer } from 'react-toastify';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <TanStackQueryClientProvider client={queryClient}>
        <NextThemesProvider attribute="class" defaultTheme="light">
          <Component {...pageProps} />
        </NextThemesProvider>
      </TanStackQueryClientProvider>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </HeroUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
