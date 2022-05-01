import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Paper,
  Box,
  Grid,
  TextField,
  Typography,
  Container,
  Button,
} from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import translateMessage from "../constants/messages";
import { useAuth } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import { updateMyPassword } from "../lib/firebase";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Ingrese su clave")
    .min(6, "La clave debe tener al menos 6 caracteres"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "La contraseña no coincide"
  ),
});
const UpdatePassword = ({ userData, onCancel }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    await updateMyPassword(data.password).then(console.log("contraseña cambiada"))

  };

  return (
    <>
      <Grid container>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container p={2}>
            <Grid p={1} item xs={12} sm={12}>
              <TextField
                id="password"
                name="password"
                label="Nueva contraseña"
                type="password"
                fullWidth
                margin="dense"
                {...register("password")}
                error={errors.password ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.password?.message}
              </Typography>
            </Grid>
            <Grid p={1} item xs={12} sm={12}>
              <TextField
                id="passwordConfirmation"
                name="passwordConfirmation"
                label="Confirmación contraseña"
                fullWidth
                margin="dense"
                {...register("passwordConfirmation")}
                error={errors.passwordConfirmation ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.passwordConfirmation?.message}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            p={2}
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Button variant="contained" color="primary" type="submit">
              Cambiar
            </Button>
            <Button onClick={onCancel} color="secondary" variant="contained">
              Cancelar
            </Button>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default UpdatePassword;
