import { useState } from 'react';

export function useValidate(def) {
  const [values, setValues] = useState({ query: def });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const t = e.target;
    setError({ ...error, [t.name]: t.validationMessage });
    setValues({ ...values, [t.name]: t.value });
  };

  const resetForm = () => {
    setError({});
    setValues({});
  };

  return { values, error, resetForm, handleChange, setValues };
}

export function useDisable() {
  const [disabled, setDisabled] = useState(true);

  const validateInputs = (error, formInputs) => {
    if (!error || !Object.entries(error).length) return;
    const allValid = [...formInputs].every((input) => input.validity.valid);

    setDisabled(!allValid);
  };

  return { disabled, validateInputs, setDisabled };
}
