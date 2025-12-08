import React, { createContext, useState } from 'react';
import productsData from '../Mock/Data'; // Import your products data


export const DataContext = createContext();

function DataProvider({ children }) {
    const [products, setProducts] = useState(productsData); // Add products state
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [display, setDisplayProduct] = useState([]);





























    // Add product
    const handleAddProduct = (newProduct) => {
        const product = {
            id: products.length + 1,
            ...newProduct,
            stockStatus: 'in-stock',
            stock: 'In Stock',
        };
        setProducts([...products, product]);
        setSelectedProduct(product);
        alert(`Product added successfully! ${product.name}`);
    };

    // Delete product
    const handleDeleteProduct = (productId) => {
        setProducts(products.filter(p => p.id !== productId));
        if (selectedProduct?.id === productId) {
            setSelectedProduct(null);
        }
        alert(`Product deleted successfully!`);
    };

    // Edit product
    const handleEditProduct = (updatedProduct) => {
        setProducts((prev) =>
            prev.map((item) =>
                item.id === updatedProduct.id ? updatedProduct : item
            )
        );
        setSelectedProduct(updatedProduct);
        alert(`Product updated successfully! ${updatedProduct.name}`);
    }

    // Close product details

    const value = {
        products, // Add products to value
        setProducts,
        display,
        setDisplayProduct,
        selectedProduct,
        setSelectedProduct,
        handleAddProduct,
        handleDeleteProduct,
        handleEditProduct

    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

export default DataProvider;