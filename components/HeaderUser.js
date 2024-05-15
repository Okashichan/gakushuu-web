"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import StyledLink from './StyledLink';
import { getCookie, deleteCookie } from '@/utils/cookies';
import { LibraryBooks, Login } from '@mui/icons-material';

const url = `${process.env.NEXT_PUBLIC_API_URL}/user/me`;

export default function AccountMenu() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const logout = () => {
        deleteCookie('token').then(() => {
            setUser(null);
            router.push('/');
        });
    };

    const getUserData = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + await getCookie('token')
            },
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData);
            setUser(responseData);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    useEffect(() => {
        getCookie('token').then((token) => token ? getUserData() : setUser(null));
    }, []);

    return (
        <>
            {user ? (
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>
                            {user.username}
                        </Typography>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar src={"http://" + user.avatar_url} sx={{ width: 32, height: 32 }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="menu-appbar"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        slotProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem>
                            <Avatar src={"http://" + user.avatar_url} />&nbsp;<StyledLink href={`/user/${user.username}`}>Профіль</StyledLink>
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            <StyledLink href={`/user/${user.username}/edit`}>
                                Налаштування
                            </StyledLink>
                        </MenuItem>
                        {user.role.name === 'linguist' ? (
                            <MenuItem>
                                <ListItemIcon>
                                    <LibraryBooks fontSize="small" />
                                </ListItemIcon>
                                <StyledLink href={`/dictionary/edit`}>
                                    Словник
                                </StyledLink>
                            </MenuItem>
                        ) : undefined}
                        <MenuItem onClick={logout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Вихід
                        </MenuItem>
                    </Menu>
                </>
            ) :
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32 }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="menu-appbar"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        slotProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <Login fontSize="small" />
                            </ListItemIcon>
                            <StyledLink href="/auth/login">
                                Вхід
                            </StyledLink>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            <StyledLink href="/auth/signup">
                                Реєстрація
                            </StyledLink>
                        </MenuItem>
                    </Menu>
                </>}
        </>
    );
}
