import { Grid, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


function PageContainer({children,title,icon}) {
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return (
        <Grid  
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        padding="0px 50px"
        spacing={2}>
        <Grid item xs={11}>
        
        <Typography variant="body2" color="text.primary" borderBottom='2px solid' width="fit-content" fontSize="18px" fontWeight="bold" borderColor="#317de5" align="left" paddingTop="35px" marginLeft="50px">
            
        Account</Typography>

    
        
        </Grid>
        <Grid item xs={1}>
        <img
            src="./telegram.png"
            alt="main icon"
            style={{ height: "70px" }}
          />
        </Grid>
        <Grid item xs={12}>
        <Typography variant="body2" color="text.primary" width="fit-content" fontSize="28px" fontWeight="bold" borderColor="#317de5" align="left"  marginLeft="50px">
            
            {title} {icon}</Typography>
        </Grid>
        <Grid item xs={12}>
            <div style={{margin:'0px 50px'}}>
            {children}
            </div>
            
        </Grid>
      </Grid>
    )
}

export default PageContainer
