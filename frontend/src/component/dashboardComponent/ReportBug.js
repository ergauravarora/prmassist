import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import PageContainer from "../../shared/PageContainer";
import PasswordOutlined from "@mui/icons-material/PasswordOutlined";
import EditAttributesOutlined from "@mui/icons-material/EditAttributesOutlined";
import BugReport from "@mui/icons-material/BugReportOutlined";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { ApiUrl, ServerStaticAddress } from "../../config/config";
import { CounterContext } from "../../App";

function ReportBug() {

  const {contextValue,setisLoaderVisible,setAlertMessage} = useContext(CounterContext)
  const [Bug, setBug] = useState({
    uid:contextValue.uid,
    Title:null,
    DOB:null,
    Category:null,
    Description:null,
    ScreenShot:null,
  })

  const [TempImage, setTempImage] = useState();

  const handleCapture =async ({ target }) => {
    setisLoaderVisible(true)
    const formdata =  new FormData();
    formdata.append('image',target.files[0])
    var data =await fetch(`${ApiUrl}FileUpload`,{
      method:'POST',
      body:formdata,
      //headers: new Headers({"Content-Type": "multipart/form-data;"})
    })
    
    if (data.ok) {
    var d =  await data.json();
    setisLoaderVisible(false)
//    setAlertMessage("Image Uploaded Sucessfully")
      if(d.data)
      {
        target.value = ''
        setTempImage(ServerStaticAddress+d.data)
        setBug({...Bug,ScreenShot:ServerStaticAddress+d.data})
      }
      else
      {
        target.value = ''
        setAlertMessage("Image Uploaded Failed")
      }
    
      }
};

const handleSubmit = async ()=>{
  if(!TempImage)
  {
    delete Bug['ScreenShot'];
  }
  setisLoaderVisible(true)
  var data =await fetch(`${ApiUrl}/ReportBug`,{
    method:'POST',
    body:JSON.stringify(Bug),
    headers: new Headers({'content-type': 'application/json'})
  })
  
  if (data.ok) {
  var d =  await data.json();

  setAlertMessage("Bug Report Sent ...")
  setisLoaderVisible(true)
  setBug({...Bug,
    Title:'',
    DOB:'',
    Category:'',
    Description:'',
    ScreenShot:'',
  })
  setTempImage()
    }
}
  return (
    <div>
      <PageContainer
        title="Report a Bug"
        icon={<BugReport style={{ color: "#317de5" }} />}
      >
        <Grid xs={12} container>
          <Grid xs={8} item>
            <Grid xs={8}>
              <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-text">Title</InputLabel>
                <Input
                  fullWidth
                  id="standard-adornment-text"
                  type="text"
                  value={Bug.Title}
                  onChange={({ target }) => setBug({...Bug,Title:target.value})}
                  label="Title"
                />
              </FormControl>
              <Grid
                xs={12}
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid xs={5} item>
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                      <InputLabel htmlFor="outlined-adornment-password">
                        Date of Bug
                      </InputLabel>

                      <MobileDatePicker
                        label="Date mobile"
                        inputFormat="MM/dd/yyyy"
                        value={Bug.DOB}
                        onChange={(e) => setBug({...Bug,DOB:e})}
                        renderInput={(params) => <Input {...params} />}
                      />
                    </FormControl>
                  </LocalizationProvider>
                </Grid>
                <Grid xs={5} item>
                  <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Category
                    </InputLabel>

                    <Input
                      fullWidth
                      id="standard-adornment-text"
                      type="text"
                      value={Bug.Category}
                      onChange={({ target }) => setBug({...Bug,Category:target.value})}
                      label="Title"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={4}
                  value={Bug.Description}
                  onChange={({ target }) => setBug({...Bug,Description:target.value})}
                  placeholder="Bug Description"
                  style={{
                    width: "100%",
                    border: "1px solid #317de5",
                    borderRadius: "5px",
                    padding: "5px",
                  }}
                />
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!(Bug.Title && Bug.DOB && Bug.Category && Bug.Description)}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </FormControl>
            </Grid>
          </Grid>
          <Grid xs={4} item>
            {
              TempImage ?<img src={TempImage} height="151px" width="166px" alt="Temp Image" style={{textAlign: "center",padding: "50px 20px",color: "#317de5",border: "1px solid #317de5",float: "right"}} />:<React.Fragment>
              <input
              accept="image/*"
              //className={classes.input}
              style={{ display: "none" }}
              id="raised-button-file"
              onChange={handleCapture}
              type="file"
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="raised"
                component="span"
                style={{
                  textAlign: "center",
                  padding: "50px 20px",
                  color: "#317de5",
                  border: "1px solid #317de5",
                  float: "right",
                }}
              >
                Add Screenshot
                <br />
                (optional)
              </Button>
            </label>
              </React.Fragment>
            }
            
           </Grid>
        </Grid>
      </PageContainer>
    </div>
  );
}

export default ReportBug;
