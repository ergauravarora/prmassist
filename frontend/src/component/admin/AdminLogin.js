import React, { useContext, useEffect, useState } from "react";
import fire from '../../config/fire';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {Avatar, FormControl,FormControlLabel,Grid,IconButton,Input,InputAdornment,InputLabel, TextField} from "@mui/material";
import {  Visibility, VisibilityOff } from "@mui/icons-material";
import { Link,useHistory } from "react-router-dom";
import { CounterContext } from "../../App.js";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import api from "../../config/api";

const theme = createTheme();

const AdminLogin = () => {
  const {contextValue,setIsAdminLoggedin,setAlertMessage,setisLoaderVisible} = useContext(CounterContext);
  const history = useHistory();
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin@123');

  const [showPassword, setShowPassword] = React.useState(false);


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
        localStorage.clear();
        fire.auth().signOut();
        sessionStorage.clear();
        
        var respd = await api.GetTokenAgainstUid({uid:res.uid})
        console.log(respd)
        if(respd.status === 200 && respd.data)
        {
          localStorage.setItem("accessToken",respd.data.accessToken)
          localStorage.setItem("refreshToken",respd.data.refreshToken)
        }
        
        setIsAdminLoggedin(true);
        setisLoaderVisible(false)
        
        history.push("/AdminDashboard")
      
      })
      .catch((error) => {
        setAlertMessage(error.message);
        console.error(error);
      });
  };
 
  return (
<ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(http://www.prmassist.com/static/media/PRM-Assist-Logo-Col.a9d089d6.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
             Airport Authority 
            </Typography>
            <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-text">
               Admin User ID
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
        </Grid>
      </Grid>
    </ThemeProvider>
   );
};

export default AdminLogin;
