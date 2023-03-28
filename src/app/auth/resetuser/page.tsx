'use client';

import { useState, useEffect } from "react";
import "./authStyles.css"

interface Fields {
  username: string;
}

function ResetUser() {
  const initialValues: Fields = { username: ""};

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
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.username) {
      errors.username = "Username is required!";
    }
    
    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Reset Username</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="form">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ResetUser;
