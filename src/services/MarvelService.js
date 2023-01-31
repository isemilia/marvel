import { useHttp } from "../hooks/http.hook";


const useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public';
    const _apiKey = 'apikey=15814f840a76e9464de8f674c390fe6d';
    const _charBaseOffset = 210;
    const _charLimit = 9;
    const _comicsLimit = 8;
    const _comicsOffset = 0;

    const {loading, request, error, clearError} = useHttp();

    const getAllCharacters = async (offset = _charBaseOffset, limit = _charLimit) => {
        const res = await request(`${_apiBase}/characters?limit=${limit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(char => (_transformCharacter(char)));
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }
    const _transformCharacter = (char) => {
        return {
            name: char.name,
            descr: char.description ? char.description : 'There is no description for this character.',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }

    const getAllComics = async (offset = _comicsOffset, limit = _comicsLimit) => {
        const res = await request(`${_apiBase}/comics?format=comic&noVariants=true&limit=${limit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(comic => (_transformComic(comic)));
    }
    const _transformComic = (comic) => {
        console.log(comic);
        return {
            id: comic.id,
            title: comic.title,
            thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            descr: comic.description ? comic.description : 'There is no description for this comic.',
            price: comic.prices[0].price > 0 ? `${comic.prices[0].price}$` : 'Not available',
            pageCount: comic.pageCount
        }
    }
    const getComic = async (comicID) => {
        const res = await request(`${_apiBase}/comics/${comicID}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
    }

    const reduceText = (text) => {
        return text.length > 210 ? text.substring(0, 211).trim() + '...' : text;
    }
    const generateID = () => {
        return Math.random().toString(16).slice(2);
    }

    return {loading, error, getAllCharacters, getCharacter, reduceText, generateID, clearError, getAllComics, getComic};
} 

export default useMarvelService;