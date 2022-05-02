import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuth } from "../lib/auth";
import { deleteUser } from "../lib/firebase";
import translateMessage from "../constants/messages";
import { useSnackbar } from 'notistack';

const DeleteUser = ({ userData, onCancel, updateData }) => {
  const { user } = useAuth();
  const { handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  };

  const onSubmit = async () => {
    if (user.role === "Admin") {
      try {
        await deleteUser(userData);
        handleClick("Usuario elminado con éxito", "success");
        onCancel();
        updateData();
      } catch (e) {
        handleClick(translateMessage(e.code), "error");
      }
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
            <Button onClick={onCancel} variant="contained" color="terciary">
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default DeleteUser;
