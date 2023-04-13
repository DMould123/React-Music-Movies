import React, { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const MOVIES = [
  {
    id: 1,
    name: 'The Goonies',
    release: 1986,
    image: 'the goonies.jpg',
    rating: '7.7',
    bio: "A group of young misfits called The Goonies discover an ancient map and set out on an adventure to find a legendary pirate's long-lost treasure."
  },
  {
    id: 2,
    name: 'The Intouchables',
    release: 2011,
    image: 'The_Intouchables.jpg',
    rating: 8.5,
    bio: 'After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver.'
  },
  {
    id: 3,
    name: 'Bloodsport',
    release: 1988,
    image: 'Bloodsport.jpg',
    rating: 6.8,
    bio: 'Bloodsport follows Frank Dux, an American martial artist serving in the military, who decides to leave the army to compete in a martial arts tournament in Hong Kong where fights to the death can occur.'
  },
  {
    id: 4,
    name: 'Terminator 2: Judgment Day',
    release: 1991,
    image: 'Terminator.jpg',
    rating: 8.6,
    bio: 'A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten-year-old son John from a more advanced and powerful cyborg.'
  },
  {
    id: 5,
    name: 'Up',
    release: 2009,
    image: 'Up_(2009_film).jpg',
    rating: 8.3,
    bio: '78-year-old Carl Fredricksen travels to Paradise Falls in his house equipped with balloons, inadvertently taking a young stowaway.'
  },
  {
    id: 6,
    name: 'The Silence of the Lambs',
    release: 1991,
    image: 'The_Silence_of_the_Lambs_poster.jpg',
    rating: '8.6',
    bio: 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.'
  },
  {
    id: 7,
    name: 'Gremlins',
    release: 1984,
    image: 'Gremlins1.jpg',
    rating: 7.3,
    bio: 'A young man inadvertently breaks three important rules concerning his new pet and unleashes a horde of malevolently mischievous monsters on a small town.'
  },
  {
    id: 8,
    name: 'Moonrise Kingdom',
    release: 2012,
    image: 'Moonrise_Kingdom_FilmPoster.jpeg',
    rating: 7.8,
    bio: 'A pair of young lovers flee their New England town, which causes a local search party to fan out to find them.'
  },
  {
    id: 9,
    name: 'The Damned United',
    release: 2009,
    image: 'The damned_united.jpg',
    rating: 7.5,
    bio: "The story of the controversial Brian Clough's 44-day reign as the coach of the English football club Leeds United."
  },
  {
    id: 10,
    name: 'Parasite',
    release: 2019,
    image: 'Parasite.png',
    rating: '8.5',
    bio: 'A Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.'
  },
  {
    id: 11,
    name: 'The Shawshank Redemption',
    release: 1994,
    image: 'ShawshankRedemptionMoviePoster.jpg',
    rating: 9.3,
    bio: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
  },
  {
    id: 12,
    name: 'The Danish Girl',
    release: 2015,
    image: 'The_Danish_Girl.jpg',
    rating: 7.1,
    bio: "A fictitious love story loosely inspired by the lives of Danish artists Lili Elbe and Gerda Wegener. Lili and Gerda's marriage and work evolve as they navigate Lili's groundbreaking journey as a transgender pioneer."
  },
  {
    id: 13,
    name: 'The Ring',
    release: 2002,
    image: 'The_Ring.jpg',
    rating: 7.1,
    bio: 'A journalist must investigate a mysterious videotape which seems to cause the death of anyone one week to the day after they view it.'
  },
  {
    id: 14,
    name: 'Forrest Gump',
    release: 1994,
    image: 'Forrest_Gump_poster.jpg',
    rating: 8.8,
    bio: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.'
  },
  {
    id: 15,
    name: 'Get Out',
    release: 2017,
    image: 'Get_Out_poster.png',
    rating: '7.7',
    bio: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point."
  }
]

function Home(props) {
  const [name, setName] = useState('')
  const [foundMovies, setFoundMovies] = useState(MOVIES)

  const filter = (e) => {
    const keyword = e.target.value

    if (keyword !== '') {
      const results = MOVIES.filter((movie) => {
        return movie.name.toLowerCase().startsWith(keyword.toLowerCase())
      })
      setFoundMovies(results)
    } else {
      setFoundMovies(MOVIES)
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
        <Slider {...settings} className="Books_container--inner">
          {foundMovies && foundMovies.length > 0 ? (
            foundMovies.map((movie) => (
              <div className="cardClass" key={movie.id}>
                <img
                  src={'/images/' + movie.image}
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
      </div>
    </>
  )
}

export default Home
