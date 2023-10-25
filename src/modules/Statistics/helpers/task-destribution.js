export const getTasksTypeDistribution = (tasks, filterFn) => {
  const filteredTasks = filterFn ? tasks.filter(filterFn) : tasks;
  const cbReduceTypeDistribution = (acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  };
  return filteredTasks.reduce(cbReduceTypeDistribution, {});
};

export const calculateTasksTypePercentage = (tasksTypeDistribution) => {
  const tasksTypePercentage = {};
  const allTasks = Object.values(tasksTypeDistribution).reduce(
    (acc, value) => acc + value,
    0,
  );
  Object.keys(tasksTypeDistribution).forEach((taskType) => {
    tasksTypePercentage[taskType] = Math.round(
      (tasksTypeDistribution[taskType] / allTasks) * 100,
    );
  });

  return tasksTypePercentage;
};

// This function is used in src/modules/Statistics/Statistics.jsx
// to get data for the chart.
export const getChartData = (tasks, day) => {
  const byDayFilter = (tsks) => tsks.date === day;

  const tasksTypePercentageByDay = calculateTasksTypePercentage(
    getTasksTypeDistribution(tasks, byDayFilter),
  );
  const tasksTypePercentageByMonth = calculateTasksTypePercentage(
    getTasksTypeDistribution(tasks),
  );

  const data = Object.keys(tasksTypePercentageByMonth).map((taskType) => ({
    name: taskType,
    byDay: tasksTypePercentageByDay[taskType] || 0,
    byMonth: tasksTypePercentageByMonth[taskType] || 0,
  }));

  return data;
};

export const translateDataItemsNames = (data, i18n) => {
  return data.map((item) => {
    const translatedName = i18n[item.name] || item.name;
    return {
      ...item,
      name: translatedName,
    };
  });
};
