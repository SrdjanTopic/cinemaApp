import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import Genre from "./Genre";
import Screening from "./Screening";

interface MovieAttributes {
  id: number;
  name: string;
  releaseYear: string;
  duration: number;
  image: string;
}

export interface MovieInput extends Optional<MovieAttributes, "id"> {
  genres?: number[];
}
export interface MovieOutput extends Required<MovieAttributes> {
  Screenings?: Screening[];
  genres?: Genre[];
}

class Movie
  extends Model<MovieAttributes, MovieInput>
  implements MovieAttributes
{
  public id!: number;
  public name!: string;
  public releaseYear!: string;
  public duration!: number;
  public image!: string;
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    releaseYear: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image: {
      type: DataTypes.STRING(65000),
    },
  },
  {
    // Other model options go here
    timestamps: false,
    sequelize: sequelizeConnection, // We need to pass the connection instance
    modelName: "Movie",
  }
);

export default Movie;
