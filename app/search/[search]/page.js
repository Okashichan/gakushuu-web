"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

const BASE_URL = 'http://127.0.0.1:8000';

const TranslationCard = ({ data }) => {

    console.log(data);

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h3" gutterBottom>
                        Український словник
                    </Typography>
                    <ul>
                        {
                            data.ua_sourse.map((item, index) => (
                                <li key={item.id}>
                                    <Typography variant="subtitle1">{item.ua_translation}</Typography>
                                    <Typography variant="body2">Kanji: {item.kanji}</Typography>
                                    <Typography variant="body2">Romanization: {item.romaji}</Typography>
                                    <Typography variant="body2">Transliteration: {item.transliteration}</Typography>
                                </li>
                            ))}
                    </ul>
                </CardContent>
            </Card>
            <Divider variant="inset" />
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h3" gutterBottom>
                        Англійський словник
                    </Typography>
                    <ul>
                        {
                            data?.en_sourse.map((item, index) => (
                                <li key={index}>
                                    <Typography variant="subtitle1">{item.en_translation}</Typography>
                                    <Typography variant="body2">Kanji: {item.kanji}</Typography>
                                    <Typography variant="body2">Romanization: {item.romaji}</Typography>
                                    <Typography variant="body2">Transliteration: {item.transliteration}</Typography>
                                    <Button href={'/dictionary/' + item.idseq} variant="contained" color="primary" >Додати до словника</Button>
                                </li>
                            ))}
                    </ul>
                </CardContent>
            </Card>
        </Box >
    );
};

export default function Search({ params }) {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/dictionary/search/${params.search}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
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

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {data ? (
                <TranslationCard data={data} />
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}