import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";
import { useAuth } from "../../lib/auth";
import AdminImage from "../../images/adminPerfil.png";
import EmployeePerfil from "../../images/employeePerfil.png";
import dayjs from "dayjs";
import FormEditProfile from "../../components/FormEditProfile";
import { myUser } from "../../lib/firebase";
import UpdatePassword from "../../components/UpdatePassword";

const customStyle = {
  Container: {
    textAlign: "center",
    paddingLeft: "60px",
  },
  Paper: {
    backgroundColor: "rgba(255,255,255)",
    padding: "20px",
  },
  PaperBackground: { backgroundColor: "rgba(149,240,183)" },
};

const MyProfile = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [dataMyUser, setDataMyUser] = useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  const updateUser = async () => {
    const data = await myUser(user.uid);
    setDataMyUser(data);
  };
  useEffect(() => {
    updateUser();
  }, []);

  return (
    <div className="fondo">
      {dataMyUser ? (
        <Container style={customStyle.Container}>
          <Grid p={2} container>
            <Typography variant="h5" color="secondary">
              Bienvenido {dataMyUser.name}
            </Typography>
          </Grid>
          <Grid>
            <Paper elevation={16} style={customStyle.Paper}>
              <Grid my={2}>
                <Paper elevation={8} style={customStyle.PaperBackground}>
                  <Grid
                    p={4}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item xs={12} md={4}>
                      <img
                        src={
                          dataMyUser.role === "Admin"
                            ? AdminImage
                            : EmployeePerfil
                        }
                        className="perfil-image"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography p={2} color="white" variant="h6">
                        {dataMyUser.name} - {dataMyUser.lastname}
                      </Typography>
                      <Typography px={2} variant="h7">
                        {dataMyUser.email}
                      </Typography>
                      <Typography px={2} variant="h6">
                        CI : {dataMyUser.CI}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Button
                        onClick={handleClickOpenUpdate}
                        variant="contained"
                        color="primary"
                      >
                        Actualizar contraseña
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Paper elevation={8} style={customStyle.Paper}>
                <Grid p={2} container>
                  <Grid item xs={6} md={6}>
                    <Typography textAlign={"left"}>
                      Información de usuario
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Button
                      onClick={handleClickOpen}
                      variant="contained"
                      color="primary"
                    >
                      Actualizar información
                    </Button>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <ListItem>
                      <ListItemText
                        primary={dataMyUser.name}
                        secondary={"Nombre"}
                      />
                    </ListItem>
                  </Grid>
                  <Grid item xs={6}>
                    <ListItem>
                      <ListItemText
                        primary={dataMyUser.secondName}
                        secondary={"Segundo Nombre"}
                      />
                    </ListItem>
                  </Grid>
                  <Grid item xs={6}>
                    <ListItem>
                      <ListItemText
                        primary={dataMyUser.lastname}
                        secondary={"Apellido"}
                      />
                    </ListItem>
                  </Grid>
                  <Grid item xs={6}>
                    <ListItem>
                      <ListItemText
                        primary={dataMyUser.secondLastname}
                        secondary={"Segundo Apellido"}
                      />
                    </ListItem>
                  </Grid>
                  <Grid item xs={6}>
                    <ListItem>
                      <ListItemText
                        primary={dataMyUser.telephone}
                        secondary={"Número celular"}
                      />
                    </ListItem>
                  </Grid>
                  <Grid item xs={6}>
                    <ListItem>
                      <ListItemText
                        primary={dayjs(dataMyUser.birthdate).format(
                          "DD/MM/YYYY"
                        )}
                        secondary={"Fecha Nacimiento"}
                      />
                    </ListItem>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItem>
                      <ListItemText
                        primary={dataMyUser.address}
                        secondary={"Dirección"}
                      />
                    </ListItem>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItem>
                      <ListItemText
                        primary={dataMyUser.stateVaccine}
                        secondary={"Estado de vacunación"}
                      />
                    </ListItem>
                  </Grid>
                  {dataMyUser?.stateVaccine === "Vacunado" ? (
                    <>
                      <Grid item xs={6}>
                        <ListItem>
                          <ListItemText
                            primary={dataMyUser.typeVaccine}
                            secondary={"Tipo vacuna"}
                          />
                        </ListItem>
                      </Grid>
                      <Grid item xs={6}>
                        <ListItem>
                          <ListItemText
                            primary={dataMyUser.dosisVaccine}
                            secondary={"Número de dosis"}
                          />
                        </ListItem>
                      </Grid>
                      <Grid item xs={6}>
                        <ListItem>
                          <ListItemText
                            primary={dayjs(dataMyUser.dateVaccine).format(
                              "DD/MM/YYYY"
                            )}
                            secondary={"Fecha de vacunación"}
                          />
                        </ListItem>
                      </Grid>
                    </>
                  ) : null}
                </Grid>
              </Paper>
            </Paper>
          </Grid>
          <SimpleDialog
            open={open}
            data={dataMyUser}
            onClose={handleClose}
            updateData={updateUser}
          />
          <UpdateDialog
            open={openUpdate}
            data={dataMyUser}
            onClose={handleCloseUpdate}
          />
        </Container>
      ) : (
        <div>cargando</div>
      )}
    </div>
  );
};

export default MyProfile;

function SimpleDialog(props) {
  const { onClose, data, open, updateData } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Editar información del perfil </DialogTitle>
      <FormEditProfile
        userData={data}
        onCancel={handleClose}
        onUpdateData={updateData}
      />
    </Dialog>
  );
}

function UpdateDialog(props) {
  const { onClose, data, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Editar contraseña </DialogTitle>
      <UpdatePassword userData={data} onCancel={handleClose} />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
};
