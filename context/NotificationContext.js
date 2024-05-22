"use client";
import React, { createContext, useState, useContext, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        message: '',
        severity: 'info', // 'success', 'error', 'warning', 'info'
        open: false,
    });

    const showNotification = useCallback((message, severity = 'info') => {
        setNotification({ message, severity, open: true });
    }, []);

    const handleClose = () => {
        setNotification({ ...notification, open: false });
    };

    return (
        <NotificationContext.Provider value={showNotification}>
            {children}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={notification.open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%', marginTop: 7 }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
