import React, { Component } from 'react';
import './UploadPage.css';
import PageHeader from '../../PageHeader/PageHeader';

/*
This is a page for engineering team to upload quotaion form
*/

const date = new Date()
const upload_date = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

class UploadPage extends Component {
    constructor(props){
        super(props);
        this.state={
            pageName: 'Upload Quotation',
            OrderNum: "",
            BSN: "",
            ItemID: "",
            Description: "",
            Unit:"",
            UnitRate:"0",
            Qty: "",
            Remarks: "",
            date: upload_date
        }
    }

    orderNumOnChange = e => {
        this.setState({
            OrderNum: e.target.value
        },
            ()=>{
                fetch(`http://localhost:8080/orders/findThe?field=order_number&keyword=${this.state.OrderNum}`)
                .then((res)=>res.json())
                .then((res)=>{
                    console.log(res.data[0]);
                    this.setState({
                        BSN:res.data[0].BSN
                    }) // end of setState()
                }) // end of then block
                .catch(err=>{
                    this.setState({
                        BSN:""
                    })
                }) // end of catch block
                console.log(this.state)
            } // end of callback()
        ) // end of setState()
    } // end of orderNumOnchange()

    itemOnchange = e => {
        this.setState({
            ItemID: e.target.value
        }, 
            ()=>{
                fetch(`http://localhost:8080/workitems/find?field=work_item_id&keyword=${this.state.ItemID}`)
                .then((res)=>res.json())
                .then((res)=>{
                    console.log(res.data[0]);
                    this.setState({
                        Description: res.data[0].description,
                        Unit: res.data[0].unit,
                        UnitRate: res.data[0].unit_rate
                    }) // end of setState()
                }) // end of then block
                .catch(err=>{
                    this.setState({
                        Description: "",
                        Unit: "",
                        UnitRate: "0"
                    })
                }) // end of catch block
                console.log(this.state)
            } // end of callback()
        ) // end of setState()
    }

    onChange = e => {
        this.setState({
            [e.target.id]:e.target.value
        },()=>console.log(this.state))
    }

    onSubmit = e => {
        e.preventDefault();
        fetch(`http://localhost:8080/quotations/insert?order_number=${this.state.OrderNum}&remarks=${this.state.Remarks}`)
        .then((res)=>res.json())
        .catch(err=>console.log(err))
    }

    render() { 
        return ( 
            <div className="UploadPage MainWrapper">
                <PageHeader pageName={this.state.pageName}/>
                <form className="quotation_form" onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <div className="col-xs-2">
                            <label htmlFor="OrderNum">Order Number: </label>
                            <input type="text" className="form-control" id="OrderNum" value={this.state.OrderNum} onChange={this.orderNumOnChange}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-sx-2">
                            <label htmlFor="BSN">BSN: </label>
                            <input type="text" className="form-control" id="BSN" value={this.state.BSN} onChange={this.onChange} readOnly/>

                            <select id="BSN" class="form-control">
                                <option selected>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                    </div>
                    <hr/>
                    <div className="form-row">
                        <div className="col-sx-2">
                            <div >Work Items: </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="itemID">Item ID: </label>
                            <input type="text" className="form-control" id="ItemID" value={this.state.ItemID} onChange={this.itemOnchange}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="description">Description: </label>
                            <input type="text" className="form-control" id="Description" value={this.state.Description} readOnly/>
                        </div>
                        <div className="col">
                            <label htmlFor="unit">Unit: </label>
                            <input type="text" className="form-control" id="Unit" value={this.state.Unit} readOnly/>
                        </div>
                        <div className="col">
                            <label htmlFor="unitRate">Unit Rate: </label>
                            <input type="text" className="form-control" id="UnitRate" value={`$${this.state.UnitRate}`} readOnly/>
                        </div>
                        <div className="col">
                            <label htmlFor="qty">Qty: </label>
                            <input type="text" className="form-control" id="Qty" value={this.state.Qty} onChange={this.onChange}/>
                        </div>
                        <div className="col">
                            <label htmlFor="amount">Amount: </label>
                            <input type="text" className="form-control" id="Amount" value={`$${this.state.UnitRate*this.state.Qty}`} readOnly/>
                        </div>
                    </div>
                    <i className="fas fa-plus addColBtn"></i>
                    <hr/>
                    <div class="form-group">
                        <label htmlFor="remarks">Remarks:</label>
                        <textarea class="form-control" id="Remarks" rows="3" onChange={this.onChange}></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary">Upload</button>
                </form>
            </div> 
        );
    }
}
 
export default UploadPage;