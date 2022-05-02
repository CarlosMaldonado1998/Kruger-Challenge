import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import translateMessage from "../constants/messages";
import { registerEmployee, usersExistsData } from "../lib/firebase";
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Mínimo 3 caracteres alfabeticos")
    .max(100, "Máximo 100 caracteres")
    .matches(/^[A-Z]+$/i, "No se permite carácteres especiales o numéricos")
    .required("Ingrese su primer nombre"),
  secondName: Yup.string()
    .min(3, "Mínimo 3 caracteres alfabeticos")
    .max(100, "Máximo 100 caracteres")
    .matches(/^[A-Z]+$/i, "No se permite carácteres especiales o numéricos")
    .required("Ingrese su segundo nombre"),
  lastname: Yup.string()
    .min(4, "Mínimo 4 caracteres alfabeticos")
    .max(100, "Máximo 100 caracteres")
    .matches(/^[A-Z]+$/i, "No se permite carácteres especiales o numéricos")
    .required("Ingrese su apellido paterno"),
  secondLastname: Yup.string()
    .min(4, "Mínimo 4 caracteres alfabeticos")
    .max(100, "Máximo 100 caracteres")
    .matches(/^[A-Z]+$/i, "No se permite carácteres especiales o numéricos")
    .required("Ingrese su apellido materno"),
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .max(255, "Máximo 255 caracteres")
    .required("Ingrese su correo electrónico"),
  CI: Yup.string()
    .min(10, "Mínimo 10 caracteres numéricos")
    .max(10, "Máximo 10 caracteres numéricos")
    .matches(/^[0-9]+$/, "Ingrese solo números")
    .required("Ingrese su número de celular"),
});

const FormNewEmployee = () => {
  const navigate = useNavigate();
  const [checkCIValue, setCheckCIValue] = useState(false);
  const [valueRegister, setValueRegister] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  };

  const handelCheckCI = async (data) => {
    if (handleValidateNumberCI(data.CI)) {
      const response = await usersExistsData(data.CI);
      setValueRegister(data.CI);
      if (response.length === 0) {
        setCheckCIValue(false);
        onSubmit(data);
      } else {
        setCheckCIValue(true);
      }
    } else {
      handleClick("Ingrese una cédula ecuatoriana válida", "info");
    }
  };

  const handleValidateNumberCI = (valueCI) => {
    const validate = "212121212";
    let suma = 0;
    for (let index = 0; index < 9; index += 1) {
      let num = valueCI[index] * validate[index];
      suma += num - (num > 9) * 9;
    }
    const calcularDecena = suma - (suma % 10) + 10;
    const numControl = calcularDecena - suma;
    if (numControl == valueCI[9]) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (data) => {
    const dataEmployee = {
      ...data,
      role: "Employee",
      birthdate: "",
      address: "",
      telephone: "",
      stateVaccine: "",
      typeVaccine: "",
      dateVaccine: "",
      dosisVaccine: "",
      birthdateTimestamp: 0,
      dateVaccineTimestamp: 0,
    };
    try {
      await registerEmployee(dataEmployee);
      handleClick("Usuario registrado con éxito.", "success");
      navigate("/admin/list");
    } catch (error) {
      handleClick(translateMessage(error.code), "error");
    }
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(handelCheckCI)}>
        <Grid container>
          <Grid item p={1} xs={12} md={6}>
            <TextField
              id="name"
              name="name"
              label="Primer nombre"
              fullWidth
              margin="dense"
              {...register("name")}
              error={errors.name ? true : false}
            />
            <Typography variant="inherit" color="error">
              {errors.name?.message}
            </Typography>
          </Grid>
          <Grid item p={1} xs={12} md={6}>
            <TextField
              id="secondName"
              name="secondName"
              label="Segundo nombre"
              fullWidth
              margin="dense"
              {...register("secondName")}
              error={errors.secondName ? true : false}
            />
            <Typography variant="inherit" color="error">
              {errors.secondName?.message}
            </Typography>
          </Grid>
          <Grid item p={1} xs={12} md={6}>
            <TextField
              id="lastname"
              name="lastname"
              label="Apellido paterno"
              fullWidth
              margin="dense"
              {...register("lastname")}
              error={errors.lastname ? true : false}
            />
            <Typography variant="inherit" color="error">
              {errors.lastname?.message}
            </Typography>
          </Grid>
          <Grid item p={1} xs={12} md={6}>
            <TextField
              id="secondLastname"
              name="secondLastname"
              label="Apellido materno"
              fullWidth
              margin="dense"
              {...register("secondLastname")}
              error={errors.secondLastname ? true : false}
            />
            <Typography variant="inherit" color="error">
              {errors.secondLastname?.message}
            </Typography>
          </Grid>
          <Grid item p={1} xs={12} md={8}>
            <TextField
              id="email"
              name="email"
              label="Email"
              fullWidth
              margin="dense"
              {...register("email")}
              error={errors.email ? true : false}
            />
            <Typography variant="inherit" color="error">
              {errors.email?.message}
            </Typography>
          </Grid>
          <Grid item p={1} xs={12} md={8}>
            <TextField
              id="CI"
              name="CI"
              label="CI / Cédula"
              fullWidth
              margin="dense"
              {...register("CI")}
              error={errors.CI ? true : false}
            />
            <Typography variant="inherit" color="error">
              {errors.CI?.message}
            </Typography>
            {checkCIValue ? (
              <Typography textAlign={"center"} color="error">
                El número de cédula: {valueRegister} ya ha sido registrado
              </Typography>
            ) : null}
          </Grid>
        </Grid>
        <Box mt={3} alignItems={"center"}>
          <Button variant="contained" color="primary" type="submit">
            Registar empleado
          </Button>
        </Box>
      </form>
    </>
  );
};

export default FormNewEmployee;
