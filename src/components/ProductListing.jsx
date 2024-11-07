import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Box, Grid, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import ProductCard from './ProductCard';
const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');
  // Fetch products with search functionality
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://dummyjson.com/products/search', {
        params: {
          q: searchQuery,
          page:page,
          limit: limit,
        },
      });
      if (response.data.products.length > 0) {
        setProducts(response.data.products);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, page]);
  // Initial fetch and whenever page or search query changes
  useEffect(() => {
    setHasMore(true);
    fetchProducts();
  }, [searchQuery, fetchProducts]);
  // Handle infinite scroll
  const handleScroll = (event) => {
    const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
    if (bottom && hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
      setLimit(prevLimit => prevLimit + 12)
    }
  };
  return (
    <Box
      sx={{ height: '100vh', overflowY: 'auto' }}
      onScroll={handleScroll}
    >
      <Box sx={{ padding: 2 }}>
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {products.length > 0 ? (
          products.map(product => (
            <Grid item key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ marginTop: 2 }}>No products found.</Typography>
        )}
      </Grid>
     {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};
export default ProductListing;
