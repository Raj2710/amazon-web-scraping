import React, { useState } from 'react';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import './dataPage.css';

const DataPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(searchQuery);

        if (!searchQuery) return;

        setLoading(true);
        try {

            // const response = await axios.get(`http://localhost:8000/search?searchQuery=${searchQuery}`);
            const response = await axios.get(`https://amazon-web-scraping-uwt6.onrender.com/search?searchQuery=${searchQuery}`);
            const result = response.data.products;
            console.log(result);
            setProducts(result && result.map((product, index) => ({ id: index + 1, sno: index + 1, ...product })));
        } catch (error) {
            console.log(error)
            console.log("Error occurred while searching:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { field: 'sno', headerName: 'S.No', width: 100 },
        { field: 'productName', headerName: 'Product Name', width: 300 },
        { field: 'price', headerName: 'Price', width: 150 },
        { field: 'rating', headerName: 'Rating', width: 150 },
        { field: 'asin', headerName: 'ASIN', width: 200 },
    ];

    return (
        <div className="container">
            <h1 className="title">Amazon Search Product</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for products"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className={`search-button ${loading ? 'disabled' : ''}`}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            <div className="results-info">
                {products && products.length > 0
                    ? <p>{products && products.length} results found</p>
                    : <p>No results found</p>}
            </div>

            <div style={{ height: 500, width: '100%' }}>
                {products && products.length > 0 && (
                    <DataGrid
                        rows={products}
                        columns={columns}
                        pagination
                        loading={loading}
                        className="data-grid"
                    />
                )}
            </div>
        </div>
    );
};

export default DataPage;
