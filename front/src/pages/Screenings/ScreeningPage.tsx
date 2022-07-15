import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ScreeningView from "../../components/ScreeningView/ScreeningView";
import Heading from "../../components/shared/Heading/Heading";
import screeningService from "../../services/Screening.service";

const ScreeningPage = () => {
  const params = useParams();
  const id: string | undefined = params.screeningId;

  const [screening, setScreening] = useState<Screening>();

  useEffect(() => {
    if (id) {
      screeningService
        .getScreeningById(parseInt(id))
        .then((screening) => {
          screening.Seats.sort((a, b) => a.id - b.id);
          setScreening(screening);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  return screening ? (
    <ScreeningView
      id={screening.id}
      movie={screening.Movie}
      dateAndTime={screening.dateAndTime}
      ticketPrice={screening.ticketPrice}
      seatColumns={screening.seatColumns}
      seatRows={screening.seatRows}
      seats={screening.Seats}
    />
  ) : (
    <Heading size="h2" text="Screening not found!" />
  );
};
export default ScreeningPage;
