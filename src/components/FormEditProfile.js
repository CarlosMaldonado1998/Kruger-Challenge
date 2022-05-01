import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Grid,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import * as Yup from "yup";
import * as dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { updateUser } from "../lib/firebase";

const typesVaccine = [
  {
    value: "Sputnik",
  },
  {
    value: "AstraZeneca",
  },
  {
    value: "Pfizer",
  },
  {
    value: "Jhonson&Jhonson",
  },
];
const dosisVaccine = [
  {
    value: "1 Dosis",
  },
  {
    value: "2 Dosis",
  },
  {
    value: "3 Dosis (1er Refuerzo)",
  },
  {
    value: "4 Dosis (2do Refuerzo)",
  },
];

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
  CI: Yup.string()
    .min(10, "Mínimo 10 caracteres numéricos")
    .max(10, "Máximo 10 caracteres numéricos")
    .matches(/^[0-9]+$/, "Ingrese solo números")
    .required("Ingrese su cédula de ciudadania"),
  address: Yup.string().required("Ingrese su dirección"),
  telephone: Yup.string()
    .min(10, "Mínimo 10 caracteres numéricos")
    .matches(/^[0-9]+$/, "Ingrese solo números")
    .max(10, "Máximo 10 caracteres numéricos")
    .required("Ingrese su número de celular"),
});

