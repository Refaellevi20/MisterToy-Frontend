import React from 'react'
import { useEffect, useState } from 'react'
import { Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material'
// import Button from '@mui/material/Button';

export function ToySort({ onSetSortBy }) {

    const [sortDirection, setSortDirection] = useState(1)
    const [sortByToEdit, setSortByToEdit] = useState({ field: 'name', dir: sortDirection })
    const [inStockClass, setInStockClass] = useState('btn-in-stock')

    useEffect(() => {
        onSetSortBy(sortByToEdit)
    }, [sortByToEdit])

    function onSortBy(field) {
        const dir = sortByToEdit.field === field && sortByToEdit.dir === 1 ? -1 : 1
        setSortByToEdit({ field, dir })
        if (field === 'inStock') {
            setInStockClass(prevClass => prevClass === 'btn-in-stock' ? 'btn-outofstock' : 'btn-in-stock')
        }
    }

    function handleSortChange(event) {
        onSortBy(event.target.value)
    }

    function toggleSortDirection() {
        setSortDirection(prevDirection => prevDirection * -1);
        setSortByToEdit(prevSort => ({ ...prevSort, dir: prevSort.dir * -1 }));
    }


    return (
        <section className="sort-container">
        <h2>Sort</h2>
        <FormControl variant="outlined" className="sort-select">
            <InputLabel id="sort-select-label">Sort by</InputLabel>
            <Select
                labelId="sort-select-label"
                id="sort-select"
                value={sortByToEdit.field}
                onChange={handleSortChange}
                label="Sort by"
            >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="createdAt">Created</MenuItem>
                <MenuItem value="inStock">In Stock</MenuItem>
            </Select>
        </FormControl>
        <Button
            onClick={toggleSortDirection}
            variant="outlined"
            color="inherit"
            style={{ marginLeft: '10px' }}
        >
            Sort Direction ({sortByToEdit.dir === 1 ? 'Asc' : 'Desc'})
        </Button>
    </section>
    )
}