import i18n from '@/i18n';
import { notifications } from '@mantine/notifications';

function handleError(error) {
  const { t } = i18n;
  let title = t('handleError.title');

  switch (error) {
    case 'Email or password invalid':
      notifications.show({
        title,
        message: t('handleError.errorLogin'),
        color: 'red',
      });
      break;
    case 'Email already exist':
      notifications.show({
        title,
        message: t('handleError.errorRegister'),
        color: 'red',
      });
      break;
    case 'Server error':
      notifications.show({
        title,
        message: t('handleError.errorServer'),
        color: 'red',
      });
      break;
    case '"email" is not valid':
      notifications.show({
        title,
        message: t('handleError.errorValid'),
        color: 'red',
      });
      break;
    case 'Unauthorized':
      notifications.show({
        title,
        message: t('handleError.errorAuthorized'),
        color: 'red',
      });
      break;
    default:
      notifications.show({
        title,
        message: error,
        color: 'red',
      });
      break;
  }
}

export default handleError;
