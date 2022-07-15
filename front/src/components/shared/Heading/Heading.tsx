import styles from "./Heading.module.scss";

export type HeadingProps = {
  text: string;
  size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

const Heading = ({ text, size }: HeadingProps) => {
  switch (size) {
    case "h1":
      return <h1 className={styles.heading}>{text}</h1>;
    case "h2":
      return <h2 className={styles.heading}>{text}</h2>;
    case "h3":
      return <h3 className={styles.heading}>{text}</h3>;
    case "h4":
      return <h4 className={styles.heading}>{text}</h4>;
    case "h5":
      return <h5 className={styles.heading}>{text}</h5>;
    case "h6":
      return <h6 className={styles.heading}>{text}</h6>;
  }
};

export default Heading;
