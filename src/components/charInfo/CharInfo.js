import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

const marvelService = new MarvelService();

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }
    onCharLoaded = (char) => {
        this.setState(() => ({
            char: char,
            loading: false
        }));
    }
    updateChar = () => { 
        const {charID} = this.props;
        if (!charID) {
            return;
        }
        this.onCharLoading();
        marvelService
            .getCharacter(charID)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }
    onCharLoading = () => {
        this.setState({
            loading: true
        });
    }
    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    }
    componentDidMount() {
        this.updateChar();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.charID !== prevProps.charID) {
            this.updateChar();
        }
    }
    render() {
        const {char, loading, error} = this.state;

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
}

const View = ({char}) => {
    const {name, descr, thumbnail, homepage, wiki, comics} = char;
    const transformComics = () => {
        return comics.map(item => (
            <li className="char__comics-item" key={item.resourceURI}>{item.name}</li>
        ))
    }
    const comicsElems = transformComics().slice(0, 10);
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss"/>
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

export default CharInfo;