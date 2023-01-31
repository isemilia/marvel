import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';

const Comic = (props) => {
    const {thumbnail, title, descr, pageCount, price} = props;
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
            <a href="#" className="single-comic__back">Back to all</a>
        </div>
    )
}

const SingleComicPage = () => {
    const {comicID} = useParams();

    const {error, loading, getComic, clearError} = useMarvelService();

    const [comic, setComic] = useState({});

    useEffect(() => {
        const newComic = getComic(comicID)
            .then((data) => {
                setComic(data);
            })
    }, [])

    const {thumbnail, title, descr, pageCount, price} = comic;

    const spinner = loading ? <Spinner/> : null;
    const errorMsg = error ? <ErrorMessage/> : null;
    const content = !(loading || error) ? 
        <Comic
            thumbnail={thumbnail}
            title={title}
            descr={descr}
            pageCount={pageCount}
            price={price} /> : null;

    return (
        <>
            {spinner}
            {errorMsg}
            {content}
        </>
    )
}

export default SingleComicPage;