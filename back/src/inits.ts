import sequelizeConnection from "./config";

import { UserInput } from "./models/User";

import * as userRepository from "./repositories/user.repository";

const dbInit = () => {
  const {
    Movie,
    User,
    VerificationToken,
    Genre,
    Role,
    Screening,
    Seat,
    Reservation,
  } = sequelizeConnection.models;
  Movie.belongsToMany(Genre, {
    as: "genres",
    through: "MovieGenres",
    timestamps: false,
  });
  Genre.belongsToMany(Movie, {
    as: "movies",
    through: "MovieGenres",
    timestamps: false,
  });

  User.hasOne(VerificationToken, { onDelete: "cascade" });
  VerificationToken.belongsTo(User, { onDelete: "cascade" });

  Role.hasMany(User);
  User.belongsTo(Role);

  Movie.hasMany(Screening);
  Screening.belongsTo(Movie);

  Screening.hasMany(Seat);
  Seat.belongsTo(Screening);

  Reservation.hasMany(Seat, {
    foreignKey: {
      allowNull: true,
    },
  });
  Seat.belongsTo(Reservation);

  Screening.hasMany(Reservation);
  Reservation.belongsTo(Screening);

  User.hasMany(Reservation);
  Reservation.belongsTo(User);

  sequelizeConnection.sync({ force: true }).then(() => {
    Role.create({
      role: "Administrator",
    });
    Role.create({
      role: "Customer",
    });

    const adminInput: UserInput = {
      username: "admin",
      email: "admin@gmail.com",
      password: "Admin123",
      dateOfBirth: new Date(),
      isVerified: true,
      isBlocked: false,
      isPasswordValidated: true,
      RoleId: 1,
    };
    userRepository
      .createUser(adminInput)
      .then(() => console.log("ADMIN created"));
  });
};

export default dbInit;
