
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'

// _createToys()

const BASE_URL = 'toy/'
const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
]

// todo.color = getRandomColor()

export const toyService = {
    query,
    save,
    remove,
    getById,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getFilterFromSearchParams,
    getSortFromSearchParams,
    getToyLabels,
    getImportanceStats,
    toggleMenu
}


function query(filterBy = {}, sortBy = {}) {
    const filterAndSort = { ...filterBy, sortBy: sortBy.field, sortDir: sortBy.dir === 1 ? 'asc' : 'desc' }
    return httpService.get(BASE_URL, filterAndSort)
}

// function query(filterBy = {}) {
//     return httpService.get(BASE_URL, filterBy)
//   }
  
function getRandomColor (){
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}
  
function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

// function save(toy) {
//     if (toy._id) {
//         return httpService.put(BASE_URL, toy)
//     } else {
//         return httpService.post(BASE_URL, toy)
//     }
// }

function getEmptyToy() {
    return {
        name: '',
        price: '',
        inStock: true,
        labels: _getRandomLabels(),
        createdAt: Date.now() - utilService.getRandomIntInclusive(0, 10000000),
    }
}

function save(toy) {
    const method = toy._id ? 'put' : 'post';
    const endpoint = toy._id ? `toy/${toy._id}` : 'toy'
    return httpService[method](endpoint, toy)
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
        if (searchParams.get(field) !== null) {
            sortBy[field] = searchParams.get(field)
        } else {
            sortBy[field] = defaultSort[field]
        }
    }
    return sortBy
}


function getToyLabels() {
    return [...labels]
}

function _getRandomLabels() {
    const labelsCopy = [...labels]
    const randomLabels = []
    for (let i = 0; i < 2; i++) {
        const randomIdx = Math.floor(Math.random() * labelsCopy.length)
        randomLabels.push(labelsCopy.splice(randomIdx, 1)[0])
    }
    return randomLabels
}

async function getImportanceStats() {
    try {
        const toys = await httpService.get(BASE_URL)
        const toyStatsByLabel = _getToyStatsByLabel(toys)
        const data = labels.map(label => ({
            label,
            toyAmount: toyStatsByLabel[label]?.toyAmount || 0,
            avgPrice: toyStatsByLabel[label]?.avgPrice || 0
        }))
        return data
    } catch (err) {
        console.error('Cannot get importance stats:', err)
        throw err
    }
}


function _getToyStatsByLabel(toys) {
    const toyStatsByLabel = {}

    labels.forEach(label => {
        toyStatsByLabel[label] = { toyAmount: 0, totalPrice: 0, avgPrice: 0 }
    })

    toys.forEach(toy => {
        toy.labels.forEach(label => {
            toyStatsByLabel[label].toyAmount++
            toyStatsByLabel[label].totalPrice += parseFloat(toy.price)
        })
    })

    Object.keys(toyStatsByLabel).forEach(label => {
        if (toyStatsByLabel[label].toyAmount > 0) {
            toyStatsByLabel[label].avgPrice = (toyStatsByLabel[label].totalPrice / toyStatsByLabel[label].toyAmount).toFixed(2)
            // Convert back to number
            toyStatsByLabel[label].avgPrice = parseFloat(toyStatsByLabel[label].avgPrice)
        } else {
            toyStatsByLabel[label].avgPrice = 0
        }
    })

    return toyStatsByLabel
}

function toggleMenu() {
    document.body.classList.toggle("menu-open")

}


// import { utilService } from './util.service.js'
// // import { httpService } from './http.service.js'
// import { storageService } from './async-storage.service.js'


// const TOY_KEY = 'toyDB'
// const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
//     'Outdoor', 'Battery Powered']
//     _createToys()

// export const toyService = {
//     query,
//     get,
//     remove,
//     save,
//     getDefaultFilter,
//     getEmptyToy,
//     getDefaultSort,
//     getFilterFromSearchParams,
//     getSortFromSearchParams,
// }


