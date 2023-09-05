"use client";

import { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import Image from "next/image";
import styled from "@emotion/styled";

interface ImageProps {
  src: string;
  alt: string;
}

interface CarouselProps {
  images: ImageProps[];
}

const CarouselWrapper = styled(Carousel)`
  width: 100%;
  object-fit: cover;
`;

const MyCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (now?: number, previous?: number) => {
    if (now !== undefined) {
      setActiveStep(now);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevActiveStep) => (prevActiveStep + 1) % images.length);
    }, 3000); // 캐러셀이 자동으로 전환되는 간격(ms)

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <CarouselWrapper
      index={activeStep}
      onChange={handleStepChange}
      autoPlay={true}
      indicators={true}
      swipe={false}
      cycleNavigation={true}
      navButtonsAlwaysVisible={false}
      navButtonsAlwaysInvisible={true}
      fullHeightHover={true}
      animation="fade" // 애니메이션 유형 설정 (slide, fade 등)
    >
      {images.map((image, index) => (
        <Paper key={index}>
          <Image src={image.src} alt={image.alt} fill />
        </Paper>
      ))}
    </CarouselWrapper>
  );
};

export default MyCarousel;
