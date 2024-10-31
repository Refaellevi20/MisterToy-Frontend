import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export function ToyPreview({ toy }) {
    return (
        <article>
            <img src={`https://robohash.org/${toy._id}`} />

            {/* <img src="" alt="" />            <h1>⛐</h1> */}
            <p>Price: <span>${toy.price}</span></p>
            <p>Name: <span>{toy.name}</span></p>
            {toy.inStock ? (
                <img className="stock-img" src="src/assets/img/1.png" alt="In Stock" />
            ) : (
                <img className="stock-img" src="src/assets/img/2.png" alt="Out of Stock" />
            )}

            <hr />
            <FaUser />
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>Details</Link>

        </article>
    )
}

//! api
//! if i am on the right way so far
//! user or with out?