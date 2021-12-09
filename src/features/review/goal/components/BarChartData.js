import { useEffect, useState } from "react";
import BarChart from "./BarChart"

function BarChartData() {
  const [chart, setChartData] = useState();

  const chart_Data = [{ "날짜": "갯수", "12/1": 3, "12/2": 1, "12/3": 5 }];
  
  useEffect(() => {
    if (chart) {
      //차트 div가 그려진 뒤 render 함수를 통해 차트를 생성
      chart.render();
    }
  }, [chart]);
  return (
    <div className="BarApp">
      <BarChart
        parentid={`chartArea`}
        style={{ width: "100%", height: "350px" }}
        config={{
          data: {
            keys: {
              x: "달성률",
              value: ["12/1", "12/2", "12/3"],
            },
            json: chart_Data,
            type: "bar",
            noData: "데이터가 없습니다.",
          },
          axis: {
            x: {
              type: "category",
            },
            y: {
              label: { text: "해낸 갯수!" },
            },
          },
        }}
        setChartData={setChartData}
      />
    </div>
  );
}

export default BarChartData;
