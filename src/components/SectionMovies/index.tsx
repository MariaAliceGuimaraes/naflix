import { rgb } from 'polished';
import React, { useCallback, useMemo, useState } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaThumbsDown,
  FaThumbsUp,
  FaPlus,
} from 'react-icons/fa';


import {
  Container,
  ContentMovies,
  Movie,
  MovieCard,
  MovieCardControll,
  ButtonLetf,
  ButtonRight,
  MovieButtonPlay,
  MovieButtons,
} from './styles';

interface SectionMoviesProps {
  movies: MovieProps[];
  name: string;
}

interface MovieProps {
  id: string;
  name?: string;
  title?: string;
  overview: string;
  poster_path: string;
}

const SectionMovies: React.FC<SectionMoviesProps> = ({ name, movies }) => {
  const [marginContent, setMarginContent] = useState(0);

  const MAX_WIDTH_CONTENT = useMemo(() => movies.length * 220, [movies]);

  const handleScrollMovies = useCallback(
    direction => {
      setMarginContent(stateMargin => {
        const newValue = stateMargin + (direction === 'left' ? -400 : 400);

        const isError =
          MAX_WIDTH_CONTENT + newValue < window.innerWidth || newValue === 400;

        return isError ? stateMargin : newValue;
      });
    },
    [MAX_WIDTH_CONTENT],
  );

  return (
    <Container>

      <div style={{ display: 'flex' }}>

        <MovieButtons style={{ display: 'flex',
                                alignItems: 'center',
                                width: 225 }}
        >

            {/* <MovieButtonPlay href="/" style={{ borderRadius: 5,
                                            paddingTop: 10,
                                            paddingLeft: 14,
                                            paddingRight: 10,
                                            marginLeft: 9,
                                            marginRight: 5,
                                            width: 110,
                                            fontSize: 16}}
          >
            <FaPlay style={{marginRight: 7 }}/> Preview

          </MovieButtonPlay> */}

          <MovieButtonPlay href="/" style={{ borderRadius: 5,
                                            paddingTop: 10,
                                            paddingLeft: 14,
                                            paddingRight: 5,
                                            marginLeft: 9,
                                            marginRight: 28,
                                            width: 190,
                                            fontSize: 16}}
          >
            <FaPlay style={{marginRight: 7 }}/> Reproduzir playlist

          </MovieButtonPlay>

        </MovieButtons>
        

        <h1 style={{ paddingTop: 7, marginLeft: -15 }}>{name}</h1>

      </div>
      

      <ButtonLetf type="button" onClick={() => handleScrollMovies('right')}>
        <FaChevronLeft />
      </ButtonLetf>

      <ContentMovies
        style={{ marginLeft: marginContent, width: MAX_WIDTH_CONTENT }}
      >
        
        {movies.map(movie => (
          <Movie key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={`Capa do filme/seriado ${movie.name}`}
            />
            <MovieCard>
              <strong>{movie.name || movie.title}</strong>
              <p>{movie.overview}</p>
              <MovieCardControll>
                <button type="button">
                  <FaPlay /> Assistir
                </button>
                <span>
                  <FaPlus />
                </span>
                <span>
                  <FaThumbsUp />
                </span>
                <span>
                  <FaThumbsDown />
                </span>
              </MovieCardControll>
            </MovieCard>
          </Movie>
        ))}
      </ContentMovies>

      <ButtonRight type="button" onClick={() => handleScrollMovies('left')}>
        <FaChevronRight />
      </ButtonRight>
    </Container>
  );
};

export default SectionMovies;
