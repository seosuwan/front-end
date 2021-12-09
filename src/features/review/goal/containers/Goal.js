import React, { useState } from "react";
import {
  LineChart,
  LineData,
  LogChart,
  PieChart,
  PieData,
} from "features/review/index";
import styled from "styled-components";
import BarChartData from "../components/BarChartData";
import PieChartData from "../components/PieChartData";

export default function Goal() {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Goal test</h1>
      </div>
      <ChartDiv>
        <BarChartData />
      </ChartDiv>
      <ChartDiv>
        <PieChartData />
      </ChartDiv>
      <ChartDiv>
        <PieChart data={PieData} />
      </ChartDiv>
      <ChartDiv>
        <LogChart />
      </ChartDiv>
    </>
  );
}
const ChartDiv = styled.div`
  margin: 0 auto;
  height: 400px;
  width: 850px;
`;
