'use client';
import { useState } from 'react';
import { Container, TextField, Button, Typography, CircularProgress, Card, CardContent, Box, Divider } from '@mui/material';
import { useNotification } from '@/context/NotificationContext';

const url = `${process.env.NEXT_PUBLIC_API_URL}/dictionary/trasliteration`;

export default function Home() {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const showNotification = useNotification();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${url}?query=${inputValue}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: inputValue }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setResult(data);
        } catch (error) {
            showNotification('Помилка транслітерації', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Транслітерація
                    </Typography>
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <TextField
                            label="Канджі або хіраґана"
                            variant="outlined"
                            fullWidth
                            value={inputValue}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
                        <Button variant="contained" color="secondary" onClick={handleSubmit} disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Отримати результат'}
                        </Button>
                    </Box>
                    {result && (
                        <Box sx={{ mt: 2, textAlign: 'center', width: '100%' }}>
                            <>
                                <Divider>УКРАЇНСЬКОЮ</Divider>
                                <Typography variant="h1" component="h2" gutterBottom>
                                    {result.ukrainian}
                                </Typography>
                                <Divider>ХІРАҐАНОЮ</Divider>
                                <Typography variant="h3" component="h2" gutterBottom>
                                    {result.hiragana}
                                </Typography>
                                <Divider>РОМАДЖІ</Divider>
                                <Typography variant="h6" component="h2" gutterBottom>
                                    {result.romaji}
                                </Typography>
                            </>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
}