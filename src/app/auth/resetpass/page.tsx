'use client';

import { useState, useEffect } from "react";
import "./authStyles.css"

interface Fields {
  password: string;
}

function resetPass() {
  const initialValues = { password: "" };

  const [formValues, setFormValues] = useState<Fields>(initialValues);
  const [formErrors, setFormErrors] = useState<Fields>(initialValues);

  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values: Fields) => {
    const errors: Fields = initialValues;

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    
    return errors;
  };

  return (
    <div className="container">

      <form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="form">
            <label>Reset Password</label>
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default resetPass;
