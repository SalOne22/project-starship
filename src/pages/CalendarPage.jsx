import TaskForm from '@/modules/TaskModal/components/TaskForm';
import TaskColumnCard from '@/modules/TasksColumn/components/TaskColumnCard';
import { Outlet } from 'react-router-dom';

function CalendarPage() {
  return (
    <div>
      <TaskColumnCard />
      <TaskForm />
      <Outlet />
    </div>
  );
}

export default CalendarPage;