const FormEditProfile = ({ userData, onCancel, onUpdateData }) => {
  const navigate = useNavigate();
  const [stateVaccination, setStateVaccination] = useState("No Vacunado");
  const [typeVaccination, settypeVaccination] = useState("Sputnik");
  const [dosisVaccination, setDosisVaccination] = useState("1 Dosis");
  const [birthdate, setBirthdate] = useState(null);
  const [dateDosisVaccine, setdateDosisVaccine] = useState(null);
  const [checkDates, setCheckDates] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleChangeTypeVaccination = (event) => {
    settypeVaccination(event.target.value);
  };

  const handleChangeDosisVaccination = (event) => {
    setDosisVaccination(event.target.value);
  };

  const handleChangeStateVaccination = (event) => {
    setStateVaccination(event.target.value);
  };

  useEffect(() => {
    if (userData) {
      console.log(userData);
      userData?.birthdate !== ""
        ? setBirthdate(userData.birthdate)
        : setBirthdate(null);

      userData?.stateVaccine !== ""
        ? setStateVaccination(userData.stateVaccine)
        : setStateVaccination("No Vacunado");
      userData?.dosisVaccine !== ""
        ? setDosisVaccination(userData.dosisVaccine)
        : setDosisVaccination("1 Dosis");
      userData?.typeVaccine !== ""
        ? settypeVaccination(userData.typeVaccine)
        : settypeVaccination("Sputnik");
      userData?.dateVaccine !== ""
        ? setdateDosisVaccine(userData.dateVaccine)
        : setdateDosisVaccine(null);
    }
  }, [userData]);
  const onSubmit = async (data) => {
    if (birthdate != null) {
      setCheckDates(false);
      const dataComplete = {
        ...data,
        uid: userData.uid,
        birthdate: birthdate.toString(),
        birthdateTimestamp: dayjs(birthdate).unix(),
      };
      if (stateVaccination === "No Vacunado") {
        try {
          await updateUser(dataComplete).then(
            console.log("usuario actualizado con exito completo"),
            onCancel(),
            onUpdateData()
          );
        } catch (e) {
          console.log("algo ha ocurriedo", e);
        }
      } else {
        if (dateDosisVaccine != null) {
          const VaccinateComplete = {
            ...dataComplete,
            stateVaccine: stateVaccination,
            typeVaccine: typeVaccination,
            dosisVaccine: dosisVaccination,
            dateVaccine: dateDosisVaccine.toString(),
            dateVaccineTimestamp: dayjs(dateDosisVaccine).unix(),
          };
          try {
            await updateUser(VaccinateComplete).then(
              console.log("usuario actualizado con exito"),
              onCancel(),
              onUpdateData()
            );
          } catch (e) {
            console.log("algo ha ocurriedo", e);
          }
        } else {
          setCheckDates(true);
        }
      }
    } else {
      setCheckDates(true);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item p={1} xs={12} md={6}>
          <TextField
            id="name"
            name="name"
            label="Primer nombre"
            fullWidth
            defaultValue={userData ? userData.name : ""}
            margin="dense"
            {...register("name")}
            error={errors.name ? true : false}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.name?.message}
          </Typography>
        </Grid>
        <Grid item p={1} xs={12} md={6}>
          <TextField
            id="secondName"
            name="secondName"
            label="Segundo nombre"
            fullWidth
            defaultValue={userData ? userData.secondName : ""}
            margin="dense"
            {...register("secondName")}
            error={errors.secondName ? true : false}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.secondName?.message}
          </Typography>
        </Grid>
        <Grid item p={1} xs={12} md={6}>
          <TextField
            id="lastname"
            name="lastname"
            label="Apellido paterno"
            fullWidth
            defaultValue={userData ? userData.lastname : ""}
            margin="dense"
            {...register("lastname")}
            error={errors.lastname ? true : false}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.lastname?.message}
          </Typography>
        </Grid>
        <Grid item p={1} xs={12} md={6}>
          <TextField
            id="secondLastname"
            name="secondLastname"
            label="Apellido materno"
            fullWidth
            defaultValue={userData ? userData.secondLastname : ""}
            margin="dense"
            {...register("secondLastname")}
            error={errors.secondLastname ? true : false}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.secondLastname?.message}
          </Typography>
        </Grid>
        <Grid item p={1} xs={12} md={8}>
          <TextField
            id="CI"
            name="CI"
            label="CI / Cédula"
            fullWidth
            defaultValue={userData ? userData.CI : ""}
            margin="dense"
            {...register("CI")}
            error={errors.CI ? true : false}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.CI?.message}
          </Typography>
        </Grid>
        <Grid item p={1} xs={12} md={12}>
          <Typography variant="inherit" color="textSecondary">
            Información del Usuario
          </Typography>
        </Grid>
        <Grid item p={1} xs={12} md={8}>
          <TextField
            id="address"
            name="address"
            label="Dirección domiciliaria"
            fullWidth
            defaultValue={userData ? userData.address : ""}
            margin="dense"
            {...register("address")}
            error={errors.address ? true : false}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.address?.message}
          </Typography>
        </Grid>

        <Grid item p={1} xs={12} md={8}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Fecha de nacimiento"
              value={birthdate}
              onChange={(newValue) => {
                setBirthdate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item p={1} xs={12} md={8}>
          <TextField
            id="telephone"
            name="telephone"
            label="Teléfono Celular"
            fullWidth
            defaultValue={userData ? userData.telephone : ""}
            margin="dense"
            {...register("telephone")}
            error={errors.telephone ? true : false}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.telephone?.message}
          </Typography>
        </Grid>

        <Grid item p={1} xs={12} md={8}>
          <FormControl fullWidth>
            <Typography>Estado de Vacunación</Typography>
            <Select
              labelId="stateVaccination"
              id="stateVaccination"
              value={stateVaccination}
              onChange={handleChangeStateVaccination}
            >
              <MenuItem value={"No Vacunado"}>No Vacunado</MenuItem>
              <MenuItem value={"Vacunado"}>Vacunado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {stateVaccination === "Vacunado" ? (
          <>
            <Grid item p={1} xs={12}>
              <Typography>Información de vacunación</Typography>
            </Grid>
            <Grid item p={1} xs={12} md={8}>
              <TextField
                id="outlined-select-typeVaccination"
                select
                label="Tipo vacuna"
                fullWidth
                value={typeVaccination}
                onChange={handleChangeTypeVaccination}
                helperText="Ingrese la vacuna recibida"
              >
                {typesVaccine.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item p={1} xs={12} md={8}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Fecha de vacunación"
                  value={dateDosisVaccine}
                  onChange={(newValue) => {
                    setdateDosisVaccine(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item p={1} xs={12} md={8}>
              <TextField
                id="outlined-select-typeVaccination"
                select
                label="Número de dosis"
                fullWidth
                value={dosisVaccination}
                onChange={handleChangeDosisVaccination}
                helperText="Ingrese el número de dosis recibida"
              >
                {dosisVaccine.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </>
        ) : null}
      </Grid>
      {checkDates ? <Typography>Ingrese la fecha solicitada</Typography> : null}

      <Grid
        p={2}
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Button variant="contained" color="primary" type="submit">
          Actualizar
        </Button>
        <Button onClick={onCancel} color="secondary" variant="contained">
          Cancelar
        </Button>
      </Grid>
    </form>
  );
};

export default FormEditProfile;
