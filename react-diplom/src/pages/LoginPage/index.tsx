import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import "./LoginPage.scss";
import Button from "../../components/Button";
import { authActionCreators } from "../../redux/actions/authActionCreators";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { errorAuthSelector, isLoadingAuthSelector, isAuthAuthSelector } from "../../redux/selectors/authSelectors";
import Preloader from "../../components/Preloader";

const initialLoginForm = { email: "", password: "" };

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState(initialLoginForm);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const errorMessage = useAppSelector(errorAuthSelector);
  const isLoading = useAppSelector(isLoadingAuthSelector);  
  const isAuth = useAppSelector(isAuthAuthSelector);

  useEffect(() => {
    if (isAuth){
      navigate('/blogs', {replace: true});
    }      
  }, [isAuth, navigate]);

  const onLoginFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginForm(prevState => ({ ...prevState, [e.target.id]: e.target.value }));
    }, []);

  const onLoginFormSubmit = useCallback(
    () => 
		  dispatch(authActionCreators.getLogin({ email: loginForm.email, password: loginForm.password })),
	  [dispatch, loginForm.email, loginForm.password]);

  return (
    <>
      {!isLoading ? (
        <>
          <div className="container">
            <div className="wrapper-form">
              {errorMessage && <p>{errorMessage}</p>}
              <Input onChange={onLoginFormChange} fieldName="email" value={loginForm.email} />
              <Input onChange={onLoginFormChange} fieldName="password" value={loginForm.password} />
              <Button type="button" text="Sign in" onClick={onLoginFormSubmit} />
              <div className="wrapper-sing-up">
                <span className="sing-up-text">Don't have an account?</span>
                <Link to ='/registration' >
                  <span className="sing-up-link">Sing Up</span>
                </Link>                
              </div>
            </div>
          </div>
        </>
      ) : ( Preloader )
      }
    </>
  );
};

export default LoginPage;