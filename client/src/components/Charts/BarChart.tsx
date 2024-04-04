import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
)

type BarChartProps = {
    options: any,
    data: any
}

function BarChart({ options, data }: BarChartProps) {
    return (
        <Bar options={options} data={data} />
    )
}

export default BarChart