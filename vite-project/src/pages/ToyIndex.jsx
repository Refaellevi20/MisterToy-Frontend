import { useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// import { ToyFilter } from '../cmps/ToyFilter.jsx'

import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToyOptimistic,saveToy, setFilterBy, setSortBy } from '../store/actions/toy.actions.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToySort } from '../cmps/SortBy.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
// import { ToyEdit } from './ToyEdit.jsx'
// import { storageService } from '../services/async-storage.service.js'

export function ToyIndex() {
    // const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)

    const [searchParams, setSearchParams] = useSearchParams()

    const defaultFilter = toyService.getFilterFromSearchParams(searchParams)
    const defaultSort = toyService.getSortFromSearchParams(searchParams)

    useEffect(() => {
        loadToys(filterBy, sortBy)
            .then(() => {
                setSearchParams(filterBy)
            })
            .catch(() => {
                console.log('Could not load toys')
            })
    }, [filterBy, sortBy])

    useEffect(() => {
        setFilterBy(defaultFilter)
        setSortBy(defaultSort)
    }, [])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSortBy(sortBy) {
        setSortBy(sortBy)
    }

    function onRemoveToy(toyId) {
        console.log('hihihihi');
        
        removeToyOptimistic(toyId)
            .then(() => {
                loadToys()
                console.log('hahahahhahahah')
                showSuccessMsg('toy removed')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove toy'+toyId)
            })
        
    }

    // function onAddToy() {
    //     const toyToSave = toyService.getRandomToy()
    //     saveToy(toyToSave)
    //         .then((savedToy) => {
    //             showSuccessMsg(`toy added (id: ${savedToy._id})`)
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot add toy')
    //         })
    // }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }

    if (!toys) return <div>loading...</div>
console.log(toys.length);

    return (
        <div>
            <h3>toys App</h3>
            <main>
                <Link to="/toy/edit">Add toy</Link>
                {/* <button className='add-btn' onClick={onAddToy}>Add Random toy ⛐</button> */}
                {/* <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} /> */}

                {/* <toyFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
                <ToySort onSetSortBy={onSetSortBy} />
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {/* <section className='add-container text-center'>
                    <button className='btn add-btn'><Link to='/toy/edit'>Add New Toy</Link></button>
                </section> */}
                {!isLoading
                    ? <ToyList
                        // txt='abababa'
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                        // onAddToy={onAddToy}
                    />
                    : <div>Loading...</div>
                }
                <hr />
                {/* <ToyEdit /> */}
            </main>
        </div>
    )
}


















