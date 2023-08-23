import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }
    const updateChar = () => { 
        clearError();
        const {charID} = props;
        if (!charID) {
            return;
        }
        getCharacter(charID)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    useEffect(() => {
        updateChar();
    }, [props.charID]);

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {name, descr, thumbnail, homepage, wiki, comics} = data;
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