import { Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
)

type PieChartProps = {
  options: any,
  data: any
}

function PieChart({ options, data }: PieChartProps) {
  return (
    <Pie options={options} data={data} />
  )
}

export default PieChart