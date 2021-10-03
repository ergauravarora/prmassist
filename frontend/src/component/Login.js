import React, { useContext, useEffect, useState } from "react";
import fire from '../config/fire';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {FormControl,Grid,IconButton,Input,InputAdornment,InputLabel} from "@mui/material";
import {  Visibility, VisibilityOff } from "@mui/icons-material";
import { Link,useHistory } from "react-router-dom";
import { CounterContext } from "../App.js";
import { ApiUrl } from "../config/config";
import { SavePassword } from "../config/utils";


const theme = createTheme();

const Login = () => {
  const {contextValue,setIsLoggedIn,setAlertMessage,setisLoaderVisible,setContextValue} = useContext(CounterContext);
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [showPassword, setShowPassword] = React.useState(false);


  useEffect(() => {
    // setLoading(true);
    if(contextValue)
    {
      history.push("/")
    }  
    
  }, [contextValue,history])

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    setisLoaderVisible(true)
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async res=>{
        debugger
        SavePassword(password);
       // setLoading(false)    
        // fire.auth().onAuthStateChanged((user) => {
    
      setContextValue({uid:res.uid});
    //  localStorage.setItem("contextValue",JSON.stringify({uid:res.uid}))
    
  // });
        var data =await fetch(`${ApiUrl}/GetUserById`,{
        method:'POST',
        body:JSON.stringify({uid:res.uid}),
        headers: new Headers({'content-type': 'application/json'})
      })
      
      if (data.ok) {
      var d =  await data.json();
        
      if(!d.data.isVarified)
      {
        setAlertMessage("User is not yet Approved")
        setisLoaderVisible(true)
        localStorage.clear();
        fire.auth().signOut();
        sessionStorage.clear();
      }
      else
      {
        localStorage.setItem("IsLoggedIn",true)
        localStorage.setItem("contextValue",JSON.stringify({uid:res.uid}))
        setIsLoggedIn(true);
        setisLoaderVisible(false)
        history.push('/Dashboard')
      }
    }
      })
      .catch(async (error) => {
         setAlertMessage(error.message)
         console.error(error);
    });
  };
 
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="./telegram.png"
            alt="main icon"
            style={{ height: "153px" }}
          />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-text">
                User ID
              </InputLabel>
              <Input
                fullWidth
                id="standard-adornment-text"
                type="text"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="text"
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <Input
                fullWidth
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>setShowPassword(!showPassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
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
                disabled={!(email && password)}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </FormControl>
          </Box>
        </Box>
        <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/Register"} variant="body2">
                  Don't Have a Account ? Sign Up
                </Link>
              </Grid>
            </Grid>
            <br/>
        <Typography variant="body2" color="text.secondary" align="center">
          Forget Password <br />
          Click{" "}
          <Link color="inherit" to={"/ForgetPassword"}>
            Here
          </Link>
        </Typography>
       
      </Container>
    </ThemeProvider>
  );
};

export default Login;
