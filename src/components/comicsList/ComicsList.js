import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsItem = (props) => {
    const {thumbnail, title, price, comicID, index} = props;
    return (
        <motion.li 
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: {delay: (index%8) * 0.25}}}
            className="comics__item">
            <Link to={`${comicID}`}>
                <img src={thumbnail} alt={title + ' thumbnail'} className="comics__item-img"/>
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{price}</div>
            </Link>
        </motion.li>
    )
}

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setNewItemLoading] = useState(true);

    const {getAllComics, loading, error} = useMarvelService();

    useEffect(() => {
        getAllComics()
            .then(() => updateComics(offset, true))
    }, []);

    // console.log('after', comics);

    const renderComics = () => {
        return comics.map((item, i) => {
            return (
                <ComicsItem
                    key={i}
                    comicID={item.id}
                    thumbnail={item.thumbnail}
                    title={item.title}
                    price={item.price}
                    index={i} />
            );
        });
    }

    const updateComics = (offset, initial) => {
        setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded)
            .catch(onError)
    }

    const onError = () => {
        setNewItemLoading(false);
    }

    const onComicsLoaded = (data) => {
        let ended = false;
        if (data.length < 8) {
            ended = true;
        }
        const newComics = data.map(item => ({id: item.id, title: item.title, thumbnail: item.thumbnail, price: item.price}))
        setComics(comics => [...comics, ...newComics]);
        setOffset(offset => offset + 8)
        setComicsEnded(ended);
        setNewItemLoading(false)
    }

    const comicsElems = renderComics();
    const spinner = loading ? <Spinner/> : null; 
    const errorMsg = error ? <ErrorMessage/> : null;

    const btnStyle = newItemLoading ? {filter: 'grayscale(1)', opacity: '.5', cursor: 'not-allowed', pointerEvents: 'none'} : null;
    return (
        <div className="comics__list">
            {spinner}
            {errorMsg}
            <AnimatePresence>
                <ul className="comics__grid">
                    {comicsElems}
                </ul>
            </AnimatePresence>
            <button 
                onClick={() => updateComics(offset)} 
                className="button button__main button__long"
                style={btnStyle}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;