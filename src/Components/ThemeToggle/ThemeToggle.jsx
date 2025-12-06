import React, { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Tooltip from '@mui/material/Tooltip';

function ThemeToggle() {
    const { mode, toggleTheme } = useContext(ThemeContext);

    return (
        <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton
                onClick={toggleTheme}
                color="inherit"
                sx={{
                    position: 'fixed',
                    top: 16,
                    right: 16,
                    zIndex: 1000,
                    backgroundColor: mode === 'light' ? '#fff' : '#1e1e1e',
                    boxShadow: 2,
                    '&:hover': {
                        backgroundColor: mode === 'light' ? '#f5f5f5' : '#2e2e2e',
                    }
                }}
            >
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Tooltip>
    );
}

export default ThemeToggle;
