import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharItem = (props) => {
    const {img, name, charID, onCharSelected, setRef, onFocus, index} = props;
    const imgExists = !img.includes('image_not_available');
    const imgStyle = imgExists ? null : {objectPosition: 'left'};
    return (
        <motion.li 
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: {delay: (index%9) * 0.25}}}
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
            <motion.img 
                initial={{opacity: 0, filter: 'grayscale(1)'}} 
                animate={{opacity: 1, filter: 'grayscale(0)', transition: {delay: (index%9) * 0.3}}}
                src={img} 
                alt={name} 
                style={imgStyle} />
            <motion.div 
                initial={{opacity: 0}} 
                animate={{opacity: 1, transition: {delay: (index%9) * 0.3}}}
                className="char__name">{name}</motion.div>
        </motion.li>
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
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + limit);
        setCharEnded(charEnded => ended);
    }
    const onError = () => {
        setNewItemLoading(false);
    }
    const getChars = (offs, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        let limit;
        if (offset + 9 > 1562) {
            limit = 1562 - offset;
        }
        getAllCharacters(offs, limit)
            .then(onCharsLoaded)
            .catch(onError);
    }

    const itemRefs = useRef([]);

    const setRef = (item, i) => {
        itemRefs.current[i] = item;
    }

    const onFocus = (index) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[index].classList.add('char__item_selected');
    }

    const renderChars = () => {
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

    const charElems = renderChars();
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    // const content = !(loading || error) ? <CharGrid elems={charElems}/> : null; 

    const btnStyle = newItemLoading ? {filter: 'grayscale(1)', opacity: '.5', cursor: 'not-allowed'} : null;
    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            <AnimatePresence>
                <CharGrid elems={charElems}/>
            </AnimatePresence>
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