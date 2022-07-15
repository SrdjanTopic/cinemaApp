import { NavBarItemProps } from "../NavBarItem/NavBarItem";
import { NavBarListProps } from "./NavBarList";

const logo: NavBarItemProps = {
  type: "logo",
};

const general: NavBarItemProps[] = [
  {
    type: "general",
    href: "/",
    text: "Screenings",
  },
];

const generalAdmin: NavBarItemProps[] = [
  {
    type: "general",
    href: "/",
    text: "Screenings",
  },
  {
    type: "general",
    href: "/genres",
    text: "All genres",
  },
  {
    type: "general",
    href: "/movies",
    text: "All movies",
  },
  {
    type: "general",
    href: "/customers",
    text: "All customers",
  },
];

const optionsLoggedOut: NavBarItemProps[] = [
  {
    type: "option",
    href: "/login",
    text: "Login",
    loggedIn: false,
  },
  {
    type: "option",
    href: "/signup",
    text: "Signup",
    loggedIn: false,
  },
];

const optionsLoggedIn: NavBarItemProps[] = [
  {
    type: "option",
    href: "/reservations-current",
    text: "Active reservations",
    loggedIn: true,
  },
  {
    type: "option",
    href: "/reservations-past",
    text: "Past reservations",
    loggedIn: true,
  },
  {
    type: "option",
    href: "#",
    text: "Logout",
    loggedIn: true,
  },
];

export const notLoggedIn: NavBarListProps = {
  logo: logo,
  general: general,
  options: optionsLoggedOut,
};

export const loggedInAdmin: NavBarListProps = {
  logo: logo,
  general: generalAdmin,
  options: optionsLoggedIn,
};

export const loggedInCustomer: NavBarListProps = {
  logo: logo,
  general: general,
  options: optionsLoggedIn,
};
