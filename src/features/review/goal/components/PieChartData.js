import { useState, useEffect } from "react";
import PieChart from "./PieChart";

function PieChartData() {
  const [pie, setPie] = useState();

  const pie_Data = [{ "추천수락함": 10, "추천거절함": 5, "추천수정함": 20 }];

  useEffect(() => {
    if (pie) {
      //차트 div가 그려진 뒤 render 함수를 통해 차트를 생성
      pie.render();
    }
  }, [pie]);
  return (
    <div className="PieApp">
      <PieChart
        parentid={`chartArea`}
        style={{ width: "100%", height: "350px" }}
        config={{
          data: {
            keys: {
              x: "추천 여부",
              value: ["수락", "거절", "수정"],
            },
            json: pie_Data,
            type: "pie",
            noData: "데이터가 없습니다.",
          },
          axis: {
            x: {
              type: "category",
            },
            y: {
              label: { text: "추천" },
            },
          },
        }}
        setPie={setPie}
      />
    </div>
  );
}
export default PieChartData;
