import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 97%;
  /* height: 89vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
`;

export const ChartTop = styled.div`
  width: 96%;
  /* height: 89vh; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  /* background-color: pink; */
`;

export const ChartItemWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 200px;
  /* text-align: center; */
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
`;

export const MidGridContainer = styled.div`
  width: 96%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  justify-content: center;
  align-items: center;
  grid-gap: 40px;
  padding: 20px 0;
  /* background-color: pink; */
`;

export const MidGridItem = styled.div`
  width: 95%;
  text-align: center;
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
`;
