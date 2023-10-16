import { Box, Button } from '@mantine/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { IconPlus } from '@tabler/icons-react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useState } from 'react';
import css from '../styles/TaskForm.module.css';
import { TimeInput } from '@mantine/dates';
// import { useDispatch } from 'react-redux';
import { notifications } from '@mantine/notifications';

// import { addTask } from '@/modules/Calendar/redux/operations';

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

const TaskForm = () => {
  const [selectedPriority, setSelectedPriority] = useState('low');
  // const dispatch = useDispatch();

  // const { tasks } = useTasks();
  // dispatch(fetchTasks());

  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  const handleSubmit = (values, { resetForm }) => {
    try {
      values.priority = selectedPriority;
      values.date = '1997-03-02';
      values.category = 'to-do';

      console.log(values);
      notifications.show({
        message: 'New task successfully created!',
        autoClose: 3000,
        color: 'green',
      });

      resetForm();
      // dispatch(addTask({ ...values }));
    } catch (error) {
      console.error(error);
      notifications.show({
        message: 'Something went wrong, please try again later',
        autoClose: 3000,
        color: 'red',
      });
    }
  };

  return (
    <Box className={css.formWrapper}>
      <Formik
        initialValues={{
          title: '',
          start: '',
          end: '',
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
              <input
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
              <input
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
              <input
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
            <Button className={clsx(css.button, css.addButton)} type="submit">
              <IconPlus size={20} />
              Add
            </Button>
            <Button
              className={clsx(css.button, css.cancelButton)}
              type="button"
            >
              Cancel
            </Button>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

export default TaskForm;
