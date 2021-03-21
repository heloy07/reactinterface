import { without } from 'lodash';
import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';

class App extends Component {
  constructor() {
    super();
    this.state = {
      myAppointments: [],
      formDisplay:false,
      lastIndex: 0
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toogleForm = this.toogleForm.bind(this);
  }
  deleteAppointment(apt){
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts,apt);
    this.setState({
      myAppointments:tempApts
    });
    
  }
  toogleForm(){
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }
  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = this.state.lastIndex;
          this.setState({lastIndex:this.state.lastIndex +1})
          return item;
        })
        this.setState({
          myAppointments: apts
        });
      });

  }
  render() {
    
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                
                <AddAppointments 
                formDisplay={this.state.formDisplay}
                toogleForm={this.toogleForm}
                />
                <SearchAppointments />
                <ListAppointments appointments={this.state.myAppointments}
                  deleteAppointment={this.deleteAppointment} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;