import Input, { InputProps } from "../shared/Input/Input";
import Heading, { HeadingProps } from "../shared/Heading/Heading";
import Button, { ButtonProps } from "../shared/Button/Button";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./Form.module.scss";
import Message, { MessageProps } from "../shared/Message/Message";

export type FormProps = {
  headingData?: HeadingProps;
  inputs: InputProps[];
  buttonData: ButtonProps;
  statusMessage?: MessageProps;
  submitMethod: (formState: Record<string, unknown>) => void;
  values?: any[];
};

const Form = ({
  headingData,
  inputs,
  buttonData,
  statusMessage,
  submitMethod,
  values,
}: FormProps) => {
  const [formState, setFormState] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (values) {
      values.forEach((value, index: number) =>
        setFormState((prevState) => ({
          ...prevState,
          [inputs[index].name]: value,
        }))
      );
    }
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitMethod(formState);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const stateItems = formState[name] ? (formState[name] as number[]) : [];
    const itemIndex = stateItems.findIndex(
      (item: number) => item === Number.parseInt(value)
    );
    if (itemIndex !== -1) {
      stateItems.splice(itemIndex, 1);
    } else {
      stateItems.push(Number.parseInt(value));
    }
    setFormState((prevState) => ({ ...prevState, [name]: stateItems }));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (e.target.files) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = function () {
        setFormState((prevState) => ({ ...prevState, image: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      if (name === "dateAndTime")
        setFormState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      else setFormState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  return (
    <form className={styles.form}>
      {headingData && (
        <Heading text={headingData.text} size={headingData.size} />
      )}
      {inputs.map((input: InputProps) => (
        <>
          <Input
            key={input.id}
            id={input.id}
            label={input.label}
            required={input.required}
            type={input.type}
            name={input.name}
            placeholder={input.placeholder}
            selectOptions={input.selectOptions}
            value={input.type !== "file" ? formState[input.name] : ""}
            onInputChange={
              input.type !== "select" ? onInputChange : handleSelectChange
            }
          />
          {input.type === "file" && (
            <div className={styles.imageDiv}>
              <img src={formState[input.name] as string} />
            </div>
          )}
        </>
      ))}
      {statusMessage && (
        <Message message={statusMessage.message} type={statusMessage.type} />
      )}
      <Button
        text={buttonData.text}
        type={buttonData.type}
        onClick={onSubmit}
        className={styles.submitBtn}
      />
    </form>
  );
};

export default Form;
