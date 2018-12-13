import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import {Grid,Header,Message, Form, TextArea ,Button,Icon,Label} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  constructor(props) {
    super(props);
  this.state={
    value:"",
    spellings:[],
    newlist:"",
    corrected:[]

  }}
  componentDidMount(){






  }  
  handleChange=(event)=> {
   
    this.setState({value: event.target.value});
  }
  handleCorrect=(event)=>{
    this.setState({value: this.state.newlist});
    
   console.log("correct")
  }
  handleSubmit=(event) =>{
  
    console.log(this.state.value,"valuee")
    event.preventDefault();
    $.ajax({
      type: 'POST',
      headers: {
        'X-CSRFToken': window.CSRF_TOKEN 
    },
      url:'/api/getInput',
      data:{
        data:this.state.value,

      },
      success:(data)=>{
        this.setState({
          spellings:data['spelling'],
          corrected:data['corrected'],
          newlist:data['list']
        })
        console.log(data,"SPELLINGSSS")
    }
      
        
      })
   
      }  
  
  render() {
  
    
    return (
      <div className="App">
        

        <Grid container style={{ padding: '5em 0em' }}>
    <Grid.Row>
      <Grid.Column>
        <Header as='h1' dividing>
          Spell Checker
        </Header>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Message>
          <Header as='h1'>Check for incorrect spellings in here !</Header>
            <Form >
              <TextArea style={{ margin: '2em 0em' }} rows="7" placeholder='Tell us more' type="text" value={this.state.value} onChange={this.handleChange}  />
              
              <Grid.Row>
                <Grid.Column>
                  <Button color='blue'type='submit' basic tabindex='0' onClick={this.handleSubmit} style={{ margin: '1em 1em' }}>Check </Button>
                  <Button color='green'type='submit'   basic tabindex='0' onClick={this.handleCorrect} style={{ margin: '1em 1em' }}>Correct </Button>
       
                </Grid.Column>
              </Grid.Row>
                
              
            </Form>
             
        </Message>
      </Grid.Column>
</Grid.Row>
        
        {/* <form onSubmit={this.handleSubmit}>
            <label>
              Text:
              <textarea type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form> */}
        <span>
        {this.state.spellings.map((x, index) => (
          
        <a>{x}{index === this.state.spellings.length-1 ? <a>.</a>:<a>,</a>}</a>
    ))}</span>
     <span>
        {this.state.corrected.map((x, index) => (
          
        <a>{x}{index === this.state.spellings.length-1 ? <a>.</a>:<a>,</a>}</a>
    ))}</span>
    
    {/* <span>
        {this.state.newlist}
    </span> */}
       </Grid>
                
      </div>
    );
  }
}

export default App;
