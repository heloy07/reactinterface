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
      formDisplay: false,
      orderBy: 'petName',
      orderDir: 'asc',
      lastIndex: 0
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toogleForm = this.toogleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
  }
  deleteAppointment(apt) {
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);
    this.setState({
      myAppointments: tempApts
    });

  }
  changeOrder(order,dir){
    this.setState({
      orderBy:order,
      orderDir: dir
    });
  }
  addAppointment(apt) {
    let tempApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex + 1
    });

  }
  toogleForm() {
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
          this.setState({ lastIndex: this.state.lastIndex + 1 })
          return item;
        })
        this.setState({
          myAppointments: apts
        });
      });

  }
  render() {
    let order;
    let filterApts = this.state.myAppointments;
    if (this.state.orderDir === 'asc') {
      order = 1;
    } else {
      order = -1;
    }
    filterApts.sort((a, b) => {
      if (a[this.state.orderBy].toLowerCase() <
        b[this.state.orderBy].toLowerCase()) {
        return -1 * order;
      }else{
        return 1*order;
      }

    })
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">

                <AddAppointments
                  formDisplay={this.state.formDisplay}
                  toogleForm={this.toogleForm}
                  addAppointment={this.addAppointment}
                />
                <SearchAppointments
                  orderBy = {this.state.orderBy}
                  orderDir = {this.state.orderDir}
                  changeOrder = { this.changeOrder}
                 />
                <ListAppointments 
                appointments={filterApts}
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