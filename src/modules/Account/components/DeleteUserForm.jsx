import { Button, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import css from '../styles/DeleteUserForm.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserThunk } from '@/redux/operations';
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
  const isLoading = useSelector(selectLoading);
  const { t } = useTranslation();
  const [isConfirm, setIsConfirm] = useState(false);
  const [password, setPassword] = useState({});
  const [visible, { toggle }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      password: '',
    },
    validate: {
      password: (value) => {
        if (value === '') return t('userDeleteForm.errors.required');
        if (value.length < 6) return t('userDeleteForm.errors.length');
      },
    },
  });

  const handleSubmit = (values) => {
    if (form.validate().hasErrors) return;
    setPassword(values);
    setIsConfirm(true);
  };
  const deleteUserOnClick = async () => {
    try {
      await dispatch(deleteUserThunk(password)).unwrap();
      notifications.show({
        message: t('userDeleteForm.message'),
        autoClose: 3000,
        color: 'var(--mantine-color-green-5)',
      });
    } catch (error) {
      form.setErrors({ password: error });
      setIsConfirm(false);
    }
  };
  return (
    <div className={clsx(css.container, isConfirm && css.confirmContainer)}>
      {!isConfirm ? (
        <>
          <h2 className={css.title}>{t('userDeleteForm.titles.main')}</h2>
          <form
            action=""
            className={css.form}
            onSubmit={form.onSubmit(handleSubmit)}
          >
            <PasswordInput
              withAsterisk
              label={t('userDeleteForm.label')}
              disabled={isConfirm}
              visible={visible}
              onVisibilityChange={toggle}
              classNames={{
                input: clsx(
                  css.input,
                  !form.errors.password &&
                    form.isValid('password') &&
                    css.inputSuccess,
                  form.errors.password && css.inputError,
                ),
                section: clsx(
                  css.eyeBtnSection,
                  !form.errors.password &&
                    form.isValid('password') &&
                    css.eyeBtnSectionActive,
                  form.errors.password && css.eyeBtnSectionActive,
                ),
              }}
              {...form.getInputProps('password')}
              rightSection={
                <>
                  <Button
                    type="button"
                    tabIndex={-1}
                    className={css.eyeBtn}
                    variant="transparent"
                    size={'compact-xs'}
                    onClick={toggle}
                  >
                    {visible ? (
                      <IconEyeOff
                        color="var(--mantine-color-gray-5)"
                        className={css.iconEye}
                      />
                    ) : (
                      <IconEye
                        color="var(--mantine-color-gray-5)"
                        className={css.iconEyeOff}
                      />
                    )}
                  </Button>
                  {form.errors?.password ? (
                    <IconAlertCircle color="var(--mantine-color-red-4)" />
                  ) : form.isValid('password') ? (
                    <IconCircleCheck color="var(--mantine-color-green-4)" />
                  ) : null}
                </>
              }
            />
            <button
              type="submit"
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
            {t('userDeleteForm.titles.text')}
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
              onClick={deleteUserOnClick}
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
