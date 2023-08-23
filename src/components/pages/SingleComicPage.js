import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import motionParams from '../../services/motionParams';

import './singleComicPage.scss';

const Comic = ({data}) => {
    const {thumbnail, title, descr, pageCount, price} = data;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{descr}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to={'/comics'} className="single-comic__back">Back to all</Link>
        </div>
    )
}

const SingleComicPage = () => {
    const {comicID} = useParams();

    const {getComic, clearError, process, setProcess} = useMarvelService();

    const [comic, setComic] = useState({});

    useEffect(() => {
        updateComic(comicID);
    }, [comicID])

    const updateComic = (id) => {
        clearError();
        getComic(id)
            .then(onComicLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const {title} = comic;

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${title} description`}
                    />
                <title>{`About ${title}`}</title>
            </Helmet>
            <motion.div {...motionParams}>
                {setContent(process, Comic, comic)}
            </motion.div>
        </>
    )
}

export default SingleComicPage;