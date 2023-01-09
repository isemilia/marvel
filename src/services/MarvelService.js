


class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public';
    _apiKey = 'apikey=15814f840a76e9464de8f674c390fe6d';

    getResource = async (url) => {
        const res = await fetch(url);
    
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status} ${res.statusText}`)
        }
    
        return await res.json();
    }
    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}/characters?limit=9&offset=210&${this._apiKey}`);
    }
    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`);
    }
} 

export default MarvelService;