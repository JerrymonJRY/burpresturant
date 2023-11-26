import React from "react";
import { useState,useEffect } from "react";
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';

import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import PosTable from "./posTable";


const Pos =() =>{

    const customStyle = {
        paddingTop: '84px', // Adjust the value as needed
      };

    const [foodCategory, setFoodcategory] = useState([]);

    useEffect(() => {
     
      axios.get('http://localhost:5000/api/pos/poscategory')
      .then((response) => {
        setFoodcategory(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [values,setValues] = useState({

    customername :'',
    customeremail:'',
    customermobile:'',
    customeraddress:''
   

})
const [errors, setErrors] = useState({});
const navigate = useNavigate();
const handleSubmit =(event) =>{

    event.preventDefault();
    const validationErrors = validateForm(values);
    if (Object.keys(validationErrors).length === 0) {
    axios.post('http://localhost:5000/api/customer/createCustomer',values)
    .then(res =>{

        console.log(res);
        navigate('/viewCustomer');
    })
    .catch(err =>console.log(err));
  }
  else {
    // Set validation errors
    setErrors(validationErrors);
  }

}


const validateForm = (data) => {
  let errors = {};

  if (!data.customername) {
    errors.customername = "Customer Name is required";
  }

  if (!data.customeremail) {
    errors.customeremail = "Vat Percentage is required";
  }else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.customeremail)) {
    errors.customeremail = "Invalid email address";
  }
  if (!data.customermobile) {
    errors.customermobile = "Mobile Number is required";
  } else if (!/^\d+$/.test(data.customermobile)) {
    errors.customermobile = "Enter Number Only";
  }

 
  return errors;
};

const [waiter, setWaiter] = useState([]);
const [waiters,setWaiters] =useState('');

  useEffect(() => {
   
    axios.get('http://localhost:5000/api/pos/posWaiter')
    .then((response) => {
        setWaiter(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);
const handleWaiter = (event) => {

    setWaiters(event.target.value);
  
   }
const [customer, setCustomer] = useState([]);
const [customers, setCustomers] = useState([]);
useEffect(() => {
   
    axios.get('http://localhost:5000/api/pos/posCustomer')
    .then((response) => {
        setCustomer(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);
const handleCustomer=(event)=>
{
    setCustomers(event.target.value);
}

const [table, setTable] = useState([]);
useEffect(() => {
   
    axios.get('http://localhost:5000/api/pos/posTable')
    .then((response) => {
        setTable(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);
const containerStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
  };

    const [showTable, setShowTable] = useState(false);

  const handleOpenTable =() =>{
    setShowTable(true);
  }
  const handleCloseTable =() =>{
    setShowTable(false);
  }



    return (
        <div className="container-scroller">
        <div className="row">
        <div className="col-12 main-content">
          <div className="tbl-h">
          <ul className="nav nav-tabs nav-justified" role="tablist">
          <li className="nav-item">
                
                  <Link to="/dashboard" className="nav-link " data-toggle="tab"   aria-selected="true">Dashboard</Link>
              </li>
              <li className="nav-item">
                  <a className="nav-link active" data-toggle="tab" href="#dinein" role="tab" aria-controls="duck2" aria-selected="true">New Order</a>
              </li>
              <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#delivery" role="tab" aria-controls="chicken2" aria-selected="false">On Going Order</a>
              </li>
              <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#pickup" role="tab" aria-controls="kiwi2" aria-selected="false">Kitchen Status</a>
              </li>
             
           
          </ul>
      </div>
      <div className="row">
        <div className="col-md-12">
        <div className="tab-content mt-3">
              <div className="tab-pane active" id="dinein" role="tabpanel" aria-labelledby="duck-tab">
                  <div className="row">
                      {/* <div className="col-md-2 mb-3"> */}
                          <ul className="nav nav-pills navsz flex-columns shdw-lft" id="myTab" role="tablist">
                              <li className="nav-item">
                                  <a className="nav-link active" id="home-tab" data-toggle="tab" href="#Coffe" role="tab" aria-controls="home" aria-selected="true">All</a>
                              </li>
                              {
                        foodCategory.map((pos) =>(

                           
                                <li className="nav-item">
                                  <a className="nav-link " id="home-tab" data-toggle="tab" href="#Coffe" role="tab" aria-controls="home" aria-selected="true">{pos.foodcategoryname}</a>
                              </li>

                           

                        ))
                    }
                             
                              </ul>
                      {/* </div> */}
                   
                      <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-7">
                        <input type="text" className="form-control" placeholder="Search Here Food" />
                            <div className="tab-content" id="myTabContent">
                              <div className="tab-pane fade show active" id="Coffe" role="tabpanel" aria-labelledby="home-tab">                                          
                                 <div className="row">
                                    
                                    </div>                                          
                              </div>
                           
                            
                             
                         
                            
                           
                            
                           
                                                               
                          </div>
                            </div>
                            <div className="col-md-5">
                            <div className="wraper shdw">
    <div className="row">
        <div className="col-md-4">
        <select name="" className="form-control" onChange={handleWaiter}  value={waiters} >
                             <option >Select Waiter</option>
                                 {waiter.map((wait) => (
                                  <option key={wait._id} value={wait._id}>
                                      {wait.waitername}
                                   </option>
                                 ))}
                        </select>
        </div>
        <div className="col-md-4">
        <select name="" className="form-control" onChange={handleCustomer}  value={customers}  >
                             <option >Select Customer</option>
                                 {customer.map((cust) => (
                                  <option key={cust._id} value={cust._id}>
                                      {cust.customername}
                                   </option>
                                 ))}
                        </select>
        </div>
        <div className="col-md-1">
        <button className="btn btn-primary" onClick={handleOpenModal}>
        +
      </button>
</div>
<div className="col-md-3">
<button className="btn btn-primary" onClick={handleOpenTable}>
        Table
      </button>
</div>

    </div>
         
         <div className="table-responsive vh-70">
             <table className="table">
                 <thead>
                   <tr className="thead-light">
                     <th scope="col">No.</th>
                     <th scope="col">Name</th>
                     <th scope="col">U.Price</th>
                     <th scope="col">Qty</th>
                     <th scope="col" className="text-right">Total</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td scope="row">1</td>
                     <td>Veg Kurma</td>
                     <td>10.00</td>
                     <td>1</td>
                     <td className="text-right">10.00</td>
                   </tr>
                   <tr>
                     <td scope="row">2</td>
                     <td>Chicken Masala</td>
                     <td>20.00</td>
                     <td>2</td>
                     <td className="text-right">40.00</td>
                   </tr>
                   <tr>
                     <td scope="row">3</td>
                     <td>Paneer Butter</td>
                     <td>15.00</td>
                     <td>1</td>
                     <td className="text-right">15.00</td>
                   </tr>
                 </tbody>
               </table>
         </div>

         <div className="table-responsive">
             <table className="table">
                   <tr>                               
                     <td>Total </td>                                
                     <th className="text-right">65.00</th>
                   </tr>
                   <tr>                               
                     <td >Discount  </td>                                
                     <th className="text-right">05.00</th>
                   </tr>
                   <tr>                               
                     <td>VAT </td>                                
                     <th className="text-right">03.50</th>
                   </tr>
                   <tr>                               
                     <th>Grand Total   </th>                                
                     <th className="text-right">63.50</th>
                   </tr>
                   <tr>                               
                     <td>
                        
                         <div className="custom-control custom-radio custom-control-inline">
                           <input type="radio" className="custom-control-input" id="defaultInline1" name="inlineDefaultRadiosExample" />
                           <label className="custom-control-label" htmlFor="defaultInline1">Cash</label>
                         </div>
                         
                       
                         <div className="custom-control custom-radio custom-control-inline">
                           <input type="radio" className="custom-control-input" id="defaultInline2" name="inlineDefaultRadiosExample" />
                           <label className="custom-control-label" htmlFor="defaultInline2">Card</label>
                         </div> 
                     </td>                                
                     <th ></th>
                   </tr>
               </table>
         </div>

         <div className="row">
             <div className="col-lg-6"><button type="button" className="btn btn-danger w-100 mb-2 p-2">Cancel</button></div>
             <div className="col-lg-6 pl-0"><button type="button" className="btn btn-warning w-100 mb-2 p-2">Place Order</button></div>
             <div className="col-lg-6"><button type="button" className="btn btn-danger w-100 mb-2 p-2">Hold</button></div>
             <div className="col-lg-6 pl-0"><button type="button" className="btn btn-success w-100 mb-2 p-2">Quick Pay</button></div>
         </div>                                      
     </div>
                            </div>
                        </div>
                         
                      </div>
                     
                  </div>      
              </div>

              <div className="tab-pane" id="delivery" role="tabpanel" aria-labelledby="chicken-tab">
                  222222222222222222222222   
              </div>
              <div className="tab-pane" id="pickup" role="tabpanel" aria-labelledby="kiwi-tab">
                  333333333333333           
              </div>
           
      
                           
          </div>
        </div>
      

      </div>
         
        
      </div>
      </div>
      <div
        className={`modal ${showModal ? 'show' : ''}`}
        style={{ display: showModal ? 'block' : 'none' }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Customer</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <div className="row">
       
      
           
             <form className="forms-sample" onSubmit={handleSubmit} >
                 <div className="row">
                   
                     <div className="form-group row">
                 <label for="exampleInputUsername2" className="col-sm-4 col-form-label">Customer Name</label>
                 <div className="col-sm-8">
                 <input type="text" className="form-control" name="customername" id="exampleInputUsername2" onChange={e =>setValues({...values, customername: e.target.value})} placeholder="Customer Name" />
                          {errors.customername && <span className="error">{errors.customername}</span>}
                   
                 </div>
               </div>

               <div className="form-group row">
                 <label for="exampleInputUsername2" className="col-sm-4 col-form-label">Customer Email</label>
                 <div className="col-sm-8">
                 <input type="text" className="form-control" name="customeremail" id="exampleInputUsername2" onChange={e =>setValues({...values, customeremail: e.target.value})} placeholder="Customer Email" />
                          {errors.customeremail && <span className="error">{errors.customeremail}</span>}
                  
                 </div>
               </div>
               <div className="form-group row">
                 <label for="exampleInputUsername2" className="col-sm-4 col-form-label">Customer Mobile</label>
                 <div className="col-sm-8">
                 <input type="text" className="form-control" name="customermobile" id="exampleInputUsername2" onChange={e =>setValues({...values, customermobile: e.target.value})} placeholder="Customer Mobile" />
                          {errors.customermobile && <span className="error">{errors.customermobile}</span>}
                   
                 </div>
               </div>
               <div className="form-group row">
                 <label for="exampleInputUsername2" className="col-sm-4 col-form-label">Customer Address</label>
                 <div className="col-sm-8">
                 <textarea className='form-control' name='customeraddress' onChange={e =>setValues({...values, customeraddress: e.target.value})}></textarea>
                 </div>
               </div>
               
             
                    
               
                 </div>
            
                 <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button type="submit" className="btn btn-gradient-primary me-2">Submit</button>
            </div>
              
             </form>
           




     </div>
            </div>
           
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${showModal ? 'show' : ''}`}
        style={{ display: showModal ? 'block' : 'none' }}
      ></div>

      {/* Table */}
             {/* Table */}
      <div
        className={`modal ${showTable ? 'show' : ''}`}
        style={{ display: showTable ? 'block' : 'none' }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Tables</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseTable}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <div className="row">
       
            {
                  table.map((tables) =>(
               
                <div className="col-md-3">
                     <div className="card">
                   <img style={containerStyle} src="assets/images/table.png" className="center" alt="logo" />
                   <h6 className="text-center">
                   Tablename:{tables.tablename}
                   </h6>
                   <h6 className="text-center">
                   Seatcapacity:{tables.seatcapacity}
                   </h6>
                </div>
                </div>
                  ))
            }
           
       




             </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleCloseTable}
              >
                Close
              </button>
              <button type="submit" className="btn btn-gradient-primary me-2">Submit</button>
            </div>
           
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${showTable ? 'show' : ''}`}
        style={{ display: showTable ? 'block' : 'none' }}
      ></div>                             
      </div>
      
    )


}

export default Pos;