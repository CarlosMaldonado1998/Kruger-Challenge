import React from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuth } from "../lib/auth";
import { deleteUser } from "../lib/firebase";

const DeleteUser = ({ userData, onCancel, updateData }) => {
  const { user } = useAuth();

  const { handleSubmit } = useForm();
  console.log("datos user", userData);
  const onSubmit = async () => {
    if (user.role === "Admin") {
      await deleteUser(userData).then(console.log("usuario elminado"), onCancel(), updateData());
    }
  };
  return (
    <>
      <Typography justifyContent="center" m={1} p={1}>
        ¿Está seguro que desea eliminar este usuario?
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid m={1}>
            <Button type="submit" variant="contained" color="secondary">
              Aceptar
            </Button>
          </Grid>
          <Grid m={1}>
            <Button onClick={onCancel} variant="contained">
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default DeleteUser;
