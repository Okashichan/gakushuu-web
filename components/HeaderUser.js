"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    IconButton,
    Typography,
    Tooltip
} from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import { deleteCookie } from '@/utils/cookies';
import { LibraryBooks, Login, Analytics } from '@mui/icons-material';
import StyledLink from './StyledLink';

export default function HeaderUser({ user }) {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const logout = () => {
        deleteCookie('token').then(() => {
            router.push('/');
        });
    };

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
                                <Avatar src={user.avatar_url} sx={{ width: 32, height: 32 }} />
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
                            <Avatar src={user.avatar_url} />&nbsp;<StyledLink href={`/user/${user.username}`}>Профіль</StyledLink>
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
                        <MenuItem>
                            <ListItemIcon>
                                <Analytics fontSize="small" />
                            </ListItemIcon>
                            <StyledLink href={`/user/${user.username}/stats`}>
                                Статистика
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
