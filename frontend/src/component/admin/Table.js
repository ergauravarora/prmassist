import React, { useContext, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
//import Title from './Title';
import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material";
import { ApiUrl } from "../../config/config";
import { CounterContext } from "../../App";

function Orders() {
  const [rows, setRows] = React.useState([]);
  const { setAlertMessage } = useContext(CounterContext);

  const GetAllUser = async () => {
    var data = await fetch(`${ApiUrl}/GetAllUser`, {
      method: "GET",
    });

    if (data.ok) {
      var res = await data.json();
      var datas = Object.entries(res.data).map((e) => e[1]);
      setRows(datas);
    }
  };
  useEffect(() => {
    GetAllUser();
  }, []);

  const DenyUser = async (uid) => {
    var data = await fetch(`${ApiUrl}/DenyRegisterUser`, {
      method: "POST",
      body: JSON.stringify({ uid: uid }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    if (data.ok) {
      var res = await data.json();
      setAlertMessage(res.data);
      //setisLoaderVisible(false)
      GetAllUser();
    }
  };
  const Approve = async (uid) => {
    var data = await fetch(`${ApiUrl}/VerifyRegisterUser`, {
      method: "POST",
      body: JSON.stringify({ uid: uid }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    if (data.ok) {
      var res = await data.json();
      setAlertMessage(res.data);
      //setisLoaderVisible(false)
      GetAllUser();
    }
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        All Users
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>S.NO.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>User Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.uid}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.firstName +" "+ row.lastName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={row.isVarified}
                        inputProps={{ "aria-label": "controlled" }}
                        onChange={() =>
                          row.isVarified ? DenyUser(row.uid) : Approve(row.uid)
                        }
                      />
                    }
                    label={row.isVarified ? "Approved" : "Not Approved"}
                  />
                </FormGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default Orders;
