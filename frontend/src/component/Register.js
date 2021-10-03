import React, { useState } from "react";
import fire from '../config/fire';
import {ApiUrl} from '../config/config.js';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CounterContext } from "../App.js";



const theme = createTheme();

export default function SignUp() {
    const history = useHistory();
    const {setAlertMessage,setisLoaderVisible} = React.useContext(CounterContext);
    //const [isLoaderVisible] = React.useContext(CounterContext);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const CreateUser =(e) => {
    setisLoaderVisible(true);
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(async function(user){
        console.log('uid',user)
      //alert(user.uid)
      var data = {...form}
      delete data['email']
      delete data['password']

      var data =await fetch(`${ApiUrl}/RegisterUser`,{
        method:'POST',
        body:JSON.stringify({...data,uid:user.uid}),
        headers: new Headers({'content-type': 'application/json'})
      })
      if(data.ok)
      {
        debugger
        setisLoaderVisible(false)
        setAlertMessage("user Registered Success");
        history.push("/");
      }
     
        //Here if you want you can sign in the user
      })
      .catch((error) => {
        debugger
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
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  variant="standard"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  fullWidth
                  value={form.LastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  variant="standard"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  
                  fullWidth
                  id="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  label="Email Address"
                  name="email"
                  variant="standard"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  value={form.password}
                  variant="standard"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!(form.firstName && form.lastName && form.email && form.password)}
              onClick={e => CreateUser(e)}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/"} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
        {/* <StickyFooter/> */}
      </Container>
    </ThemeProvider>
  );
}
