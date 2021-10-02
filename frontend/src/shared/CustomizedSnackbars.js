import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { CounterContext } from '../App';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

 const CustomizedSnackbars =()=> {
  const [open, setOpen] = React.useState(false);
  const {AlertMessage, setAlertMessage,setisLoaderVisible} = React.useContext(CounterContext);



  React.useEffect(() => {
    if(AlertMessage)
    {
      setisLoaderVisible(true);
      setOpen(true);
      setTimeout(() => {
        setAlertMessage(null)
        setTimeout(() => {
          setisLoaderVisible(false);
        }, 100);
      }, 3000);
    }   
  }, [AlertMessage, setAlertMessage, setisLoaderVisible])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    
    AlertMessage? 
      <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
         {AlertMessage?AlertMessage:"This is a default message!"} 
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
    :null
    
  );
}

export default CustomizedSnackbars