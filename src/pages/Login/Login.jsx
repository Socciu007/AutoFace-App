import React, { useState } from 'react';
import './style.scss';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import IconEye from '../../assets/icons/icons-form/IconEye';
import IconEyeSlash from '../../assets/icons/icons-form/IconEyeSlash';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/loading/Loading';
import { login } from '../../sender';
import SnackbarApp from '../../components/Alert';
const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('warning');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('translation');

  const navigateHome = () => {
    navigate('/');
  };

  const showPassword = () => {
    setShowPass(true);
  };
  const hiddenPassword = () => {
    setShowPass(false);
  };
  const postAlert = (message, status = 'warning', duration = 3000) => {
    setStatusMessage(status);
    setMessage(message);
    setTimeout(() => {
      setMessage('');
      setStatusMessage('warning');
    }, duration);
  };
  const handelLogin = async (email, password) => {
    try {
      if (password.length >= 6 && password.length <= 32) {
        setLoading(true);
        const res = await login(email, password);

        if (res && res.code == 1) {
          navigateHome();
        } else if (res.errors.includes('email does not exist')) {
          postAlert(t('Email does not exist. Please sign up'));
        } else {
          postAlert(t('Invalid email or password'));
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__content-logo">{/* <img src={Logo} alt="" /> */}</div>
        <div className="login__content-form">
          <h1 className="login__content-form-title">{t('Welcome back')}!</h1>
          <p className="login__content-form-describe">
            {t('Sign in to continue using Facebook automation')}
            {/* <img style={{ display: 'inline', marginLeft: '1px' }} src={Zeus} alt="" /> */}
          </p>
          <div>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={Yup.object({
                email: Yup.string().required(t('The Email field is required')).email('Invalid email'),
                password: Yup.string()
                  .required(t('The Password field is required'))
                  .min(6, t('Minimum 6 characters required'))
                  .max(32, t('Up to 32 characters')),
              })}
              onSubmit={async (values) => {
                const { email, password } = values;
                await handelLogin(email, password);
              }}
            >
              <Form>
                <div className="input-email">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="text"
                    id="email"
                    name="email"
                    placeholder={t('Enter your email')}
                    className="login__input"
                  />
                  <div className="error">
                    <ErrorMessage name="email"></ErrorMessage>
                  </div>
                </div>
                <div className="input-password">
                  <label htmlFor="password">{t('Password')}</label>
                  <Field
                    type={showPass ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder={t('Enter your password')}
                    className="login__input "
                  />
                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                    {showPass ? (
                      <IconEye className="icon-eye" onClick={hiddenPassword}></IconEye>
                    ) : (
                      <IconEyeSlash className="icon-eye" onClick={showPassword}></IconEyeSlash>
                    )}
                  </div>
                </div>
                <div className="error">
                  <ErrorMessage name="password"></ErrorMessage>
                </div>
                <div className="form__other">
                  <div className="form__other-checkbox">
                    <input defaultChecked={true} type="checkbox" id="remember" name="remember" />
                    <p>{t('Remember me')}</p>
                  </div>
                  <div className="form__other-forgot" onClick={() => {}}>
                    <p>{t('Forgot password?')}</p>
                  </div>
                </div>
                <div>
                  <button type="submit" className="signIn">
                    {loading ? <Loading></Loading> : null}
                    {t('SIGN IN')}
                  </button>
                </div>
                <div>
                  <span>{t('Don’t have an account?')}</span>
                  <span className="notAccount" onClick={() => {}}>
                    {t('Register here')}
                  </span>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      {/* <div className="login__banner">
        <LoginBanner></LoginBanner>
      </div> */}
      <SnackbarApp autoHideDuration={2000} text={message} status={statusMessage}></SnackbarApp>
    </div>
  );
};

export default Login;
