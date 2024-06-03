'use client';
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNotification } from '@/context/NotificationContext';
import { setCookie } from '@/utils/cookies';
import { useRouter } from 'next/navigation';

const url = `${process.env.NEXT_PUBLIC_API_URL}/token`;

export default function SignIn() {
    const router = useRouter();
    const showNotification = useNotification();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const credentials = {
            username: event.target.username.value,
            password: event.target.password.value
        };

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(credentials).toString(),
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                showNotification('Помилка входу. Перевірте правильність введених даних.', 'error');
                return;
            }

            const responseData = await response.json();

            await setCookie('token', responseData.access_token);
            router.push('/');
            showNotification('Успішний вхід', 'success');
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вхід
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Ваш нікнейм"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Увійти
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/auth/signup" variant="body2">
                                {"Не маєте облікового запису? Зареєструватися"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}