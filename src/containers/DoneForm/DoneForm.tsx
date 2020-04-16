import React from "react";
import { Grid, Typography } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';


const DoneForm = () => {
  return (
    <Grid
      container
      justify="center"
      spacing={2}
    >
      <Grid
        item
        xs={2}
      >
        <DoneIcon fontSize="large" color="primary" />
      </Grid>

      <Grid
        item
        xs={12}
      >
        <Typography variant="subtitle1" color="primary" gutterBottom>
          Please verify your email address, you should have received an email from us already!
        </Typography>
      </Grid>
    </Grid>
  )
}

export default DoneForm;
