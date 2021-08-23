import React, { useState, useEffect } from 'react';
import Spinner from '../spinner/spinner';
import './itemList.css';


function ItemList ({getData, onItemSelected, renderItem}) {

    const [itemList, updateItemlist] = useState([]);


    useEffect(() => {
        getData()
            .then((data) => {
                console.log(data)
               updateItemlist(data)
            })
    }, [])

 console.log(itemList)
    function renderItems(arr) {
        return arr.map((item) => {
            const { id } = item;
            const label  = renderItem(item)
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={()=>onItemSelected(id)} //  5 pages
                >
                    {label}
                </li>
            )
        })
    }


    
    if (!itemList) {
        return <Spinner/>
    }
    const items = renderItems(itemList);
    
    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

export default ItemList;