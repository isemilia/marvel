import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

// char__item_selected

const CharItem = (props) => {
    const {img, name} = props;
    const imgExists = !img.includes('image_not_available');
    const imgStyle = imgExists ? null : {objectPosition: 'left'};
    return (
        <li className="char__item">
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

const marvelService = new MarvelService();

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false
    }
    onCharsLoaded = (chars) => {
        const newChars = chars.map(char => ({name: char.name, thumbnail: char.thumbnail, id: char.id}));
        this.setState({
            chars: newChars,
            loading: false
        });
    }
    onError = () => {
        this.setState({error: true, loading: false})
    }
    getChars = () => {
        marvelService
            .getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }
    transformChars = () => {
        const {chars} = this.state;
        return chars.map(char => (<CharItem img={char.thumbnail} name={char.name} key={char.id} />));
    }
    componentDidMount = () => {
        this.getChars();
    }
    render() {
        const charElems = this.transformChars();
        const {loading, error} = this.state;
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error) ? <CharGrid elems={charElems}/> : null; 
        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;