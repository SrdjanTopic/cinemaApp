import styles from "./CardView.module.scss";

import MovieCard, { MovieCardProps } from "../MovieCard/MovieCard";

export type CardViewProps = {
  movieCards: MovieCardProps[];
  onClickDelete?: (id: number) => void;
  onClickEdit?: (id: number) => void;
  onClickAddScreening?: (id: number) => void;
};

const CardView = ({
  movieCards,
  onClickDelete,
  onClickEdit,
  onClickAddScreening,
}: CardViewProps) => (
  <div className={styles.cardViewDiv}>
    {movieCards.map((movie: MovieCardProps) => (
      <MovieCard
        {...movie}
        key={movie.id}
        Screenings={movie.Screenings}
        onClickDelete={onClickDelete}
        onClickEdit={onClickEdit}
        onClickAddScreening={onClickAddScreening}
      />
    ))}
  </div>
);

export default CardView;
