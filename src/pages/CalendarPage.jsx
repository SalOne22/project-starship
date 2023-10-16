import { Outlet } from 'react-router-dom';
import Calendar from '../modules/Calendar';

function CalendarPage() {
  return (
    <div>
      <Outlet />
      <Calendar />
    </div>
  );
}

export default CalendarPage;
