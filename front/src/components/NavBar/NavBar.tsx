import { useEffect, useState } from "react";
import NavBarList from "../shared/NavBarList/NavBarList";
import jwt_decode from "jwt-decode";
import { notLoggedIn } from "../shared/NavBarList/NavBarListData";
import { loggedInAdmin } from "../shared/NavBarList/NavBarListData";
import { loggedInCustomer } from "../shared/NavBarList/NavBarListData";

const NavBar = () => {
  const token = localStorage.getItem("token");

  const [loggedInUser, setLoggedInUser] = useState<Record<string, unknown>>({});
  useEffect(() => {
    if (token) setLoggedInUser(jwt_decode(token));
  }, []);
  switch (loggedInUser.role) {
    case "Administrator":
      return (
        <NavBarList
          logo={loggedInAdmin.logo}
          general={loggedInAdmin.general}
          options={loggedInAdmin.options}
          loggedIn={true}
        />
      );
    case "Customer":
      return (
        <NavBarList
          logo={loggedInCustomer.logo}
          general={loggedInCustomer.general}
          options={loggedInCustomer.options}
          loggedIn={true}
        />
      );
    default:
      return (
        <NavBarList
          logo={notLoggedIn.logo}
          general={notLoggedIn.general}
          options={notLoggedIn.options}
        />
      );
  }
};

export default NavBar;
