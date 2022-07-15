import ApiService from "./Api.service";

const userPath = process.env.REACT_APP_BASE_URL + "/screenings";

const getAllScreenings = (): Promise<Screening[]> => {
  return ApiService.get(userPath);
};

const getScreeningById = (screeningId: number): Promise<Screening> => {
  return ApiService.get(userPath + "/" + screeningId);
};

const createScreening = (
  screeningData: Record<string, unknown>
): Promise<Screening> => {
  return ApiService.post(userPath, screeningData);
};

const deleteScreeningById = (screeningID: number): Promise<boolean> => {
  return ApiService.deleteObjectById(userPath + "/" + screeningID);
};

const editScreening = (
  newScreeningData: Record<string, unknown>
): Promise<boolean> => {
  return ApiService.put(userPath, newScreeningData);
};

const screeningService = {
  getAllScreenings,
  createScreening,
  deleteScreeningById,
  editScreening,
  getScreeningById,
};

export default screeningService;
