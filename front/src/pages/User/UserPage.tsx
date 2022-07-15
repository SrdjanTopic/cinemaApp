import { useEffect, useState } from "react";
import Heading from "../../components/shared/Heading/Heading";
import Table from "../../components/Table/Table";
import userService from "../../services/User.service";

const UserPage = () => {
  const headers: string[] = [
    "id",
    "username",
    "email",
    "dateOfBirth",
    "isVerified",
    "isBlocked",
    "isPasswordValidated",
  ];

  const [selectedUser, setSelectedUser] = useState<number>(0);

  const [users, setUsers] = useState<User[]>([]);

  const selectUser = (id: number) => {
    setSelectedUser(id);
    console.log(id);
  };
  useEffect(() => {
    userService
      .getAllUsers()
      .then((gotUsers) => {
        setUsers(gotUsers);
      })
      .catch((error) => console.log(error));
  });
  return (
    <>
      <Heading size="h2" text="All Users" />
      <Table
        itemOnSelect={selectUser}
        items={users}
        headers={headers}
        selectedItem={selectedUser}
      />
    </>
  );
};
export default UserPage;
