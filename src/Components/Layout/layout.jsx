import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
const Layout = ({ children }) => {
    return (
        <Box
            sx={{
                width: 1500,
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh', // Full viewport height
                backgroundColor: 'background.default', // Theme-aware background
                color: 'text.primary', // Theme-aware text color
                padding: 2,
            }}
        >
            <Container

                maxWidth={false}
                disableGutters
                sx={{
                    maxWidth: 'none !important',
                    width: '100vw !important',
                    margin: '0 !important',
                    marginLeft: '0 !important',
                    paddingLeft: '0 !important',
                    paddingRight: '0 !important',
                    py: 4,
                    px: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'stretch',
                    minHeight: '100vh'
                }}
            >

                {children}
            </Container>
        </Box>
    );
};

export default Layout;