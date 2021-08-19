import React, {Component} from 'react';

import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';

import GotService from '../../../services/gotService'
import ErrorMessage from '../../errorMessage';
import ColumnRow from '../../ColumnRow';



export default class CharacterPage extends Component {

    gotService = new GotService();

    state = {
        selectedChar: null,
        error: false,
    }
    
    onItemSelected = (id) => {
        this.setState({
            selectedChar: id,
        })
    }
    
    componentDidCatch() {
        console.log("error")
        this.setState({
            error: true
        })
    }
    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList =  (<ItemList
            renderItem={({ name, gender }) => `${name} (${gender})`}
            getData={this.gotService.getAllCharacters}
            onItemSelected={this.onItemSelected} />)

        const charDetails = (<ItemDetails
                                getData={this.gotService.getCharacter}
                                itemId={this.state.selectedChar}>
                                <Field field="gender" label="Gender" />
                                <Field field="born" label= "Born"/>
                            </ItemDetails>)

        return (
            <ColumnRow left={itemList} right={ charDetails}/>
        )
    }
}
