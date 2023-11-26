import React from "react";
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import Swal from 'sweetalert2';
import ReactToPrint   from "react-to-print";
import apiConfig from '../layouts/base_url';
const PosRunningOrder = ()=>{


    const [posRunningorder, setPosRunningorder] = useState([]);
    const [data, setData] = useState(null);
    const [kotdata,setkotData] =useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showkotModal,setShowKotModal] =useState(false);
    const [payments,setPays] =useState();
 const [searchTerm, setSearchTerm] = useState('');
   const [refresh, setRefresh] = useState(false);
    const handlePays = (event) => {
      setPays(event.target.value);
      
    //  alert({svat});
     }


      const componentRef = useRef();
    
      const handlePrint = () => {
        if (componentRef.current) {
          componentRef.current.handlePrint();
        }
      };
    
    useEffect(() => {
      fetch(`${apiConfig.baseURL}/api/pos/getrunningorder`)
        .then((response) => response.json())
        .then((data) => setPosRunningorder(data))
        .catch((error) => console.error(error));
    }, [refresh]);

    const filteredOrders = posRunningorder.filter((order) => {
      const searchTermLower = searchTerm.toLowerCase();
      const orderNumberIncludes = order.ordernumber.toLowerCase().includes(searchTermLower);
      const tableNameIncludes = order.table && order.table.tablename.toLowerCase().includes(searchTermLower);
      const waiterNameIncludes = order.waiter.waitername.toLowerCase().includes(searchTermLower);
    
      return orderNumberIncludes || (tableNameIncludes && waiterNameIncludes);
    });
    const handleComplete =(id) =>{
        console.log(id);
        axios.get(`${apiConfig.baseURL}/api/pos/getcomplete/${id}`)
        .then((response) => {
            setData(response.data);
            console.log(response.data);
            setShowModal(true);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });

    }

    const closeModal = () => {
        setShowModal(false);
        
      };


      const payment  = [
        { value: 'Cash', label: 'Cash' },
        { value: 'Card', label: 'Card' },
       
      ];

const handleMakePayment =(id) =>
{
  
  var formData = new FormData();
  formData.append("paymentType", payments);
  //formData.append("foodmenuname", foodmenuname);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };
  const url = `${apiConfig.baseURL}/api/pos/updatePayment/${id}`;

  axios.put(url,formData, config)
  .then(res => {
    Swal.fire({
      title: 'Success!',
      text: 'Do you want to print the order?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes, print',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        // Open your print modal here
        console.log(res);
      setRefresh((prevRefresh) => !prevRefresh);
       // openPrintModal(res.data);
      } else {
        navigate('/posorder');
      }
    });
  })
  .catch(err => console.log(err));
}
  
