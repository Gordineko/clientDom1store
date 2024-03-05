import React, { useState } from "react";
import "../style/auth.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import remove from "../../MainLanding/image/icone/remove.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { CustomContext } from "../../utils/Context";
import { login, registration } from "../../http/userAPI";
import { observer } from "mobx-react-lite";

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("email не по канону")
    .required("Поле должно быть заполнено"),
  password: Yup.string()
    .min(6, "Короткий пароль!")
    .max(50, "Много символов!")
    .required("Поле должно быть заполнено"),
});

const Auth = observer(({ AuthActive, handleClick, RegActive }) => {
  const { users } = useContext(CustomContext);
  const [serverError, setServerError] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // function loginUser(values) {
  //   let User = values;
  //   console.log(values);

  //   axios
  //     .post("http://localhost:3330/signin", User)
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
  //     .catch((err) => console.log(err));
  // }
  const signIn = async (values) => {
    try {
      let user;
      user = await login(values.email, values.password);
      users.setUser(users);
      users.setIsAuth(true);
      users.setRole(user.role);
      console.log(users.userRole);
      handleClick();
    } catch (e) {
      setServerError(e.response.data.message);
    }
  };

  return (
    <div className={AuthActive ? "authoriz-active" : "authoriz"}>
      <div className="authoriz__form">
        <div className="authoriz__form-prew">
          <h1>Log in</h1>
          <img onClick={handleClick} src={remove} alt="404" />
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SigninSchema}
          onSubmit={(values) => {
            signIn(values);
            // loginUser(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="authoriz__form-content">
                <label className="authoriz__email-label" htmlFor="email">
                  Email
                </label>
                <Field
                  className="authoriz__input email"
                  name="email"
                  type="email"
                />
                {errors.email && touched.email ? (
                  <div className="authoriz__email-msg">{errors.email}</div>
                ) : null}
                <label className="authoriz__password-label" htmlFor="email">
                  Password
                </label>
                <Field className="authoriz__input password" name="password" />
                {errors.password && touched.password && !serverError && (
                  <div className="authoriz__password-msg">
                    {errors.password}
                  </div>
                )}

                {serverError && (
                  <div className="authoriz__password-msg">{serverError}</div>
                )}
                <button className="authoriz__button" type="submit">
                  Войти
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <span className="authoriz__register-btn" onClick={RegActive}>
          Зарегестрироваться
        </span>
      </div>
    </div>
  );
});
export default Auth;
