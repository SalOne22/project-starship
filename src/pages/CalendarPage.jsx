import TaskColumnCard from '@/modules/TasksColumn/components/TaskColumnCard';
import { Outlet } from 'react-router-dom';

function CalendarPage() {
  return (
    <div>
      <TaskColumnCard />

      <Outlet />
    </div>
  );
}

export default CalendarPage;
