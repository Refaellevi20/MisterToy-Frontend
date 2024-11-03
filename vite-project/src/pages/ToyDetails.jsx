

import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { utilService } from '../services/util.service.js'
import { toyService } from '../services/toy.service.js'

export function ToyDetails() {
    const { toyId } = useParams()
    const [toy, setToy] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const debouncedFetchToy = useRef(utilService.debounce((id) => {
        toyService.getById(id)
            .then(toyData => {
                setToy(toyData)
                setIsLoading(false)
            })
            .catch(err => {
                console.error('Error fetching toy:', err)
                setIsLoading(false)
            })
    }, 500)).current

    useEffect(() => {
        setIsLoading(true)
        debouncedFetchToy(toyId)
    }, [toyId])


    const generateRobohashUrl = (id) => {
        return `https://robohash.org/${id}?set=set3`
    }

    function getPriceColor(price) {
        if (price < 10) {
            return 'green'
        } else if (price >= 10 && price < 41) {
            return 'yellow'
        } else {
            return 'red'
        }
    }

    if (isLoading) return <div className="loader-container"><span className="loader"></span></div>
    return (
        <section className='details-container'>
            <div className='details-toy'>
                <img
                    src={generateRobohashUrl(toy._id)}
                    alt={toy.name}
                    className='toy-image'
                />
                <div className='toy-info'>
                    <h1 className='toy-title'>Toy Details</h1>
                    <p className='toy-name'>Name: {toy.name}</p>
                    <p className='toy-price' style={{ color: getPriceColor(toy.price) }}>
                        Price: ${toy.price}
                    </p>
                </div>
           
            <p className='labels-title text-center'>Labels</p>
            {toy.labels && toy.labels.map((label, index) => (
                <h5 key={index} className="label text-center">{label}</h5>
            ))}
            <h3 className={`stock-status ${toy.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {toy.inStock ? 'In Stock' : 'Out of Stock'}
            </h3>
            </div>
            <Link to="/toy" className="back-link">Back to Toys</Link>
        </section>
    )
}