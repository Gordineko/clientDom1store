export const customStyles = {
  control: (provided, state) => ({
    ...provided,

    border: "2px solid #7e7e7e",
    boxShadow: "none",
    "&:hover": {
      border: "2px solid #7e7e7e",
    },
    // додаткові стилі для контрольного блоку
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "inherit" : "inherit",
    color: state.isSelected ? "#624ee7" : "#7e7e7e",
    zIndex: 100,
    // додаткові стилі для опцій
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: "10px",
    // додаткові стилі для випадаючого меню
  }),
};
