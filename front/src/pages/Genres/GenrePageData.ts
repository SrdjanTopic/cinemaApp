import { FormProps } from "../../components/Form/Form";
import { ButtonProps } from "../../components/shared/Button/Button";
import { HeadingProps } from "../../components/shared/Heading/Heading";
import { InputProps } from "../../components/shared/Input/Input";

const headingCreate: HeadingProps = {
  text: "Add genre",
  size: "h2",
};

const inputsCreate: InputProps[] = [
  {
    id: "name",
    label: "Genre name",
    name: "name",
    placeholder: "Input genre name",
    required: true,
    type: "text",
  },
];

const buttonCreate: ButtonProps = {
  text: "Add",
  type: "submit",
};

const headingEdit: HeadingProps = {
  text: "Edit genre",
  size: "h2",
};

const inputsEdit: InputProps[] = [
  {
    id: "name",
    label: "Genre name",
    name: "name",
    placeholder: "Input genre name",
    required: true,
    type: "text",
  },
];

const buttonEdit: ButtonProps = {
  text: "Edit",
  type: "submit",
};

export const editGenreFormData: FormProps = {
  headingData: headingEdit,
  inputs: inputsEdit,
  buttonData: buttonEdit,
  submitMethod: () => {},
};

const addGenreFormData: FormProps = {
  headingData: headingCreate,
  inputs: inputsCreate,
  buttonData: buttonCreate,
  submitMethod: () => {},
};

export default addGenreFormData;
