import React, { Component } from 'react';
import './App.css';
import Table from './components/Table.jsx'

class App extends Component {

  state = {
    hasError: false,
    showSpinner: true
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  hideSpinner = () => {
    this.setState({showSpinner: false});
  }

  render() {
    
    return (
      <div className="tc mg4">
        <Table hideSpinner={this.hideSpinner} showSpinner={this.state.showSpinner} />
      </div>
    );
  }
}

export default App;
