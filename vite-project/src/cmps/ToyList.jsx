import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from 'react-router-dom'

export function ToyList({ toys, onRemoveToy, onEditToy}) {
    // console.log('toys:', toys)

    function getRandomColor (){
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    if (!toys || toys.length === 0) return <div>No toys available.</div>
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}style={{ 
                    backgroundColor: getRandomColor(),  
                    border: `8px solid ${getRandomColor()}`, 
                    opacity: 0.9 
                }}>
                    <ToyPreview toy={toy} />

                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        {/* <button onClick={() => onEditToy(toy)}>Edit</button> */}
                        <button className='btn-details'><Link to={`/toy/${toy._id}`}>Details</Link>
                        </button>
                        <button onClick={() => onEditToy(toy)}>Edit</button>
                    </div>
                </li>)}
        </ul>
    )
}


