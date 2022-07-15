import { FormProps } from "../../components/Form/Form";
import { ButtonProps } from "../../components/shared/Button/Button";
import { HeadingProps } from "../../components/shared/Heading/Heading";
import { InputProps } from "../../components/shared/Input/Input";

const heading: HeadingProps = {
  text: "Login",
  size: "h2",
};

const inputs: InputProps[] = [
  {
    id: "usernameOrEmail",
    label: "Username or Email ",
    name: "usernameOrEmail",
    placeholder: "input username or email",
    required: true,
    type: "text",
  },
  {
    id: "password",
    label: "Password ",
    name: "password",
    placeholder: "input password",
    required: true,
    type: "password",
  },
];

const button: ButtonProps = {
  text: "Login",
  type: "submit",
};

const loginFormData: FormProps = {
  headingData: heading,
  inputs: inputs,
  buttonData: button,
  submitMethod: () => {},
};

export default loginFormData;
