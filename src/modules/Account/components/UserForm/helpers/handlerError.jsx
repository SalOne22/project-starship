import i18n from '@/i18n';
import { notifications } from '@mantine/notifications';

export function handlerError(error) {
  const { t } = i18n;
  switch (error) {
    case 'Email already is use':
      notifications.show({
        title: t('userform.notification.title.error'),
        message: t('userform.notification.notificationErrorEmail'),
        autoClose: 5000,
        color: 'red',
      });
      break;
    case 'Not found users id':
      notifications.show({
        title: t('userform.notification.title.error'),
        message: t('userform.notification.notificationErrorUser'),
        autoClose: 5000,
        color: 'red',
      });
      break;
    case 'Unauthorized':
      notifications.show({
        title: t('userform.notification.title.error'),
        message: t('userform.notification.notificationErrorUnauthorized'),
        autoClose: 5000,
        color: 'red',
      });
      break;
    default:
      notifications.show({
        title: t('userform.notification.title.error'),
        message: t('userform.notification.notificationErrorAnother'),
        autoClose: 5000,
        color: 'red',
      });
      break;
  }
}
