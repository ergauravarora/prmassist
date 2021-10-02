import React from "react";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { CounterContext } from '../App';
import { CircularProgress } from "@mui/material";

export default function LoaderComponent() {
  const {isLoaderVisible} = React.useContext(CounterContext)
  return (
    isLoaderVisible?
    <Box sx={{ width: '100%'}} style={{position:'absolute',top:0,height:"100vh",backgroundColor:'#3e3e3e7a',zIndex:1}}>
      {/* <LinearProgress /> */}
      <CircularProgress size='40px' style={{position:"absolute",top:'50%',left:'50%',color:'#fff'}}/>
    </Box>:null
  );
}