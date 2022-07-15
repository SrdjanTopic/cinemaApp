type Reservation = {
  id?: number;
  totalPrice: number;
  numberOfTickets: number;
  email: string;
  isDiscounted: boolean;
  seats: number[];
  screeningId: number;
  identificationCode?: string;
  Screening?: Screening;
  Seats?: Seat[];
};
