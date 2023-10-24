import { PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import css from '../styles/DeleteUserForm.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserThunk, getRemoveKey } from '@/redux/operations';
import { IconAlertCircle, IconCircleCheck } from '@tabler/icons-react';
import clsx from 'clsx';
import { notifications } from '@mantine/notifications';
import { selectLoading } from '@/redux/slices/authSlice';
import { useTranslation } from 'react-i18next';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import propTypes from 'prop-types';

function DeleteUserForm({ onClose }) {
  const dispatch = useDispatch();
  const userMail = useSelector((state) => state.auth.user?.email);

  const isLoading = useSelector(selectLoading);
  const { t } = useTranslation();
  const [isConfirm, setIsConfirm] = useState(true);
  const [visible, { toggle }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      secretKey: '',
    },
    validate: {
      secretKey: (value) => {
        if (value === '') return t('userDeleteForm.errors.required');
      },
    },
  });

  const onConfirm = async () => {
    try {
      await dispatch(getRemoveKey()).unwrap();
      setIsConfirm(true);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUserOnClick = async (values) => {
    console.log('values: ', values);
    try {
      await dispatch(deleteUserThunk(values)).unwrap();
      notifications.show({
        message: t('userDeleteForm.message'),
        autoClose: 3000,
        color: 'var(--mantine-color-green-5)',
      });
    } catch (error) {
      form.setErrors({ secretKey: error });
    }
  };
  return (
    <div className={clsx(!isConfirm ? css.confirmContainer : css.container)}>
      {isConfirm ? (
        <>
          <h2 className={css.title}>
            {t('userDeleteForm.titles.mainStart')}{' '}
            <span className={css.mailText}>{userMail}</span>
          </h2>
          <p>{t('userDeleteForm.titles.mainEnd')}</p>
          <form
            action=""
            className={css.form}
            onSubmit={form.onSubmit(deleteUserOnClick)}
          >
            <PasswordInput
              withAsterisk
              label={t('userDeleteForm.label')}
              visible={visible}
              onVisibilityChange={toggle}
              classNames={{
                input: clsx(
                  css.input,
                  !form.errors.secretKey &&
                    form.isValid('secretKey') &&
                    css.inputSuccess,
                  form.errors.secretKey && css.inputError,
                ),
                section: clsx(
                  css.eyeBtnSection,
                  !form.errors.secretKey &&
                    form.isValid('secretKey') &&
                    css.eyeBtnSectionActive,
                  form.errors.secretKey && css.eyeBtnSectionActive,
                ),
                innerInput: css.innerInput,
              }}
              {...form.getInputProps('secretKey')}
              rightSection={
                <>
                  <button
                    type="button"
                    tabIndex={-1}
                    className={css.eyeBtn}
                    size={'compact-xs'}
                    onClick={toggle}
                  >
                    {visible ? (
                      <IconEyeOff color="var(--mantine-color-gray-5)" />
                    ) : (
                      <IconEye color="var(--mantine-color-gray-5)" />
                    )}
                  </button>
                  {form.errors?.secretKey ? (
                    <IconAlertCircle color="var(--mantine-color-red-4)" />
                  ) : form.isValid('secretKey') ? (
                    <IconCircleCheck color="var(--mantine-color-green-4)" />
                  ) : null}
                </>
              }
            />
            <button
              type="submit"
              disabled={isLoading}
              className={clsx(clsx(css.button, css.deleteBtn))}
            >
              {t('userDeleteForm.buttons.delete')}
            </button>
          </form>
        </>
      ) : (
        <>
          <h2 className={css.title}>{t('userDeleteForm.titles.sub')}</h2>
          <p className={css.deleteUserText}>
            {t('userDeleteForm.titles.textStart')}
            <span style={{ textTransform: 'uppercase', color: 'crimson' }}>
              {' '}
              {t('userDeleteForm.titles.textEnd')}
            </span>
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '30px',
            }}
          >
            <button
              type="button"
              disabled={isLoading}
              className={clsx(css.button, css.deleteBtn)}
              style={{ margin: 0 }}
              onClick={onConfirm}
            >
              {t('userDeleteForm.buttons.confirm')}
            </button>
            <button
              type="button"
              disabled={isLoading}
              className={clsx(css.button, css.cancelBtn)}
              style={{ margin: 0 }}
              onClick={onClose}
            >
              {t('common.cancel')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

DeleteUserForm.propTypes = {
  onClose: propTypes.func,
};

export default DeleteUserForm;
