import React, { useContext, useState } from "react";
import "../style/register.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import remove from "../../MainLanding/image/icone/remove.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CustomContext } from "../../utils/Context";
import { registration } from "../../http/userAPI";

const SigninSchema = Yup.object().shape({
  name: Yup.string().required("Поле должно быть заполнено"),
  surname: Yup.string().required("Поле должно быть заполнено"),
  phoneNumber: Yup.string()
    .matches(/^\+380\d{9}$/, "+380...")
    .required("Поле должно быть заполнено"),
  email: Yup.string()
    .email("email не по канону")
    .required("Поле должно быть заполнено"),
  password: Yup.string()
    .min(6, "Короткий пароль!")
    .required("Поле должно быть заполнено"),
});

function Register({ handleClick, RegActive }) {
  const { users } = useContext(CustomContext);
  const [serverError, setServerError] = useState("");

  const signIn = async (values) => {
    try {
      let user;
      user = await registration(
        values.email,
        values.password,
        values.name,
        values.surname,
        values.phoneNumber
      );
      users.setUser(users);
      users.setIsAuth(true);
      handleClick();
    } catch (e) {
      setServerError(e.response.user.message);
    }
  };
  // function registerUser(values) {
  //   let User = values;
  //   console.log(values);

  //   axios
  //     .post("http://localhost:3330/register", User)
  //     .then(({ data }) => {
  //       setUser({
  //         token: data.accessToken,
  //         ...data.user,
  //       });

  //       localStorage.setItem(
  //         "user",
  //         JSON.stringify({
  //           token: data.accessToken,
  //           ...data.user,
  //         })
  //       );
  //       handleClick();
  //     })
  //     .catch((err) => console.log(err.message));
  // }

  return (
    <div className={RegActive ? "register-active" : "register"}>
      <div className="register__form">
        <div className="register__form-prew">
          <h1>Registration</h1>
          <img onClick={handleClick} src={remove} alt="404" />
        </div>
        <Formik
          initialValues={{
            name: "",
            surname: "",
            phoneNumber: "",
            email: "",
            password: "",
          }}
          validationSchema={SigninSchema}
          onSubmit={(values) => {
            console.log(values);
            signIn(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="register__form-content">
                <label className="register__name-label" htmlFor="name">
                  Имя
                </label>
                <Field className="register__input name" name="name" id="name" />
                {errors.name && touched.name ? (
                  <div className="register__name-msg msg">{errors.name}</div>
                ) : null}
                <label className="register__surname-label" htmlFor="surname">
                  Фамилия
                </label>
                <Field
                  className="register__input surname"
                  name="surname"
                  id="surname"
                />
                {errors.surname && touched.surname ? (
                  <div className="register__surname-msg msg">
                    {errors.surname}
                  </div>
                ) : null}
                <label
                  className="register__phoneNamber-label"
                  htmlFor="phoneNumber"
                >
                  Номер телефона
                </label>
                <Field
                  className="register__input phoneNamber"
                  name="phoneNumber"
                  id="phoneNumber"
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div className="register__phoneNamber-msg msg">
                    {errors.phoneNumber}
                  </div>
                ) : null}
                <label className="register__email-label" htmlFor="email">
                  Эл. почта
                </label>
                <Field
                  className="register__input email"
                  name="email"
                  id="email"
                  type="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && touched.email ? (
                  <div className="register__email-msg msg">{errors.email}</div>
                ) : null}
                <label className="register__password-label" htmlFor="password">
                  Придумайте пароль
                </label>
                <Field
                  className="register__input password"
                  name="password"
                  id="password"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                />

                {errors.password && touched.password && !serverError && (
                  <div className="register__password-msg msg">
                    {errors.password}
                  </div>
                )}

                {serverError && (
                  <div className="register__password-msg msg">
                    {serverError}
                  </div>
                )}

                <button className="register__button" type="submit">
                  Зарегестрироваться
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
