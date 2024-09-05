import React from "react";
import testimonial from "../../assets/images/testimonial.png"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const CarouselComp = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1199 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1199, min: 567 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 567, min: 0 },
      items: 1,
    },
  };
  return (
    <div>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        infinite={true}
      >
        <div className="carousel-item-div">
          <div className="carousel-main">
            <img
              src={testimonial}
            />
            <p className="carousel-text card-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standardeee dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
        </div>
        <div className="carousel-item-div">
          <div className="carousel-main">
            <img
              src={testimonial}
            />
            <p className="carousel-text card-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standardeee dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
        </div>
        <div className="carousel-item-div">
          <div className="carousel-main">
            <img
              src={testimonial}
            />
            <p className="carousel-text card-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standardeee dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
        </div>
        <div className="carousel-item-div">
          <div className="carousel-main">
            <img
              src={testimonial}
            />
            <p className="carousel-text card-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standardeee dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
        </div>
        <div className="carousel-item-div">
          <div className="carousel-main">
            <img
              src={testimonial}
            />
            <p className="carousel-text card-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standardeee dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
        </div>
        <div className="carousel-item-div">
          <div className="carousel-main">
            <img
              src={testimonial}
            />
            <p className="carousel-text card-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standardeee dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
        </div>
        <div className="carousel-item-div">
          <div className="carousel-main">
            <img
              src={testimonial}
            />
            <p className="carousel-text card-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standardeee dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
        </div>
        <div className="carousel-item-div">
          <div className="carousel-main">
            <img
              src={testimonial}
            />
            <p className="carousel-text card-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standardeee dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
        </div>
        <div className="carousel-item-div">
          <div className="carousel-main">
            <img
              src={testimonial}
            />
            <p className="carousel-text card-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standardeee dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComp;
