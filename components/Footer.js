import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { pink } from '@mui/material/colors';

export default function Footer() {

    return (
        <Box sx={{ bgcolor: pink[50], marginTop: 'auto', padding: '10px' }} component="footer" >
            <Typography
                variant="subtitle1"
                align="center"
                component="p"
            >
                Made with ❤️ by Okashi
            </Typography>
            <Typography variant="body2" align="center">
                {'Авторські права © '}
                <Link color="inherit" href="https://gakushuu.pp.ua/">
                    gakushuu
                </Link>{' '}
                {new Date().getFullYear()}
            </Typography>
        </Box>
    )
}