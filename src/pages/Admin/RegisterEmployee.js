import React from "react";
import { Container, Grid, Typography, Paper } from "@mui/material";
import "../../styles/App.css";
import FormNewEmployee from "../../components/FormNewEmployee";

const customStyle = {
  Container: {
    paddingLeft: "60px",
  },
  Paper: {
    backgroundColor: "rgba(255,255,255)",
    padding: "20px",
  },
};

const Register = () => {
  return (
    <div className="fondo">
      <Container style={customStyle.Container}>
        <Grid
          pt={3}
          container
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Paper style={customStyle.Paper}>
            <Grid item py={2} xs={12} md={12}>
              <Typography textAlign={"left"} variant="h5">
                Agregar un empleado
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <FormNewEmployee />
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default Register;
