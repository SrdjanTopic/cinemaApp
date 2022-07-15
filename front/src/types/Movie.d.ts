type Movie = {
  id: number;
  name: string;
  releaseYear: string;
  duration: number;
  image?: string;
  genres?: Genre[];
  Screenings?: Screening[];
};
