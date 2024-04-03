import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(ArcElement, Title, Tooltip, Legend);


function PieChart() {
    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Weekly Proformance',
                font: {
                    size: 14,
                },
            },
            legend: {
                display: true,
                position: 'bottom' as any,
            },
        },
    }
    
    const data = {
        labels: ['In Progress', 'Completed', 'Not Started'],
        datasets: [
            {
                label: 'Tasks',
                data: [65, 59, 80],
                backgroundColor: [
                    'rgba(75, 192, 192)',
                    'rgba(255, 99, 132)',
                    'rgba(255, 205, 86)',
                ],
                borderColor: [
                    'rgba(75, 192, 192)',
                    'rgba(255, 99, 132)',
                    'rgba(255, 205, 86)',
                ],
                borderWidth: 1,
            },
        ],
        
    }
  return (
    <Pie options={options} data={data}/>
  )
}

export default PieChart