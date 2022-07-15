import Form from "../../components/Form/Form";
import userService from "../../services/User.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MessageProps } from "../../components/shared/Message/Message";
import loginFormData from "./LoginFormData";

const LoginPage = () => {
  const nav = useNavigate();
  const [statusMessage, setStatusMessage] = useState<MessageProps>({
    message: "",
    type: "success",
  });

  const checkCredentials = (signupCredentials: Record<string, unknown>) => {
    const checkCreds = userService.checkCredentials(signupCredentials, [
      "password",
      "usernameOrEmail",
    ]);
    if (checkCreds.passed) handleLogin(signupCredentials);
    else
      setStatusMessage({
        message: checkCreds.message,
        type: "error",
      });
  };
  const handleLogin = (loginCredentials: Record<string, unknown>) => {
    userService
      .loginUser(loginCredentials)
      .then((result) => {
        localStorage.setItem("token", result.token);
        nav("/");
        window.location.reload();
      })
      .catch((err) => {
        setStatusMessage({
          message: err.response.data,
          type: "error",
        });
      });
  };

  return (
    <Form
      headingData={loginFormData.headingData}
      inputs={loginFormData.inputs}
      buttonData={loginFormData.buttonData}
      submitMethod={checkCredentials}
      statusMessage={statusMessage}
    />
  );
};

export default LoginPage;
