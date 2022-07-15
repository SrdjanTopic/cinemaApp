import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface SeatAttributes {
  id: number;
  position: string;
  isAvailable: boolean;
}

export interface SeatInput extends Optional<SeatAttributes, "id" | "position"> {
  ScreeningId?: number;
  ReservationId?: number | null;
}
export interface SeatOutput extends Required<SeatAttributes> {}

class Seat extends Model<SeatAttributes, SeatInput> implements SeatAttributes {
  id!: number;
  position!: string;
  isAvailable!: boolean;
}

Seat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    position: {
      type: DataTypes.STRING,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    // Other model options go here
    timestamps: false,
    sequelize: sequelizeConnection, // We need to pass the connection instance
    modelName: "Seat", // We need to choose the model name
  }
);

export default Seat;
