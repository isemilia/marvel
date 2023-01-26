import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

// char__item_selected

const CharItem = (props) => {
    const {img, name, charID, onCharSelected, setRef, onFocus, index} = props;
    const imgExists = !img.includes('image_not_available');
    const imgStyle = imgExists ? null : {objectPosition: 'left'};
    return (
        <li 
            ref={el => setRef(el, index)} 
            className="char__item" 
            tabIndex="0" 
            onClick={() => {
                onCharSelected(charID);
                onFocus(index);
            }}
            onKeyDown={() => {
                onCharSelected(charID);
                onFocus(index);
            }}>
            <img src={img} alt={name} style={imgStyle} />
            <div className="char__name">{name}</div>
        </li>
    )
}

const CharGrid = (props) => {
    const {elems} = props;
    return (
        <ul className="char__grid">
            {elems}
        </ul>
    )
}

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    const onCharsLoaded = (chars) => {
        let ended = false;
        let limit = 9;
        if (chars.length < 9) {
            limit = chars.length;
            ended = true;
        }
        const newChars = chars.map(char => ({name: char.name, thumbnail: char.thumbnail, id: char.id}));
        setChars(chars => [...chars, ...newChars]);
        // setLoading(loading => false);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + limit);
        setCharEnded(charEnded => ended);
    }
    const onError = () => {
        // setError(true);
        // setLoading(false);
        setNewItemLoading(false);
    }
    const getChars = (offs, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        let limit;
        if (offset + 9 > 1562) {
            limit = 1562 - offset;
        }
        // setNewItemLoading(true);
        getAllCharacters(offs, limit)
            .then(onCharsLoaded)
            .catch(onError);
    }

    const itemRefs = useRef([]);

    const setRef = (item, i) => {
        itemRefs.current[i] = item;
    }

    const onFocus = (index) => {
        // console.log(this.itemRefs[index], index);
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[index].classList.add('char__item_selected');
    }

    const transformChars = () => {
        return chars.map((char, i) => (
            <CharItem 
                onFocus={onFocus}
                setRef={setRef}
                index={i}
                img={char.thumbnail} 
                name={char.name} 
                charID={char.id}
                key={char.id}
                onCharSelected={props.onCharSelected} />
        ));
    }

    useEffect(() => {
        getChars(offset, true);
    }, [])

    const charElems = transformChars();
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    // const content = !(loading || error) ? <CharGrid elems={charElems}/> : null; 

    const btnStyle = newItemLoading ? {filter: 'grayscale(1)', opacity: '.5', cursor: 'not-allowed'} : null;
    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {<CharGrid elems={charElems}/>}
            <button 
                onClick={() => {getChars(offset, false)}} 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{...btnStyle, display: charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;