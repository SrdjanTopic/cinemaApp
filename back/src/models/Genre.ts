import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface GenreAttributes {
  id: number;
  name: string;
}

export interface GenreInput extends Optional<GenreAttributes, "id"> {}
export interface GenreOutput extends Required<GenreAttributes> {}

class Genre
  extends Model<GenreAttributes, GenreInput>
  implements GenreAttributes
{
  id!: number;
  name!: string;
}

Genre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    // Other model options go here
    timestamps: false,
    sequelize: sequelizeConnection, // We need to pass the connection instance
    modelName: "Genre", // We need to choose the model name
  }
);

export default Genre;
