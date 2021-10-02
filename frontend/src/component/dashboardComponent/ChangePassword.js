import { Button, Grid, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import PageContainer from "../../shared/PageContainer";
import PasswordOutlined from "@mui/icons-material/PasswordOutlined";
import BugReport from "@mui/icons-material/BugReportOutlined";
import {FormControl,IconButton,Input,InputAdornment,InputLabel} from "@mui/material";
import {  Visibility, VisibilityOff } from "@mui/icons-material";
import { CounterContext } from "../../App";
import { ApiUrl } from "../../config/config";
import { auth } from "../../config/fire";

function ChangePassword() {
    const [showCurrentPassword, setshowCurrentPassword] = React.useState(false);
    const [showNewPassword, setshowNewPassword] = React.useState(false);
    const [showReNewPassword, setshowReNewPassword] = React.useState(false);
    const {contextValue,setisLoaderVisible,setAlertMessage} = useContext(CounterContext)
    
    const [password, setPassword] = useState({
      oldPassword:null,
      newPassword:null
    })

    const [reNewPassword, setReNewPassword] = useState();

    const handleSubmit =async () => {
      if(reNewPassword !== password.newPassword)
      {
        setAlertMessage("New and Retyped Password Does't Match")
        setPassword({
          oldPassword:null,
          newPassword:null
        })
        setReNewPassword(null)
        return;
      }
      debugger
      auth.onAuthStateChanged(user => {
        user.updatePassword(reNewPassword).then(res=>{
          if(res)
          {
            console.error(res)
            setAlertMessage("something went wrong !!!")
            setPassword({
              oldPassword:null,
              newPassword:null
            })
              setReNewPassword(null)
          }
          else
          {
            setAlertMessage("User Password Updated successfully ")
            setPassword({
              oldPassword:null,
              newPassword:null
            })
              setReNewPassword(null)
          }
        }).catch(error=>{
          setPassword({
            oldPassword:null,
            newPassword:null
          })
            setReNewPassword(null)
          setAlertMessage(error.message)
          
        })
      })
   
    }
  return (
    <div>
      <PageContainer title="Change Password" icon={<PasswordOutlined style={{color:"#317de5"}}/>}>
        <Grid xs={'3'}>

      
      <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Current Password
              </InputLabel>
              <Input
                fullWidth
                id="standard-adornment-password"
                type={showCurrentPassword ? "text" : "password"}
                value={password.oldPassword}
                onChange={({ target }) => setPassword({...password,oldPassword:target.value})}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>setshowCurrentPassword(!showCurrentPassword)}
                      //onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            
            <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                New Password
              </InputLabel>
              <Input
                fullWidth
                id="standard-adornment-password"
                type={showNewPassword ? "text" : "password"}
                value={password.newPassword}
                onChange={({ target }) => setPassword({...password,newPassword:target.value})}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>setshowNewPassword(!showNewPassword)}
                      //onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Re Enter New Password
              </InputLabel>
              <Input
                fullWidth
                id="standard-adornment-password"
                type={showReNewPassword ? "text" : "password"}
                value={reNewPassword}
                onChange={({ target }) => setReNewPassword(target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>setshowReNewPassword(!showReNewPassword)}
                      //onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showReNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
           
            <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!(password.oldPassword && password.newPassword && reNewPassword)}
                onClick={handleSubmit}
              >
                Update Password
              </Button>
            </FormControl>
        </Grid>
        </PageContainer>
    </div>
  );
}

export default ChangePassword;
