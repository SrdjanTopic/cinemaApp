import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface ScreeningAttributes {
  id: number;
  dateAndTime: Date;
  ticketPrice: number;
  seatRows: number;
  seatColumns: number;
}

export interface ScreeningInput extends Optional<ScreeningAttributes, "id"> {
  MovieId?: number;
}
export interface ScreeningOutput extends Required<ScreeningAttributes> {}

class Screening
  extends Model<ScreeningAttributes, ScreeningInput>
  implements ScreeningAttributes
{
  id!: number;
  dateAndTime!: Date;
  ticketPrice!: number;
  seatRows!: number;
  seatColumns!: number;
}

Screening.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dateAndTime: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: new Date(),
      validate: {
        notEmpty: true,
      },
    },
    ticketPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    seatRows: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    seatColumns: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    // Other model options go here
    timestamps: false,
    sequelize: sequelizeConnection, // We need to pass the connection instance
    modelName: "Screening",
  }
);

export default Screening;
