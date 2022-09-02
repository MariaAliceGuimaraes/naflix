/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';

import NavBar from '../../components/NavBar';
import SectionMovies from '../../components/SectionMovies';
import FeaturedMovie from '../../components/FeaturedMovie';

import { Container, Loading } from './styles';
import api from '../../services/api';

interface MovieProps {
  id: string;
  name?: string;
  title?: string;
  overview: string;
  poster_path: string;
}

interface SectionsMoviesProps {
  id: number;
  name: string;
  movies: MovieProps[];
}

const Home: React.FC = () => {
  const [featuredMovieId, setFeaturedMovieId] = useState<number>(0);
  const [sectionsMovies, setSectionsMovies] = useState<SectionsMoviesProps[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  const apiRoutes: { name: string; route: string }[] = [
    { name: 'Em alta', route: '3/tv/popular?' },
    { name: 'Séries populares no N.A.Flix', route: '4/list/8215404?session_id=cb0c043a0ca4a4bcf667af7d031bd17bf6d4d19e&language=pt-BR&page=1/results' },
    { name: 'Lançamentos', route: '3/movie/now_playing?' },
    { name: 'Filmes bem Avaliados', route: '3/movie/top_rated?session_id=cb0c043a0ca4a4bcf667af7d031bd17bf6d4d19e&language=pt-BR&page=1' },
    { name: 'Mistério', route: '3/discover/movie?with_genres=9648&' },
    { name: 'Família', route: '3/discover/movie?with_genres=10751&' },
    { name: 'Ação', route: '3/discover/movie?with_genres=28&' },
    
  ];

  useEffect(() => {
    const URL_LANGUAGE_AND_KEY = `language=pt-BR&api_key=${process.env.REACT_APP_API_KEY}&page=`;

    const urlsAxios = apiRoutes.map(({ route }, index) => {
      let pageRandom = '1';
      // Somente a primeira lista é randômicas
      if (index < 1) pageRandom = (Math.random() * (5 - 1) + 1).toString();

      const URL = route.concat(URL_LANGUAGE_AND_KEY).concat(pageRandom);
      return api.get(URL);
    });

    if (sectionsMovies.length === 0) {
      Promise.all([...urlsAxios])
        .then(responses => {
          const responsesApi = responses.map((response, index) => ({
            id: index,
            name: apiRoutes[index].name,
            movies: response.data.results,
          }));

          setSectionsMovies(responsesApi);

          const randamIdMovie = Math.floor(Math.random() * 20);
          // setFeaturedMovieId(responsesApi[0].movies[randamIdMovie].id);
          // setFeaturedMovieId(75006); //umbrella academy
          // setFeaturedMovieId(93405); //squid game
          setFeaturedMovieId(66732); //stranger things

          
          // Criando efeito de loading
          setTimeout(() => setLoading(false), 800);
        })
        .catch(errors => {
          console.log(errors);
        });
    }
  }, [apiRoutes, sectionsMovies]);

  return (
    <Container>
      <NavBar />
      {loading ? (
        <Loading>
          <div>
            <span />
            <strong>N</strong>
          </div>
        </Loading>
      ) : (
        <>
          <FeaturedMovie movieId={featuredMovieId} />
          <div style={{ marginTop: -200 }}>
            {sectionsMovies.map(sectionMovie => (
              <SectionMovies {...sectionMovie} key={sectionMovie.id} />
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export default Home;
