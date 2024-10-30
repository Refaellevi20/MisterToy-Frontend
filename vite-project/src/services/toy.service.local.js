import { utilService } from './util.service.js'
// import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'


const TOY_KEY = 'toyDB'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']
    _createToys()

export const toyService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyToy,
    getDefaultSort,
    getFilterFromSearchParams,
    getSortFromSearchParams
}



function query(filterBy = {}, sortBy) {
    return storageService.query(TOY_KEY)
        .then(toys => {
            toys = _filter(toys, filterBy)
            toys = _sort(toys, sortBy)
            return toys
        })
}


function get(toyId) {
    return storageService.get(TOY_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(TOY_KEY, toy)
    } else {
        return storageService.post(TOY_KEY, toy)
    }
}

function getEmptyToy(name = '', price = '') {
    return { name, price }
}

function getDefaultFilter() {
    return { name: '', price: '' }
}

function getDefaultSort() {
    return { field: 'name', dir: 1 }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        if (field === 'pageIdx') {
            filterBy[field] = parseInt(searchParams.get(field))
            if (isNaN(filterBy[field])) filterBy[field] = undefined
        } else {
            filterBy[field] = searchParams.get(field) || ''
        }
    }
    return filterBy
}


function getSortFromSearchParams(searchParams) {
    const defaultSort = getDefaultSort()
    const sortBy = {}
    for (const field in defaultSort) {
        sortBy[field] = searchParams.get(field) || ''
    }
    return sortBy
}

function _filter(toys, filterBy) {
    if (filterBy.name) {
        const regExp = new RegExp(filterBy.name, 'i')
        toys = toys.filter(toy => regExp.test(toy.name))
    }
    if (filterBy.price) {
        toys = toys.filter(toy => toy.price >= filterBy.price)
    }
    return toys
}

function _sort(toys, sortBy) {
    if (sortBy.field === 'name') {
        toys = toys.toSorted((c1, c2) => c1.name.localeCompare(c2.name) * sortBy.dir)
    } else if (sortBy.field === 'price') {
        toys = toys.toSorted((c1, c2) => (c2.price - c1.price) * sortBy.dir)
    }else if (sortBy.field === 'created') {
        toys = toys.toSorted((c1, c2) => (c2.createdAt - c1.createdAt) * sortBy.dir)
    }else if (sortBy.field === 'inStock') {
        toys = toys.toSorted((c1, c2) => (c2.inStock - c1.inStock) * sortBy.dir)
    }
    return toys
}

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        toys.push(_createToy('Bear'))
        toys.push(_createToy('Set'))
        toys.push(_createToy('Toy'))
        toys.push(_createToy('Yo-Yo'))
        toys.push(_createToy('Kite'))
        toys.push(_createToy('Doll'))
        toys.push(_createToy('Play'))
        toys.push(_createToy('Action'))
        utilService.saveToStorage(TOY_KEY, toys)
    }
    // console.log(JSON.stringify(toys))
   

}

function _createToy(name = '', price = `${utilService.getRandomIntInclusive(20, 250)}`) {
    return {
        _id: utilService.makeId(),
        name,
        price,
        inStock: Math.random() < 0.8,
        labels: _getRandomLabels(3),
        createdAt: Date.now() - utilService.getRandomIntInclusive(0, 10000000),
       
    }
}

function _getRandomLabels(count) {
    const shuffled = labels.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
}