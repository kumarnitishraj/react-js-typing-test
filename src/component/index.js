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
            start:false,
            text:'',
            value: '',
            counter:0,
            messageShow:false,
            match: false
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
                // timmer:this.convertToSec(data.time),
                text: this.trimString(data.text_out),
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

    compareText = (inputValue) => {

        const { data, text, value, counter} = this.state;
        let stringLength = inputValue.length-1;
        let sliceText = text.slice(0,stringLength)
        let restText = text.slice(stringLength+1,text.length)
        
        if(sliceText.includes(value)){

            this.setState({
                value: '',
                text: restText,
                counter:counter+1,
                messageShow:true,
                match:true
            })
        }else{
            this.setState({
                value:inputValue,
                messageShow:true,
                match:false
            })
        }
    }

    handleChange = (e) => {
        
        if(e.target.value.indexOf(' ') > 0 && this.state.text.charAt(e.target.value.length-1)==' '){
            this.compareText(e.target.value)
        }else{
            this.setState({ value: e.target.value, messageShow:false });
        }
        
    }

    render() {

        const { data, start, timmer, value, text, match, messageShow, counter } = this.state;
        if(!data){
            return <h3>Loading ...</h3>
        }

        return (
            <div className="App">
                <Grid>
                    <div className="card">
                        <Row className="row">
                            <Col xm = {12} md = {12} >
                                <small >Matched Conter : {counter}</small>
                                <small className="timmer">{timmer}</small>
                            </Col>
                        {messageShow?
                            <Col>
                            {match?
                                <div className="alert alert-success">
                                    <strong>Success Matched!</strong>
                                </div>
                            :
                                <div className="alert alert-danger">
                                    <strong>Failed Match!</strong>
                                </div>
                            }
                            </Col>
                        :null}
                            
                        </Row>

                    {timmer>0?
                        <div>
                            <Row className="row">
                                <Col xm = {12} md = {12} >
                                    <UiText text = {text}/>
                                </Col>
                            </Row>
                        { start?
                            <Row className="row" >
                                <Col xm = {12} md = {12} >
                                    <UiInput 
                                        value={value}
                                        placeholder="Enter text"
                                        onChange={this.handleChange}
                                    />  
                                </Col>
                            </Row>
                        :
                            <Row>
                                <Col>
                                    <Button 
                                        bsStyle="success"
                                        onClick={()=> this.timeCouner()}
                                    >Start</Button>
                                </Col>
                            </Row>
                        }
                        </div>
                    : null}
                    
                    </div>
                </Grid>
            </div>
        );
    }
}

export default App;
