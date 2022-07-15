import { FormProps } from "../../components/Form/Form";
import { ButtonProps } from "../../components/shared/Button/Button";
import { HeadingProps } from "../../components/shared/Heading/Heading";
import { InputProps } from "../../components/shared/Input/Input";

const headingCreate: HeadingProps = {
  text: "Add movie",
  size: "h2",
};

const headingEdit: HeadingProps = {
  text: "Edit movie",
  size: "h2",
};

const headingAddScreening: HeadingProps = {
  text: "Add screening",
  size: "h2",
};

const inputsAddScreening: InputProps[] = [
  {
    id: "dateAndTime",
    label: "Date and time",
    name: "dateAndTime",
    placeholder: "Input date and time ",
    required: true,
    type: "datetime-local",
  },
  {
    id: "ticketPrice",
    label: "Ticket price",
    name: "ticketPrice",
    placeholder: "Input ticket price",
    required: true,
    type: "number",
  },
  {
    id: "seatRows",
    label: "Seat rows",
    name: "seatRows",
    placeholder: "Input seat rows",
    required: true,
    type: "number",
  },
  {
    id: "seatColumns",
    label: "Seat columns",
    name: "seatColumns",
    placeholder: "Input seat columns",
    required: true,
    type: "number",
  },
];

const inputsCreate: InputProps[] = [
  {
    id: "name",
    label: "Movie name",
    name: "name",
    placeholder: "Input movie name",
    required: true,
    type: "text",
  },
  {
    id: "releaseYear",
    label: "Movie release year",
    name: "releaseYear",
    placeholder: "Input movie release year",
    required: true,
    type: "text",
  },
  {
    id: "duration",
    label: "Movie duration",
    name: "duration",
    placeholder: "Input movie duration i nminutes",
    required: true,
    type: "number",
  },
  {
    id: "image",
    label: "Movie image",
    name: "image",
    placeholder: "Input movie image",
    required: true,
    type: "file",
  },
];

const inputsEdit: InputProps[] = [
  {
    id: "name",
    label: "Movie name",
    name: "name",
    placeholder: "Input movie name",
    required: true,
    type: "text",
  },
];

const buttonCreate: ButtonProps = {
  text: "Add",
  type: "submit",
};

const buttonEdit: ButtonProps = {
  text: "Edit",
  type: "submit",
};

export const editMovieFormData: FormProps = {
  headingData: headingEdit,
  inputs: inputsEdit,
  buttonData: buttonEdit,
  submitMethod: () => {},
};

export const addScreeningFormData: FormProps = {
  headingData: headingAddScreening,
  inputs: inputsAddScreening,
  buttonData: buttonCreate,
  submitMethod: () => {},
};

const addMovieFormData: FormProps = {
  headingData: headingCreate,
  inputs: inputsCreate,
  buttonData: buttonCreate,
  submitMethod: () => {},
};

export default addMovieFormData;
