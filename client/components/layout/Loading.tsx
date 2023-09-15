import styled from "@emotion/styled";
import Image from "next/image";
import Spinner from "@/public/spinner.png";

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  text-align: center;
  font-size: 1rem;
`;

const LoadingComponent = () => {
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요</LoadingText>
      <Image src={Spinner} alt="로딩중" width="20" height="20" />
    </Background>
  );
};

export default LoadingComponent;
