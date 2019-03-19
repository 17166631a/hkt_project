import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import OrderList from '../OrderList/OrderList';
import ImportPage from './ImportPage/ImportPage';
import QuotationPage from '../QuotationPage/QuotationPage';
import UserProfilePage from '../UserProfilePage/UserProfilePage';
import {Redirect} from 'react-router-dom';
import { username } from '../LoginPage/LoginPage';
import WorkItemsPage from '../WorkItemsPage/WorkItemsPage';
import OrderDetails from '../OrderList/OrderDetails/OrderDetails';

class ControlStaffView extends Component {
    constructor(props){
      super(props);
      this.state = {
        items:["Orders", "Import", "Quotations", "Work Items"], // nav items
        orders:[],
        type: '',
        username: username,
        //username: this.props.location.state.username, // pass username to navbar
        totalOrders: 0
      }
    }

    componentDidMount(){
      this.setState({
        type: this.state.items[0], // initialize to show order list first
      });
      console.log(this.state.username);
      this.getOrders();
    } 

    navOnClick = t =>{
      this.setState({
        type:t
      })
    } // change the existing type of the page

    getOrders = _ => {
      fetch('http://localhost:8080/orders')
        .then(response => response.json())
        .then(response => {
          console.log(response.data[0].order_number)
          this.setState({
            totalOrders: response.data.length,
            orders: response.data
          })
        })
        .catch(err => console.log(err))
    } // get orders from db
    
    logout = _ => {
      this.setState({
        logout:true
      })
    }

    render() { 
        return (
          <div>
            {this.state.username===''?<Redirect to={{pathname: `/`}}/>:
              <>
              <NavBar onClick={this.navOnClick} username={this.state.username} logout={this.logout} items={this.state.items}/>
              <SearchBar pageType={this.state.type}/>
              {this.state.type === this.state.items[0]? <OrderList onClick={this.navOnClick} pageName={this.state.items[0]} totalOrders={this.state.totalOrders} orders={this.state.orders}/>:
              this.state.type === this.state.items[1]? <ImportPage pageName={this.state.items[1]}/>:
              this.state.type === this.state.items[2]? <QuotationPage pageName={this.state.items[2]}/>:
              this.state.type === this.state.items[3]? <WorkItemsPage pageName={this.state.items[3]}/>:
              this.state.type === 'details'? <OrderDetails pageName='Order Details' />:<UserProfilePage pageName='User Profile'/>}
              </>
            }
            {
                this.state.logout===true?<Redirect to={{pathname: `/`}}/>:<></>
              }
          </div>
        );
    }
}
export default ControlStaffView;