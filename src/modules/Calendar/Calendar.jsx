import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  const navigate = useNavigate();
  const { pathname } = window.location;

  useEffect(() => {
    const currentDate = new Date();
    const date = new Date(currentDate).toISOString().slice(0, 7);
    navigate(`/calendar/month/${date}`);
    //add .env url
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname === '/project-starship/calendar']);
};

export default Calendar;
