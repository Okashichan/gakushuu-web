"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import {
    Container, Box, Avatar, Typography, List, ListItem, ListItemText, Paper, Button, IconButton, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Switch, FormControlLabel
} from '@mui/material';
import {
    Add as AddIcon, Upload as UploadIcon, Person as PersonIcon, Work as WorkIcon, School as SchoolIcon, ExpandMore, ExpandLess, Delete as DeleteIcon, GetApp as ExportIcon, Public as PublicIcon, Lock as LockIcon, Visibility as VisibilityIcon,
    Edit
} from '@mui/icons-material';
import { getCookie } from '@/utils/cookies';
import { Link } from '@mui/material';
import { useNotification } from '@/context/NotificationContext';

const url = process.env.NEXT_PUBLIC_API_URL;

const getRoleIcon = (roleName) => {
    switch (roleName) {
        case 'admin':
            return (
                <>
                    <WorkIcon />
                    <Typography variant="body2" color="textSecondary" ml={1}>Адміністратор</Typography>
                </>
            );
        case 'linguist':
            return (
                <>
                    <SchoolIcon />
                    <Typography variant="body2" color="textSecondary" ml={1}>Мовознавець</Typography>
                </>
            );
        default:
            return (
                <>
                    <PersonIcon />
                    <Typography variant="body2" color="textSecondary" ml={1}>Учень</Typography>
                </>
            );
    }
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function UserPage({ user }) {
    const [openCollections, setOpenCollections] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newCollection, setNewCollection] = useState({
        name: '',
        description: '',
        is_public: false
    });
    const router = useRouter();
    const showNotification = useNotification();

    const toggleCollection = (uuid) => {
        setOpenCollections(prevState => ({
            ...prevState,
            [uuid]: !prevState[uuid]
        }));
    };

    const setCollectionVisibility = async (uuid, is_public) => {
        const options = {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await getCookie('token')
            },
            body: JSON.stringify({
                is_public: !is_public
            })
        }

        try {
            fetch(`${url}/collection/${uuid}`, options);
            showNotification('Видимість колекції змінено', 'success');
            router.refresh();
        } catch (error) {
            console.error('Error:', error.message);
        }

    };

    const handleDialogOpen = (collection) => {
        if (collection) {
            setNewCollection({
                name: collection.name,
                description: collection.description,
                is_public: collection.is_public,
                uuid: collection.uuid
            });
        }
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCollection(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSwitchChange = (e) => {
        const { name, checked } = e.target;
        setNewCollection(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const deteleCollection = async (uuid) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await getCookie('token')
            }
        };

        try {
            await fetch(`${url}/collection/${uuid}`, options);
            showNotification('Колекцію видалено', 'success');
            router.refresh();
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const deleteWordFromCollection = async (collectionUuid, wordUuid) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await getCookie('token')
            }
        };

        try {
            await fetch(`${url}/collection/remove/${collectionUuid}?word_uuid=${wordUuid}`, options);
            showNotification('Слово видалено', 'success');
            router.refresh();
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleFormSubmit = async () => {
        const token = await getCookie('token');
        try {
            const optionsCreate = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };

            const optionsUpdate = {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }

            const options = newCollection?.uuid ? optionsUpdate : optionsCreate;
            const newUrl = newCollection?.uuid ? `${url}/collection/${newCollection.uuid}` : `${url}/collection`;

            const data = {
                name: newCollection.name,
                description: newCollection.description,
                is_public: newCollection?.is_public ? newCollection.is_public : false
            };

            if (data.name === undefined || data.description === undefined) {
                showNotification('Заповніть всі поля', 'error');
                setNewCollection({});
                return;
            }

            options.body = JSON.stringify(data);

            await fetch(newUrl, options);
            showNotification(newCollection?.uuid ? 'Колекцію оновлено' : 'Колекцію створено', 'success');
            router.refresh();
        } catch (error) {
            console.error('Error:', error.message);
        }

        setNewCollection({});

        handleDialogClose();
    };

    const uploadAvatar = async (event) => {
        event.preventDefault();

        const data = new FormData();

        data.append('image', event.target.files[0]);

        const options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + await getCookie('token')
            },
            body: data
        };

        try {
            const response = await fetch(`${url}/user/upload_avatar`, options);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            showNotification('Аватар змінено', 'success');
            router.refresh();
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const changeUserRole = async (email) => {
        const options = {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await getCookie('token'),
            }
        }

        try {
            const response = await fetch(`${url}/role/${email}`, options);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            showNotification('Роль змінено', 'success');
            router.refresh();
        } catch (error) {
            console.error('Error:', error.message);
        }

    };

    return (
        <Container sx={{ pb: 4 }}>
            <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
                <Avatar src={user.avatar_url} alt={user.username} sx={{ width: 100, height: 100 }} />
                <Typography variant="h4" mt={2}>{user.username}</Typography>
                <Typography variant="body1">{user.email}</Typography>
                <Box display="flex" alignItems="center" mt={1}>
                    {getRoleIcon(user.role.name)}

                </Box>
                <Typography variant="body2" color="textSecondary" mt={1}>Приєднався: {new Date(user.created_at).toLocaleDateString()}</Typography>

                {user.current ? (
                    <Box display="flex" justifyContent="center" mt={2} gap={2}>
                        <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={handleDialogOpen}>
                            Нова колекція
                        </Button>
                        <Button component="label" color="secondary" startIcon={<UploadIcon />}>
                            Завантажити аватар
                            <VisuallyHiddenInput type="file" onInput={uploadAvatar} />
                        </Button>
                    </Box>
                ) : undefined}

                {user?.currentUser?.role.name === 'admin' && user.role.name !== 'linguist' ? (
                    <Button color="primary" onClick={() => changeUserRole(user.email)}>
                        Призначити мовознавцем
                    </Button>
                ) : undefined}

                {user.collections?.map(collection => (
                    <Box key={collection.uuid} mt={4} width="100%">
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6">
                                    {collection.name} {collection.is_public ? <PublicIcon /> : <LockIcon />}
                                </Typography>
                                <Box>
                                    <IconButton onClick={() => toggleCollection(collection.uuid)}>
                                        {openCollections[collection.uuid] ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                    {
                                        collection.words.length !== 0 ? <Link href={`${url}/collection/download/${collection.uuid}`} target='_blank'>
                                            <IconButton color="primary">
                                                <ExportIcon />
                                            </IconButton>
                                        </Link> : undefined
                                    }
                                    {user.current ? (
                                        <>
                                            <IconButton color="secondary" onClick={() => deteleCollection(collection.uuid)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton color="default" onClick={() => handleDialogOpen(collection)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton color="default" onClick={() => setCollectionVisibility(collection.uuid, collection.is_public)}>
                                                <VisibilityIcon />
                                            </IconButton>
                                        </>
                                    ) : undefined}
                                </Box>
                            </Box>
                            <Typography variant="body2" color="textSecondary">{collection.description}</Typography>
                            <Collapse in={openCollections[collection.uuid]} timeout="auto" unmountOnExit>
                                <List>
                                    {collection.words.length === 0 ? (
                                        <ListItem>
                                            <ListItemText primary="This collection is empty." />
                                        </ListItem>
                                    ) : (
                                        collection.words.map(word => (
                                            <ListItem
                                                key={word.idseq}
                                                secondaryAction={
                                                    user.current ? <IconButton edge="end" color="secondary">
                                                        <DeleteIcon onClick={() => deleteWordFromCollection(collection.uuid, word.uuid)} />
                                                    </IconButton> : undefined
                                                }>
                                                <ListItemText
                                                    primary={`${word.kanji ? word.kanji : ''} (${word.hiragana} - ${word.romaji})`}
                                                    secondary={`Переклад: ${word.ua_translation}`}
                                                />
                                            </ListItem>
                                        ))
                                    )}
                                </List>
                            </Collapse>
                        </Paper>
                    </Box>
                ))}
            </Box>

            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Додати нову колекцію</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Будь ласка, заповніть форму нижче, щоб створити нову колекцію.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Назва колекції"
                        fullWidth
                        variant="outlined"
                        value={newCollection?.name ? newCollection.name : ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Опис"
                        fullWidth
                        variant="outlined"
                        value={newCollection?.description ? newCollection.description : ''}
                        onChange={handleInputChange}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={newCollection?.is_public ? newCollection.is_public : false}
                                onChange={handleSwitchChange}
                                name="is_public"
                                color="primary"
                            />
                        }
                        label="Публічна"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Відмінити
                    </Button>
                    <Button onClick={handleFormSubmit} color="primary">
                        Створити
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};