import NavBarItem from "../NavBarItem/NavBarItem";
import { NavBarItemProps } from "../NavBarItem/NavBarItem";
import styles from "./NavBarList.module.scss";

export type NavBarListProps = {
  logo: NavBarItemProps;
  general: NavBarItemProps[];
  options?: NavBarItemProps[];
  loggedIn?: boolean;
};

const NavBarList = ({ logo, general, options, loggedIn }: NavBarListProps) => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbalList}>
        <NavBarItem {...logo} />
        {general.map((generalItem: NavBarItemProps) => (
          <NavBarItem {...generalItem} key={generalItem.text} />
        ))}
        {loggedIn ? (
          <div className={styles.dropdown}>
            {/* TODO: Implement opening profile screen */}
            <button className={styles.dropbtn}>Profile</button>
            <div className={styles.dropdowncontent}>
              {options?.map((option: NavBarItemProps) => (
                <NavBarItem {...option} key={option.text} />
              ))}
            </div>
          </div>
        ) : (
          options?.map((option: NavBarItemProps) => (
            <NavBarItem {...option} key={option.text} />
          ))
        )}
      </ul>
    </nav>
  );
};

export default NavBarList;
