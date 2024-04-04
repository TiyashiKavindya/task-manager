import { useEffect, useState } from 'react'
import BarChart from '../../components/Charts/BarChart'
import PieChart from '../../components/Charts/PieChart'
import Header from '../../components/Header'
import Scrollable from '../../components/Scrollable'
import { useAppContext } from '../../contexts'
import { getThisMonthActivity, getThisMonthActivityByStatus, getThisMonthTask } from '../../api'
import Loading from '../../components/Loading'


interface ChartData {
    labels: string[]
    datasets: any[]
}

interface ActivitiesData {
    activity_id: number,
    status_id: number,
    status_title: string,
    status_style: string,
    total_tasks: number,
    title: string
}

interface TaskData {
    start_date: string
    status_id: number
    status: string
    style: string
    task_count: number
}

function AnalyticsPage() {
    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom' as any,
            },
        },
    }
    const { loading, stopLoading } = useAppContext()

    const [activityVsStatus, setActivityVsStatus] = useState<ChartData>()
    const [thisMonthActivity, setThisMonthActivity] = useState<ChartData>()
    const [thisMonthTask, setThisMonthTask] = useState<any>()


    const convertToPieChart = (data: any) => {
        const chartData: ChartData = {
            labels: [],
            datasets: [
                {
                    label: 'Total Activities',
                    data: [],
                    backgroundColor: [],
                    borderColor: [],
                }
            ],
        }

        data.forEach((row: any) => {
            chartData.labels.push(row.status_title)
            chartData.datasets[0].data.push(row.total_activities)
            chartData.datasets[0].backgroundColor.push(row.status_style)
            chartData.datasets[0].borderColor.push(row.status_style)
        })
        return chartData
    }
    const convertToBarChart = (data: ActivitiesData[]) => {
        const statusIds: number[] = [...new Set(data.map(row => row.status_id))]
        const statuses: string[] = [...new Set(data.map(row => row.status_title))]
        const activityNames: string[] = [...new Set(data.map(row => row.title))]
        const chartData: ChartData = {
            labels: activityNames,
            datasets: statuses.map(s => {
                return {
                    label: s,
                    data: new Array(activityNames.length).fill(0),
                    backgroundColor: ''
                }
            })
        }
        statusIds.forEach((statusId, index) => {
            chartData.datasets[index].label = statuses[index].toString()
            data.filter(row => row.status_id === statusId).forEach(row => {
                const datasetIndex = activityNames.indexOf(row.title)
                if (datasetIndex !== -1) {
                    chartData.datasets[index].data[datasetIndex] = row.total_tasks
                    chartData.datasets[index].backgroundColor = row.status_style
                }
            })
        })
        return chartData
    }
    const convertToTaskBarChart = (data: TaskData[]): ChartData => {
        const statusIds: number[] = [...new Set(data.map(row => row.status_id))]
        const statuses: string[] = [...new Set(data.map(row => row.status))]
        const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
        const chartData: ChartData = {
            labels: Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`),
            datasets: statuses.map(s => {
                return { label: s, data: Array(daysInMonth).fill(0), backgroundColor: "" }
            })
        }
        statusIds.forEach((statusId, index) => {
            chartData.datasets[index].label = statuses[index].toString()
            data.filter(row => row.status_id === statusId).forEach(row => {
                const dayOfMonth = new Date(row.start_date).getDate()
                chartData.datasets[index].data[dayOfMonth - 1] = row.task_count
                chartData.datasets[index].backgroundColor = row.style
            })
        })
        return chartData
    }

    const getDashboardData = async () => {
        try {
            const actiVsStatus = await getThisMonthActivityByStatus()
            setActivityVsStatus(convertToPieChart(actiVsStatus.data))
            const Activities = await getThisMonthActivity()
            setThisMonthActivity(convertToBarChart(Activities.data))
            const tasks = await getThisMonthTask()
            setThisMonthTask(convertToTaskBarChart(tasks.data))
        } catch (err) {
            console.error(err)
        }
    }


    useEffect(() => {
        const getData = async () => {
            try {
                loading()
                await getDashboardData()
                stopLoading()
            } catch (err) {
                console.error(err)
                stopLoading(err)
            }
        }
        getData()
    }, [])

    return (
        <>
            <Header title="Analytics" />
            <Loading>
                <Scrollable>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">


                        <div className="lg:col-span-3 h-96 w-full rounded-md p-4 bg-dark-light shadow">
                            {
                                thisMonthTask?.labels && thisMonthTask.labels.length > 0 ? <BarChart options={{
                                    ...options,
                                    maintainAspectRatio: false,


                                }} data={thisMonthTask} /> : <></>
                            }
                        </div>

                        <div className="lg:col-span-2 w-full rounded-md p-4 bg-dark-light shadow">
                            {
                                thisMonthActivity?.labels && thisMonthActivity.labels.length > 0 ? <BarChart options={options} data={thisMonthActivity} /> : <></>
                            }
                        </div>
                        <div className="w-full rounded-md p-4 bg-dark-light shadow">
                            {
                                activityVsStatus?.labels && activityVsStatus.labels.length > 0 ? <PieChart options={options} data={activityVsStatus} /> : <></>

                            }
                        </div>
                    </div>
                </Scrollable>
            </Loading>
        </>
    )
}

export default AnalyticsPage