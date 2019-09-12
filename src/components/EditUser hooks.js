import React, { Component } from 'react';
import axios from 'axios';

export default class EditUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
      age:''
    }
  }

  componentDidMount() {
      axios.put('http://localhost:4000/contact/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                firstName: response.data.firstName, 
                lastName: response.data.lastName,
                age: response.data.age });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }
  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    })  
  }
  onChangeAge(e) {
    this.setState({
      age: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age
    };
    axios.post('http://localhost:4000/contact/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/listContact');
    window.location.reload();
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
             <nav> 
            <h1> Edit User </h1>
              </nav>
             
                <form>
                    
                        <h2>First name:  </h2>
                        <input type="text" className="form-control" placeholder="i.e John" value={this.state.firstName}
                        onChange={this.onChangeFirstName}/>
                        <h2>Last name: </h2>
                        <input type="text" className="form-control" placeholder="i.e Doe" value={this.state.lastName}
                        onChange={this.onChangeLastName}/>
                        <h2>Age: </h2>
                        <input type="text" className="form-control" placeholder="i.e 21" value={this.state.age}
                        onChange={this.onChangeAge}/>
                        <input type="submit" value="SAVE" className="btn btn-primary" onClick={this.onSubmit}/>
            
                </form>
        </div>
    )
  }
}