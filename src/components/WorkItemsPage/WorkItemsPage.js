import React, { Component } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import './WorkItemsPage.css';

let workitem_type;

class WorkItemsPage extends Component {
    constructor(props){
        super(props);
        this.state={
            pageName: 'Work Items',
            ATGitems:{},
            IBIitems:{},
            totalItems:0
        }
    }

    componentWillMount(){
        this.getitems('ATG');
    }

    getitems = type => {
        workitem_type = type;
        console.log(type);
        fetch(`http://localhost:8080/workitems/find?field=type&keyword=${type}`)
          .then(response => response.json())
          .then(response => {
            if(type==='ATG'){
                this.setState({
                    totalOrders: response.data.length,
                    ATGitems: response.data
                })
            }else{
                this.setState({
                    totalOrders: response.data.length,
                    IBIitems: response.data
                })
            }
          })
          .catch(err => console.log(err))
          console.log(workitem_type); 
    } // get orders from db

    appendItems = t => {
        console.log(workitem_type);
        let items;
        if(workitem_type==='ATG'){
            items = this.state.ATGitems;
        }else{
            items = this.state.IBIitems;
        }
        let tr = [];
        let td = [];
        let j = this.state.totalOrders;
        for(let i = 0; i < j; i++){
            td.push(<td key={i+1*j}>{items[i].work_item_id}</td>)
            td.push(<td key={i+2*j}>{items[i].description}</td>)
            td.push(<td key={i+3*j}>{items[i].unit}</td>)
            td.push(<td key={i+4*j}>{items[i].unit_rate===0?'-':'$'+items[i].unit_rate}</td>)
            tr.push(<tr key={i+5*j}>{td}</tr>);    
            td = [];
        }
        return tr;
    } // end of method appendOrders

    render() { 
        return ( 
            <div className="WrokItemsPage MainWrapper">
                <PageHeader pageName={this.state.pageName + " (" + workitem_type + ")"} />

                <div className="editBtnWrapper">
                    <i className="fas fa-edit editIcon"></i>
                    <div className="editTag">Edit</div>
                </div>

                <button type="button" class="btn btn-secondary atgBtn" onClick={()=>this.getitems('ATG')}>ATG</button>
                <button type="button" class="btn btn-secondary ibiBtn" onClick={()=>this.getitems('IBI')}>IBI</button>
                <div className="btnUnderline"></div>

                <table border="1px" className="table table-hover table-striped table-bordered workItemTable">
                    <thead className="thead-dark">
                        <tr>
                            <th width="10%">
                                Work_item_ID
                            </th>
                            <th width="60%">
                                Description
                            </th>
                            <th width="15%">
                                unit
                            </th>
                            <th width="15%">
                                unit_rate
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ATGitems[0]!==undefined||this.state.IBIitems[0]!==undefined?this.appendItems():<></>}
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default WorkItemsPage;