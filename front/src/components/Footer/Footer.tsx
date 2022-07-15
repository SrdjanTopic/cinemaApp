import styles from "./Footer.module.scss";

type FooterProps = {
  text: string;
};

const Footer = ({ text }: FooterProps) => {
  return <footer className={styles.footer}>{text}</footer>;
};
export default Footer;
