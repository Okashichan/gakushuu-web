"use client";
import { useState, useEffect } from 'react';
import StyledLink from '@/components/StyledLink';
import {
    Button,
    Box,
    Typography,
    Card,
    CardContent,
    Paper,
    Grid,
    Container,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Collapse,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { getCookie } from '@/utils/cookies';
import { useNotification } from '../context/NotificationContext';

const url = process.env.NEXT_PUBLIC_API_URL;

const KanjiCard = ({ entry, currentUser, ua }) => {
    const showNotification = useNotification();
    const [collection, setCollection] = useState(currentUser?.collections[0] ? currentUser?.collections[0].uuid : 'none');

    const handleCollectionChange = (e) => {
        setCollection(e.target.value);
    };

    const submitWordToCollection = async (wordUuid) => {
        try {
            const response = await fetch(`${url}/collection/add/${collection}?word_uuid=${wordUuid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await getCookie('token'),
                }
            });

            if (!response.ok) {
                showNotification('Помилка додавання до колекції', 'error');
            } else {
                showNotification('Успішно додано до колекції', 'success');
            }
        } catch (err) {
            console.log(err.message || 'An error occurred');
        }
    }

    return (
        <Paper sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={1}>
                <Grid item xs={1}>
                    <StyledLink href={`/search/${entry.kanji}`}><Typography variant="h2">{entry.kanji ? entry.kanji : entry.hiragana}</Typography></StyledLink>
                    <span>{entry.idseq}</span>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1"><strong>Хіраґана:</strong> {entry.hiragana}</Typography>
                    {entry.katakana ? <Typography variant="body1"><strong>Катакана:</strong> {entry.katakana}</Typography> : undefined}
                    <Typography variant="body1"><strong>Ромаджі:</strong> {entry.romaji}</Typography>
                    <Typography variant="body1"><strong>Транслітерація:</strong> {entry.transliteration}</Typography>
                    <Typography variant="body1"><strong>Кунйомі:</strong> {entry.kunyomi}</Typography>
                    <Typography variant="body1"><strong>Онйомі:</strong> {entry.onyomi}</Typography>
                    {ua ? <Typography variant="body1"><strong>Переклад:</strong> {entry.ua_translation}</Typography> : <Typography variant="body1"><strong>Англійський переклад:</strong> {entry.en_translation}</Typography>}
                </Grid>
                {ua ?
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'top' }}>
                        {currentUser ? <FormControl variant="outlined" sx={{ minWidth: 220, mr: 2 }}>
                            <InputLabel id="collection-label">Колекції</InputLabel>
                            <Select
                                labelId="collection-label"
                                id="collection-select"
                                label="Collection"
                                value={collection}
                                onChange={handleCollectionChange}
                            >
                                <MenuItem value="none"><em>None</em></MenuItem>
                                {currentUser?.collections.map((collection, index) => (
                                    <MenuItem key={index} value={collection.uuid}>{collection.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl> : undefined}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                            }}
                        >
                            {currentUser ? <Button variant="contained" color="secondary" onClick={() => submitWordToCollection(entry.uuid)}>Додати до колекції</Button> : undefined}
                            {currentUser?.role.name === 'linguist' ? <Button variant="contained" color="primary" href={`/dictionary/edit?idseq=${entry.idseq}`}>Редагувати</Button> : undefined}
                        </Box>
                    </Box>
                    :
                    <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        {currentUser ? <Button variant="contained" color="primary" href={`/dictionary/${entry.idseq}`}>Додати до словника</Button> : undefined}
                    </Grid>
                }
            </Grid>
        </Paper >
    );
};

export default function DictionarySearch({ currentUser, search }) {
    const [data, setData] = useState(null);
    const [showEnSource, setShowEnSource] = useState(false);
    const [showUaSource, setShowUaSource] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch(`${url}/dictionary/search/${search}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            if (result.ua_sourse.length === 0) {
                setShowUaSource(false);
                setShowEnSource(true);
            }

            if (result.en_sourse.length === 0) {
                setShowEnSource(false);
                setShowUaSource(true);
            }

            setData(result);
        } catch (err) {
            console.log(err.message || 'An error occurred');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        data ?
            <Container >
                <Box sx={{
                    marginTop: 3, marginBottom: 3
                }} maxWidth="xl">
                    <Card variant="outlined" sx={{ marginBottom: 3 }}>
                        <CardContent>
                            <Box onClick={() => setShowUaSource(!showUaSource)}>
                                <Typography variant="h3" gutterBottom>
                                    Український словник
                                    <IconButton>
                                        {showUaSource ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                </Typography>
                            </Box>
                            <Collapse in={showUaSource}>
                                {
                                    data.ua_sourse.map((item, index) => (
                                        <KanjiCard entry={item} currentUser={currentUser} ua={true} key={index} />
                                    ))
                                }
                            </Collapse>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Box onClick={() => setShowEnSource(!showEnSource)}>
                                <Typography variant="h3" gutterBottom>
                                    Англійський словник
                                    <IconButton>
                                        {showEnSource ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                </Typography>
                            </Box>
                            <Collapse in={showEnSource}>
                                {
                                    data.en_sourse.map((item, index) => (
                                        <KanjiCard entry={item} currentUser={currentUser} key={index} />
                                    ))
                                }
                            </Collapse>
                        </CardContent>
                    </Card>
                </Box >
            </Container> : undefined
    );
};