const handlekot =(id) =>
{

  const url = `${apiConfig.baseURL}/api/pos/getKot/${id}`;
  axios.get(url)
  .then((response) => {
    setkotData(response.data);
    console.log(response.data);
    setShowKotModal(true);
  })
  
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

}


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


    return(
        <>
        <div className="container">

      
        <div className="row">

       <div className="col-md-12">
        <div className="form-group">
        <input
          type="text"
          placeholder="Search by OrderID"
          value={searchTerm}
          onChange={handleSearch}
          className="form-control"
        />
        </div>
       </div>
        
     
        {
                filteredOrders.map((order) => (
            <div className="col-md-3">
                <div className="menu-boxs">
                <div className="menu-div">
                  <h5 className="text-center">OrderID:<span>{order.ordernumber}</span></h5>
               
                  <h6 className="text-center">Table:{order.table  ?order.table.tablename :'No Table'}</h6>
                  <h6 className="text-center">Table:{order.waiter.waitername}</h6>
                  <h6 className="text-center">Runningorder</h6>

                  <div class="row">
        
         <div className="d-inline mx-auto ">

             <a class="btn btn-outline-primary" onClick={(e) => handleComplete(order._id)} href="#">Payment</a>
             <a class="btn btn-outline-primary" onClick={(e) => handlekot(order._id)} href="#">KOT</a>
             <a class="btn btn-outline-primary" href="#">Edit</a>
   
         </div>
    </div>
                </div>
                </div>
            </div>

))
}
        
        </div>
 {/* Modal */}
 <div>
 <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Order Details</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Display the data here */}
              
              { data ? (
data.map((order) => (
               <div key={order.id}>
               <h5>Order Number: {order.ordernumber}</h5>
               <h6>Options: {order.options}</h6>
               <h6>Customer Name:{order.customerDetails ? order.customerDetails.customername : 'N/A'}</h6>
      <h6>Table:{order.tableDetails ? order.tableDetails.tablename : 'N/A'}</h6>
      <h6>Waiter {order.waiterDetails ? order.waiterDetails.waitername : 'N/A'}</h6>
                <table className="table   table-bordered">
                <thead>
                <tr>
                    <th>Si No</th>
                    <th>Food Name</th>
                    <th>Quanity</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                 
                  {order.cart.map((cartItem,key) => (
                <tr key={cartItem.foodmenuId}>
                  <td>{key + 1}</td>
                  <td>{cartItem.menuItemDetails.foodmenuname}</td>
                  <td>{cartItem.quantity}</td>
                  <td>{cartItem.salesprice}</td>
                 
                  {/* Render other cart item details here */}
                </tr>
              ))}
                
                </tbody>
                </table>
                <h6>Total :{order.total}</h6>
                <h6>Vat Amount :{order.vatAmount}</h6>
                <h6>Grand Total :{order.grandTotal}</h6>

                <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Select Payment</label>
                        <div className="col-sm-9">
                        <select className="form-control" onChange={handlePays}  value={payments}>
                          <option>Select Payment</option>
                          {payment.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
                        </select>
                        
                        </div>
                      </div>

                <div className="modal-footer">
                <button type="button" className="btn btn-outline-primary" onClick={(e) => handleMakePayment(order._id)}>Pay Now</button> 
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Close</button>
            </div>
   
             </div>
           
              ))
              ):(
                <p>No data</p>
              )
            }
            </div>
         
          </div>
        </div>
      </div>
      <div className={`modal-backdrop ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>
    </div>

    {/* Setkot Table */}
    <div>
    {/* <useReactToPrint
        trigger={() => <button onClick={handlePrint}>Print</button>}
        content={() => componentRef.current}
      /> */}
 <div className={`modal ${showkotModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showkotModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">KOT</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Display the data here */}
              
              { kotdata ? (
kotdata.map((order) => (
               <div key={order.id}>
               <h5>Order Number: {order.ordernumber}</h5>
               <h6>Options: {order.options}</h6>
               <h6>Customer Name:{order.customerDetails ? order.customerDetails.customername : 'N/A'}</h6>
      <h6>Table:{order.tableDetails ? order.tableDetails.tablename : 'N/A'}</h6>
      <h6>Waiter {order.waiterDetails ? order.waiterDetails.waitername : 'N/A'}</h6>
                <table className="table   table-bordered">
                <thead>
                <tr>
                    <th>Si No</th>
                    <th>Food Name</th>
                    <th>Quanity</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                 
                  {order.cart.map((cartItem,key) => (
                <tr key={cartItem.foodmenuId}>
                  <td>{key + 1}</td>
                  <td>{cartItem.menuItemDetails.foodmenuname}</td>
                  <td>{cartItem.quantity}</td>
                  <td>{cartItem.salesprice}</td>
                
                  {/* Render other cart item details here */}
                </tr>
              ))}
                
                </tbody>
                </table>
                <h6 className="text-right">Total :{order.total}</h6>
                <h6 className="text-right">Vat Amount :{order.vatAmount}</h6>
                <h6 className="text-right">Grand Total :{order.grandTotal}</h6>

           

                <div className="modal-footer">
                <button type="button" onClick={handlePrint}  className="btn btn-outline-primary" >Print</button> 
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowKotModal(false)}>Close</button>
            </div>
   
             </div>
           
              ))
              ):(
                <p>No data</p>
              )
            }
            </div>
         
          </div>
        </div>
      </div>
      <div className={`modal-backdrop ${showkotModal ? 'show' : ''}`} style={{ display: showkotModal ? 'block' : 'none' }}></div>
      
      
    </div>
    </div>
        </>
    );
}

export default PosRunningOrder;