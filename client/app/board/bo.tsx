"use client";

import { Card, Metric, Text, Title, BarList, Flex, Grid } from "@tremor/react";
import Chart from "./chart";
import styled from "@emotion/styled";

const MainStyled = styled.main`
  padding: 1rem; /* 'p-4' 클래스에 해당하는 스타일 */

  @media (min-width: 768px) {
    padding: 2.5rem; /* 'md:p-10' 클래스에 해당하는 스타일 */
  }

  margin: 0 auto; /* 'mx-auto' 클래스에 해당하는 스타일 */
  max-width: 80rem; /* 'max-w-7xl' 클래스에 해당하는 스타일 */
`;

const StyledGrid = styled(Grid)`
  display: grid;
  grid-template-columns: repeat(
    2,
    minmax(0, 1fr)
  ); /* 'numItemsSm={2}'에 해당 */
  grid-template-columns: repeat(
    3,
    minmax(0, 1fr)
  ); /* 'numItemsLg={3}'에 해당 */
  gap: 1.5rem; /* 'gap-6' 클래스에 해당 */
  /* 다른 스타일 속성을 여기에 추가할 수 있습니다. */
`;

const StyledFlex1 = styled(Flex)`
  display: flex;
  justify-content: flex-start; /* 'justifyContent="start"'에 해당 */
  align-items: baseline; /* 'alignItems="baseline"'에 해당 */

  & > * + * {
    margin-left: 0.5rem; /* 'space-x-2' 클래스에 해당 */
  }
  /* 다른 스타일 속성을 여기에 추가할 수 있습니다. */
`;

const StyledFlex2 = styled(Flex)`
  display: flex;
  margin-top: 1.5rem; /* 'mt-6' 클래스에 해당 */
  /* 다른 스타일 속성을 여기에 추가할 수 있습니다. */
`;

const StyledText = styled(Text)`
  text-align: right; /* 'text-right' 클래스에 해당 */
  /* 다른 스타일 속성을 여기에 추가할 수 있습니다. */
`;

const StyledBarList = styled(BarList)`
  margin-top: 0.5rem; /* 'mt-2' 클래스에 해당 */
  /* 다른 스타일 속성을 여기에 추가할 수 있습니다. */
`;

const website = [
  { name: "/home", value: 1230 },
  { name: "/contact", value: 751 },
  { name: "/gallery", value: 471 },
  { name: "/august-discount-offer", value: 280 },
  { name: "/case-studies", value: 78 },
];

const shop = [
  { name: "/home", value: 453 },
  { name: "/imprint", value: 351 },
  { name: "/shop", value: 271 },
  { name: "/pricing", value: 191 },
];

const app = [
  { name: "/shop", value: 789 },
  { name: "/product-features", value: 676 },
  { name: "/about", value: 564 },
  { name: "/login", value: 234 },
  { name: "/downloads", value: 191 },
];

const data = [
  {
    category: "Website",
    stat: "10,234",
    data: website,
  },
  {
    category: "Online Shop",
    stat: "12,543",
    data: shop,
  },
  {
    category: "Mobile App",
    stat: "2,543",
    data: app,
  },
];

export default function PlaygroundPage() {
  return (
    <MainStyled>
      <StyledGrid numItemsSm={2} numItemsLg={3}>
        {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <StyledFlex1>
              <Metric>{item.stat}</Metric>
              <Text>Total views</Text>
            </StyledFlex1>
            <StyledFlex2>
              <Text>Pages</Text>
              <StyledText>Views</StyledText>
            </StyledFlex2>
            <StyledBarList
              data={item.data}
              valueFormatter={(number: number) =>
                Intl.NumberFormat("us").format(number).toString()
              }
            />
          </Card>
        ))}
      </StyledGrid>
      <Chart />
    </MainStyled>
  );
}
