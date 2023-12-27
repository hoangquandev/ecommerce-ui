import {
    Box,
    Card,
    Checkbox,
    Divider,
    FormControlLabel,
    Rating,
    TextField,
} from "@mui/material";
import { H5, H6, Paragraph, Span } from "../Typography";
import Accordion from "../accordion/Accordion";
import AccordionHeader from "../accordion/AccordionHeader";
import { FlexBetween, FlexBox } from "../flex-box";
import { useDispatch } from "react-redux";
import { setBrand, setCategory, setMaxPrice, setMinPrice, setPriceRange, setRatingFilter } from "../../redux/slice/filterSlice";
import { useEffect, useState } from "react";
import { getAllBrands, getAllCategories } from "../../apis/product";
import { useSearchParams } from "react-router-dom";

const ProductFilterCard = ({ filter }) => {
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const dispatch = useDispatch()
    const [price, setPrice] = useSearchParams()
    useEffect(() => {
        dispatch(setMinPrice(''))
        dispatch(setMaxPrice(''))
    }, [])
    const handleCategoryChange = (event) => {
        const selectedCategories = event.target.value;

        // Toggle the selected category in the array
        const updatedCategories = filter.category.includes(selectedCategories)
            ? filter.category.filter((category) => category !== selectedCategories)
            : [...filter.category, selectedCategories];

        dispatch(setCategory(updatedCategories));
    };

    const handleBrandChange = (event) => {
        const selectedBrands = event.target.value;

        // Toggle the selected brand in the array
        const updatedBrands = filter.brand.includes(selectedBrands)
            ? filter.brand.filter((brand) => brand !== selectedBrands)
            : [selectedBrands];

        dispatch(setBrand(updatedBrands));
    };
    const handleRatingChange = (event) => {
        const value = event.target.value;
        const updatedFilter = filter.rating.includes(value)
            ? filter.rating.filter((rating) => rating !== value)
            : [value];

        dispatch(setRatingFilter(updatedFilter));
    };


    useEffect(() => {
        const getCategories = async () => {
            const res = await getAllCategories()
            setCategories(res.data.data)
        }
        getCategories()
    }, [])
    useEffect(() => {
        const getBrands = async () => {
            const res = await getAllBrands()
            setBrands(res.data.data)
        }
        getBrands()
    }, [])
    console.log(brands);

    const handleMinPriceChange = (e) => {
        setPrice({ min: e.target.value, max: filter.maxPrice })
    };

    const handleMaxPriceChange = (e) => {
        setPrice({ min: filter.minPrice, max: e.target.value })
    };
    useEffect(() => {
        dispatch(setMinPrice(''))
        dispatch(setMaxPrice(''))
    }, [price])
    useEffect(() => {
        const min = setTimeout(() => {
            dispatch(setMinPrice(price.get('min')))
        }, 300);
        return () => clearTimeout(min);
    }, [price.get('min'), 300])
    useEffect(() => {
        const max = setTimeout(() => {
            dispatch(setMaxPrice(price.get('max')))
        }, 300);
        return () => clearTimeout(max);
    }, [price.get('max'), 300])


    return (
        <Card
            sx={{
                p: "18px 27px",
                overflow: "auto",
            }}
            elevation={1}
        >
            {/* CATEGORY VARIANT FILTER */}
            <H6 mb={1.25}>Categories</H6>
            {
                categories.map((item, index) => {
                    return (
                        <FormControlLabel
                            key={index}
                            sx={{
                                display: "flex",
                            }}
                            // onClick={handleFilterClick('brand', filter.brand ? [...filter.brand, item].join(',') : item)}
                            label={<Span color="inherit">{item.name}</Span>}
                            control={<Checkbox size="small" color="secondary"
                                checked={filter.category.includes(item._id)}
                                onChange={handleCategoryChange}
                                value={item._id} />}
                        />
                    )
                })
            }
            {/* {categroyList.map((item) =>
                item.subCategories ? (
                    <Accordion key={item.title} expanded>
                        <AccordionHeader px={0} py={0.75} color="grey.600">
                            <Span
                                sx={{
                                    cursor: "pointer",
                                    mr: "9px",
                                }}
                            >
                                {item.title}
                            </Span>
                        </AccordionHeader>

                        {item.subCategories.map((name) => (
                            <Paragraph
                                pl="22px"
                                py={0.75}
                                key={name}
                                fontSize="14px"
                                color="grey.600"
                                sx={{
                                    cursor: "pointer",
                                }}
                            >
                                {name}
                            </Paragraph>
                        ))}
                    </Accordion>
                ) : (
                    <Paragraph
                        py={0.75}
                        fontSize="14px"
                        color="grey.600"
                        key={item.title}
                        onClick={() => handleFilterClick('category', item.title)}
                        className="cursor-pointer"
                    >
                        {item.title}
                    </Paragraph>
                )
            )} */}

            <Divider
                sx={{
                    mt: 2,
                    mb: 3,
                }}
            />

            {/* PRICE VARIANT FILTER */}
            <H6 mb={2}>Price Range</H6>
            <FlexBetween>
                <TextField onChange={handleMinPriceChange} value={price.get('min')} placeholder="0" type="number" size="small" fullWidth />
                <H5 color="grey.600" px={1}>
                    -
                </H5>
                <TextField onChange={handleMaxPriceChange} value={price.get('max')} placeholder="250" type="number" size="small" fullWidth />
            </FlexBetween>

            <Divider
                sx={{
                    my: 3,
                }}
            />

            {/* BRAND VARIANT FILTER */}
            <H6 mb={2}>Brands</H6>
            {brands.map((item) => (
                <FormControlLabel
                    key={item}
                    sx={{
                        display: "flex",
                    }}
                    // onClick={handleFilterClick('brand', filter.brand ? [...filter.brand, item].join(',') : item)}
                    label={<Span color="inherit">{item}</Span>}
                    control={<Checkbox size="small" color="secondary"
                        checked={filter.brand.includes(item._id)}
                        onChange={handleBrandChange}
                        value={item._id} />}
                />
            ))}

            <Divider
                sx={{
                    my: 3,
                }}
            />

            {/* {otherOptions.map((item) => (
                <FormControlLabel
                    key={item}
                    sx={{
                        display: "flex",
                    }}
                    label={<Span color="inherit">{item}</Span>}
                    control={<Checkbox size="small" color="secondary" />}
                />
            ))} */}

            <Divider
                sx={{
                    my: 3,
                }}
            />

            {/* RATINGS FILTER */}
            <H6 mb={2}>Ratings</H6>
            {[5, 4, 3, 2, 1].map((item) => (
                <FormControlLabel
                    control={<Checkbox size="small"
                        color="secondary"
                        checked={filter.rating.includes(`${item}`)}
                        onChange={handleRatingChange}
                        value={item}
                    />}
                    label={<Rating size="small" value={item} color="warn" readOnly />}
                    sx={{
                        display: "flex",
                    }}
                    key={item}
                />
            ))}

            <Divider
                sx={{
                    my: 3,
                }}
            />

            {/* COLORS VARIANT FILTER */}
            {/* <H6 mb={2}>Colors</H6>
            <FlexBox mb={2} flexWrap="wrap" gap={1}>
                {colorList.map((item) => (
                    <Box
                        key={item}
                        flexShrink={0}
                        sx={{
                            width: 25,
                            height: 25,
                            bgcolor: item,
                            cursor: "pointer",
                            borderRadius: "50%",
                        }}
                    />
                ))}
            </FlexBox> */}
        </Card>
    );
};

const categroyList = [
    // {
    //     title: "Bath Preparations",
    //     subCategories: ["Bubble Bath", "Bath Capsules", "Others"],
    // },
    {
        name: "Eye Makeup Preparations",
    },
    {
        name: "Fragrance",
    },
    {
        name: "Hair Preparations",
    },
];
const brandList = ["Maccs", "Karts", "Baars", "Bukks", "Luasis"];
// const otherOptions = ["On Sale", "In Stock", "Featured"];
const colorList = [
    "#1C1C1C",
    "#FF7A7A",
    "#FFC672",
    "#84FFB5",
    "#70F6FF",
    "#6B7AFF",
];
export default ProductFilterCard;
