import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../Context/DataContaxt";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from "@mui/icons-material/Close";

const EditProductCard = () => {
    const { selectedProduct, setSelectedProduct, handleEditProduct } = useContext(DataContext);

    // Don't show popup if no product selected
    if (!selectedProduct) return null;

    // Local state for editing
    const [formData, setFormData] = useState(selectedProduct);

    // Update form when selectedProduct changes
    useEffect(() => {
        setFormData(selectedProduct);
    }, [selectedProduct]);

    // handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // save edit
    const handleSave = () => {
        handleEditProduct(formData);
        setSelectedProduct(null); // close popup
    };

    // close popup
    const closePopup = () => {
        setSelectedProduct(null);
    };

    return (
        <>
            {/* Overlay */}
            <Box
                onClick={closePopup}
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(4px)",
                    zIndex: 999,
                }}
            />

            {/* Center card */}
            <Paper
                elevation={6}
                sx={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    p: 3,
                    borderRadius: 3,
                    zIndex: 1000,
                    background: "rgba(30, 30, 45, 0.9)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
                        Edit Product
                    </Typography>

                    <IconButton size="small" onClick={closePopup} sx={{ color: "white" }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2, "& .MuiInputBase-input": { color: "white" }, "& .MuiFormLabel-root": { color: "rgba(255,255,255,0.7)" } }}
                />

                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2, "& .MuiInputBase-input": { color: "white" }, "& .MuiFormLabel-root": { color: "rgba(255,255,255,0.7)" } }}

                />

                <TextField
                    label="Price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2, "& .MuiInputBase-input": { color: "white" }, "& .MuiFormLabel-root": { color: "rgba(255,255,255,0.7)" } }}
                />

                <TextField
                    label="Stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 3, "& .MuiInputBase-input": { color: "white" }, "& .MuiFormLabel-root": { color: "rgba(255,255,255,0.7)" } }}
                />

                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSave}
                    sx={{
                        background: "linear-gradient(135deg,#6366f1,#a855f7)",
                        fontWeight: 600,
                    }}
                >
                    Save Changes
                </Button>
            </Paper>
        </>
    );
};

export default EditProductCard;
