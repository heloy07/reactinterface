import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';

class App extends Component {
  constructor(){
    super();
    this.state = {
      myName : 'Heloy'
    }
  }
  render() {
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                {this.state.myName}
                <AddAppointments />
                <SearchAppointments />
                <ListAppointments />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;