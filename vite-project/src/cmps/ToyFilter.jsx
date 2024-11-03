import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { toyService } from "../services/toy.service.js"
// import { Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next'
const toyLabels = toyService.getToyLabels()

export function ToyFilter({ filterBy, onSetFilter }) {
    const { t } = useTranslation()
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
    const { labels } = filterByToEdit

    return (
        <section className="toy-filter">
            <h2>{t('filter')}</h2> 
            <form>
                <label htmlFor="name">{t('filterByName')}</label> 
                <input
                    value={filterByToEdit.name}
                    onChange={handleChange}
                    type="search"
                    placeholder={t('filterByName')}
                    name="name"
                    id="name"
                />

                <label htmlFor="price">{t('filterByPrice')}</label> 
                <input
                    id="price"
                    type="number"
                    name="price"
                    value={filterByToEdit.price}
                    onChange={handleChange}
                    placeholder={t('filterByPrice')}
                />
                <select
                    multiple
                    name="labels"
                    id="labels"
                    value={filterByToEdit.labels || []}
                    onChange={handleChange}
                >
                    <option value="">{t('filterLabels')}</option>
                    {toyLabels.map(label => (
                        <option key={label} value={label}>
                            {label}
                        </option>
                    ))}
                </select>
            </form>
        </section>
    )
}
