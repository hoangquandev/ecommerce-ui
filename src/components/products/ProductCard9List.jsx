import { Pagination } from "@mui/material";
import ProductCard9 from "../product-cards/ProductCard9";
import { Span } from "../Typography";
import { FlexBetween } from "../flex-box";

// ==========================================================
const ProductCard9List = ({ products, totalProducts, totalPages }) => {
    return (
        <div>
            {products.map((item) => (
                <ProductCard9
                    id={item._id}
                    key={item._id}
                    slug={item.slug}
                    title={item.name}
                    price={item.price}
                    off={4}
                    rating={4}
                    imgUrl={item.thumbnail}
                />
            ))}

            <FlexBetween flexWrap="wrap" mt={4}>
                <Span color="grey.600">{totalProducts} Products</Span>
                <Pagination count={totalPages} variant="outlined" color="primary" />
            </FlexBetween>
        </div>
    );
};

export default ProductCard9List;
