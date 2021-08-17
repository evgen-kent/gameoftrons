export default class GotServices {
    constructor() {
        
        this._apiBase='https://www.anapioficeandfire.com/api'
    }

    
    async getResources (url) {
        const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
        throw new Error (`Could not fetch ${url}, status Err ${res.status} `)
    }
        const some = await res.json();
        for (let i in some) {
            if (some[i] === '') {
                some[i]='unknown'
            }  
        }
        return some
    }

    async getAllCharacters() {
        const res = await this.getResources("/characters?page=5&pageSize=10");
        return res.map(this._transformCharacter)
    }
    async getCharacter(id) {
        const character = await this.getResources(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    getAllHouses() {
        return this.getResources(`/houses/`);
    }
    getHouses(id) {
        return this.getResources(`/houses/${id}`);
    }
    getAllBooks() {
        return this.getResources(`/books/`);
    }
    getBook(id) {
        return this.getResources(`/books/${id}`);
    }
    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture,
        }
        
    }
    _transformHouses(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons,
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }
}
