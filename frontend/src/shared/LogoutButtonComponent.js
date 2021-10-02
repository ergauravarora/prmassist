import { Badge, IconButton } from '@mui/material';
import React, { useContext } from 'react'
import { useHistory } from 'react-router';
import LogoutIcon from '@mui/icons-material/Logout';
import { CounterContext } from '../App';
import fire from '../config/fire';

function LogoutButtonComponent() {
  const {setIsLoggedIn,isLoggedIn ,isAdminLoggedin,setIsAdminLoggedin,setAlertMessage} = useContext(CounterContext);
    const history = useHistory();
    const signOut = () => {
      debugger
        fire.auth().signOut()
        if(isLoggedIn)
        {
          localStorage.clear();
          setIsLoggedIn(false)
          
        }
        if(isAdminLoggedin)
        {
          localStorage.clear();
          setIsAdminLoggedin(false)
        }
        
        setAlertMessage("User Logged Out")
        history.push("/");
    };
    return (
        <IconButton color="inherit" title="Log out" onClick={signOut}>
              <Badge color="secondary">
                <LogoutIcon />
              </Badge>
            </IconButton>
    )
}

export default LogoutButtonComponent
