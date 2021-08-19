import React, { Component } from 'react';
import ItemDetails, { Field } from "../../itemDetails";
import GotService from '../../../services/gotService'


export default class Book extends Component {
    gotService = new GotService();

     
    render() {
        return(
        <ItemDetails
            getData={this.gotService.getBook}
            itemId={this.props.bookId}>
            <Field field= "publisher" label="Publisher"/>
        </ItemDetails>
        )    
    }
}