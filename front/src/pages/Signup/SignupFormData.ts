import { FormProps } from "../../components/Form/Form";
import { ButtonProps } from "../../components/shared/Button/Button";
import { HeadingProps } from "../../components/shared/Heading/Heading";
import { InputProps } from "../../components/shared/Input/Input";

const heading: HeadingProps = {
  text: "Signup",
  size: "h2",
};

const inputs: InputProps[] = [
  {
    id: "username",
    label: "Username ",
    name: "username",
    placeholder: "input username ",
    required: true,
    type: "text",
  },
  {
    id: "email",
    label: "Email ",
    name: "email",
    placeholder: "input email ",
    required: true,
    type: "email",
  },
  {
    id: "password",
    label: "Password ",
    name: "password",
    placeholder: "input password",
    required: true,
    type: "password",
  },
  {
    id: "dateOfBirth",
    label: "Date of birth ",
    name: "dateOfBirth",
    required: true,
    type: "date",
  },
];

const button: ButtonProps = {
  text: "Signup",
  type: "submit",
};

const signupFormData: FormProps = {
  headingData: heading,
  inputs: inputs,
  buttonData: button,
  submitMethod: () => {},
};

export default signupFormData;
