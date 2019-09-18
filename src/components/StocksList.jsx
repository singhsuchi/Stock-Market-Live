import React from 'react'
import StockInfo from './StockInfo.jsx'
const StocksList = (props) => {
  return (
    <div className=' column is-one-third' id='stocks_list'>
      <div className='card-header'>
        <div className='card-header-title'>
          
          <button className='button is-round is-small' onClick={props.resetData}>Reset</button>
         
        </div>
      </div>
      <div className='card-content'>
        <table className='table is-bordered is-striped is-hover'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(props.stocks).map((stock_name, index) =>
              {
                let current_stock = props.stocks[stock_name];
                return (
                  <StockInfo
                    key={index} stock_name={stock_name}
                    stock_data={current_stock}
                    select={props.select}
                  />
                )
              }
            )}
            { props.loaded() ? null : <tr><td colSpan='4'>No data found!</td></tr> }
          </tbody>
        </table>
       </div>
    </div>
  );
}

export default StocksList;
