import { Box, Button } from '@mantine/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { IconPlus, IconPencil } from '@tabler/icons-react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useState } from 'react';
import css from '../styles/TaskForm.module.css';
import { TimeInput } from '@mantine/dates';
import { useDispatch } from 'react-redux';
import { notifications } from '@mantine/notifications';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { addTask, editTask } from '@/modules/Calendar/redux/operations';
import theme from '@/theme';

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Required')
    .max(250, 'Maximum length is 250 characters'),
  start: Yup.string()
    .required('Required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format: 09:00'),
  end: Yup.string()
    .required('Required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format: 09:30')
    .test(
      'is-greater',
      'End time should be greater than start time',
      function (end) {
        const start = this.parent.start;
        if (!start || !end) return true;
        const [startHour, startMinute] = start.split(':');
        const [endHour, endMinute] = end.split(':');
        return (
          endHour > startHour ||
          (endHour === startHour && endMinute > startMinute)
        );
      },
    ),
  priority: Yup.string(),
});

const TaskForm = ({ category, onClose, task }) => {
  const [selectedPriority, setSelectedPriority] = useState(
    task ? task.priority : 'low',
  );

  const dispatch = useDispatch();

  const { currentDay } = useParams();

  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  const handleSubmit = async (values) => {
    values.priority = selectedPriority;
    values.date = currentDay;
    values.category = category;

    try {
      if (task) {
        await dispatch(editTask({ ...values, _id: task._id }));
        handleMessage('Task successfully edited!', theme.colors.green[6]);
      } else {
        await dispatch(addTask({ ...values }));
        handleMessage('Task successfully created!', theme.colors.green[6]);
      }
      onClose();
    } catch {
      handleMessage(
        'Something went wrong, please try again later',
        theme.colors.red[6],
      );
    }
  };

  const handleMessage = (message, color) => {
    notifications.show({
      message: message,
      autoClose: 3000,
      color: color,
    });
  };

  return (
    <Box className={css.formWrapper}>
      <Formik
        initialValues={{
          title: task ? task.title : '',
          start: task ? task.start : '',
          end: task ? task.end : '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <label className={css.label} htmlFor="title">
              Title
            </label>
            <Field
              className={css.input}
              type="text"
              name="title"
              placeholder="Enter text"
            />
            <ErrorMessage name="title" component="div" className={css.error} />
          </Box>
          <Box className={css.wrapTimes}>
            <Box className={css.wrapTime}>
              <label className={css.label} htmlFor="start">
                Start
              </label>
              <Field
                as={TimeInput}
                variant="unstyled"
                className={`${css.input} custom-time-input`}
                type="text"
                name="start"
              />
              <ErrorMessage
                name="start"
                component="div"
                className={css.error}
              />
            </Box>
            <Box className={css.wrapTime}>
              <label className={css.label} htmlFor="end">
                End
              </label>
              <Field
                as={TimeInput}
                variant="unstyled"
                className={`${css.input} custom-time-input`}
                type="text"
                name="end"
              />
              <ErrorMessage name="end" component="div" className={css.error} />
            </Box>
          </Box>
          <Box className={css.radioWrapper}>
            <label className={css.labelPriority}>
              <Field
                className={clsx(css.radioInput, css.radioInputBlue)}
                type="radio"
                name="priority"
                value="low"
                checked={selectedPriority === 'low'}
                onChange={handlePriorityChange}
              />
              <span className={css.radioLabel}> Low</span>
            </label>

            <label className={css.labelPriority}>
              <Field
                className={clsx(css.radioInput, css.radioInputYellow)}
                type="radio"
                name="priority"
                value="medium"
                checked={selectedPriority === 'medium'}
                onChange={handlePriorityChange}
              />
              <span className={css.radioLabel}> Medium</span>
            </label>

            <label className={css.labelPriority}>
              <Field
                className={clsx(css.radioInput, css.radioInputRed)}
                type="radio"
                name="priority"
                value="high"
                checked={selectedPriority === 'high'}
                onChange={handlePriorityChange}
              />
              <span className={css.radioLabel}> High</span>
            </label>
          </Box>
          <Box className={css.buttonWrap}>
            {task ? (
              <Button className={clsx(css.button, css.addButton)} type="submit">
                <IconPencil size={18} />
                Edit
              </Button>
            ) : (
              <Button className={clsx(css.button, css.addButton)} type="submit">
                <IconPlus size={18} />
                Add
              </Button>
            )}

            <Button
              className={[css.button, css.cancelButton]}
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

TaskForm.propTypes = {
  category: PropTypes.string,
  onClose: PropTypes.func,
  task: PropTypes.object,
};

export default TaskForm;
