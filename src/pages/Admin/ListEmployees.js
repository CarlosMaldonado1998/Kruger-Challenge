import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  FormControl,
  Radio,
  FormLabel,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { useAuth } from "../../lib/auth";
import "../../styles/App.css";
import FormNewEmployee from "../../components/FormNewEmployee";
import { width } from "@mui/system";
import {
  usersData,
  usersDataFilter,
  usersDataNoVaccine,
  usersDataRangeDate,
  usersDataTypeVaccine,
  usersDataVaccine,
} from "../../lib/firebase";
import { async } from "@firebase/util";
import TableUsers from "../../components/TableUsers";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import FormEditProfile from "../../components/FormEditProfile";

import DeleteUser from "../../components/DeleteUser";
import Filter from "../../components/Filter";
import dayjs from "dayjs";
const customStyle = {
  Container: {
    paddingLeft: "60px",
  },
  Paper: {
    backgroundColor: "rgba(255,255,255)",
    padding: "20px",
  },
};

const ListEmployees = () => {
  const [dataUsers, setdataUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [rangeDate, setRangeDate] = useState({
    firstdate: null,
    lastdate: null,
  });
  const [validateRangeDate, setValidateRangeDate] = useState(false);
  const [selectedUser, setSelecteUser] = useState({});

  const [filter, setFilter] = useState("Todos");

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleClickOpen = (userInfo) => {
    setSelecteUser({ ...userInfo });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleValidateRange =()=>{
    if(rangeDate.firstdate !== null && rangeDate.lastdate !== null){
      setValidateRangeDate(true);
      checkData();
    }else{
      setValidateRangeDate(false)
    }
  }
  const checkData = async () => {
    if (filter === "Todos") {
      const data = await usersData();
      setdataUsers([...data]);
    } else if (filter === "Vacunado") {
      const data = await usersDataVaccine("Vacunado");
      setdataUsers([...data]);
    } else if (filter === "No Vacunado") {
      const data = await usersDataNoVaccine();
      setdataUsers([...data]);
    } else if (filter === "Fechas") {
      console.log("Entro al swith");
      if (validateRangeDate) {
        const date1 = dayjs(rangeDate.firstdate).unix();
        const date2 = dayjs(rangeDate.lastdate).unix();
        const data = await usersDataRangeDate(date1, date2);
        setdataUsers([...data]);
      }
    } else {
      const data = await usersDataTypeVaccine(filter);
      setdataUsers([...data]);
    }
  };

  useEffect(() => {
    checkData();
  }, [filter, validateRangeDate]);

  return (
    <div className="fondo">
      <Container style={customStyle.Container}>
        <Grid pt={3} container>
          <Paper style={customStyle.Paper}>
            <Grid>
              <Typography textAlign={"left"} variant="h5">
                Listado de empleados
              </Typography>

              <Filter
                valueFilter={filter}
                onChangeFilter={handleChangeFilter}
                values={rangeDate}
                setValues={setRangeDate}
                onValidate={handleValidateRange}
              />
              {
                !validateRangeDate ? <Typography>Ingrese las fechas </Typography>: null
              }
              <TableUsers
                data={dataUsers}
                onHandleOpen={handleClickOpen}
                updateData={checkData}
              />
            </Grid>
          </Paper>
        </Grid>
        <SimpleDialog
          open={open}
          data={selectedUser}
          onClose={handleClose}
          updateData={checkData}
        />
      </Container>
    </div>
  );
};

export default ListEmployees;

function SimpleDialog(props) {
  const { onClose, data, open, updateData } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Editar información de usuario: </DialogTitle>
      <FormEditProfile
        userData={data}
        onCancel={handleClose}
        onUpdateData={updateData}
      />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
};
