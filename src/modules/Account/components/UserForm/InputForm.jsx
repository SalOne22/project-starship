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
import { IconChevronDown, IconCloudUpload } from '@tabler/icons-react';

import { useDispatch, useSelector } from 'react-redux';
import { updateUserThunk } from '@/redux/operations';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';

import userImgSVG from '@/assets/images/userForm/user.svg';
import plusSVG from '@/assets/images/userForm/plus.svg';

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

  useEffect(() => {
    const dateBirthday = userAuth.birthday ? userAuth.birthday : new Date();
    const parseDateBirthday = dateBirthday ? new Date(dateBirthday) : null;
    const selectUserDataFromAuth = () => {
      setUserData({
        username: userAuth.username,
        birthday: parseDateBirthday,
        email: userAuth.email,
        phone: userAuth.phone,
        skype: userAuth.skype,
        avatarURL: userAuth.avatarURL,
      });
    };
    selectUserDataFromAuth();
  }, [userAuth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
    setFormChange(true);
  };

  const openRef = useRef(null);
  const [file, setFile] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  const [formChange, setFormChange] = useState(false);

  const selectedDate = new Date(userData?.birthday);

  const formattedDate = `${
    selectedDate.getMonth() + 1
  }/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;

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
    setUserData({ ...userData, birthday: date });
    setFormChange(true);
  };

  function validateUserEmail(email) {
    const emailValidationRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailValidationRegex.test(email)) {
      notifications.show({
        message: t('userform.notificationEmail'),
        autoClose: 5000,
        color: 'red',
      });
      return false;
    }

    return true;
  }

  function validateUserPhone(phone) {
    const phoneValidationRegex = /^\+380\d{9}$/;

    if (!phoneValidationRegex.test(phone)) {
      notifications.show({
        message: t('userform.notificationPhone'),
        autoClose: 10000,
        color: 'red',
      });
      return false;
    }

    return true;
  }

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
        console.log('Запит на оновлення даних відправлено');
      })
      .catch((error) => {
        console.error('Помилка під час відправки PATCH-запиту:', error);
      });

    setFormChange(false);
  };

  const dateBirthday = userAuth?.birthday;

  const parseDateBirthday = dateBirthday ? new Date(dateBirthday) : null;

  //   console.log('typeof userAuth date:', typeof userAuth.birthday);
  //   console.log('typeof parseDateBirthday:', typeof parseDateBirthday);

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
                src={userImgSVG}
                className={css.userIcon}
                onLoad={() => URL.revokeObjectURL(imageUrl)}
              />
            )
          ) : file.length === 0 ? (
            <div style={{ pointerEvents: 'none' }}>
              <Group justify="center">
                <Dropzone.Idle>
                  <IconCloudUpload stroke={1.5} className={css.icon} />
                </Dropzone.Idle>
              </Group>
            </div>
          ) : (
            <SimpleGrid className={css.avatarURL}>
              <Image
                src={imageUrl}
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

          //
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
              placeholder="Enter your name"
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
              placeholder="select your date of birth"
              value={userData?.birthday || parseDateBirthday}
              classNames={{ wrapper: css.label, input: css.input }}
              onChange={handleDateChange}
              rightSection={<IconChevronDown size={18} color={'#111111'} />}
            />
            <TextInput
              name="email"
              label={t('userform.email')}
              placeholder="Enter your email"
              required
              defaultValue={userAuth?.email}
              classNames={{ wrapper: css.label, input: css.input }}
              onChange={handleInputChange}
            />
            <TextInput
              name="phone"
              // colSpan={2}
              label={t('userform.phone')}
              placeholder="+380971234567"
              defaultValue={userAuth?.phone}
              classNames={{ wrapper: css.label, input: css.input }}
              onChange={handleInputChange}
            />
            <TextInput
              name="skype"
              label={t('userform.skype')}
              placeholder="Add a skype number"
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
    </Paper>
  );
}
