import i18n from '@/i18n';
import { notifications } from '@mantine/notifications';

function handleError(error) {
  const { t } = i18n;
  if (error === 'Email or password invalid') {
    notifications.show({
      title: t('handleError.title'),
      message: t('handleError.errorLogin'),
      color: 'red',
    });
  } else if (error === 'Email already exist') {
    notifications.show({
      title: t('handleError.title'),
      message: t('handleError.errorRegister'),
      color: 'red',
    });
  } else if (error === 'Server error') {
    notifications.show({
      title: t('handleError.title'),
      message: t('handleError.errorServer'),
      color: 'red',
    });
  } else if (error === '"email" is not valid') {
    notifications.show({
      title: t('handleError.title'),
      message: t('handleError.errorValid'),
      color: 'red',
    });
  } else if (error === 'Unauthorized') {
    notifications.show({
      title: t('handleError.title'),
      message: t('handleError.errorAuthorized'),
      color: 'red',
    });
  } else {
    notifications.show({
      title: t('handleError.title'),
      message: error,
      color: 'red',
    });
  }
}
export default handleError;
