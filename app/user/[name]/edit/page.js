'use client';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getCookie, setCookie, deleteCookie } from '@/utils/cookies';
import { useNotification } from '@/context/NotificationContext';
import { useRouter } from 'next/navigation';

const url = process.env.NEXT_PUBLIC_API_URL;

export default function UserEdit({ params }) {
    const router = useRouter();
    const showNotification = useNotification();

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            username: event.target.username?.value,
            password: event.target.password?.value
        };

        const filter_empty = (obj) => {
            Object.keys(obj).forEach(key => obj[key] === '' && delete obj[key]);
            return obj;
        };

        data = filter_empty(data);

        if (data.password === undefined) {
            console.error('Password is required');
            return;
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await getCookie('token')
            },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch(`${url}/user/me`, options);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();

            const resetToken = await fetch(`${url}/token`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ username: responseData.username, password: data.password }).toString(),
            });

            if (!resetToken.ok) {
                showNotification('Помилка редагування', 'error');
                return;
            }

            const resetTokenData = await resetToken.json();

            await setCookie('token', resetTokenData.access_token);

            router.push(`/user/${responseData.username}`);
            showNotification('Успішне редагування', 'success');
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    const handleDelete = async () => {
        const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await getCookie('token')
            }
        };

        try {
            const response = await fetch(`${url}/user/me`, options);

            if (!response.ok) {
                showNotification('Помилка видалення акаунту', 'error');
            }

            await deleteCookie('token');

            router.push('/');
            showNotification('Акаунт видалено', 'success');
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <EditIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Редагування користувача {params.name}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Your username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        required
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
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
                        Редагувати
                    </Button>
                </Box>
            </Box>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color={'error'}
                sx={{ mt: 3, mb: 2 }}
                onClick={handleDelete}
            >
                Видалити акаунт
            </Button>
        </Container>
    )
}