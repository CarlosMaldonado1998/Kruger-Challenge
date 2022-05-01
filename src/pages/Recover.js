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
});
const Recover = () => {
  const { resetEmail, user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await resetEmail(data.email).then(navigate("/login"));
    } catch (error) {
      console.log(translateMessage(error.code));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/user/my-profile");
    }
  }, [user]);

  return (
    <>
      <Container maxWidth="md">
        <Grid style={{ minHeight: "70vh" }}>
          <Paper elevation={8}>
            <Grid>
              <Typography variant="h4" align="center">
                <strong>Recuperar Contraseña</strong>
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
                </Grid>
                <Box mt={3} alignItems={"center"}>
                  <Button variant="contained" color="primary" type="submit">
                    Enviar email
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

export default Recover;
