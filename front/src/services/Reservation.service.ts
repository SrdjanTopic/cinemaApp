import ApiService from "./Api.service";

type CheckInputDataValidation = {
  passed: boolean;
  message: string;
};

const userPath = process.env.REACT_APP_BASE_URL + "/reservations";

const getAllReservations = (): Promise<Reservation[]> => {
  return ApiService.get(userPath);
};

const getReservationById = (reservationId: number): Promise<Reservation> => {
  return ApiService.get(userPath + "/" + reservationId);
};

const createReservation = (
  reservationData: Reservation
): Promise<Reservation> => {
  return ApiService.post(userPath, reservationData);
};

const cancelReservationById = (reservationID: number): Promise<boolean> => {
  return ApiService.deleteObjectById(userPath + "/" + reservationID);
};

const editReservation = (
  newReservationData: Record<string, unknown>
): Promise<boolean> => {
  return ApiService.put(userPath, newReservationData);
};

const reservationService = {
  getAllReservations,
  createReservation,
  cancelReservationById,
  editReservation,
  getReservationById,
};

export default reservationService;
