import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import remera1 from "../assets/img/urbana1.jpg";
import remera2 from "../assets/img/urbana2.jpg";
import remera3 from "../assets/img/urbana3.jpg";
import remera4 from "../assets/img/urbana4.jpg";
import remera5 from "../assets/img/urbana5.jpg";
import remera6 from "../assets/img/urbana6.jpg";
import remera7 from "../assets/img/urbana7.jpg";
import remera8 from "../assets/img/urbana8.jpg";

export default function SliderModels() {
  const settings = {
    dots: true,
    infinite: true, // Cambiado a true para permitir el bucle infinito
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true, // Habilita el autoplay
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="custom-slider">
      <div className="slider-item">
        <img src={remera1} alt="remera1" />
      </div>
      <div className="slider-item">
        <img src={remera2} alt="remera2" />
      </div>
      <div className="slider-item">
        <img src={remera3} alt="remera3" />
      </div>
      <div className="slider-item">
        <img src={remera4} alt="remera4" />
      </div>
      <div className="slider-item">
        <img src={remera5} alt="remera5" />
      </div>
      <div className="slider-item">
        <img src={remera6} alt="remera6" />
      </div>
      <div className="slider-item">
        <img src={remera7} alt="remera7" />
      </div>
      <div className="slider-item">
        <img src={remera8} alt="remera8" />
      </div>
    </Slider>
  );
}
