
import { Button, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect,useState } from "react";
import PageContainer from "../../shared/PageContainer";
import PasswordOutlined from "@mui/icons-material/PasswordOutlined";
import EditAttributesOutlined from "@mui/icons-material/EditAttributesOutlined";
import BugReport from "@mui/icons-material/BugReportOutlined";
import { useHistory } from 'react-router-dom';
import { CounterContext } from "../../App";

function UserAccount() {
  const history = useHistory();
  const {contextValue,setisLoaderVisible} = useContext(CounterContext)

  const [CurrentUserData, setCurrentUserData] = useState({
    email:null,
    firstName:null,
    lastName:null,
    dateCreated:null
  })
  const FetchData =async () => {
    debugger
    setisLoaderVisible(true)
    var data =await fetch("http://localhost:8080/api/GetUserById",{
      method:'POST',
      body:JSON.stringify({uid:contextValue.uid}),
      headers: new Headers({'content-type': 'application/json'})
    })
    
    if (data.ok) {
      var d =  await data.json();  
      
      setCurrentUserData({
        dateCreated:contextValue?.metadata?.creationTime || "Not Available",
        email:d.data.email,
        firstName:d.data.firstName,
        lastName:d.data.lastName,
      })
      setisLoaderVisible(false)
      }
  }
  useEffect(() => {
    FetchData();
  }, [contextValue])
  return (
    <div>
      <PageContainer title="User Account">
        
        <Grid  padding="10px 0px">
          <Typography variant="body2" color="text.secondary" fontWeight="bold">
            User Name
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {CurrentUserData.firstName +" "+CurrentUserData.lastName}
          </Typography>
        </Grid>
        <Grid
          
          padding="10px 0px"
          display="inline-flex"
          width="100%"
        >
          <Grid item xs={5}>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight="bold"
            >
              Email Address
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {CurrentUserData.email}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight="bold"
            >
              Date Created
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {CurrentUserData.dateCreated}
            </Typography>
          </Grid>
        </Grid>
        <Grid 
          padding="10px 0px" display="inline-flex" width="100%">
          <Grid xs={3}>
            <Button variant="outlined" endIcon={<PasswordOutlined />} onClick={()=>history.push('/ChangePassword')}>
              Change Password
            </Button>
          </Grid>
          <Grid xs={3}>
            <Button variant="outlined" endIcon={<EditAttributesOutlined />} onClick={()=>history.push('/ChangeEmail')}>
              Change Email
            </Button>
          </Grid>
          <Grid xs={3}>
            <Button variant="outlined" endIcon={<BugReport />} onClick={()=>history.push('/ReportBug')}>
              Report a Bug
            </Button>
          </Grid>
        </Grid>
      </PageContainer>
    </div>
  );
}

export default UserAccount;
