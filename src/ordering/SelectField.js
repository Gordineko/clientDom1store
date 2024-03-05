import React from "react";
import Select from "react-select";
import { useField } from "formik";
import { customStyles } from "./CustomStyles";

function SelectField(props) {
  const [field, state, { setValue, setTouched }] = useField(props.field.name);

  const onChange = ({ value }) => {
    setValue(value);
  };

  return (
    <Select
      className="castom-select"
      {...props}
      onChange={onChange}
      onBlur={setTouched}
      styles={customStyles}
    />
  );
}

export default SelectField;
