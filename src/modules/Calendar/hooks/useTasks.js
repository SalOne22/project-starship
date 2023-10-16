import { useSelector } from 'react-redux';

export const useTasks = () => {
  const { tasks, isLoading, error } = useSelector((state) => state.tasks);
  return {
    tasks,
    isLoading,
    error,
  };
};
