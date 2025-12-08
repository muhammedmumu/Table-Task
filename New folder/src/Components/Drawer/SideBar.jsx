import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useTheme } from '../../Context/ThemeContaxt';

function Sidebar() {

    const { darkMode, toggleDarkMode } = useTheme();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon /> },
        { text: 'Products', icon: <InventoryIcon /> },
        { text: 'Orders', icon: <ShoppingCartIcon /> },
        { text: 'Categories', icon: <CategoryIcon /> },
        { text: 'Items', icon: <ListAltIcon /> },
        { text: 'Settings', icon: <SettingsIcon /> },
    ];

    return (
        <Paper
            elevation={0}
            sx={{
                width: 280,
                height: '100vh',
                position: 'sticky',
                top: 0,
                background: darkMode
                    ? 'linear-gradient(180deg, #1a1d29 0%, #0f1117 100%)'
                    : 'linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)',
                borderRight: darkMode ? '1px solid rgba(99, 102, 241, 0.1)' : '1px solid rgba(0,0,0,0.1)',
                boxShadow: darkMode
                    ? '4px 0 24px rgba(99, 102, 241, 0.1)'
                    : '4px 0 24px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                p: 2,
            }}
        >
            {/* Logo/Brand */}
            <Box sx={{ mb: 4, mt: 2 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textAlign: 'center',
                        letterSpacing: '-0.5px',
                    }}
                >
                    Admin Pro
                </Typography>
            </Box>

            {/* Menu Items */}
            <List sx={{ flex: 1 }}>
                {menuItems.map((item, index) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            selected={selectedIndex === index}
                            onClick={() =>
                                setSelectedIndex(index)
                            }
                            sx={{
                                borderRadius: 3,
                                transition: 'all 0.3s ease',
                                '&.Mui-selected': {
                                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: '#fff',
                                    },
                                    '& .MuiListItemText-primary': {
                                        color: '#fff',
                                        fontWeight: 600,
                                    },
                                },
                                '&:hover': {
                                    background: darkMode
                                        ? 'rgba(99, 102, 241, 0.1)'
                                        : 'rgba(99, 102, 241, 0.05)',
                                    transform: 'translateX(4px)',
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: selectedIndex === index ? '#fff' : 'text.secondary',
                                    minWidth: 40,
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontSize: '0.95rem',
                                    fontWeight: selectedIndex === index ? 600 : 400,
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            {/* Dark Mode Toggle */}
            <Box
                sx={{
                    mt: 'auto',
                    p: 2,
                    borderRadius: 3,
                    background: darkMode
                        ? 'rgba(99, 102, 241, 0.05)'
                        : 'rgba(99, 102, 241, 0.03)',
                    border: darkMode
                        ? '1px solid rgba(99, 102, 241, 0.2)'
                        : '1px solid rgba(99, 102, 241, 0.1)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Brightness4Icon sx={{ color: 'text.secondary', fontSize: 20 }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Dark Mode
                        </Typography>
                    </Box>
                    <Switch
                        checked={darkMode}
                        onChange={toggleDarkMode}
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#a855f7',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#6366f1',
                            },
                        }}
                    />
                </Box>
            </Box>
        </Paper >
    );
};

export default Sidebar;
