


class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public';
    _apiKey = 'apikey=15814f840a76e9464de8f674c390fe6d';
    _baseOffset = 210;
    _limit = 9;


    getResource = async (url) => {
        const res = await fetch(url);
    
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status} ${res.statusText}`)
        }
    
        return await res.json();
    }
    getAllCharacters = async (offset = this._baseOffset, limit = this._limit) => {
        const res = await this.getResource(`${this._apiBase}/characters?limit=${limit}&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(char => (this._transformCharacter(char)));
    }
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }
    _transformCharacter = (char) => {
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
    reduceText = (text) => {
        return text.length > 210 ? text.substring(0, 211).trim() + '...' : text;
    }
    generateID() {
        return Math.random().toString(16).slice(2);
    }
} 

export default MarvelService;