import React from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ImgSlider = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Carousel {...settings}>
      <Wrap>
        <a>
          <img src="/images/pizza.jpg" alt="" />
          <span>Life is better with a slice of pizza in hand!</span>
        </a>
      </Wrap>

      <Wrap>
        <a>
          <img src="/images/icecream.jpg" alt="" />
          <span>Ice cream: Where friends and flavors meet!</span>
        </a>
      </Wrap>

      <Wrap>
        <a>
          <img src="/images/biriyani.jpg" alt="" />
          <span>Biriyani lovers, where every grain is a burst of flavor!</span>
        </a>
      </Wrap>

      <Wrap>
        <a>
          <img src="/images/burger2.jpg" alt="" />
          <span>Bite into happiness, one burger at a time!</span>
        </a>
      </Wrap>
      <Wrap>
        <a>
          <img src="/images/mutton.jpg" alt="" />
          <span>Mutton enthusiasts, savoring the flavor with every bite!</span>
        </a>
      </Wrap>
    </Carousel>
  );
};
const Carousel = styled(Slider)`
  margin-top: 20px;
  overflow-x: hidden;
  overflow-y: hidden;
  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button:before {
    color: white;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -75px;
  }

  .slick-next {
    right: -75px;
  }
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  overflow-x: hidden;
  a {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;

    img {
      width: 100vw;
      height: 30vh;
      object-fit: cover;
    }
    span {
      color: rgb(91, 198, 200);
     
      font-weight: bold;
      z-index: 10;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-80%, -50%);
      font-size: 35px;
      @media (max-width: 768px) {
        font-size: 30px;
      }
      @media (max-width: 558px) {
        font-size: 20px;
      }
    }

    &:hover {
      padding: 0;
      border: 4px solid rgba(249, 249, 249, 0.8);
      transition-duration: 300ms;
    }
  }
`;
export default ImgSlider;
