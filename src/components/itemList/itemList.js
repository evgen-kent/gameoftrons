import React, { Component } from 'react';
import Spinner from '../spinner/spinner';
import './itemList.css';
export default class ItemList extends Component {


    state = {
        itemList: null,
    }
    componentDidMount() {
        this.props.getData()
            .then((itemList) => {
                this.setState({
                    itemList: itemList,
                })
            })
       
    }
    renderItems(arr) {
        return arr.map((item) => {
            const { id } = item;
            const label  = this.props.renderItem(item)
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={()=>this.props.onItemSelected(id)} //  5 pages
                >
                    {label}
                </li>
            )
        })
    }

    render() {
        const { itemList } = this.state;
        
        if (!itemList) {
            return <Spinner/>
        }
        const items = this.renderItems(itemList);
        
        return (
            <ul className="item-list list-group">
             {items}
            </ul>
        );
    }
}