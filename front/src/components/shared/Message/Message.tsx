import styles from "./Message.module.scss";

export type MessageProps = {
  type: "success" | "error";
  message: string;
};

const Message = ({ type, message }: MessageProps) => (
  <p className={type === "error" ? styles.error : styles.success}>{message}</p>
);

export default Message;
