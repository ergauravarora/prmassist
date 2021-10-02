import { Button, Grid, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import PageContainer from "../../shared/PageContainer";
import PasswordOutlined from "@mui/icons-material/PasswordOutlined";
import EditAttributesOutlined from "@mui/icons-material/EditAttributesOutlined";
import BugReport from "@mui/icons-material/BugReportOutlined";
import {FormControl,IconButton,Input,InputAdornment,InputLabel} from "@mui/material";
import {  Visibility, VisibilityOff } from "@mui/icons-material";
import { CounterContext } from "../../App";
import { ApiUrl } from "../../config/config";

function ChangeEmail() {
  const {contextValue,setisLoaderVisible,setAlertMessage} = useContext(CounterContext)
  const [Email, setEmail] = useState({
    oldEmail:null,
    newEmail:null
  })

  const [reNewEmail, setReNewEmail] = useState();

  const handleSubmit =async () => {
    if(reNewEmail !== Email.newEmail)
    {
      setAlertMessage("New and Retyped Email Does't Match")
      setEmail({
        oldEmail:null,
        newEmail:null
      })
      setReNewEmail(null)
      return;
    }
    var data =await fetch(`${ApiUrl}/ChangeEmail`,{
      method:'POST',
      body:JSON.stringify({...Email,uid:contextValue.uid}),
      headers: new Headers({'content-type': 'application/json'})
    })
    
    if (data.ok) {
    var d =  await data.json();

    setAlertMessage(d.data)
    setEmail({
      oldEmail:null,
      newEmail:null
    })
      setReNewEmail(null)
      }
  }
  return (
    <div>
      <PageContainer title="Change Email" icon={<EditAttributesOutlined style={{color:"#317de5"}}/>}>
      <Grid xs={'3'}>

      
<FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-Email">
          Current Email
        </InputLabel>
        <Input
          fullWidth
          id="standard-adornment-Email"
          type={"text"}
          value={Email.oldEmail}
          onChange={({ target }) => setEmail({...Email,oldEmail:target.value})}
          label="Email"
        />
      </FormControl>
      
      <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-Email">
          New Email
        </InputLabel>
        <Input
          fullWidth
          id="standard-adornment-Email"
          type={"text"}
          value={Email.newEmail}
          onChange={({ target }) => setEmail({...Email,newEmail:target.value})}
          label="Email"
        />
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-Email">
          Re Enter New Email
        </InputLabel>
        <Input
          fullWidth
          id="standard-adornment-Email"
          type={ "text"}
          value={reNewEmail}
          onChange={({ target }) => setReNewEmail(target.value)}
          label="Email"
        />
      </FormControl>
     
      <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!(Email.oldEmail && Email.newEmail && reNewEmail)}
          onClick={handleSubmit}
        >
          Update Email
        </Button>
      </FormControl>
  </Grid>

      </PageContainer>
    </div>
  );
}

export default ChangeEmail;
