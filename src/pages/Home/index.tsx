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

  // OPÇÃO 1 - UMA ROUTE
  // const apiRoutes: { name: string; routes: string }[] = [
  //   { name: 'Lançamentos', routes: '3/movie/now_playing?'},
  //   { name: 'Populares no N.A.Flix', routes: '4/list/8215404?session_id=cb0c043a0ca4a4bcf667af7d031bd17bf6d4d19e&page=1&language=pt-BR/results'},
  //   { name: 'Populares no N.A.Flix 2', routes: '4/list/8215404?session_id=cb0c043a0ca4a4bcf667af7d031bd17bf6d4d19e&page=2&language=pt-BR/results'},
  //   { name: 'Filmes de aventura', routes: '3/movie/upcoming?with_genres=12&'},
  //   { name: 'Filmes para a família', routes: '3/discover/movie?with_genres=10751&'},
  //   { name: 'Filmes de ação', routes: '3/discover/movie?with_genres=28&'},
  //   { name: 'Filmes sobre música', routes: '3/discover/movie?with_genres=10402&'},
  //   { name: 'Filmes sobre guerra', routes: '3/discover/movie?with_genres=10752&'},
  //   { name: 'Filmes bem Avaliados', routes: '3/movie/top_rated?session_id=cb0c043a0ca4a4bcf667af7d031bd17bf6d4d19e&language=pt-BR&page=1'},
  // ];

  // OPÇÃO 2 - ARRAY DE ROUTES
  const apiRoutes: { name: string; routes: Array<string> }[] = [
    { name: 'Lançamentos', routes: ['3/movie/now_playing?']},
    { name: 'Populares no N.A.Flix', routes: ['4/list/8215404?session_id=cb0c043a0ca4a4bcf667af7d031bd17bf6d4d19e&page=1&language=pt-BR/results', '4/list/8215404?session_id=cb0c043a0ca4a4bcf667af7d031bd17bf6d4d19e&page=2&language=pt-BR/results']},
    { name: 'Populares no N.A.Flix 2', routes: ['4/list/8215404?session_id=cb0c043a0ca4a4bcf667af7d031bd17bf6d4d19e&page=2&language=pt-BR/results']},
    { name: 'Filmes de aventura', routes: ['3/movie/upcoming?with_genres=12&']},
    { name: 'Filmes para a família', routes: ['3/discover/movie?with_genres=10751&']},
    { name: 'Filmes de ação', routes: ['3/discover/movie?with_genres=28&']},
    { name: 'Filmes sobre música', routes: ['3/discover/movie?with_genres=10402&']},
    { name: 'Filmes sobre guerra', routes: ['3/discover/movie?with_genres=10752&']},
    { name: 'Filmes bem Avaliados', routes: ['3/movie/top_rated?session_id=cb0c043a0ca4a4bcf667af7d031bd17bf6d4d19e&language=pt-BR&page=1']},
  ];

//   # Make get request
// response = requests.request("GET", url, headers=headers, data=payload)
// response_data = response.json()

// #create list to store the values
// data = []
// data.extend(response_data['value'])

// while True:
//   response = requests.request("GET", response_data['@odata.nextLink'], headers=headers, data=payload)
//   response_data = response.json()
//   if '@odata.nextLink' in response_data.keys():
//     data.extend(response_data['value'])
//   else:
//     break

  useEffect(() => {
    const URL_LANGUAGE_AND_KEY = `language=pt-BR&api_key=${process.env.REACT_APP_API_KEY}`;

    const urlsAxios = apiRoutes.map(({ routes }, index) => {


      // 1 - USAR ESSA OPÇÃO SE PASSAR SÓ UMA ROUTE
      // const URL = routes.concat(URL_LANGUAGE_AND_KEY);
      // return api.get(URL);

      // 2 - USAR ESSA OPÇÃO SE PASSAR MAIS DE UMA ROUTE
      for (var r of routes) {
        // precisamos concatenar os dois resultados
        return api.get(r.concat(URL_LANGUAGE_AND_KEY))
      }

    });

    if (sectionsMovies.length === 0) {
      Promise.all([...urlsAxios])
        .then(responses => {
          console.log(responses);

          // 1
          // const responsesApi = responses.map((response, index) => ({
          //   id: index,
          //   name: apiRoutes[index].name,
          //   movies: response.data.results,
          // }));

          // 2
          const responsesApi = responses.map((response, index) => ({
            x: console.log(response),
            id: index,
            name: apiRoutes[index].name,
            movies: response.data.results,
          }));

          setSectionsMovies(responsesApi);

          const randamIdMovie = Math.floor(Math.random() * 20);
          // setFeaturedMovieId(responsesApi[0].movies[randamIdMovie].id);
          // setFeaturedMovieId(75006); //umbrella academy
          // setFeaturedMovieId(93405); //squid game
          // setFeaturedMovieId(66732); //stranger things
          // setFeaturedMovieId(94997); //House of the dragon
          // setFeaturedMovieId(97175); //Fate a saga winx
          // setFeaturedMovieId(84773); //Aneis do poder
          // setFeaturedMovieId(90802); //Sandman
          // setFeaturedMovieId(76479); // The boys
          setFeaturedMovieId(128384); // ti


          
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
