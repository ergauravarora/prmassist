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


const theme = createTheme();

const ForgetPassword = () => {
  const {setAlertMessage,setisLoaderVisible} = useContext(CounterContext);
  const [email, setEmail] = useState();


  const handleSubmit = (e) => {
    setisLoaderVisible(true)
    e.preventDefault();
    fire
      .auth()
      .sendPasswordResetEmail(email)
      .then(async res=>{
        setAlertMessage("Email Send Successfully")
      })
      .catch((error) => {
        setAlertMessage(error.message)
     
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!(email )}
                onClick={handleSubmit}
              >
                Send Reset Link
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
       
      </Container>
    </ThemeProvider>
  );
};

export default ForgetPassword;
