import { useEffect, useState } from "react"
import BarChart from "../../components/Charts/BarChart"
import Header from "../../components/Header"
import { useAppContext, useDataContext } from "../../contexts"
import Loading from "../../components/Loading"
import { getTaskCountPreDay, getThisWeekTaskCount, getTodayTasks, updateStatus } from "../../api"
import DropDown from "../../components/DropDown"
import { makeAsOptions } from "../../utils"
import { DAY_NAMES } from "../../constants"

interface TaskData {
    day_of_week: string
    status_id: number
    status: string
    style: string
    task_count: number
}

interface ChartData {
    labels: string[]
    datasets: {
        label: string
        data: number[]
        backgroundColor: string[]
    }[]
}

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
            display: false,
        },
    },
}

function Dashboard() {

    const { loading, stopLoading, toast } = useAppContext()

    const [tasks, setTasks] = useState([])
    const [thisWeekTaskCount, setThisWeekTaskCount] = useState([])
    const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] })
    const { statuses } = useDataContext()

    const convertToChartJS = (data: TaskData[]): ChartData => {

        const statusIds: number[] = [...new Set(data.map(row => row.status_id))]
        const statuses: string[] = [...new Set(data.map(row => row.status))]
        const chartData: ChartData = {
            labels: DAY_NAMES,
            datasets: [
                { label: '', data: [], backgroundColor: [] },
                { label: '', data: [], backgroundColor: [] },
                { label: '', data: [], backgroundColor: [] }
            ]
        }
        statusIds.forEach((statusId, index) => {
            chartData.datasets[index].label = statuses[index].toString()
            data.filter(row => row.status_id === statusId).forEach(row => {
                const datasetIndex = DAY_NAMES.indexOf(row.day_of_week)
                if (datasetIndex !== -1) {
                    chartData.datasets[index].data[datasetIndex] = row.task_count
                    chartData.datasets[index].backgroundColor[datasetIndex] = row.style
                }
            })
        })
        return chartData
    }

    const getDashboardData = async () => {
        try {
            const tasks = await getTodayTasks()
            setTasks(tasks.data)
            const thisWeekTaskCount = await getThisWeekTaskCount()
            setThisWeekTaskCount(thisWeekTaskCount.data)
            const chartData = await getTaskCountPreDay()
            setChartData(convertToChartJS(chartData.data))
        } catch (err) {
            console.error(err)
        }
    }

    const handleUpdateStatus = async (id: number, value: number | string) => {
        try {
            const res = await updateStatus(id, value)
            if (res.data.success) {
                getDashboardData()
                toast('Status Changed', 'Task status updated successfully.')
            } else {
                toast('Status Change Failed 1', 'Task status update failed. Please try again.')
            }
        } catch (err) {
            console.log(err)
            toast('Status Change Failed', 'Task status update failed. Please try again.')
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

    const getCount = (status: any) => {
        const count: any = thisWeekTaskCount.find((task: any) => task.status_id === status.id)
        if (count) {
            return count.task_count > 0 ?
                <h1 className="text-5xl font-semibold" style={{ color: status.style }}>{count.task_count}</h1>
                : <h1 className="text-2xl font-semibold" style={{ color: status.style }}>No Tasks</h1>
        } else {
            return <h1 className="text-2xl font-semibold" style={{ color: status.style }}>No Tasks</h1>
        }
    }

    return (
        <>
            <Header title="Dashboard" />
            <Loading>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 flex-grow">
                    <div className="col-span-2 flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row justify-between item-center gap-4">
                            {
                                statuses.slice(1).map((status: any, index: number) => (
                                    <div key={index} className="min-h-44 w-full rounded-md p-4 bg-dark-light shadow flex flex-col justify-center items-center gap-3">
                                        <p className="text-gray-200">{status.title} Tasks</p>
                                        {getCount(status)}
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex-grow w-full rounded-md p-4 bg-dark-light shadow">
                            <BarChart options={options} data={chartData} />
                        </div>
                    </div>
                    <div className="max-h-[85dvh] w-full rounded-md p-4 bg-dark-light shadow">
                        <p className="pb-4 font-semibold">Today's Tasks</p>
                        <div className="h-[92%] overflow-y-auto no-scrollbar">
                            {
                                tasks.length > 0
                                    ?
                                    tasks.map((task: any, index: number) => (
                                        <div key={index} className="py-4 px-2 border-b border-b-dark bg-dark-light/80 hover:bg-dark-light duration-300 ease-in-out">
                                            <p className="text-sm line-clamp-2 text-ellipsis">{task.name}</p>
                                            <div className="flex justify-end mt-2">
                                                <DropDown
                                                    options={makeAsOptions(statuses, 'title', 'id')}
                                                    onChange={(value) => handleUpdateStatus(task.id, value)}>
                                                    <p className="text-sm rounded-full py-1 px-3 text-white" style={{ background: task.style }}>{task.status}</p>
                                                </DropDown>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <div className="flex justify-center items-center h-full">
                                        <p className="text-gray-200">No tasks for today.</p>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </Loading>
        </>
    )
}

export default Dashboard