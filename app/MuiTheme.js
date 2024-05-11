'use client';
import { Roboto } from 'next/font/google';
import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

const pinkBase = pink[500];
const pinkMain = alpha(pinkBase, 0.7);

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        mode: 'light',
        pink: {
            main: pinkMain,
            light: alpha(pinkBase, 0.5),
            dark: alpha(pinkBase, 0.9),
            contrastText: getContrastRatio(pinkMain, '#fff') > 4.5 ? '#fff' : '#111',
        }
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.severity === 'info' && {
                        backgroundColor: '#60a5fa',
                    }),
                }),
            },
        },
    },
});

export default theme;