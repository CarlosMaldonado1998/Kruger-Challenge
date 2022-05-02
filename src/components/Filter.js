import React from "react";
import {
  Grid,
  Typography,
  FormControl,
  Radio,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  TextField,
  Button,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Filter = ({
  valueFilter,
  onChangeFilter,
  values,
  setValues,
  onValidate,
}) => {
  return (
    <>
      <FormControl>
        <FormLabel id="select-filter">Estado de Vacunación</FormLabel>
        <RadioGroup
          aria-labelledby="select-filter"
          name="controlled-radio-buttons-group"
          value={valueFilter}
          onChange={onChangeFilter}
        >
          <Grid container>
            <FormControlLabel value="Todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="Vacunado"
              control={<Radio />}
              label="Vacunados"
            />
            <FormControlLabel
              value="No Vacunado"
              control={<Radio />}
              label="No Vacunados"
            />
          </Grid>
          <FormLabel id="select-filter-type">Tipo de vacuna</FormLabel>
          <Grid>
            <FormControlLabel
              value="Sputnik"
              control={<Radio />}
              label="Sputnik"
            />
            <FormControlLabel
              value="AstraZeneca"
              control={<Radio />}
              label="AstraZeneca"
            />
            <FormControlLabel
              value="Pfizer"
              control={<Radio />}
              label="Pfizer"
            />
            <FormControlLabel
              value="Jhonson&Jhonson"
              control={<Radio />}
              label="Jhonson&Jhonson"
            />
          </Grid>
          <FormLabel id="select-filter-date">Rango de vacunación</FormLabel>
          <FormControlLabel
            value="Fechas"
            control={<Radio />}
            label="Añadir Fechas"
          />
        </RadioGroup>
        {valueFilter === "Fechas" ? (
          <>
            <Typography>Agregar Fechas</Typography>
            <Grid container>
              <Grid m={1}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Fecha de inicio"
                    value={values.firstdate}
                    onChange={(newValue) => {
                      setValues({ ...values, firstdate: newValue });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid m={1}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Fecha final"
                    value={values.lastdate}
                    onChange={(newValue) => {
                      setValues({ ...values, lastdate: newValue });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid m={1}>
                <Button onClick={onValidate} variant="contained">
                  Buscar rango
                </Button>
              </Grid>
            </Grid>
          </>
        ) : null}
      </FormControl>
    </>
  );
};

export default Filter;
