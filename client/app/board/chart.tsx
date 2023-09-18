"use client";

import { Card, AreaChart, Title, Text } from "@tremor/react";
import styled from "@emotion/styled";

const CardStyled = styled(Card)`
  /* margin-top: 8; */
  margin-top: 2rem;
`;

const AreaChartStyled = styled(AreaChart)`
  margin-top: 4;
  height: 80;
`;

const data = [
  {
    Month: "Jan 21",
    Sales: 2890,
    Profit: 2400,
  },
  {
    Month: "Feb 21",
    Sales: 1890,
    Profit: 1398,
  },
  {
    Month: "Jan 22",
    Sales: 3890,
    Profit: 2980,
  },
];

export default function Example() {
  return (
    <CardStyled>
      <Title>Performance</Title>
      <Text>Comparison between Sales and Profit</Text>
      <AreaChartStyled
        className="mt-4 h-80"
        data={data}
        categories={["Sales", "Profit"]}
        index="Month"
        colors={["indigo", "fuchsia"]}
        valueFormatter={(number: number) =>
          `$ ${Intl.NumberFormat("us").format(number).toString()}`
        }
        yAxisWidth={60}
      />
    </CardStyled>
  );
}
