import ApiService from "./Api.service";

type checkCredentialsReturnData = {
  passed: boolean;
  message: string;
};

const userPath = process.env.REACT_APP_BASE_URL + "/users";

const getAllUsers = (): Promise<User[]> => {
  return ApiService.get(userPath);
};

const getAllCustomers = (): Promise<User[]> => {
  return ApiService.get(userPath + "/customers");
};

const getUserByEmail = (email: string): Promise<User> => {
  return ApiService.get(userPath + "/user/" + email);
};

const createUser = (userInput: Record<string, unknown>): Promise<User> => {
  return ApiService.post(userPath + "/signup", userInput);
};

// TODO: Create type for login return data
const loginUser = (userInput: Record<string, unknown>): Promise<any> => {
  return ApiService.post(userPath + "/login", userInput);
};

const verifyUser = (verificationToken: string): Promise<string> => {
  return ApiService.get(`${userPath}/verify/${verificationToken}`);
};

const logout = () => {
  localStorage.clear();
  window.location.replace("/");
};

const checkCredentials = (
  credentials: Record<string, unknown>,
  fields: string[]
): checkCredentialsReturnData => {
  let answer: checkCredentialsReturnData = {
    message: "",
    passed: true,
  };
  fields.forEach((field) => {
    switch (field) {
      case "username":
        if (!credentials.username) {
          answer.passed = false;
          answer.message = "You must fill the 'Username' field";
        }
        break;
      case "email":
        if (!credentials.email) {
          answer.passed = false;
          answer.message = "You must fill the 'Email' field";
        } else if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email as string)
        ) {
          answer.passed = false;
          answer.message =
            "That is not an email. Fill the 'Email' field in a valid format!";
        }
        break;
      case "usernameOrEmail":
        if (!credentials.usernameOrEmail) {
          answer.passed = false;
          answer.message = "You must fill the 'Username or Email' field";
        }
        break;
      case "password":
        if (!credentials.password) {
          answer.passed = false;
          answer.message = "You must fill the 'Password' field";
        } else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,64}$/.test(
            credentials.password as string
          )
        ) {
          answer.passed = false;
          answer.message =
            "Password must be atleast 8 characters long and must contain atleast 1 uppercase, 1 lowercase and 1 number character!";
        }
        break;
      case "dateOfBirth":
        if (!credentials.dateOfBirth) {
          answer.passed = false;
          answer.message = "You must input your date of birth";
        }
        break;
    }
  });
  return answer;
};

const userService = {
  getAllUsers,
  getAllCustomers,
  getUserByEmail,
  createUser,
  verifyUser,
  loginUser,
  logout,
  checkCredentials,
};

export default userService;
