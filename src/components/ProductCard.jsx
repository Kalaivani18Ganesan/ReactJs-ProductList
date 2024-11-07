import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ width: 300, margin: 2, height:'325px', border:'1px solid #cdb8b8'}}>
      <CardMedia
        component="img"
        height="200"
        style={
            {
                borderBottom:'1px solid #cdb8b8'
            }
        }
        image={product.images}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
