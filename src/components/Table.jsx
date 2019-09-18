import React from 'react'
import * as bulma from "reactbulma";
import StocksList from "./StocksList.jsx";
import StocksGraph from "./StocksGraph.jsx";
import Status from "./Status.jsx";
import SearchBox from "./SearchBox.jsx";
const stocksUrl = 'ws://stocks.mnet.website/';

class Table extends React.Component {
  constructor (){
  super()
  this.state = {
   stocks: [],
   connectionError: false,
   searchField: ''
  }
  }
  

  componentDidMount = () => {
    this.connection = new WebSocket(stocksUrl);
    this.connection.onmessage = this.saveNewStockValues;
    this.connection.onclose = () => { this.setState({connectionError: true}) }
  }


  onSearchChange = (event) => { 
    
    this.setState({searchField: event.target.value})
    const {stocks, connectionError, searchField}=this.state;
    console.log(this.state.stocks);     
    const filtered = stocks.filter(stock=>{  
      if(searchField.length===0)
        return this.props.stocks
      else
        return stock.stock_name.toLowerCase().includes(searchField.toLowerCase())     
    }) 
    console.log(filtered);
    this.setState({ stocks: filtered });   
  }

  select = (stock_name) => {
    let newStocks = this.state.stocks;
    newStocks[stock_name].is_selected = !newStocks[stock_name].is_selected
    this.setState({ stocks: newStocks })
  }
  saveNewStockValues = (event) => {
  console.log(event.data[0][0])
    this.props.hideSpinner();
    let result = JSON.parse(event.data);
    let current_time = Date.now();
    let newStocks = this.state.stocks
    result.map((stock) =>
    {
      console.log(stock[0] );
      if(this.state.searchField.length===0){
        if(this.state.stocks[stock[0]] )
        {
        

        newStocks[stock[0]].current_value = Number(stock[1])
        newStocks[stock[0]].history.push({time: current_time, value: Number(stock[1])})
        }
        else
        {
        newStocks[stock[0]] = { current_value: stock[1], history: [{time: Date.now(), value: Number(stock[1])}] }
        }
      }else if(stock[0].toLowerCase().includes(this.state.searchField.toLowerCase())){
        if(this.state.stocks[stock[0]])
        {
        

        newStocks[stock[0]].current_value = Number(stock[1])
        newStocks[stock[0]].history.push({time: current_time, value: Number(stock[1])})
        }
        else
        {
        newStocks[stock[0]] = { current_value: stock[1], history: [{time: Date.now(), value: Number(stock[1])}] }
        }
      }
      
    });
    this.setState({stocks: newStocks})
  }

  resetData = () => {
    let newStocks = this.state.stocks;
    Object.keys(this.state.stocks).map((stock_name, index) =>
    {
      newStocks[stock_name].history = [newStocks[stock_name].history.pop()];
    });
    this.setState({ stocks: newStocks });
  }

  loaded = () => {
    return Object.keys(this.state.stocks).length > 0;
  }

  render() {
     
    
    return (

      <div className='pd3 mg3 tc'>
        

        <SearchBox searchChange={this.onSearchChange}/>
        
        <div className='columns'>
        
        <StocksList
            stocks={this.state.stocks}
            resetData={this.resetData}
            select={this.select}
            loaded={this.loaded}
          />
        </div>
        <div className='columns'>
         <StocksGraph stocks={this.state.stocks} />
       </div>
        <div className={ this.props.showSpinner ? 'modal is-active' : 'modal' }>
          <div className="modal-background"></div>
          <div className="modal-content">
            <Status connectionError={this.state.connectionError} />
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
