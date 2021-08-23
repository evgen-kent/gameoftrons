
import React, { Component } from 'react';
import Spinner from '../spinner/spinner';
import gotService from '../../services/gotService' 
import './itemList.css';
class ItemList extends Component {



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
        const { itemList } = this.props;

        const items = this.renderItems(itemList);
        return (
            <ul className="item-list list-group">
             {items}
            </ul>
        );
    }
}

const withItemList= (View, getData) => {
    return class extends Component {

        state = {
            itemList: null,
        }
        
        componentDidMount() {
            getData()
                .then((itemList) => {
                    this.setState({
                        itemList: itemList,
                    })
                })
        }
          
        render() {
            const { itemList } = this.state;
        
            if (!itemList) {
                return <Spinner/>
            }

            

            return <View {...this.props} itemList={itemList }/>
        }
    }
    
}
const {getAllCharacters} = new gotService();

export default withItemList(ItemList, getAllCharacters);
