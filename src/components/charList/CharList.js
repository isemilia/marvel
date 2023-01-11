import { Component } from 'react';

import MarvelService from '../../services/MarvelService';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

// char__item_selected

const CharItem = (props) => {
    const {img, name} = props;
    return (
        <li className="char__item">
            <img src={img} alt={name} />
            <div className="char__name">{name}</div>
        </li>
    )
}

const marvelService = new MarvelService();

class CharList extends Component {
    state = {
        chars: []
    }
    onCharsLoaded = (chars) => {
        const newChars = chars.map(char => ({name: char.name, thumbnail: char.thumbnail, id: char.id}));
        this.setState({chars: newChars});
    }
    getChars = () => {
        marvelService
            .getAllCharacters()
            .then(this.onCharsLoaded);
    }
    renderChars = () => {
        const {chars} = this.state;
        return chars.map(char => (<CharItem img={char.thumbnail} name={char.name} key={char.id} />));
    }
    componentDidMount = () => {
        this.getChars();
    }
    render() {
        const charElems = this.renderChars();
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {charElems}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;