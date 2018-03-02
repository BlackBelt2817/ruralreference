import React, { Component } from 'react';
import axios from 'axios';
import { Router, Route } from 'react-router-dom';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import '../src/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      defs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

handleChange(e) {
  this.setState({ word: e.target.value });
}

handleSubmit(e) {
  e.preventDefault();
  if (!this.state.word) {
    return alert('You must enter a search term!');
  }
  if (this.state.word) {
    axios.get(`http://api.urbandictionary.com/v0/define?term=${this.state.word}`, { crossdomain: true })
    .then(res => {
      let holder = [];
      for (let i = 0; i < 10; i++) {
        holder.push(<div>{res.data.list[i.toString()].definition}</div>);
      }
      this.setState({ defs: holder });
      console.log(`You searched for "${this.state.word}."`);
    });	
  }
}

  render() {    
    return (
      <div className="App">
        <div style={{borderBottomStyle: 'solid'}}><h1>Rural Reference</h1></div>
          <div>
            <FormGroup style={{marginTop: 25}}>
              <FormControl
                placeholder='Search'
                type='text'
                onChange={ this.handleChange }
                style={{width: '75%', marginLeft: '12.5%', textAlign: 'center'}}
                onKeyPress={(e) => {
                  if (e.charCode === 13) {
                    e.preventDefault();
                    if (!this.state.word) {
                      return alert('You must enter a search term!');
                    }
                    if (this.state.word) {
                      axios.get(`http://api.urbandictionary.com/v0/define?term=${this.state.word}`)
                      .then(res => {
                        let holder = [];
                        for (let i = 0; i < 10; i++) {
                          holder.push(<div>{res.data.list[i.toString()].definition}</div>);
                        }
                        this.setState({ defs: holder });
                        console.log(`You searched for "${this.state.word}."`);
                      });	
                    }
                  }
                }}
              />
            </FormGroup>
            <Button style={{width: 250, borderRadius: 100, color: 'white', background: 'black'}} onClick={ this.handleSubmit }>Submit</Button>
          </div>
          
          <h3>{this.state.word ? `"${this.state.word}"` : null}</h3>
          <ol>
            {this.state.defs.map((each, i) => {
              return (
                <li style={{borderRadius: 10, marginBottom: 50, paddingLeft: 75,  paddingRight: 75, borderBottomStyle: 'solid'}} className='definitionsitems' key={i}>
                  {this.state.defs[i]}
                </li>
              );
            })}
          </ol>
      </div>
    );
  }
}

export default App;
