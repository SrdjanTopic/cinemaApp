import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import { SeatOutput } from "./Seat";

interface ReservationAttributes {
  id: number;
  totalPrice: number;
  numberOfTickets: number;
  isDiscounted: boolean;
  email: string;
  identificationCode: string;
}

export interface ReservationInput
  extends Optional<ReservationAttributes, "id"> {
  MovieId?: number;
  ScreeningId: number;
  UserId?: number;
}
export interface ReservationOutput extends Required<ReservationAttributes> {
  Seats?: SeatOutput[];
}

class Reservation
  extends Model<ReservationAttributes, ReservationInput>
  implements ReservationAttributes
{
  id!: number;
  totalPrice!: number;
  numberOfTickets!: number;
  isDiscounted!: boolean;
  email!: string;
  identificationCode!: string;
}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    numberOfTickets: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    isDiscounted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identificationCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    // Other model options go here
    timestamps: false,
    sequelize: sequelizeConnection, // We need to pass the connection instance
    modelName: "Reservation",
  }
);

export default Reservation;
