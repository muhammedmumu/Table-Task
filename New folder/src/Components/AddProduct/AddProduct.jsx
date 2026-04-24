import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CategoryIcon from '@mui/icons-material/Category';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';
import { DataContext } from '../../Context/DataContaxt';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [launchDate, setLaunchDate] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const { handleAddProduct } = useContext(DataContext);

    const handleAddClick = () => {
        if (!productName || !price) {
            alert('Please fill in at least Product Name and Price');
            return;
        }

        const newProduct = {
            name: productName,
            price: parseFloat(price),
            description: description || 'No description provided',
            categories: selectedCategories.length > 0 ? selectedCategories : ['Uncategorized'],
            image: imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
            launchDate: launchDate,
        };

        handleAddProduct(newProduct);

        // Reset form
        setProductName('');
        setPrice('');
        setDescription('');
        setSelectedCategories([]);
        setLaunchDate(null);
        setImageUrl('');
    };

    const categoryOptions = [
        'Electronics',
        'Audio',
        'Accessories',
        'Gaming',
        'Computers',
        'Mobile',
        'Wearables',
        'Smart Home',
    ];

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
                height: '100%',
            }}
        >
            <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <InventoryIcon
                        sx={{
                            color: '#6366f1',
                            fontSize: 28,
                        }}
                    />
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Add Product
                    </Typography>
                </Box>

                {/* Product Name Input */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.6)',
                            textTransform: 'uppercase',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.5px',
                            mb: 1,
                            display: 'block',
                        }}
                    >
                        Product Name
                    </Typography>
                    <TextField
                        fullWidth
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter product name..."
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                background: 'rgba(99, 102, 241, 0.05)',
                                borderRadius: 3,
                                '& fieldset': {
                                    borderColor: 'rgba(99, 102, 241, 0.2)',
                                    borderWidth: 1,
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(99, 102, 241, 0.4)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#6366f1',
                                    borderWidth: 2,
                                },
                                '&.Mui-focused': {
                                    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
                                },
                            },
                            '& .MuiOutlinedInput-input': {
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '0.95rem',
                            },
                        }}
                    />
                </Box>

                {/* Price Input */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.6)',
                            textTransform: 'uppercase',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.5px',
                            mb: 1,
                            display: 'block',
                        }}
                    >
                        Price ($)
                    </Typography>
                    <TextField
                        fullWidth
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price..."
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                background: 'rgba(99, 102, 241, 0.05)',
                                borderRadius: 3,
                                '& fieldset': {
                                    borderColor: 'rgba(99, 102, 241, 0.2)',
                                    borderWidth: 1,
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(99, 102, 241, 0.4)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#6366f1',
                                    borderWidth: 2,
                                },
                                '&.Mui-focused': {
                                    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
                                },
                            },
                            '& .MuiOutlinedInput-input': {
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '0.95rem',
                            },
                        }}
                    />
                </Box>

                {/* Description Input */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.6)',
                            textTransform: 'uppercase',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.5px',
                            mb: 1,
                            display: 'block',
                        }}
                    >
                        Description
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter product description..."
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                background: 'rgba(99, 102, 241, 0.05)',
                                borderRadius: 3,
                                '& fieldset': {
                                    borderColor: 'rgba(99, 102, 241, 0.2)',
                                    borderWidth: 1,
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(99, 102, 241, 0.4)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#6366f1',
                                    borderWidth: 2,
                                },
                                '&.Mui-focused': {
                                    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
                                },
                            },
                            '& .MuiOutlinedInput-input': {
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '0.95rem',
                            },
                        }}
                    />
                </Box>

                {/* Category Autocomplete */}
                <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CategoryIcon
                            sx={{
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: 16,
                            }}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.6)',
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                letterSpacing: '0.5px',
                            }}
                        >
                            Categories
                        </Typography>
                    </Box>
                    <Autocomplete
                        multiple
                        options={categoryOptions}
                        value={selectedCategories}
                        onChange={(event, newValue) => {
                            setSelectedCategories(newValue);
                        }}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip
                                    {...getTagProps({ index })}
                                    key={option}
                                    label={option}
                                    size="small"
                                    sx={{
                                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                        color: '#fff',
                                        fontWeight: 600,
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
                                        '& .MuiChip-deleteIcon': {
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            '&:hover': {
                                                color: '#fff',
                                            },
                                        },
                                    }}
                                />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Select categories..."
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        background: 'rgba(99, 102, 241, 0.05)',
                                        borderRadius: 3,
                                        '& fieldset': {
                                            borderColor: 'rgba(99, 102, 241, 0.2)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(99, 102, 241, 0.4)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#6366f1',
                                            borderWidth: 2,
                                        },
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        color: 'rgba(255, 255, 255, 0.9)',
                                    },
                                }}
                            />
                        )}
                        sx={{
                            '& .MuiAutocomplete-popupIndicator': {
                                color: 'rgba(255, 255, 255, 0.6)',
                            },
                        }}
                    />
                </Box>

                {/* Launch Date Picker */}
                <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CalendarTodayIcon
                            sx={{
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: 16,
                            }}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.6)',
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                letterSpacing: '0.5px',
                            }}
                        >
                            Launch Date
                        </Typography>
                    </Box>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={launchDate}
                            onChange={(newValue) => setLaunchDate(newValue)}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    placeholder: 'Select launch date...',
                                    sx: {
                                        '& .MuiOutlinedInput-root': {
                                            background: 'rgba(99, 102, 241, 0.05)',
                                            borderRadius: 3,
                                            '& fieldset': {
                                                borderColor: 'rgba(99, 102, 241, 0.2)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'rgba(99, 102, 241, 0.4)',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#6366f1',
                                                borderWidth: 2,
                                            },
                                            '&.Mui-focused': {
                                                boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
                                            },
                                        },
                                        '& .MuiOutlinedInput-input': {
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            fontSize: '0.95rem',
                                        },
                                        '& .MuiIconButton-root': {
                                            color: 'rgba(255, 255, 255, 0.6)',
                                        },
                                    },
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Box>

                {/* Add Product Button */}
                <Box sx={{ mb: 3 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAddClick}
                        sx={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                            color: '#fff',
                            fontWeight: 600,
                            borderRadius: 3,
                            py: 1.5,
                            fontSize: '1rem',
                            textTransform: 'none',
                            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5558e3 0%, #9333ea 100%)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(99, 102, 241, 0.5)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Add Product
                    </Button>
                </Box>

                {/* Info Box */}
                <Box
                    sx={{
                        mt: 2,
                        p: 2.5,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            display: 'block',
                            lineHeight: 1.6,
                            fontSize: '0.8rem',
                        }}
                    >
                        <strong>Quick Tip:</strong> Fill in all product details to ensure optimal catalog organization and better search visibility.
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default AddProduct;

