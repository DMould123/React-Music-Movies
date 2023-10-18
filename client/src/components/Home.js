import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

function Home(props) {
  const [name, setName] = useState('')
  const [movies, setMovies] = useState([])
  const [originalMovies, setOriginalMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`https://react-music-movies.onrender.com/api/movies`)
      .then((response) => {
        setMovies(response.data)
        setOriginalMovies(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }, [])

  const filter = (e) => {
    const keyword = e.target.value

    if (keyword !== '') {
      const results = originalMovies.filter((movie) => {
        return (
          movie.name &&
          movie.name.toLowerCase().startsWith(keyword.toLowerCase())
        )
      })
      setMovies(results)
    } else {
      setMovies(originalMovies)
    }

    setName(keyword)
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <>
      <div className="Home" style={{ textAlign: 'center' }}>
        <input
          type="search"
          value={name}
          onChange={filter}
          className="movie-input"
          placeholder="Search"
          style={{ fontWeight: 'bold', color: 'black' }}
        />
        {isLoading ? ( // Render loading spinner if isLoading is true
          <div className="loading-spinner">Loading...</div>
        ) : (
          <Slider {...settings} className="Books_container--inner">
            {movies && movies.length > 0 ? (
              movies.map((movie) => (
                <div className="cardClass" key={movie._id}>
                  <img
                    src={movie.image}
                    className="card-image"
                    style={{ width: 300 }}
                    alt=""
                  />
                  <div className="card-body">
                    <h3 className="card-title">{movie.name}</h3>
                    <p>
                      <small>
                        <b>Release Year: </b> {movie.release}
                      </small>
                    </p>
                    <p>
                      <small>
                        <b>IMDb Rating: </b> {movie.rating}
                      </small>
                    </p>
                    <p className="card-bio">
                      <small>
                        <b>Movie Bio: </b> {movie.bio}
                      </small>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <h1>No results found!</h1>
            )}
          </Slider>
        )}
      </div>
    </>
  )
}

export default Home
