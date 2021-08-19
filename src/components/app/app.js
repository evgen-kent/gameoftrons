import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../pages/characterPage'
import './style.css';
import ErrorMessage from '../errorMessage';
import GotServices from '../../services/gotService';
import BookPage from '../pages/bookPage';
import HousePage from '../pages/housePage';
import Book from '../pages/book'
import {BrowserRouter as Router, Route} from 'react-router-dom';



export default class App extends Component {
    gotService = new GotServices();

    state = {
        hide: false,
        error: false,
    }

    toggleRandomChar() {
        this.setState((state) => {
            return ({
                hide: !state.hide
            })
        }) 
    }
    
   componentDidCatch() {
        console.log("error")
        this.setState({
            error: true
        })
    }

    render() {
        const { hide } = this.state;
        const rChar = hide ? <RandomChar /> : null
        if (this.state.error) {
            return <ErrorMessage/>
        }
        return (
            <Router>
                  <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            {rChar}
                            <button onClick={()=>this.toggleRandomChar()} type="button" className={`btn btn-primary }`}>toggle randomChar</button>
                        </Col>   
                    </Row>
                        
                        <Route path="/characters" component={CharacterPage}/>
                        <Route path="/houses" component={HousePage} />
                        <Route path="/books"  exact component={BookPage} />
                        <Route path="/books/:id" render={(
                            { match }
                        ) => {
                            const { id } = match.params;
                            return (<Book bookId={id}/>)
                        }} />
                        
                </Container>
            </>
          </Router>
        );
    } 
}

