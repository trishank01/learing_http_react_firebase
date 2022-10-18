import React, { useCallback, useEffect, useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [Loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoivesHandler = useCallback(async () => {
    setLoader(true);
    setError(null);
    try {
      const response = await fetch("https://learning-firebase-345cd-default-rtdb.firebaseio.com/movies.json");
      if (!response.ok) {
        throw new Error("Something went Wrong");
      }
      const data = await response.json();
      const loadedMovies = []
      for(const key in data){
        loadedMovies.push({
          id : key,
          title : data[key].title,
          openingText: data[key].openingText,
          releaseDate : data[key].releaseDate
        })
      }
     console.log(loadedMovies)
      // const transfromedMovies = data.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releseData: movieData.relese_data,
      //   };
      // });
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setLoader(false);
  }, []);

  useEffect(() => {
    fetchMoivesHandler();
  }, [fetchMoivesHandler]);

  async function addMovieHandler(movie) {
  const response =  await fetch("https://learning-firebase-345cd-default-rtdb.firebaseio.com/movies.json"  , {
      method: 'POST',
      body: JSON.stringify(movie),
      headers : {
       'Content-Type' : 'application/json',
      }
    })
    const data = await response.json()
  }

  let content = <p>Found no movies</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (Loader) {
    content = <p>Loading...</p>;
  }

  return (
  
        <React.Fragment>
        <section>
          <AddMovie onAddMovie={addMovieHandler} />
        </section>
        <section>
          <button onClick={fetchMoivesHandler}>Fetch Movies</button>
        </section>
        <section>{content}</section>
      </React.Fragment>
  );
}

export default App;

// {!Loader && <MoviesList movies={movies} />}
// {!Loader && movies.length === 0 && !error && <p>Found no movies</p>}
// {Loader && <p>Loading...</p>}
// {!Loader && error && <p>{error}</p>}

// without async await
// function fetchMoivesHandler() {
//   fetch('https://swapi.dev/api/films/').then(response => {
//    return response.json()
//   }).then(data => {
//     const transfromedMovies = data.results.map(movieData => {
//       return {
//         id:movieData.episode_id,
//         title:movieData.title,
//         openingText : movieData.opening_crawl,
//         releseData : movieData.relese_data
//       }
//     })
//     setMovies(transfromedMovies)
//   })
// }




{/* <section>
  <button onClick={fetchMoivesHandler}>Fetch Movies</button>
</section>
<section>{content}</section> */}
