import React, { Component } from 'react';
import ItemList from "../../itemList";
import GotService from "../../../services/gotService"
import ErrorMessage from '../../errorMessage';
import { withRouter } from 'react-router-dom';





class BookPage extends Component {
    gotService = new GotService();

    state = {
        error: false,
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
      

        return (
            <ItemList
                renderItem={({ name }) => name}
                // getData={this.gotService.getAllBooks}
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                    console.log(this.props.history)
                }} />
        )
        
    }
    
}


export default withRouter(BookPage)