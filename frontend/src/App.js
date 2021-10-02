import React, { createContext, useEffect, useState } from "react";

import {
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import Login from "./component/Login.js";
import SignUp from "./component/Register.js";
import Dashboard from "./component/Dashboard.js";
import fire from "./config/fire";
import LoaderComponent from "./shared/LoaderComponent";
import CustomizedSnackbars from "./shared/CustomizedSnackbars";
import ForgetPassword from "./component/ForgetPassword.js";
import AdminLogin from "./component/admin/AdminLogin";
import AdminDashboard from "./component/admin/AdminDashboard.js";
import UserAccount from "./component/dashboardComponent/UserAccount.js";
import ChangePassword from "./component/dashboardComponent/ChangePassword.js";
import ChangeEmail from "./component/dashboardComponent/ChangeEmail.js";
import ReportBug from "./component/dashboardComponent/ReportBug.js";
import Orders from "./component/dashboardComponent/Table.js";

// Create Context Object
export const CounterContext = createContext();

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedin, setIsAdminLoggedin] = useState(false);
  const [contextValue, setContextValue] = useState({uid:null});
  const [isLoaderVisible, setisLoaderVisible] = useState(false);
  const [AlertMessage, setAlertMessage] = useState();

  let history = useHistory();
  const providerValue = {
    AlertMessage,
    setAlertMessage,
    contextValue,
    setContextValue,
    setIsLoggedIn,
    setisLoaderVisible,
    isLoggedIn,
    isLoaderVisible,
    isAdminLoggedin,
    setIsAdminLoggedin,
  };

 

  useEffect(() => {
    var isUser =  JSON.parse(localStorage.getItem("IsLoggedIn"));
    setIsLoggedIn(isUser);
   
  }, [])
  React.useEffect(() => {
     if (!isLoggedIn) 
     {
      if(window.location.pathname.toLowerCase().includes("adminlogin"))
      {

      }
      else
      {
        history.push('/')
      }
      
    }
    else
    {
      debugger
      var contextValue= JSON.parse(localStorage.getItem("contextValue"));
      if(contextValue)
      {
        setContextValue(contextValue);
        history.push('/Dashboard')
      }
      
    }
  }, [isLoggedIn]);

  console.log("logged in?", isLoggedIn);
  return (
    
    <CounterContext.Provider value={providerValue}>
      {/* {JSON.stringify(contextValue)} */}
      <div className="App">
        <LoaderComponent />
        <CustomizedSnackbars />
          {!isLoggedIn ? (
            <React.Fragment>
                {/* <Route path="*" exact={true}>
                <Redirect to={'/'} />
              </Route> */}
                <Route path="/" exact={true}>
                  <Login />
                </Route>
                <Route path="/Register" exact={true}>
                  <SignUp />
                </Route>
                <Route path="/ForgetPassword" exact={true}>
                  <ForgetPassword />
                </Route>
            </React.Fragment>
          ) : (
            <React.Fragment>
                <Route path="/Dashboard" exact={true}>
                  <Dashboard children={<Orders />} />
                </Route>
                <Route path="/UserAccount" exact={true}>
                  <Dashboard children={<UserAccount />} />
                </Route>
                <Route path="/ChangePassword" exact={true}>
                  <Dashboard children={<ChangePassword />} />
                </Route>
                <Route path="/ChangeEmail" exact={true}>
                  <Dashboard children={<ChangeEmail />} />
                </Route>
                <Route path="/ReportBug" exact={true}>
                  <Dashboard children={<ReportBug />} />
                </Route>
            </React.Fragment>
          )}
          {!isAdminLoggedin ? (
              <Route path="/AdminLogin" exact={true}>
                <AdminLogin />
              </Route>
          ) : (
              <Route path="/AdminDashboard" exact={true}>
                <AdminDashboard />
              </Route>
          )}
      </div>
    </CounterContext.Provider>
  );
}
export default App;
