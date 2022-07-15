import { useEffect, useState } from "react";
import CardView from "../../components/CardView/CardView";
import Heading from "../../components/shared/Heading/Heading";
import SelectFilter from "../../components/shared/SelectFilter/SelectFilter";
import TopFilter from "../../components/TopFilter/TopFilters";
import genreService from "../../services/Genre.service";
import movieService from "../../services/Movie.service";
import dateRange from "../../utils/dateFunctions";

const ScreeningsPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [allGenres, setAllGenres] = useState<Genre[]>([]);
  const startDate: Date = new Date();
  const endDate: Date = new Date();
  endDate.setDate(startDate.getDate() + 6);
  let days: Date[] = dateRange(startDate, endDate);
  const [selectedFilter, setSelectedFilter] = useState<boolean[]>(
    [true].concat(new Array(days.length - 1).fill(false))
  );
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedGenre, setSelectedGenre] = useState<string>("none");

  useEffect(() => {
    movieService.getAllMoviesWithScreenings(new Date()).then((gotMovies) => {
      gotMovies.forEach((movie) => {
        movie.Screenings?.sort(
          (a, b) =>
            new Date(a.dateAndTime).getTime() -
            new Date(b.dateAndTime).getTime()
        );
      });
      console.log(gotMovies);
      setMovies(gotMovies);
    });
    genreService.getAllGenres().then((genres) => setAllGenres(genres));
  }, []);

  const onClickSelect = (id: number) => {
    setSelectedDay(id);
    let filters = new Array(days.length).fill(false);
    filters[id] = true;
    setSelectedFilter(filters);
    movieService.getAllMoviesWithScreenings(days[id]).then((gotMovies) => {
      gotMovies.forEach((movie) => {
        movie.Screenings?.sort(
          (a, b) =>
            new Date(a.dateAndTime).getTime() -
            new Date(b.dateAndTime).getTime()
        );
      });
      setMovies(gotMovies);
      if (selectedGenre !== "none") {
        let filteredMovies: Movie[] = [];
        gotMovies.forEach((movie) => {
          let genreNames: string[] = [];
          movie.genres?.forEach((genre) => genreNames.push(genre.name));
          if (genreNames.includes(selectedGenre)) filteredMovies.push(movie);
        });
        setMovies(filteredMovies);
      }
    });
  };

  const onSelectFilterChange = (filter: string) => {
    setSelectedGenre(filter);
    if (filter === "none") onClickSelect(selectedDay);
    else {
      let filteredMovies: Movie[] = [];
      movies.forEach((movie) => {
        let genreNames: string[] = [];
        movie.genres?.forEach((genre) => genreNames.push(genre.name));
        if (genreNames.includes(filter)) filteredMovies.push(movie);
      });
      setMovies(filteredMovies);
    }
  };

  return (
    <>
      <Heading size="h2" text="Movie screenings" />
      <TopFilter
        type="days"
        days={days}
        selected={selectedFilter}
        onClickSelect={onClickSelect}
      />
      <SelectFilter
        onChange={onSelectFilterChange}
        optionValues={allGenres.map((genre) => {
          return genre.name;
        })}
      />
      <CardView movieCards={movies} />
    </>
  );
};

export default ScreeningsPage;
