"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { getCookie } from '@/utils/cookies';

const url = process.env.NEXT_PUBLIC_API_URL;

export default function AddToDictionary({ params }) {
    const router = useRouter();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}/dictionary/jamdict/${params.id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                console.log(err.message || 'An error occurred');
            }
        };

        fetchData();
    }, []);

    const submitData = async (data) => {
        const sUrl = `${url}/dictionary`;
        console.log(sUrl);
        try {
            const response = await fetch(sUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await getCookie('token'),
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            router.push(`/search/${result.kanji ? result.kanji : result.hiragana}`);
        } catch (err) {
            console.log(err.message || 'An error occurred');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        submitData({ ...data })
    };

    return (
        <>
            {data &&
                <Container >
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <form onSubmit={handleSubmit}>
                            <TextField
                                style={{ marginBottom: 10 }}
                                label="Kanji"
                                name="kanji"
                                value={data.kanji}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                style={{ marginBottom: 10 }}
                                label="Hiragana"
                                name="hiragana"
                                value={data.hiragana}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                            <TextField
                                style={{ marginBottom: 10 }}
                                label="Katakana"
                                name="katakana"
                                value={data.katakana}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                style={{ marginBottom: 10 }}
                                label="Kunyomi"
                                name="kunyomi"
                                value={data.kunyomi}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                style={{ marginBottom: 10 }}
                                label="Onyomi"
                                name="onyomi"
                                value={data.onyomi}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                style={{ marginBottom: 10 }}
                                label="English Translation"
                                name="en_translation"
                                value={data.en_translation}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                style={{ marginBottom: 10 }}
                                label="Ukrainian Translation"
                                name="ua_translation"
                                value={data.ua_translation}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                            <TextField
                                style={{ marginBottom: 10 }}
                                label="Romanization"
                                name="romanization"
                                value={data.romaji}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                            <TextField
                                style={{ marginBottom: 10 }}
                                label="Transliteration"
                                name="transliteration"
                                value={data.transliteration}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                            <Button type="submit" variant="contained" color="primary" >
                                Додати
                            </Button>
                        </form>
                    </Box>
                </Container>
            }
        </>
    );
}