import Button from "../shared/Button/Button";
import styles from "./MovieCard.module.scss";

export type MovieCardProps = {
  id: number;
  name: string;
  releaseYear: string;
  duration: number;
  image?: string;
  genres?: Genre[];
  Screenings?: Screening[];
  onClickDelete?: (id: number) => void;
  onClickEdit?: (id: number) => void;
  onClickAddScreening?: (id: number) => void;
};

const MovieCard = ({
  id,
  name,
  releaseYear,
  duration,
  image,
  genres,
  Screenings,
  onClickDelete,
  onClickEdit,
  onClickAddScreening,
}: MovieCardProps) => {
  return (
    <div className={styles.cardDiv}>
      <div className={styles.imageDiv}>
        <img src={image} alt="Movie image" />
      </div>
      <div className={styles.infoDiv}>
        <p className={styles.movieName}>
          Name: {name} ({releaseYear})
        </p>
        <p className={styles.movieDuration}>Duration: {duration} minutes</p>
        <div className={styles.movieGenresDiv}>
          <p key="genres" className={styles.movieGenres}>
            Genres:
          </p>
          {genres?.map((genre: Genre, index) =>
            index !== genres.length - 1 ? (
              <p key={genre.id} className={styles.movieGenres}>
                {genre.name},
              </p>
            ) : (
              <p key={genre.id} className={styles.movieGenres}>
                {genre.name}
              </p>
            )
          )}
        </div>
      </div>

      {onClickEdit ? (
        <div className={styles.buttonWrapper}>
          {
            <Button
              type="button"
              text="EDIT MOVIE"
              variant="secondary"
              className={styles.btn}
              onClick={onClickEdit ? () => onClickEdit(id) : undefined}
            />
          }
          <Button
            type="button"
            text="ADD SCREENING"
            variant="primary"
            className={styles.btn}
            onClick={
              onClickAddScreening ? () => onClickAddScreening(id) : undefined
            }
          />
          <Button
            type="button"
            text="DELETE"
            variant="danger"
            className={styles.btn}
            onClick={onClickDelete ? () => onClickDelete(id) : undefined}
          />
        </div>
      ) : (
        <></>
      )}

      {Screenings ? (
        <div className={styles.screeningsWrapper}>
          <ul className={styles.screenings}>
            {Screenings.map((screening) => (
              <li key={screening.id} className={styles.screeningDate}>
                <a
                  className={styles.screeningLink}
                  href={`/screenings/${screening.id}`}
                >
                  {screening.dateAndTime
                    .toString()
                    .slice(-13)
                    .slice(0, 5)
                    .slice(0, 10)}
                  h
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MovieCard;
