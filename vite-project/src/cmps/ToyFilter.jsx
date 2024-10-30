import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"


export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }


    return (
        <section className="toy-filter">
            <h2>Filter Toys</h2>
            <form>
                <label htmlFor="name">By Name:</label>
                <input
                    value={filterByToEdit.name}
                    onChange={handleChange}
                    type="search"
                    placeholder="Enter name"
                    name="name"
                    id="name"
                />
                <label htmlFor="price">By Price:</label>
                <input
                    id="price"
                    label="By price"
                    variant="outlined"
                    name="price"
                    size='small'
                    value={filterByToEdit.price}
                    onChange={handleChange}
                />
            </form>
        </section>
    )
}
