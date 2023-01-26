import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }
    const updateChar = () => { 
        const {charID} = props;
        if (!charID) {
            return;
        }
        onCharLoading();
        marvelService
            .getCharacter(charID)
            .then(onCharLoaded)
            .catch(onError);
    }
    const onCharLoading = () => {
        setLoading(true);
    }
    const onError = () => {
        setError(true);
        setLoading(false);
    }
    useEffect(() => {
        updateChar();
    }, [props.charID]);

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null; 

    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {errorMessage}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, descr, thumbnail, homepage, wiki, comics} = char;
    const transformComics = () => {
        return comics.map(item => (
            <li className="char__comics-item" key={item.resourceURI}>{item.name}</li>
        ))
    }
    const comicsElems = transformComics().slice(0, 10);

    const imgExists = !thumbnail.includes('image_not_available');
    const imgStyle = imgExists ? null : {objectPosition: 'left'};
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{descr}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">{comicsElems.length !== 0 ? comicsElems : 'There are no comics for this character'}</ul>
        </>
    )
}

CharInfo.propTypes = {
    charID: PropTypes.number
}

export default CharInfo;