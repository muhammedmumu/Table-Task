import { useContext } from 'react';
import Box from '@mui/material/Box';
import Sidebar from '../Components/Drawer/SideBar';
import Lists from '../Components/ListItem/List';
import Display from '../Components/DisplayProduct/Display';
import AddProduct from '../Components/AddProduct/AddProduct';
import Edit from '../Components/Edite/Edit';
import { DataContext } from '../Context/DataContaxt';

const DashboardLayout = () => {
    const { selectedProduct } = useContext(DataContext);

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: 'background.default',
            }}
        >
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    display: 'flex',
                    gap: 3,
                    overflow: 'auto',
                }}
            >
                {/* Left Section */}
                <Box sx={{ flex: '1  40%', minWidth: 0 }}>
                    <Lists />
                </Box>

                {/* Middle Section */}
                <Box sx={{ flex: '1  30%', minWidth: 0 }}>
                    <Display />
                </Box>

                {/* Right Section */}
                <Box sx={{ flex: '1  30%', minWidth: 0 }}>
                    {selectedProduct ? <Edit /> : <AddProduct />}
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardLayout;