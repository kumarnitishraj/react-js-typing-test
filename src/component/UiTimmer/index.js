import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import '../App.css';
import UiInput from './UiInput';
import UiText from './UiText';

class App extends Component {

    constructor(props){
        super(props)
        this.state = {
            timmer:5,
            start:false
        }
    }

    timeCouner = () => {
        this.setState({start:!this.state.start})
        var timmer = setInterval(()=>{
            this.setState({
                timmer:this.state.timmer-1
            })
            if(this.state.timmer<=0){
                clearInterval(timmer)
            }
        }, 1000)
    }

    componentDidMount(){
        fetch('http://www.randomtext.me/api/')
        .then(response => response.json())
        .then(data => {
            this.setState({ 
                timmer:this.convertToSec(data.time),
                data 
            })
        }); 
    }

    trimString = (text) => {
        let newText = text.replace(/<p>/g, "");
        return newText.replace(/<\/p>/g, "");
    }

    convertToSec = (data) => {
        var array = data.split(':');
        return  Math.floor(array[0]*60+array[1]*1)
    }

    render() {
        const { data, start, timmer } = this.state;
        if(!data){
            return <h3>Loading ...</h3>
        }
        return (
            <div className="App">
                <Grid>
                    <div className="card">
                        <Row className="row">
                            <Col xm = {12} md = {12} className="timmer">
                                <small>{timmer}</small>
                            </Col>
                        </Row>
                        <Row className="row">
                            <Col xm = {12} md = {12} >
                                <UiText text = {this.trimString(data.text_out)}/>
                            </Col>
                        </Row>

                        <Row className="row" >
                            <Col xm = {12} md = {12} >
                                <UiInput />  
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Button 
                                    bsStyle="success"
                                    disabled = {start?true:false}
                                    onClick={()=> this.timeCouner()}
                                >Start</Button>
                            </Col>
                        </Row>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default App;
