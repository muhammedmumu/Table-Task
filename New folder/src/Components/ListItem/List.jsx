import React, { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataContext } from '../../Context/DataContaxt';




const ProductList = () => {

    const { setDisplayProduct, products, handleDeleteProduct, setSelectedProduct } = useContext(DataContext);


    return (
        <Paper
            elevation={0}
            sx={{
                background: 'rgba(26, 29, 41, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(99, 102, 241, 0.1)',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            }}
        >
            <Box sx={{ p: 3, pb: 2 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 3,
                    }}
                >
                    Product List
                </Typography>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontWeight: 600,
                                        borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
                                        fontSize: '0.85rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    Image
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontWeight: 600,
                                        borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
                                        fontSize: '0.85rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    Name
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontWeight: 600,
                                        borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
                                        fontSize: '0.85rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    Price
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontWeight: 600,
                                        borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
                                        fontSize: '0.85rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    Stock
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontWeight: 600,
                                        borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
                                        fontSize: '0.85rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow
                                    key={product.id}
                                    sx={{
                                        '&:hover': {
                                            background: 'rgba(99, 102, 241, 0.05)',
                                            transform: 'scale(1.01)',
                                            transition: 'all 0.2s ease',
                                        },
                                        '& td': {
                                            borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
                                        },
                                    }}
                                    onClick={() => setDisplayProduct(product)}
                                >
                                    <TableCell>
                                        <Avatar
                                            src={product.image}
                                            variant="rounded"
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                border: '2px solid rgba(99, 102, 241, 0.3)',
                                                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                fontWeight: 500,
                                                fontSize: '0.95rem',
                                            }}
                                        >
                                            {product.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                color: '#6366f1',
                                                fontWeight: 700,
                                                fontSize: '1rem',
                                            }}
                                        >
                                            ${product.price}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={product.stock}
                                            size="small"
                                            sx={{
                                                backgroundColor:
                                                    product.stockStatus === 'in-stock'
                                                        ? 'rgba(34, 197, 94, 0.15)'
                                                        : 'rgba(239, 68, 68, 0.15)',
                                                color:
                                                    product.stockStatus === 'in-stock'
                                                        ? '#22c55e'
                                                        : '#ef4444',
                                                fontWeight: 600,
                                                border: `1px solid ${product.stockStatus === 'in-stock'
                                                    ? 'rgba(34, 197, 94, 0.3)'
                                                    : 'rgba(239, 68, 68, 0.3)'
                                                    }`,
                                                boxShadow:
                                                    product.stockStatus === 'in-stock'
                                                        ? '0 0 12px rgba(34, 197, 94, 0.3)'
                                                        : '0 0 12px rgba(239, 68, 68, 0.3)',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                                            <IconButton
                                                size="small"
                                                onClick={() => alert("View feature is under development")}
                                                sx={{
                                                    color: '#6366f1',
                                                    '&:hover': {
                                                        background: 'rgba(99, 102, 241, 0.1)',
                                                        transform: 'scale(1.1)',
                                                    },
                                                    transition: 'all 0.2s ease',
                                                }}
                                            >
                                                <VisibilityIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedProduct(product);
                                                }}

                                                sx={{
                                                    color: '#a855f7',
                                                    '&:hover': {
                                                        background: 'rgba(168, 85, 247, 0.1)',
                                                        transform: 'scale(1.1)',
                                                    },
                                                    transition: 'all 0.2s ease',
                                                }}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();  // ADD THIS LINE
                                                    handleDeleteProduct(product.id);
                                                }}
                                                sx={{
                                                    color: '#ef4444',
                                                    '&:hover': {
                                                        background: 'rgba(239, 68, 68, 0.1)',
                                                        transform: 'scale(1.1)',
                                                    },
                                                    transition: 'all 0.2s ease',
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Paper >
    );
};

export default ProductList;
