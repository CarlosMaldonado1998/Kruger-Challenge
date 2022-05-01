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

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Ingresa un correo válido")
    .required("Ingresa tu correo electrónico"),
  password: Yup.string()
    .required("Ingrese su clave")
    .min(6, "La clave debe tener al menos 6 caracteres"),
});

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password).then(
        navigate("/user/my-profile")
      );
    } catch (error) {
      console.log(translateMessage(error.code));
    }
  };

  useEffect(()=>{
    if(user)
    {
      navigate("/user/my-profile")
    }
  }, [user])

  return (
    <>
      <Container maxWidth="md">
        <Grid style={{ minHeight: "70vh" }}>
          <Paper elevation={8}>
            <Grid>
              <Typography variant="h4" align="center">
                <strong>Inicio de Sesión</strong>
              </Typography>
              <Typography variant="h7" align="center">
                Solo personal administrativo
              </Typography>
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      margin="dense"
                      {...register("email")}
                      error={errors.email ? true : false}
                    />
                    <Typography variant="inherit" color="textSecondary">
                      {errors.email?.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="password"
                      name="password"
                      label="Password"
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
                </Grid>
                <Box mt={3} alignItems={"center"}>
                  <Button variant="contained" color="primary" type="submit">
                    Iniciar sesión
                  </Button>
                </Box>
              </form>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default LoginPage;
