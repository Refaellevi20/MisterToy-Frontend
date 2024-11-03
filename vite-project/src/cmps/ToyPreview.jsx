import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

export function ToyPreview({ toy }) {
    const { t } = useTranslation()
    return (
        <article>
            <p>{t('welcome')}</p>
            <img src={`https://robohash.org/${toy._id}`} alt={toy.name} />
            <p>{t('price')}: <span>${toy.price}</span></p>
            {toy.discount > 0 && (
                <div>
                    <p>{t('discountedPrice')}: ${((1 - toy.discount) * toy.price).toFixed(2)}</p>
                    <p>{t('discount')}: {toy.discount * 100}%</p>
                </div>
            )}
            <p>{t('name')}: <span>{toy.name}</span></p>
            {/* <p>Name: <span>{toy.name}</span></p> */}
            <hr />
            <FaUser />
            <Link to={`/toy/edit/${toy._id}`}>{t('edit')}</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>{t('details')}</Link>
        </article>
    )
}


//! api
//! if i am on the right way so far
//! user or with out?