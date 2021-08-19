export default class GotServices {
    constructor() {
        
        this._apiBase='https://www.anapioficeandfire.com/api'
    }

    
    getResources = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
        throw new Error (`Could not fetch ${url}, status Err ${res.status} `)
    }
        
        const some =await res.json()
        
        if (Array.isArray(some))
        {
            return some
        } else {
                for (let i in some) {
                if (some[i]==='') {
                    some[i] = 'unknown'
                    console.log(some)
                    }
                    
                }
            return some
        }
        
        
    }

    getAllCharacters = async () => {
        const res = await this.getResources("/characters?page=5&pageSize=10");
        
        return res.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const character = await this.getResources(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllHouses = async () => {
        const res = await this.getResources(`/houses/`);
        return res.map(this._transformHouses)
    }

    getHouses = async (id) => {
        const house = await this.getResources(`/houses/${id}`);
        return this._transformHouses(house)
    }

    getAllBooks = async () => {
        const res = await this.getResources(`/books/`);
        return res.map(this._transformBook)
    }

    getBook = async (id) => {
        const book = await this.getResources(`/books/${id}`);
        return this._transformBook(book)
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter = (char) => {
   
        return {
            id: this._extractId(char),
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture,
        }
    }
    
    _transformHouses = (house) => {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons,
            id: this._extractId(house),
        }
    }

    _transformBook = (book) => {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released,
            id: this._extractId(book),
        }
    }
}
