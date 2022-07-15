type Screening = {
  id: number;
  dateAndTime: Date;
  ticketPrice: number;
  seatRows: number;
  seatColumns: number;
  MovieId?: number;
  Movie: Movie;
  Seats: Seat[];
};
