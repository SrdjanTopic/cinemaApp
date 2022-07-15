import bcrypt from "bcrypt";
import { DataTypes, Model, Optional } from "sequelize";
import { VerificationTokenInput } from "./VerificationToken";
import sequelizeConnection, { SALT } from "../config";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  isVerified: Boolean;
  isBlocked: Boolean;
  isPasswordValidated: Boolean;
}

export interface UserLoginCredentials {
  usernameOrEmail: string;
  password: string;
}

export interface UserInput extends Optional<UserAttributes, "id"> {
  RoleId: number;
  VerificationToken?: VerificationTokenInput;
}

export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public dateOfBirth!: Date;
  public isVerified!: Boolean;
  public isBlocked!: Boolean;
  public isPasswordValidated!: Boolean;
}

User.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,64}$/g,
        notEmpty: true,
      },
      set(value: string) {
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        const hash = bcrypt.hashSync(value, SALT);
        this.setDataValue("password", hash);
      },
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isPasswordValidated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    // Other model options go here
    timestamps: false,
    sequelize: sequelizeConnection, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
  }
);

export default User;
