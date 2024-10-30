import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from 'react-router-dom'

export function ToyList({ toys, onRemoveToy, onEditToy}) {
    // console.log('toys:', toys)
    if (!toys) return <div>Loading</div>
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id} style={{ backgroundColor: toy.bgColor }}>
                    <ToyPreview toy={toy} />

                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        <button className='btn-details'><Link to={`/toy/${toy._id}`}>Details</Link>
                        </button>
                        <button onClick={() => onEditToy(toy)}>Edit</button>
                    </div>
                </li>)}
        </ul>
    )
}


