import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 96%;
  /* height: 89vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
  /* background-color: #bfb4b4; */
  background-color: #d9d9d9;
`;

export const ChartTop = styled.div`
  width: 96%;
  /* height: 89vh; */
  /* display: flex;
  justify-content: space-between; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 30px;
  justify-content: center;
  align-items: center;
  align-items: center;
  padding: 20px 0;
`;

export const ChartItemWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 200px;
  /* text-align: center; */
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  padding: 10px;
  /* background-color: whitesmoke; */
  background-color: #ffffff;
`;

export const MidGridContainer = styled.div`
  width: 96%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  justify-content: center;
  align-items: center;
  grid-gap: 30px;
  padding: 20px 0;
`;

export const MidGridItem = styled.div`
  width: 95%;
  text-align: center;
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  padding: 10px;
  background-color: #ffffff;
`;
