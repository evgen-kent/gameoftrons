import React, { Component } from 'react';
import gotServices from '../../services/gotService'
import './randomChar.css';
import Spinner from '../spinner/spinner'
import ErrorMessage from '../errorMessage'

export default class RandomChar extends Component {
    gotServices = new gotServices();

    
    static defaultProps = {
        interval: 1000
    }
    state = {
        char: {},
        loading: true,
        error: false,
    }

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, this.props.interval)
    }
    componentWillUnmount() {
        clearInterval(this.timerId);
    }
    onCharLoaded = (char) => {
        this.setState({
            char: char,
            loading: false
        })
    }
    onError = (err) => {
        this.setState({
            error: true,
            loading: false 
        })
    }
    
    updateChar =() =>{
        const id = Math.floor(Math.random() * 140 + 25); // 25-140 
    
        this.gotServices.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
       
    }
    
    render() {
        const { char, loading, error } = this.state;
        
       
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className='random-block rounded'>
                {spinner}
                {content}
                {errorMessage}
            </div>
        );
    }
}


const View = ({char}) => {
    const { name, gender, born, died, culture } = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{ born }</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}    