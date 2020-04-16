import React, { useState, useEffect } from "react";
import { Grid, Button, ButtonGroup } from "@material-ui/core";
import UserForm from "../UserForm/UserForm";
import PrivacyForm from "../PrivacyForm/PrivacyForm";
import DoneForm from "../DoneForm/DoneForm";


const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [fullFormData, setFullFormData] = useState<{ [name: string]: Object }>({});

  const handleSubmit = (formName: string, formData: { [name: string]: any }) => {
    setFullFormData({
      ...fullFormData,
      [formName]: formData
    });
    setActiveStep(activeStep + 1);
  }
  const handleBack = () => setActiveStep(activeStep - 1)
  const getStepContent = (step: number) => Object.values(steps)[step]
  const isActiveStep = (step: number) => step === activeStep

  const steps = {
    "User": (
      <UserForm
        formData={fullFormData["user"]}
        handleSubmit={handleSubmit}
      />
    ),
    "Privacy": (
      <PrivacyForm
        formData={fullFormData["privacy"]}
        handleSubmit={handleSubmit}
        handleBack={handleBack} />
    ),
    "Done": (
      <DoneForm />
    )
  }

  useEffect(() => {
    if (activeStep === Object.keys(steps).length - 1) {
      console.log(fullFormData);
    }
  }, [activeStep, steps, fullFormData]);

  return (
    <Grid
      container
      direction="column"
      alignContent="center"
    >
      <Grid
        item
        xs={4}
      >
        <ButtonGroup color="secondary" fullWidth>
          {Object.keys(steps).map((step, index) => <Button key={step} disabled={!isActiveStep(index)}>{step}</Button>)}
        </ButtonGroup>
      </Grid>
      <Grid
        item
        xs={4}
      >
        <>
          {getStepContent(activeStep)}
        </>
      </Grid>
    </Grid>
  )
}

export default MultiStepForm;
