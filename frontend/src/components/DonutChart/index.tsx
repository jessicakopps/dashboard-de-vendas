import axios from 'axios'
import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { SaleSum } from 'types/sale'
import { BASE_URL } from 'utils/requests'

const DonutChart = () => {

  type ChartData = {
    labels: string[];
    series: number[];
  }

  const [chartData, setChartData] = useState<ChartData>({ 
    labels: [], 
    series: [],
  });
  
  useEffect(() => {
    axios.get(`${BASE_URL}/sales/amount-by-seller`)
      .then(response => {
        const data = response.data as SaleSum[];
        const myLabels = data.map((name) => name.sellerName)
      const mySeries = data.map((series) => series.sum)

        setChartData({ labels: myLabels, series: mySeries });        
      });
  },[]);

  const options = {
    legend: {
      show: true
    }
  }

  //FORMA ERRADA
  // let chartData: ChartData = { labels: [], series: [] };
  // axios.get(`${API}/sales/amount-by-seller`)
  //   .then(response => {
  //     const data = response.data as SaleSum[];
  //     const myLabels = data.map(x => x.sellerName);
  //     const mySeries = data.map(x => x.sum);

  //     chartData = { labels: myLabels, series: mySeries};
  //     console.log(response.data);
  //   });

  // const mockData = {
  //   series: [477138, 499928, 444867, 220426, 473088],
  //   labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
  // }

  return (
    <>
      <Chart
        options={{ ...options, labels: chartData.labels }}
        series={chartData.series}
        type="donut"
        height="240"

      />
    </>
  );
}

export default DonutChart;
