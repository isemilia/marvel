import { useHttp } from "../hooks/http.hook";


const useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public';
    const _apiKey = 'apikey=15814f840a76e9464de8f674c390fe6d';
    const _baseOffset = 210;
    const _limit = 9;

    const {loading, request, error} = useHttp();

    const getAllCharacters = async (offset = _baseOffset, limit = _limit) => {
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
    const reduceText = (text) => {
        return text.length > 210 ? text.substring(0, 211).trim() + '...' : text;
    }
    const generateID = () => {
        return Math.random().toString(16).slice(2);
    }

    return {loading, error, getAllCharacters, getCharacter, reduceText, generateID};
} 

export default useMarvelService;