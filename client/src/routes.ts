import Dashboard from "./pages/Dashboard";
import TaskPage from "./pages/Task";
import ActivityPage from "./pages/Activity";
import AnalyticsPage from "./pages/Analytics";
import { AiOutlineHome } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";
import { FiPieChart } from "react-icons/fi";

type Route = {
    path: string
    title: string
    component: React.FC
    icon: React.FC
}

export const ROUTES: Route[] = [
    {
        path: '/',
        title: 'Dashboard',
        component: Dashboard,
        icon: AiOutlineHome
    },
    {
        path: '/task',
        title: 'Tasks',
        component: TaskPage,
        icon: FaTasks
    },
    {
        path: '/activity',
        title: 'Activities',
        component: ActivityPage,
        icon: RxActivityLog
    },
    {
        path: '/analytics',
        title: 'Analytics',
        component: AnalyticsPage,
        icon: FiPieChart
    }
]