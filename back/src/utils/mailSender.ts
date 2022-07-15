import { toNumber } from "lodash";
import nodemailer from "nodemailer";
import { ReservationInput, ReservationOutput } from "../models/Reservation";
import { UserOutput } from "../models/User";
require("dotenv").config();

export const sendVerificationEmail = async (
  recieverEmail: string,
  token: string
) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    port: toNumber(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from: process.env.MAIL_USERNAME, // sender address
    to: recieverEmail, // list of receivers
    subject: "Account verification", // Subject line
    text: `Please follow the next link to verify your account http://localhost:3000/users/verify/${token}`, // plain text body
  });
  console.log(`Verification token sent to: ${recieverEmail}`);
};

export const sendReservationEmail = async (
  reservation: ReservationOutput,
  user: UserOutput | null
) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    port: toNumber(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  let text: string = "";
  let seats: string = ": ";
  reservation.Seats?.forEach((seat) => {
    seats = seats + `${seat.position} : `;
  });
  user === null
    ? (text =
        "You successfully created a reservation in our cinema!\n\n" +
        "RESERVATION INFO:\n\n" +
        `Identification code: ${reservation.identificationCode}\n` +
        `Total price: ${reservation.totalPrice}\n` +
        `Number of tickets: ${reservation.numberOfTickets}\n` +
        `Seats: ${seats}\n` +
        `Discount: NO DISCOUNT (A fast reservation was created, where the user input his email)\n` +
        `Email: ${reservation.email}\n\n\n` +
        `(if you want to cancel the reservation you must go to the cinema and ask for cancelation and a refund)`)
    : (text =
        "You successfully created a reservation in our cinema!\n\n" +
        "RESERVATION INFO:\n\n" +
        `Identification code: ${reservation.identificationCode}\n` +
        `Total price: ${reservation.totalPrice}\n` +
        `Number of tickets: ${reservation.numberOfTickets}\n` +
        `Seats: ${seats}\n` +
        `Discount: 5%\n` +
        `Email: ${reservation.email}\n` +
        `Username: ${user.username}\n\n\n` +
        `(if you want to cancel the reservation you can go to the cinema and ask for cancelation and a refund OR you can find the reservation on your profile and cancel it there)`);
  let info = await transporter.sendMail({
    from: process.env.MAIL_USERNAME, // sender address
    to: reservation.email, // list of receivers
    subject: "Reservation information", // Subject line
    text: text, // plain text body
  });
  console.log(`Reservation info sent to: ${reservation.email}`);
};
