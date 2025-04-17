import Card from "../../../app/shared/components/UIElements/Card";
import Button from "../../../app/shared/components/FormElements/Button";
import Input from "../../../app/shared/components/FormElements/Input";
import ErrorModal from "../../../app/shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../app/shared/components/UIElements/LoadingSpinner";

import { useForm } from "../../../app/shared/hooks/form-hook";
import { useContext, useState } from "react";
import { AuthContext } from "../../../app/shared/context/auth-context";
import { useLocation, useNavigate } from "react-router-dom";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../app/shared/util/validators";
import "./Auth.css";
import { useHttpClient } from "../../../app/shared/hooks/http-hook";

export default function Auth() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [isLogin, setIsLogin] = useState(true);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  });

  const switchModeHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: "undefined",
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLogin((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLogin) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.user.id);
        navigate(from, { replace: true });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(responseData.user.id);
        navigate(from, { replace: true });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLogin && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name"
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLogin ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO SIGNUP
        </Button>
      </Card>
    </div>
  );
}
