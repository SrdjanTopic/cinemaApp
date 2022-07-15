import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export enum ROLE {
  Administrator = "Administrator",
  Customer = "Customer",
}

interface RoleAttributes {
  id: number;
  role: ROLE;
}

export interface RoleInput extends Optional<RoleAttributes, "id"> {}
export interface RoleOutput extends Required<RoleAttributes> {}

class Role extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
  id!: number;
  role!: ROLE;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.ENUM("Administrator", "Customer"),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
      defaultValue: "Customer",
    },
  },
  {
    // Other model options go here
    timestamps: false,
    sequelize: sequelizeConnection, // We need to pass the connection instance
    modelName: "Role", // We need to choose the model name
  }
);

export default Role;
