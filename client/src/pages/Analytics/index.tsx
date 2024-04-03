import BarChart from '../../components/Charts/BarChart'
import PieChart from '../../components/Charts/PieChart'
import Header from '../../components/Header'
import Scrollable from '../../components/Scrollable'

function AnalyticsPage() {
    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom' as any,
            },
        },
    }
    
    const data = {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
            {
                label: 'In Progress',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                    'rgba(75, 192, 192)',
                ],
                borderColor: [
                    'rgba(75, 192, 192)'
                ],
                borderWidth: 1,
            },
            {
                label: 'Completed',
                data: [80, 81, 59, 56, 35, 21, 43],
                backgroundColor: [
                    'rgba(255, 99, 132)',
                ],
                borderColor: [
                    'rgba(255, 99, 132)'
                ],
                borderWidth: 1,
            },
            {
                label: 'Cancelled',
                data: [12, 45, 76, 30, 90, 35, 87],
                backgroundColor: [
                    'rgba(54, 162, 235)',
                ],
                borderColor: [
                    'rgba(54, 162, 235)'
                ],
                borderWidth: 1,
            },
        ],
    }
    return (
        <>
            <Header title="Analytics" />
            <Scrollable>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 w-full rounded-md p-4 bg-dark-light shadow">
                    <BarChart options={options} data={data}/>
                </div>
                <div className="w-full rounded-md p-4 bg-dark-light shadow">
                    <PieChart />
                </div>
                <div className="lg:col-span-2 w-full rounded-md p-4 bg-dark-light shadow">
                    <BarChart options={options} data={data}/>
                </div>
                <div className="w-full rounded-md p-4 bg-dark-light shadow">
                    <PieChart />
                </div>
            </div>
            </Scrollable>
        </>
    )
}

export default AnalyticsPage