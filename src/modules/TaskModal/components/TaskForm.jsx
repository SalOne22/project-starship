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
import { useTranslation } from 'react-i18next';

const TaskForm = ({ category, onClose, task }) => {
  const [selectedPriority, setSelectedPriority] = useState(
    task ? task.priority : 'low',
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { currentDay } = useParams();

  const validationSchema = Yup.object({
    title: Yup.string()
      .required(t('calendar.chosenday.handleError.title.required'))
      .max(250, t('calendar.chosenday.handleError.title.matches')),
    start: Yup.string()
      .required(t('calendar.chosenday.handleError.start.required'))
      .matches(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        t('calendar.chosenday.handleError.start.matches'),
      ),
    end: Yup.string()
      .required(t('calendar.chosenday.handleError.end.required'))
      .matches(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        t('calendar.chosenday.handleError.end.matches'),
      )
      .test(
        'is-greater',
        t('calendar.chosenday.handleError.end.test'),
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
        handleMessage(
          t('calendar.chosenday.notification.editSuccess'),
          theme.colors.green[6],
        );
      } else {
        await dispatch(addTask({ ...values }));
        handleMessage(
          t('calendar.chosenday.notification.createSuccess'),
          theme.colors.green[6],
        );
      }
      onClose();
    } catch {
      handleMessage(
        t('calendar.chosenday.notification.error'),
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
              {t('calendar.chosenday.taskform.title')}
            </label>
            <Field
              aria-label="Enter text"
              className={css.input}
              type="text"
              name="title"
              placeholder={t('calendar.chosenday.taskform.placeholder')}
            />
            <ErrorMessage name="title" component="div" className={css.error} />
          </Box>
          <Box className={css.wrapTimes}>
            <Box className={css.wrapTime}>
              <label className={css.label} htmlFor="start">
                {t('calendar.chosenday.taskform.start')}
              </label>
              <Field
                as={TimeInput}
                aria-label="Start"
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
                {t('calendar.chosenday.taskform.end')}
              </label>
              <Field
                as={TimeInput}
                aria-label="End"
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
                aria-label="Low priority"
                type="radio"
                name="priority"
                value="low"
                checked={selectedPriority === 'low'}
                onChange={handlePriorityChange}
              />
              <span className={css.radioLabel}>
                {t('calendar.chosenday.taskform.priority.low')}
              </span>
            </label>

            <label className={css.labelPriority}>
              <Field
                className={clsx(css.radioInput, css.radioInputYellow)}
                aria-label="Medium priority"
                type="radio"
                name="priority"
                value="medium"
                checked={selectedPriority === 'medium'}
                onChange={handlePriorityChange}
              />
              <span className={css.radioLabel}>
                {t('calendar.chosenday.taskform.priority.medium')}
              </span>
            </label>

            <label className={css.labelPriority}>
              <Field
                className={clsx(css.radioInput, css.radioInputRed)}
                aria-label="High priority"
                type="radio"
                name="priority"
                value="high"
                checked={selectedPriority === 'high'}
                onChange={handlePriorityChange}
              />
              <span className={css.radioLabel}>
                {t('calendar.chosenday.taskform.priority.high')}
              </span>
            </label>
          </Box>
          <Box className={css.buttonWrap}>
            {task ? (
              <Button className={clsx(css.button, css.addButton)} type="submit">
                <IconPencil size={18} />
                {t('calendar.chosenday.taskform.button.edit')}
              </Button>
            ) : (
              <Button className={clsx(css.button, css.addButton)} type="submit">
                <IconPlus size={18} />
                {t('calendar.chosenday.taskform.button.add')}
              </Button>
            )}

            <Button
              className={[css.button, css.cancelButton]}
              type="button"
              onClick={onClose}
            >
              {t('calendar.chosenday.taskform.button.cancel')}
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
