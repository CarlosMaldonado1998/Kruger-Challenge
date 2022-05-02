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
  Link as MuiLink,
} from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import translateMessage from "../constants/messages";
import { useAuth } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/App.css";
import ImageForgot from "../images/forgot.svg";
import { useSnackbar } from 'notistack';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Ingresa un correo válido")
    .required("Ingresa tu correo electrónico"),
});

const customStyle = {
  Container: {
    textAlign: "center",
    paddingLeft: "60px",
  },
  Paper: {
    backgroundColor: "rgba(255,255,255)",
    padding: "20px",
  },
  PaperBackground: { backgroundColor: "rgba(26,55,150)" },
};

const Recover = () => {
  const { resetEmail, user } = useAuth();
  const navigate = useNavigate();
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
    try {
      await resetEmail(data.email);
      navigate("/login");
      handleClick("Se ha enviado un correo de restablecimiento de contraseña", "success")
    } catch (error) {
      handleClick(translateMessage(error.code), "error");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/user/my-profile");
    }
  }, [user]);

  return (
    <>
      <div className="fondo">
        <Container maxWidth="xl" style={customStyle.Container}>
          <Grid pt={5}>
            <Paper elevation={16} style={customStyle.Paper}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid m={3} item xs={12} md={4} xl={4}>
                  <Paper elevation={16}>
                    <Typography py={2} variant="h4" align="center">
                      <strong>Olvide mi Contraseña</strong>
                    </Typography>
                    <Typography variant="h7" align="center">
                      Solo personal administrativo
                    </Typography>
                    <Grid p={2}>
                      <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Grid>
                          <Grid item xs={12} sm={12}>
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
                        <MuiLink
                          component={Link}
                          m={2}
                          underline="none"
                          to={"/login"}
                        >
                          Iniciar sesión
                        </MuiLink>
                        <Box mt={3} alignItems={"center"}>
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            Enviar email
                          </Button>
                        </Box>
                      </form>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid m={3} item xs={12} md={6} xl={6}>
                  <img src={ImageForgot} className="image-login" />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Recover;
