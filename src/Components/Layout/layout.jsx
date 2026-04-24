import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
const Layout = ({ children }) => {
    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                backgroundColor: 'transparent',
                color: 'text.primary',
            }}
        >
            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    width: '100%',
                    margin: 0,
                    py: 2,
                    px: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh'
                }}
            >
                {children}
            </Container>
        </Box>
    );
};

export default Layout;
