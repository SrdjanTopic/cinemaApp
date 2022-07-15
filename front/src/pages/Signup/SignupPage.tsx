import Form from "../../components/Form/Form";
import userService from "../../services/User.service";
import { useState } from "react";
import { MessageProps } from "../../components/shared/Message/Message";
import signupFormData from "./SignupFormData";

const SignupPage = () => {
  const [statusMessage, setStatusMessage] = useState<MessageProps>({
    message: "",
    type: "success",
  });

  const checkCredentials = (signupCredentials: Record<string, unknown>) => {
    const checkCreds = userService.checkCredentials(signupCredentials, [
      "dateOfBirth",
      "password",
      "email",
      "username",
    ]);
    if (checkCreds.passed) handleSignup(signupCredentials);
    else
      setStatusMessage({
        message: checkCreds.message,
        type: "error",
      });
  };

  const handleSignup = (signupCredentials: Record<string, unknown>) => {
    userService
      .createUser(signupCredentials)
      .then(() => {
        setStatusMessage({
          message:
            "Signup successful! Check your email to verify your account!",
          type: "success",
        });
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
      headingData={signupFormData.headingData}
      inputs={signupFormData.inputs}
      buttonData={signupFormData.buttonData}
      submitMethod={checkCredentials}
      statusMessage={statusMessage}
    />
  );
};

export default SignupPage;
