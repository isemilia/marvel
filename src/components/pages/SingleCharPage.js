import './SingleCharPage.scss';

import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import motionParams from '../../services/motionParams';

const Char = (props) => {

    const {name, descr, thumbnail} = props;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{descr}</p>
            </div>
        </div>
    )
}

const SingleCharPage = () => {
    const {charID} = useParams();

    const {error, loading, getCharacter, clearError} = useMarvelService();

    const [char, setChar] = useState({});

    useEffect(() => {
        updateChar(charID);
    }, [charID])

    const updateChar = (id) => {
        clearError();
        getCharacter(id)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const {thumbnail, name, descr} = char;

    const spinner = loading ? <Spinner/> : null;
    const errorMsg = error ? <ErrorMessage customStyle={{display: 'block'}} /> : null;
    const content = !(loading || error) ? 
        <Char
            thumbnail={thumbnail}
            name={name}
            descr={descr} /> : null;

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${name} description`}
                    />
                <title>{`About ${name}`}</title>
            </Helmet>
            <motion.div {...motionParams}>
                {spinner}
                {errorMsg}
                {content}
            </motion.div>
        </>
    )
}

export default SingleCharPage;