// function query(filterBy = {}, sortBy) {
//     return storageService.query(TOY_KEY)
//         .then(toys => {
//             toys = _filter(toys, filterBy)
//             toys = _sort(toys, sortBy)
//             return toys
//         })
// }


// function get(toyId) {
//     return storageService.get(TOY_KEY, toyId)
// }

// function remove(toyId) {
//     return storageService.remove(TOY_KEY, toyId)
// }

// function save(toy) {
//     if (toy._id) {
//         return storageService.put(TOY_KEY, toy)
//     } else {
//         return storageService.post(TOY_KEY, toy)
//     }
// }

// function getEmptyToy(name = '', price = '') {
//     return { name, price }
// }

// function getDefaultFilter() {
//     return { name: '', price: '' }
// }

// function getDefaultSort() {
//     return { field: 'name', dir: 1 }
// }

// function getFilterFromSearchParams(searchParams) {
//     const defaultFilter = getDefaultFilter()
//     const filterBy = {}
//     for (const field in defaultFilter) {
//         if (field === 'pageIdx') {
//             filterBy[field] = parseInt(searchParams.get(field))
//             if (isNaN(filterBy[field])) filterBy[field] = undefined
//         } else {
//             filterBy[field] = searchParams.get(field) || ''
//         }
//     }
//     return filterBy
// }


// function getSortFromSearchParams(searchParams) {
//     const defaultSort = getDefaultSort()
//     const sortBy = {}
//     for (const field in defaultSort) {
//         sortBy[field] = searchParams.get(field) || ''
//     }
//     return sortBy
// }

// function _filter(toys, filterBy) {
//     if (filterBy.name) {
//         const regExp = new RegExp(filterBy.name, 'i')
//         toys = toys.filter(toy => regExp.test(toy.name))
//     }
//     if (filterBy.price) {
//         toys = toys.filter(toy => toy.price >= filterBy.price)
//     }
//     return toys
// }

// function _sort(toys, sortBy) {
//     if (sortBy.field === 'name') {
//         toys = toys.toSorted((c1, c2) => c1.name.localeCompare(c2.name) * sortBy.dir)
//     } else if (sortBy.field === 'price') {
//         toys = toys.toSorted((c1, c2) => (c2.price - c1.price) * sortBy.dir)
//     }else if (sortBy.field === 'created') {
//         toys = toys.toSorted((c1, c2) => (c2.createdAt - c1.createdAt) * sortBy.dir)
//     }else if (sortBy.field === 'inStock') {
//         toys = toys.toSorted((c1, c2) => (c2.inStock - c1.inStock) * sortBy.dir)
//     }
//     return toys
// }

// function _createToys() {
//     let toys = utilService.loadFromStorage(storageService)
//     if (!toys || !toys.length) {
//         toys = []
//         toys.push(_createToy('Bear'))
//         toys.push(_createToy('Set'))
//         toys.push(_createToy('Toy'))
//         toys.push(_createToy('Yo-Yo'))
//         toys.push(_createToy('Kite'))
//         toys.push(_createToy('Doll'))
//         toys.push(_createToy('Play'))
//         toys.push(_createToy('Action'))
//         utilService.saveToStorage(storageService, toys)
//         getRandomColor()
//     }
//     // console.log(JSON.stringify(toys))
   

// }

// function _createToy(name = '', price = `${utilService.getRandomIntInclusive(20, 250)}`) {
//     return {
//         _id: utilService.makeId(),
//         name,
//         price,
//         inStock: Math.random() < 0.8,
//         labels: _getRandomLabels(3),
//         createdAt: Date.now() - utilService.getRandomIntInclusive(0, 10000000),
       
//     }
// }

// function _getRandomLabels(count) {
//     const shuffled = labels.sort(() => 0.5 - Math.random())
//     return shuffled.slice(0, count)
// }