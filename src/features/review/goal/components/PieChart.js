
import { useEffect } from "react";

const PieChart = ({parentid, config, setPie, style}) => {
  console.log(style)
  useEffect(()=> {
    const chartConfig = {
      ...config
    }
    const chart = new window.sb.chart("#" + parentid, chartConfig);
    setPie(chart)
  },[]);
  return (
    <>
    <div id={parentid} style={style}></div>
    </>
  )

}
export default PieChart;