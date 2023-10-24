import PropTypes from 'prop-types';
import { DatePickerInput } from '@mantine/dates';
import * as dayjs from 'dayjs';
import { useState } from 'react';

import css from './styles/GooseDatePicker.module.css';
import { Box, ActionIcon, rem } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

function GooseDatePicker({ date = dayjs(), day = false }) {
  const [value, setValue] = useState(date);

  return (
    <Box className={css.wrap}>
      <DatePickerInput
        placeholder="Pick date"
        valueFormat={day ? 'D MMMM YYYY' : 'MMMM YYYY'}
        value={value}
        onChange={setValue}
        aria-label="Date input"
        classNames={{
          root: css.root,
          wrapper: css.wrapper,
          input: css.input,

          calendarHeader: css,
          calendarHeaderControl: css.calendarHeaderControl,
          calendarHeaderLevel: css.calendarHeaderLevel,
          levelsGroup: css,
          yearsList: css,
          yearsListRow: css,
          yearsListCell: css.yearsListCell,
          yearsListControl: css,
          monthsList: css,
          monthsListRow: css,
          monthsListCell: css.monthsListCell,
          monthsListControl: css,
          monthThead: css,
          monthRow: css,
          monthTbody: css,
          monthCell: css,
          month: css,
          weekdaysRow: css,
          weekday: css.weekday,
          day: css.day,
        }}
      />
      <ActionIcon.Group
        classNames={{
          group: css.group,
        }}
      >
        <ActionIcon variant="default" size="lg" aria-label="left">
          <IconChevronLeft style={{ width: rem(36) }} stroke={1.5} />
        </ActionIcon>

        <ActionIcon variant="default" size="lg" aria-label="right">
          <IconChevronRight style={{ width: rem(36) }} stroke={1.5} />
        </ActionIcon>
      </ActionIcon.Group>
    </Box>
  );
}

GooseDatePicker.propTypes = {
  date: PropTypes.string,
  day: PropTypes.bool,
};

export default GooseDatePicker;
