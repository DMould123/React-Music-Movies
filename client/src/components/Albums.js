import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

export default function Albums() {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    fetch('/albums.json')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setAlbums(data.albums)
      })
  }, [])
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
          slidesToShow: 2,
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
      <div className="Albums">
        <Slider {...settings} className="Albums_container--inner">
          {albums.map((album) => (
            <Card className="cardClass" key={album.AlbumId}>
              <div style={{ textAlign: 'center' }}>
                <Card.Img
                  src={'/images/' + album.AlbumArtwork}
                  className="card-image"
                  style={{
                    height: '550px',
                    width: '550px'
                  }}
                />
              </div>
              <Card.Body>
                <div className="card-text-body">
                  <Card.Title>
                    <b>{album.AlbumArtist} - </b> {album.AlbumTitle}
                  </Card.Title>
                  <Popup
                    trigger={<button> Album Details </button>}
                    position="right"
                  >
                    <div>
                      <p>
                        <b>Release Year: </b>
                        {album.AlbumReleaseYear}
                      </p>
                      <p>
                        <b>Length: </b>
                        {album.AlbumLength}
                      </p>
                      <ol>
                        {album.AlbumTracklisting.map((track) => (
                          <li key={track}>{track}</li>
                        ))}
                      </ol>
                    </div>
                  </Popup>
                  <Card.Text></Card.Text>
                  <Card.Text className="card-description"></Card.Text>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Slider>
      </div>
    </>
  )
}
