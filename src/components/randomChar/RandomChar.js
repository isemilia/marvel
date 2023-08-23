import React, { useEffect, useState } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading': 
            return <Spinner/>;
        case 'confirmed':
            return <Component data={data} />;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}


const RandomChar = () => {
    const [char, setChar] = useState({});

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        setProcess('loading')
        updateChar();
    }, []);

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    return (
        <div className="randomchar">
        {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({data}) => {
    const {name, descr, thumbnail, homepage, wiki} = data;
    const imgExists = thumbnail != 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    const imgStyle = imgExists ? null : {objectPosition: 'left'};

    const {reduceText} = useMarvelService();
    return (
        <div className="randomchar__block">
            <img 
                src={thumbnail} 
                alt="Random character" 
                className="randomchar__img"
                style={imgStyle} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{descr ? reduceText(descr) : ''}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;