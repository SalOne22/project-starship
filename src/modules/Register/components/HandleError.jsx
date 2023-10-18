import { notifications } from '@mantine/notifications';

function handleError(error) {
  notifications.show({
    title: 'Error',
    message: error,
    color: 'red',
  });
}
export default handleError;
