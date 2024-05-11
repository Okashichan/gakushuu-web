import * as React from 'react';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './MuiTheme';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
