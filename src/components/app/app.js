import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import style from './style.module.css';


export default class App extends Component {
    state = {
        hide: false,
    }

    hideRandom() {
        this.setState((stat) => {
            return ({
                hide: !stat.hide
            })
        }) 
    }

    render() {
        const { hide } = this.state;
        const visible = hide ? style.hide : '';
        
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            {visible &&
                            <RandomChar/>}
                            <button onClick={()=>this.hideRandom()} type="button" className={`btn btn-primary ${style.btn}`}>toggle randomChar</button>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    } 
}

