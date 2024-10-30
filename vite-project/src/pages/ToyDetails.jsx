

import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { utilService } from '../services/util.service.js'
import { toyService } from '../services/toy.service.local.js' 

export function ToyDetails() {
    const { toyId } = useParams()
    const [toy, setToy] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const debouncedFetchToy = useRef(utilService.debounce((id) => {
        toyService.get(id)
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

    if (isLoading) return <div className="loader-container"><span className="loader"></span></div>
    return (
        <section className='details-container' style={{ backgroundColor: toy.bgColor }}>
            <img src={generateRobohashUrl(toy._id)} alt={toy.name} style={{ width: '100px', height: '100px' }} />
            <h1>Toy Details</h1>
            <p>Name: {toy.name}</p>
            <p>Price: ${toy.price}</p>
            <p className='text-center'>Labels </p>
            {toy.labels && toy.labels.map((label, index) => (
                <h5 key={index} className="label text-center">{label}</h5>
            ))}
            <h3 className={`stock-status ${toy.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {toy.inStock ? 'In Stock' : 'Out of Stock'}
            </h3>

            <Link to="/toy">Back to Toys</Link>
        </section>
    )
}