import React from "react";
import { useForm } from "react-hook-form";
import { Grid, TextField, Typography, Button } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../lib/auth";
import { updateMyPassword } from "../lib/firebase";
import { useSnackbar } from 'notistack';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Ingrese su clave")
    .min(6, "La clave debe tener al menos 6 caracteres"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "La contraseña no coincide"
  ),
});
const UpdatePassword = ({ onCancel }) => {
  const { logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleClick = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  };

  const onSubmit = async (data) => {
    await updateMyPassword(data.password);
      handleClick("Contraseña cambiada. Inicie sesión", "success");
      logout();
    ;
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
                type="password"
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
            <Button onClick={onCancel} color="terciary" variant="contained">
              Cancelar
            </Button>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default UpdatePassword;
