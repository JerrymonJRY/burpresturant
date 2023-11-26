import React from "react";
import { useState,useEffect } from "react";
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import PosTable from "./posTable";
import PosRunningOrder from "./posRunningorder";
import Swal from 'sweetalert2';
import PosNewOrder from "./posNeworder";
import PosHoldingOrder from "./posHoldingorder";
import PosTodayOrder from "./posTodayorder";


const Pos =() =>{

    const showSweetAlert = () => {
        Swal.fire({
          title: 'Hello, SweetAlert2!',
          text: 'This is a SweetAlert2 popup in a React component.',
          icon: 'success',
        });
      };



      const [activeTab, setActiveTab] = useState('neworder');

      const handleTabClick = (tabName) => {
        setActiveTab(tabName);
      };
    return (
     
            <div className="container-fluid">
                    <div className="division">
                    <div className="row">
                        <div className="col-md-2">
                        <div className="w-100 d-inline-block text-center pb-4"> <Link to="/dashboard" ><img src="assets/images/pos/vertics-logo.png" className="img-fluid" /></Link> </div>
                        </div>
                        <div className="col-md-10 main-content">
            <div className="">
              <ul className="nav nav-tabs nav-justified" role="tablist">
                <li className="nav-item ">
                  <a
                    className={`nav-link ${activeTab === 'neworder' ? 'active' : ''}`}
                    data-toggle="tab"
                    href="#neworder"
                    role="tab"
                    aria-controls="neworder"
                    aria-selected={activeTab === 'neworder'}
                    onClick={() => setActiveTab('neworder')}
                  >
                    New Order
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 'runningorder' ? 'active' : ''}`}
                    data-toggle="tab"
                    href="#runningorder"
                    role="tab"
                    aria-controls="runningorder"
                    aria-selected={activeTab === 'runningorder'}
                    onClick={() => setActiveTab('runningorder')}
                  >
                    Running Order
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 'holdingorder' ? 'active' : ''}`}
                    data-toggle="tab"
                    href="#holdingorder"
                    role="tab"
                    aria-controls="holdingorder"
                    aria-selected={activeTab === 'holdingorder'}
                    onClick={() => setActiveTab('holdingorder')}
                  >
                    Holding Order
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 'todayorder' ? 'active' : ''}`}
                    data-toggle="tab"
                    href="#todayorder"
                    role="tab"
                    aria-controls="todayorder"
                    aria-selected={activeTab === 'todayorder'}
                    onClick={() => setActiveTab('todayorder')}
                  >
                    Today Order
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#">
                    <img className="poslogout" src="assets/images/pos/login.png" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="tab-content mt-3">
        <div className={`tab-pane ${activeTab === 'neworder' ? 'active' : ''}`} id="neworder" role="tabpanel" aria-labelledby="neworder-tab">
            <PosNewOrder key={activeTab} />
          </div>
          <div className={`tab-pane ${activeTab === 'runningorder' ? 'active' : ''}`} id="runningorder" role="tabpanel" aria-labelledby="runningorder-tab">
            <PosRunningOrder key={activeTab} />
          </div>
          <div className={`tab-pane ${activeTab === 'holdingorder' ? 'active' : ''}`} id="holdingorder" role="tabpanel" aria-labelledby="holdingorder-tab">
            <PosHoldingOrder key={activeTab} />
          </div>
          <div className={`tab-pane ${activeTab === 'todayorder' ? 'active' : ''}`} id="todayorder" role="tabpanel" aria-labelledby="todayorder-tab">
            <PosTodayOrder key={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pos;