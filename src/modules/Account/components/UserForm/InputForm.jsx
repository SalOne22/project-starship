import {
  Paper,
  TextInput,
  Button,
  Group,
  SimpleGrid,
  Text,
  Image,
} from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { DateInput } from '@mantine/dates';
import css from './InputForm.module.css';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconChevronDown } from '@tabler/icons-react';

import { useDispatch, useSelector } from 'react-redux';
import { updateUserThunk } from '@/redux/operations';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';

import userSVG from '@/assets/images/userForm/user.svg';
import plusSVG from '@/assets/images/userForm/plus.svg';
import InputMask from 'react-input-mask';
import ChangePassButton from '../ChangePassButton/ChangePassButton';
import DeleteUserBtn from '../DeleteUserBtn';

export function UserInputForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const userAuth = useSelector((state) => state.auth.user) ?? {};
  const [userData, setUserData] = useState({
    username: '',
    birthday: '',
    email: '',
    phone: '',
    skype: '',
    avatarURL: '',
  });
  const [value, setValue] = useState(null);
  const [file, setFile] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [formChange, setFormChange] = useState(false);
  const openRef = useRef(null);

  useEffect(() => {
    const selectUserDataFromAuth = () => {
      setUserData({
        username: userAuth.username,
        email: userAuth.email,
        phone: userAuth.phone,
        skype: userAuth.skype,
        avatarURL: userAuth.avatarURL,
      });
      if (userAuth.birthday) {
        setValue(new Date(userAuth.birthday));
      }
    };
    selectUserDataFromAuth();
    setFormChange(false);
  }, [userAuth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
    setFormChange(true);
  };

  const handleDropavatarURL = (droppedFiles) => {
    if (droppedFiles.length > 0) {
      const lastFile = droppedFiles[droppedFiles.length - 1];
      const url = URL.createObjectURL(lastFile);
      setImageUrl(url);
      setFile(droppedFiles);
      setFormChange(true);
      console.log(userAuth);
    }
  };

  const handleDateChange = (date) => {
    setValue(date);
    setFormChange(true);
  };

  function validateUserEmail(email) {
    const emailValidationRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailValidationRegex.test(email)) {
      notifications.show({
        title: t('userform.notification.title.error'),
        message: t('userform.notification.notificationEmail'),
        autoClose: 3000,
        color: 'red',
      });
      return false;
    }

    return true;
  }

  function validateUserPhone(phone) {
    const phoneValidationRegex = /\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}/;

    if (!phoneValidationRegex.test(phone)) {
      notifications.show({
        title: t('userform.notification.title.error'),
        message: t('userform.notification.notificationPhone'),
        autoClose: 3000,
        color: 'red',
      });
      return false;
    }

    return true;
  }

  const selectedDate = new Date(value);
  const formattedDate = `${
    selectedDate.getMonth() + 1
  }/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (userData.email) {
      if (!validateUserEmail(userData.email)) {
        return;
      }
    }

    if (userData.phone) {
      if (!validateUserPhone(userData.phone)) {
        return;
      }
    }

    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('birthday', formattedDate);
    formData.append('email', userData.email);
    formData.append('phone', userData.phone);
    formData.append('skype', userData.skype);

    if (file.length > 0) {
      formData.append('avatarURL', file[0]);
    }

    dispatch(updateUserThunk(formData))
      .then(() => {
        notifications.show({
          title: t('userform.notification.title.success'),
          message: t('userform.notification.notificationSuccess'),
          color: 'green',
        });
      })
      .catch((error) => {
        notifications.show({
          title: t('userform.notification.title.error'),
          message: error.message,
          autoClose: 5000,
          color: 'red',
        });
      });

    setFormChange(false);
  };

  const today = new Date();
  const formattedToday = `${today.getFullYear()}/${(today.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}`;

  return (
    <Paper shadow="md" radius="lg" className={css.wrapper}>
      <form onSubmit={handleFormSubmit} onChange={handleInputChange}>
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          onDrop={handleDropavatarURL}
          openRef={openRef}
          className={css.dropzone}
          radius="md"
        >
          {userAuth?.avatarURL !== ' ' && imageUrl === '' ? (
            userAuth?.avatarURL ? (
              <Image
                src={userAuth?.avatarURL}
                className={css.avatarURL}
                onLoad={() => URL.revokeObjectURL(imageUrl)}
              />
            ) : (
              <Image
                src={userSVG}
                className={css.userIcon}
                onLoad={() => URL.revokeObjectURL(imageUrl)}
              />
            )
          ) : file.length === 0 ? (
            <Image
              src={userSVG}
              className={css.userIcon}
              onLoad={() => URL.revokeObjectURL(imageUrl)}
            />
          ) : (
            // </div>
            <SimpleGrid className={css.avatarURL}>
              <Image
                src={imageUrl}
                className={css.previeAvatar}
                onLoad={() => URL.revokeObjectURL(imageUrl)}
              />
            </SimpleGrid>
          )}
        </Dropzone>
        <Image
          src={plusSVG}
          className={css.plusIcon}
          role="button"
          onLoad={() => URL.revokeObjectURL(imageUrl)}
          onClick={() => openRef.current && openRef.current()}
        />

        <Text ta="center" className={css.textusername}>
          {userAuth?.username}
        </Text>
        <Text ta="center" className={css.textUser}>
          {t('userform.user')}
        </Text>

        <div className={css.fields}>
          <SimpleGrid
            cols={{ base: 1, xl: 2 }}
            classNames={{ root: css.simplGride }}
          >
            <TextInput
              name="username"
              label={t('userform.userName')}
              placeholder={t('userform.placeholder.userName')}
              required
              maxLength={16}
              classNames={{ wrapper: css.label, input: css.input }}
              defaultValue={userAuth?.username}
              onChange={handleInputChange}
            />
            <DateInput
              name="birthday"
              valueFormat="YYYY/MM/DD"
              label={t('userform.birthday')}
              placeholder={formattedToday}
              value={value}
              onChange={handleDateChange}
              classNames={{ wrapper: css.label, input: css.input }}
              rightSection={<IconChevronDown size={18} color={'#111111'} />}
            />
            <TextInput
              name="email"
              label={t('userform.email')}
              placeholder={t('userform.placeholder.email')}
              required
              defaultValue={userAuth?.email}
              classNames={{ wrapper: css.label, input: css.input }}
              onChange={handleInputChange}
            />
            <TextInput
              name="phone"
              // colSpan={2}
              label={t('userform.phone')}
              placeholder={t('userform.placeholder.phone')}
              defaultValue={userAuth?.phone}
              classNames={{ wrapper: css.label, input: css.input }}
              onChange={handleInputChange}
              component={InputMask}
              mask="+38 (099) 999-99-99"
            />

            <TextInput
              name="skype"
              label={t('userform.skype')}
              placeholder={t('userform.placeholder.skype')}
              maxLength={16}
              defaultValue={userAuth?.skype}
              classNames={{ wrapper: css.label, input: css.input }}
              onChange={handleInputChange}
            />
          </SimpleGrid>
        </div>
        <Group justify="center" classNames={{ group: css.button }}>
          <Button
            type="submit"
            classNames={{ root: css.button, label: css.buttonLabel }}
            disabled={!formChange}
          >
            {t('userform.button')}
          </Button>
        </Group>
      </form>

      <div className={css.divider}></div>

      <div className={css.dangerZone}>
        <ChangePassButton />
        <DeleteUserBtn />
      </div>
    </Paper>
  );
}
