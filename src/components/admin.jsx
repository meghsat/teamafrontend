import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";


export default class Admin extends React.Component{
    state = {
            policyname: '',
      cost:0,
      startdate:'',
      duration:0,
      grouptype:'',
      groupid:0,
      policyid:0,
      benefits1:'',
      benefits2:'',
      benefits3:'',
      benefits4:'',
      policyname2: '',
cost2:0,
startdate2:'',
duration2:0,
grouptype2:'',
      products: []
        }
        componentDidMount() {
            axios.get('https://localhost:5001/policy')
              .then(res => {
                const products = res.data;
                this.setState({ products });
              })
          }
          componentDidUpdate(){
        
            axios.get('https://localhost:5001/policy')
        
              .then(res => {
        
                  console.log(res)
        
                const products = res.data;
        
                this.setState({ products });
        
            })
        
        }
        handleChange = event => {
            this.setState({[event.target.name]: event.target.value})
        }      
        handleSubmit = event =>{
            event.preventDefault();
            const p = {
                policyname: this.state.policyname,
               
                cost: Number(this.state.cost),
                startdate: this.state.startdate,
                duration: Number(this.state.duration),
                groupid:Number(this.state.groupid),
            }
            console.log(p);

            const vv={
                benefits1:this.state.benefits1,
                benefits2:this.state.benefits2,
                benefits3:this.state.benefits3,
                benefits4:this.state.benefits4,

            }
            axios.post('https://localhost:5001/policy', p)
            .then(res=>{
                var i=1;
                while(i<5)
                {
                   var benefitss="benefits"+i.toString();
                   
                    const benl={benefit:benefitss,
                    policyname:this.state.policyname}
                    console.log(benl);
                axios.post('https://localhost:5001/benefitslist', benl)
                .then(res=>{
                   
                })
                i=i+1;
            }
            })
      }  
      handleDelete=(id)=>{
        console.log(id);
       axios.delete('https://localhost:5001/policy/'+id).then(res=>{alert("hi")})
      }  
    //   handleFilter=event=>{
    //     this.setState({[event.target.name]: event.target.value})
    //     console.log(this.state.policyid);
    //     axios.get('https://localhost:5001/policy/'+Number(this.state.policyid))
    //     .then(res => {
    //       console.log(res.data);
    //     })
    //   }
      handleEdit=(id,pn,c,sd,d,gt)=>{
      
        console.log(pn+c+sd+d+gt);
        //console.log(this.state.policyname2+"-"+this.state.cost2+"-"+this.state.startdate2+"-");
        var policyname='';
        var cost=0;
        var startdate='';
        var duration=0;
        var grouptype='';
        var policyid3;
        var groupid=0;
        if(this.state.policyname2!='')
        {
          policyname=this.state.policyname2
        }
        else{
          policyname=pn
        }
        if(this.state.cost2!='')
        {
          cost=Number(this.state.cost2)
        }
        else{
          cost=Number(c)
        }
        if(this.state.startdate2!='')
        {
          //console.log("juju");
          startdate=this.state.startdate2
        }
        else{
          startdate=sd
        }
        if(this.state.duration2!='')
        {
          duration=Number(this.state.duration2)
        }
        else{
          duration=Number(d)
        }
        if(this.state.grouptype2!='')
        {
            if(this.state.grouptype2=='Individual')
            {
                groupid=1;
            }
           else if(this.state.grouptype2=='Family')
            {
                groupid=2;
            }
            else
            {
                groupid=3;
            }
        }
        else{
            if(gt=='Individual')
            {
                groupid=1;
            }
           else if(gt=='Family')
            {
                groupid=2;
            }
            else
            {
                groupid=3;
            }
        }
        const data = {
          "policyid":Number(id),
          "policyname":policyname,
          "cost":Number(cost),
          "startdate":startdate,
          "duration":Number(duration),
          "groupid":Number(groupid),
      }
      console.log(data)
       // console.log('https://localhost:5001/policy/'+Number(id));
      axios.put('https://localhost:5001/policy/'+id,data).then(res=>{console.log(data);})
      }
    render(){
        return(
            <body>
            <div id="admin-page">
                <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
                    <div className='container'>
                        <div className='navbar-header'>
                            <button
                                type='button'
                                className='navbar-toggle collapsed'
                                data-toggle='collapse'
                                data-target='#bs-example-navbar-collapse-1'
                            >
                                {' '}
                                <span className='sr-only'>Toggle navigation</span>{' '}
                                <span className='icon-bar'></span>{' '}
                                <span className='icon-bar'></span>{' '}
                                <span className='icon-bar'></span>{' '}
                            </button>
                            <a className='navbar-brand page-scroll' href='#page-top'>
                                Welcome Admin
                            </a>{' '}
                        </div>

                        <div
                        className='collapse navbar-collapse'
                        id='bs-example-navbar-collapse-1'
                        >
                            <ul className='navbar-right'>
                                <li>
                                    <Link to="/" className='btn btn-custom btn-lg'>Logout</Link>{' '}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="create-policy">
                    <button className="btn btn-info" data-toggle="modal" data-target="#addPolicyForm">Add New policy</button>
                </div><br/>

                <div class="modal fade" id="addPolicyForm">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Add a Policy</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div class="form-group col-md-3">
                                        <label className="form-label">Policy Name</label>
                                        <input type="text" name="policyname" class="form-control"  value={this.state.policyname} onChange={this.handleChange}/>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label className="form-label">Cost</label>
                                        <input type="number" name="cost" class="form-control"  value={this.state.cost} onChange={this.handleChange}/>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label className="form-label">Start Date</label>
                                        <input type="date" name="startdate" class="form-control" value={this.state.startdate} onChange={this.handleChange} />
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label className="form-label">Duration</label>
                                        <input type="number" name="duration" class="form-control" value={this.state.duration} onChange={this.handleChange} />
                                    </div><br/>
                                    <div class="form-group col-md-4">
                                        <label className="form-label">Group</label><br/>
                                        <select value={this.state.groupid} onChange={this.handleChange} class="form-select" name="groupid">                                            
                                            <option selected>Select</option>
                                            <option value="1">Individual</option>
                                            <option value="2">Family</option>
                                            <option value="3">Group</option>                                            
                                        </select>
                                    </div><br/>
                                    <div class="form-group col-md-12 benefits">
                                        <label className="form-label">Benefits</label><br/><br/>
                                        <div className="col-md-6">
                                            <input type="text" name="benefits1" placeholder="Benefit 1" class="form-control" value={this.state.benefits1} onChange={this.handleChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" name="benefits2" placeholder="Benefit 2" class="form-control" value={this.state.benefits2} onChange={this.handleChange}/>
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" name="benefits3" placeholder="Benefit 3" class="form-control" value={this.state.benefits3} onChange={this.handleChange}/>
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" name="benefits4" placeholder="Benefit 4" class="form-control" value={this.state.benefits4} onChange={this.handleChange}/>
                                        </div>
                                    </div><br/>
                                    <div class="modal-footer">
                            <input type="submit" value="Submit" className="btn btn-primary" onSubmit={this.handleSubmit}/>                        
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>                                
                            </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
                
                {/* <div className="d-flex">
                <div class=" col-md-3">
                <label className="form-label">Search By Policy Id</label>

<input type="number" placeholder="Search By Policy Id" name="policyid" class="form-control"   onChange={this.handleChange}/>
<input type="submit" value="Submit" className="btn btn-primary" onSubmit={this.handleFilterpolicy}/>                        
</div>
<div class=" col-md-3">
<label className="form-label">Search By Group Id</label>

<input type="number" placeholder="Search By Group Id"  name="groupid" class="form-control"   onChange={this.handleChange}/>
<input type="submit" value="Submit" className="btn btn-primary" onSubmit={this.handleFiltergroup}/>                        

</div>
</div> */}
                    <div className="policies-table">
<h1>Policies</h1><br></br>
                <table class="table table-striped">
           
           <thead>
           <tr>
           <th >Policy Id</th>
           <th >Policy Name</th>
           <th>Cost</th>
           <th>Start Date</th>
           <th>Duration</th>
           <th>Group Type</th>
           <th>Edit/Update</th>
            <th>Delete</th>
         </tr>
         </thead>
       {this.state.products.map(product => (
       <tbody>
         <tr>
         <td>{product.policyId}</td>
           <td>{product.policyName}</td>
           <td>{product.cost}</td>
           <td>{product.startDate}</td>
           <td>{product.duration}</td>
           <td>{product.groupType}</td>

           <td><button type="button" class="btn btn-link"  data-toggle="modal" data-target="#collapseeditrow" >Update</button></td>
          <td><button type="button" class="btn btn-danger" onClick={()=>{this.handleDelete(product.policyId)}}>Delete</button></td>
           </tr>
           <div class="modal fade" id="collapseeditrow">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Edit a Policy</h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div class="form-group col-md-3">
                                        <label className="form-label">Policy Name</label>
                                        <input type="text" name="policyname2" class="form-control"  defaultValue={product.policyName} onChange={this.handleChange}/>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label className="form-label">Cost</label>
                                        <input type="number" name="cost2" class="form-control"  defaultValue={product.cost} onChange={this.handleChange}/>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label className="form-label">Start Date</label>
                                        <input type="date" name="startdate2" class="form-control" defaultValue={product.startDate} onChange={this.handleChange} />
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label className="form-label">Duration</label>
                                        <input type="number" name="duration2" class="form-control" defaultValue={product.duration} onChange={this.handleChange} />
                                    </div><br/>
                                    <div class="form-group col-md-4">
                                        <label className="form-label">Group</label><br/>
                                        <select defaultValue={product.groupType} onChange={this.handleChange} class="form-select" name="grouptype2">                                            
                                            <option selected>{product.groupType}</option>
                                            <option value="1">Individual</option>
                                            <option value="2">Family</option>
                                            <option value="3">Group</option>                                            
                                        </select>
                                    </div><br/>
                              <br/>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-link" onClick={()=>this.handleEdit(product.policyId,product.policyName,product.cost,product.startDate,product.duration,product.groupType)}>Update</button>
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>                                
                            </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>
             
    
         
         </tbody>
       ))}
       </table>
       </div>
                </div><br/>
         </body>   
        );
    }
}