import { Box, MenuItem, TextField } from '@mui/material'

import React, { useEffect, useRef, useState, useTransition } from 'react'
import BasicMenu from '../Menu'
import { SearchOutlined, SearchResultCard } from './styled';
import { Link } from 'react-router-dom';

const categories = [
    "All Categories",
    "Car",
    "Clothes",
    "Electronics",
]
const dummySearchResult = [
    "macbook",
    "asus"
]



const SearchBox = () => {
    const parentRef = useRef()
    const [_, startTransition] = useTransition()
    const [category, setCategory] = useState("All Categories")
    const [resultList, setResultList] = useState([])
    // const handleCategoryChange = (cat) => () => setCategory(cat)
    const handleSearch = (e) => {
        startTransition(() => {
            const value = e.target?.value
            if (!value) setResultList([])
            else setResultList(dummySearchResult)
        })
    }
    const handleDocumentClick = () => {
        setResultList([])
    }
    useEffect(() => {
        window.addEventListener("click", handleDocumentClick)
        return () => window.removeEventListener("click", null)
    }, [])
    return (
        <Box
            position={"relative"}
            flex={"1 1 0"}
            maxWidth={"670px"}
            mx={"auto"}
            {
            ...{
                ref: parentRef
            }
            }
        >
            <TextField
                fullWidth
                variant='outlined'
                placeholder='Searching for ...'
                onChange={handleSearch}
                InputProps={{
                    sx: {
                        height: 44,
                        paddingRight: 0,
                        borderRadius: 300,
                        color: "grey.700",
                        overflow: "hidden",
                        "&:hover .MuiOutlinedInput-notChedOutline": {
                            borderColor: "primary.main"
                        },
                    },
                    endAdornment: <BasicMenu categories={categories} cat={category} onClick={setCategory} />,
                    startAdornment: <SearchOutlined fontSize='small' />,
                }}
            />
            {
                resultList.length > 0 && (
                    <SearchResultCard elevation={2}>
                        {resultList.map((item) => (
                            <Link to={`/product/search/${item}`} key={item}>
                                <MenuItem

                                    key={item}>{item}</MenuItem>
                            </Link>
                        ))}
                    </SearchResultCard>
                )
            }
        </Box>
    )
}

export default SearchBox