import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import './ListContact.css';

export default class ListContact extends Component {

  constructor(props) {
      super(props);
      this.state = { 
        contact: [],
        showMessage: true};
    
    }
    componentDidMount(){
      axios.get('http://localhost:4000/contact')
        .then(response => {
          console.log(response.data.result)
          this.setState({ contact: response.data.result });
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    message = () => {
      return (
      
      <div className="user_status">
      <h5>User "John Doe" deleted</h5>
      <button> DISMISS </button>
      </div>)
    }

    render() {
      const tabRow = this.state.contact.map(object => 
        <TableRow obj={object} key={object._id} />)

      return (
        <div className="container">
        <nav> 
            <h1> User List </h1>
        </nav>
        
       { tabRow }
              
        <a href="/addNewUser" className="user_list_add">
        <div className="add_plus">+</div>
       </a>
       {this.state.showMessage && this.message()}
        </div>
      );
    }
  }