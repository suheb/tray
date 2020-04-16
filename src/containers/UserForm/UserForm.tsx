import React, { useState, ChangeEvent } from "react";
import { TextField, Grid, Button } from "@material-ui/core";

interface UserFormProps {
  formData?: { [field: string]: any }
  handleSubmit(formName:string, formData: { [field: string]: any }): void
}
interface InputConfig {
  regex: RegExp,
  error: string
}

const UserForm = (props: UserFormProps) => {
  const formInputConfig: {[field: string]: InputConfig} = {
    name: {
      regex: /\S/,
      error: "Required"
    },
    email: {
      regex: /\S+@\S+\.\S+/,
      error: "Invalid email"
    },
    password: {
      regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\S]{9,}$/,
      error: "Must have atleast 9 characters with atleast 1 number, 1 uppercase + lowercase character."
    }
  }
  const intialFormData = {
    name: "",
    role: "",
    email: "",
    password:""
  }

  const [formData, setFormData] = useState<{ [field: string]: any }>(props.formData || intialFormData);
  const [formError, setFormError] = useState<{ [field: string]: string }>({});

  const isInputValid = (name: string, value: string) => {
    if (name in formInputConfig) {
      return formInputConfig[name].regex.test(value)
    }
    return true
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const name = event.target.id
    // Set error
    if (isInputValid(name, value)) {
      const newFormError = {...formError};
      delete newFormError[name]
      setFormError(newFormError)
    } else {
      setFormError({
        ...formError,
        [name]: formInputConfig[name] ? formInputConfig[name].error : "Invalid"
      })
    }

    // Set field value
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleSubmit = () => {
    const newFormError = { ...formError }
    Object.keys(intialFormData).forEach(fieldName => {
      if (!isInputValid(fieldName, formData[fieldName])) {
        newFormError[fieldName] = formInputConfig[fieldName] ? formInputConfig[fieldName].error : "Invalid"
      }
    })
    if (Object.keys(newFormError).length === 0) {
      props.handleSubmit("user", formData)
    } else {
      setFormError(newFormError)
    }
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
        <TextField
          required
          fullWidth
          id="name"
          label="Name"
          value={formData["name"] || ""}
          error={"name" in formError}
          helperText={formError["name"]}
          onChange={handleChange}
        />
      </Grid>

      <Grid
        item
        xs={12}
      >
        <TextField
          fullWidth
          id="role"
          label="Role"
          value={formData["role"] || ""}
          error={"role" in formError}
          helperText={formError["role"]}
          onChange={handleChange}
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TextField
          fullWidth
          required
          id="email"
          label="Email"
          type="email"
          value={formData["email"] || ""}
          error={"email" in formError}
          helperText={formError["email"]}
          onChange={handleChange}
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TextField
          fullWidth
          required
          id="password"
          label="Password"
          type="password"
          value={formData["password"] || ""}
          error={"password" in formError}
          helperText={formError["password"]}
          onChange={handleChange}
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
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}

export default UserForm;
