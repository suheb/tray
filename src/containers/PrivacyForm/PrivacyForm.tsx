import React, { useState, ChangeEvent } from "react";
import { Grid, Button, FormControlLabel, Checkbox } from "@material-ui/core";


interface PrivacyFormProps {
  formData?: { [field: string]: any }
  handleBack(): void
  handleSubmit(formName: string, formData: { [field: string]: any }): void
}

const PrivacyForm = (props: PrivacyFormProps) => {
  const initialFormData = {
    "firstPartyEmail": false,
    "thirdPartyEmail": false
  }
  const [formData, setFormData] = useState<{ [field: string]: any }>(props.formData || initialFormData)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked
    const name = event.target.id

    // Set field value
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = () => {
    props.handleSubmit("privacy", formData);
  }
  return (
    <Grid
      container
      justify="flex-end"
      spacing={2}
    >
      <Grid
        item
        xs={12}
      >
        <FormControlLabel
          control={
            <Checkbox
              id="firstPartyEmail"
              color="primary"
              checked={formData["firstPartyEmail"] || false}
              onChange={handleChange}
            />
          }
          label="Receive updates about Tray.io products by email"
        />
      </Grid>

      <Grid
        item
        xs={12}
      >
        <FormControlLabel
          control={
            <Checkbox
              id="thirdPartyEmail"
              color="primary"
              checked={formData["thirdPartyEmail"] || false}
              onChange={handleChange}
            />
          }
          label="Receive communication by email for other products created by the Tray.io team"
        />
      </Grid>
      <Grid
        item
        xs={3}
      >
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={props.handleBack}
        >
          Back
        </Button>
      </Grid>
      <Grid
        item
        xs={3}
      >
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}

export default PrivacyForm;
