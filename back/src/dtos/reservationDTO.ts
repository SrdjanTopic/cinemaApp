type ReservationDTO = {
  totalPrice: number;
  numberOfTickets: number;
  email: string;
  isDiscounted: boolean;
  seats: number[];
  screeningId: number;
};
export default ReservationDTO;
