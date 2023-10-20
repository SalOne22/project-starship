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
import classes from './InputForm.module.css';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconChevronDown, IconCloudUpload } from '@tabler/icons-react';

import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '@/redux/operations';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
// import { hasLength, isEmail, useForm } from '@mantine/form';
// import { selectUserData } from '@/redux/slices/authSlice';

export function UserInputForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const userAuth = useSelector((state) => state.auth.user) ?? {};
  // const username = userAuth.username ?? {};
  // const firstLaterUsername =  username[0].toUpperCase();
  // const { username = 'User' } = useSelector(selectUserData) ?? {};
  // console.log(username)
  // console.log(firstLaterUsername)
  const [userData, setUserData] = useState({
    username: '',
    birthday: '',
    email: '',
    phone: '',
    skype: '',
    avatarURL: '',
  });

  // const form = useForm({
  //   initialValues: {
  //     email: '',
  //     username: '',
  //     password: '',
  //   },

  //   validate: {
  //     username: hasLength(
  //       { min: 2 },
  //       'Enter a name with a minimum of 2 characters',
  //     ),
  //     email: isEmail('Word before @ and domain after the dot'),
  //     password: hasLength(
  //       { min: 6 },
  //       'Password should include at least 6 characters',
  //     ),
  //   },
  // });

  //   useEffect(() => {
  //     console.log(userData);
  //   }, [userData]);

  useEffect(() => {
    const dateBirthday = userAuth?.birthday;

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
    // console.log('name', name);
    // console.log('value:', value);
    setUserData({ ...userData, [name]: value });
    setFormChange(true);
    // console.log(userData);
  };

  const openRef = useRef(null); // для dropzone
  const [file, setFile] = useState([]); //avatarURL
  //   console.log(file);
  const [imageUrl, setImageUrl] = useState(''); // Стан для URL превью зображен
  //   console.log(imageUrl);

  const [formChange, setFormChange] = useState(false); //для деактивації кнопки

  const selectedDate = new Date(userData?.birthday); // Отримана дата з localUserData

  const formattedDate = `${
    selectedDate.getMonth() + 1
  }/${selectedDate.getDate()}/${selectedDate.getFullYear()}`; //форматована для відправки на сервер

  const handleDropavatarURL = (droppedFiles) => {
    if (droppedFiles.length > 0) {
      const lastFile = droppedFiles[droppedFiles.length - 1]; // берем останній в масиві
      const url = URL.createObjectURL(lastFile); //створюємо тимчасове посилання
      setImageUrl(url);
      setFile(droppedFiles);
      setFormChange(true);
      console.log(userAuth);
    }
  };

  const handleDateChange = (date) => {
    setUserData({ ...userData, birthday: date });
    // console.log(userData.birthday);
    setFormChange(true);
  };

  function validateUserEmail(email) {
    const emailValidationRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailValidationRegex.test(email)) {
      notifications.show({
        message: 'Email is not valid',
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
        message: 'Phone must be in format +380971234567',
        autoClose: 10000,
        color: 'red',
      });
      return false;
    }

    return true;
  }
  // function validateUserData(email, phone) {
  //   const emailValidationRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  //   const phoneValidationRegex = /^\+380\d{9}$/;

  //   if (!emailValidationRegex.test(email)) {
  //     notifications.show({
  //       message: 'Email is not valid',
  //       autoClose: 5000,
  //       color: 'red',
  //     });
  //     return false;
  //   }
  //   if (!phoneValidationRegex.test(phone)) {
  //     notifications.show({
  //       message: 'Phone must be in format +380971234567',
  //       autoClose: 10000,
  //       color: 'red',
  //     });
  //     return false;
  //   }

  //   return true;
  // }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    validateUserEmail(userData.email);

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
    dispatch(updateUserData(formData))
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
    <Paper shadow="md" radius="lg" className={classes.wrapper}>
      <form onSubmit={handleFormSubmit} onChange={handleInputChange}>
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          onDrop={handleDropavatarURL}
          openRef={openRef}
          className={classes.dropzone}
          radius="md"
        >
          {userAuth?.avatarURL !== ' ' && imageUrl === '' ? (
            <SimpleGrid className={classes.avatarURL}>
              <Image
                src={userAuth?.avatarURL}
                onLoad={() => URL.revokeObjectURL(imageUrl)}
              />
            </SimpleGrid>
          ) : file.length === 0 ? (
            <div style={{ pointerEvents: 'none' }}>
              <Group justify="center">
                <Dropzone.Idle>
                  <IconCloudUpload stroke={1.5} className={classes.icon} />
                </Dropzone.Idle>
              </Group>
            </div>
          ) : (
            <SimpleGrid className={classes.avatarURL}>
              <Image
                src={imageUrl}
                onLoad={() => URL.revokeObjectURL(imageUrl)}
              />
            </SimpleGrid>
          )}

          {/* {userAuth?.avatarURL !== ' ' && imageUrl === '' ? (
           


            
            userAuth?.avatarURL ? (
              <Image
                src={userAuth?.avatarURL}
                className={classes.avatarURL}
                onLoad={() => URL.revokeObjectURL(imageUrl)}
              />
            ) : (
              <Avatar className={classes.avatarURL} variant="outline">
                your photo
              </Avatar>
          
            )
          ) : 

          file.length === 0 ? (
            <div style={{ pointerEvents: 'none' }}>
              <Group justify="center">
                <Dropzone.Idle>
                  <IconCloudUpload stroke={1.5} className={classes.icon} />
                </Dropzone.Idle>
              </Group>
            </div>
          ) : (
            <SimpleGrid className={classes.avatarURL}>
              <Image
                src={imageUrl}
                onLoad={() => URL.revokeObjectURL(imageUrl)}
              />
            </SimpleGrid>
          )} */}
        </Dropzone>

        {/* <div className={classes.text}> */}
        <Text
          ta="center"
          className={classes.textusername}
          //  classNames={{root: classes.text}}
          //  classNames={{root: classes.textusername}}
        >
          {userAuth?.username}
        </Text>
        <Text ta="center" className={classes.textUser}>
          {t('userform.user')}
        </Text>
        {/* </div> */}
        <div className={classes.fields}>
          <SimpleGrid
            cols={{ base: 1, xl: 2 }}
            //  spacing="lg"
            className={classes.simplGride}
          >
            <TextInput
              name="username"
              label={t('userform.userName')}
              placeholder="Enter your name"
              required
              maxLength={16}
              // className={classes.input}
              classNames={{ wrapper: classes.label, input: classes.input }}
              defaultValue={userAuth?.username}
              onChange={handleInputChange}
              // {...form.getInputProps('username')}
            />
            <DateInput
              name="birthday"
              valueFormat="YYYY/MM/DD"
              label={t('userform.birthday')}
              placeholder="select your date of birth"
              value={userData?.birthday || parseDateBirthday}
              classNames={{ wrapper: classes.label, input: classes.input }}
              onChange={handleDateChange}
              rightSection={<IconChevronDown size={18} color={'#111111'} />}
            />
            <TextInput
              name="email"
              label={t('userform.email')}
              placeholder="Enter your email"
              required
              defaultValue={userAuth?.email}
              classNames={{ wrapper: classes.label, input: classes.input }}
              onChange={handleInputChange}
            />
            <TextInput
              name="phone"
              // colSpan={2}
              label={t('userform.phone')}
              placeholder="+380971234567"
              defaultValue={userAuth?.phone}
              classNames={{ wrapper: classes.label, input: classes.input }}
              onChange={handleInputChange}
            />
            <TextInput
              name="skype"
              // colSpan={2}
              label={t('userform.skype')}
              placeholder="Add a skype number"
              maxLength={16}
              defaultValue={userAuth?.skype}
              classNames={{ wrapper: classes.label, input: classes.input }}
              onChange={handleInputChange}
            />
          </SimpleGrid>
        </div>
        <Group
          justify="center"
          // grow preventGrowOverflow={false}
          classNames={{ group: classes.button }}
        >
          <Button
            type="submit"
            className={classes.control}
            classNames={{ root: classes.button }}
            disabled={!formChange}
          >
            {t('userform.button')}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

// /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
