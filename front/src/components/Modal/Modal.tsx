import { ReactNode } from "react";
import ReactModal from "react-modal";
import Button from "../shared/Button/Button";
import CloseIcon from "../../assets/svg/close.svg";
import styles from "./Modal.module.scss";

type ModalProps = {
  content: ReactNode;
  isOpenModal: boolean;
  changeModalState: (type: string) => void;
};

const Modal = ({ content, isOpenModal, changeModalState }: ModalProps) => {
  return (
    <>
      <ReactModal
        isOpen={isOpenModal}
        ariaHideApp={false}
        contentLabel="Minimal Modal Example"
        style={{
          overlay: {
            width: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            alignContent: "center",
            alignItems: "center",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <Button
          type="button"
          text="close"
          onClick={() => changeModalState("")}
          imgSrc={CloseIcon}
          className={styles.closeButton}
        />
        {content}
      </ReactModal>
    </>
  );
};

export default Modal;
