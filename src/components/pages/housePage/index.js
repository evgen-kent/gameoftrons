import React, { Component } from 'react';
import ColumnRow from '../../ColumnRow';
import ItemList from "../../itemList";
import ItemDetails, { Field } from "../../itemDetails"
import GotService from "../../../services/gotService"
import ErrorMessage from '../../errorMessage';



export default class HousePage extends Component {
    gotService = new GotService();

    state = {
        selectedHouse: null,
        error: false,
    }
    
    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id,
        })
    }
    
    componentDidCatch() {
        console.log("error")
        this.setState({
            error: true
        })
    }

    render(){
        if (this.state.error) {
            return <ErrorMessage />
        }
        const houseList = <ItemList
                                renderItem={({ name }) => name}
                                getData={this.gotService.getAllHouses}
                                onItemSelected={this.onItemSelected} />
                                
        const houseDetails = <ItemDetails
                            getData={this.gotService.getHouses}
                            itemId={this.state.selectedHouse}>
                            <Field field= "region" label="Region"/>
                            </ItemDetails>

        return (
            <ColumnRow left={houseList} right={houseDetails}/>

        )
        
    }
    
}