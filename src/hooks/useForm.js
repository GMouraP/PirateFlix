import { useState } from 'react';

function useForm(valoresIniciais) {
  const [values, setValues] = useState(valoresIniciais);

  function setValue(key, value) {
    setValues({
      ...values,
      [key]: value,
    });
  }

  function handleChange(e) {
    setValue(e.target.getAttribute('name'), e.target.value);
  }

  function clearForm() {
    setValues(valoresIniciais);
  }

  function editExistingData(existingData) {
    setValues({ ...values, ...existingData });
  }

  return {
    handleChange,
    editExistingData,
    clearForm,
    values,
  };
}

export default useForm;
