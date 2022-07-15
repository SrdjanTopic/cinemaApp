import userService from "../../../services/User.service";
import styles from "./NavBarItem.module.scss";
import Logo from "../../../assets/svg/logo.svg";

export type NavBarItemProps = {
  type: "logo" | "general" | "option";
  href?: string;
  text?: string;
  loggedIn?: boolean;
};
// TODO: Put <Link /> component instead of <a> element
const NavBarItem = ({ type, href, text, loggedIn }: NavBarItemProps) => {
  switch (type) {
    case "logo":
      return (
        <li className={styles.lilogo}>
          <a href="/">
            <img src={Logo} />
          </a>
        </li>
      );
    case "general":
      return (
        <li>
          <a href={href}>{text}</a>
        </li>
      );
    case "option": {
      if (loggedIn) {
        if (text === "Logout") {
          return (
            <li>
              <a href={href} onClick={userService.logout}>
                {text}
              </a>
            </li>
          );
        } else {
          return (
            <li>
              <a href={href}>{text}</a>
            </li>
          );
        }
      } else {
        return (
          <li style={{ float: "right" }}>
            <a href={href}>{text}</a>
          </li>
        );
      }
    }
  }
};

export default NavBarItem;
