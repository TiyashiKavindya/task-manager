import Dashboard from "./pages/Dashboard";
import TaskPage from "./pages/TaskPage";
import ActivityPage from "./pages/ActivityPage";
import { AiOutlineHome } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";

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
    }
]