import React, { useState } from "react";
import "./admin.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { CustomContext } from "../utils/Context";
import { loginAdmin } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("email не по канону")
    .required("Поле должно быть заполнено"),
  password: Yup.string()
    .min(6, "Короткий пароль!")
    .max(50, "Много символов!")
    .required("Поле должно быть заполнено"),
});

const AdminAuth = observer(() => {
  const { users } = useContext(CustomContext);
  const [serverError, setServerError] = useState("");

  const signIn = async (values) => {
    try {
      let user;
      user = await loginAdmin(values.email, values.password);
      users.setRole(user.role);
      window.location.reload();
    } catch (e) {
      if (e.response && e.response.data) {
        setServerError(e.response.data.message);
      } else {
        setServerError("Произошла ошибка при обработке запроса.");
      }
    }
  };

  return (
    <div className="admin">
      <span className="admin__logo-bg">DOM1STORE</span>
      <div className="admin__form">
        <div className="admin__form-prew">
          <p>Админ панель</p>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SigninSchema}
          onSubmit={(values) => {
            signIn(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="admin__form-content">
                <label className="admin__label" htmlFor="email">
                  Email
                </label>
                <Field className="admin__input" name="email" type="email" />
                {errors.email && touched.email ? (
                  <div className="admin__email-msg">{errors.email}</div>
                ) : null}
                <label className="admin__label" htmlFor="email">
                  Password
                </label>
                <Field className="admin__input" name="password" />
                {errors.password && touched.password && !serverError && (
                  <div className="admin__password-msg">{errors.password}</div>
                )}

                {serverError && (
                  <div className="admin__password-msg">{serverError}</div>
                )}
                <button className="admin__button" type="submit">
                  Войти
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
});
export default AdminAuth;
