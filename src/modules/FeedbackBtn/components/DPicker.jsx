import { useState } from 'react';
import { Box } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import * as dayjs from 'dayjs';
import css from './DPicker.module.css';

export function DPicker() {
  const [value, setValue] = useState(null);

  return (
    <>
      <Box c={'green'} my={24} fw={700}>
        {value ? dayjs(value).format('YYYY-DD-MM') : 'Pick data'}
      </Box>

      <DatePickerInput
        label="Pick date"
        placeholder="Pick date"
        value={value}
        size="md"
        onChange={setValue}
        classNames={{
          calendarHeader: css.calendarHeader,
          calendarHeaderControl: css.calendarHeaderControl,
          calendarHeaderLevel: css.calendarHeaderLevel,
          levelsGroup: css.levelsGroup,
          yearsList: css,
          yearsListRow: css,
          yearsListCell: css,
          yearsListControl: css,
          monthsList: css,
          monthsListRow: css,
          monthsListCell: css,
          monthsListControl: css,
          monthThead: css,
          monthRow: css,
          monthTbody: css,
          monthCell: css,
          month: css.month,
          weekdaysRow: css.weekdaysRow,
          weekday: css.weekday,
          day: css.day,
        }}
      />
    </>
  );
}
