import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface VerificationTokenAttributes {
  id?: number;
  uuid?: string;
  createdAt?: Date;
  updatedAt?: Date;
  UserId?: number;
}

export interface VerificationTokenInput
  extends Optional<
    VerificationTokenAttributes,
    "id" | "uuid" | "createdAt" | "updatedAt" | "UserId"
  > {
  UserId?: number;
}

export interface VerificationTokenOutput
  extends Required<VerificationTokenAttributes> {
  UserId: number;
}

class VerificationToken
  extends Model<VerificationTokenAttributes, VerificationTokenInput>
  implements VerificationTokenAttributes
{
  id!: number;
  uuid!: string;
  createdAt!: Date;
  updatedAt!: Date;
  UserId!: number;
}

VerificationToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    // Other model options go here
    timestamps: true,
    sequelize: sequelizeConnection, // We need to pass the connection instance
    modelName: "VerificationToken", // We need to choose the model name
  }
);

export default VerificationToken;
