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
import { IconCloudUpload } from '@tabler/icons-react';

import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '@/redux/operations';

export function UserInputForm() {
  const dispatch = useDispatch();

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
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
    <Paper shadow="md" radius="lg">
      <div className={classes.wrapper}>
        {/* <div className={classes.wrapper}> */}
        <form
          className={classes.form}
          onSubmit={handleFormSubmit}
          onChange={handleInputChange}
        >
          <div className={classes.wrapperDropzone}>
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
            </Dropzone>
            <Text ta="center" className={classes.textusername}>
              {userAuth?.username}
            </Text>
            <Text ta="center" className={classes.textUser}>
              User
            </Text>
          </div>

          <div className={classes.fields}>
            <SimpleGrid cols={{ base: 1, xl: 2 }}>
              <TextInput
                name="username"
                label="User Name"
                placeholder="Enter your name"
                required
                maxLength={16}
                className={classes.input}
                defaultValue={userAuth?.username}
                onChange={handleInputChange}
              />
              <DateInput
                name="birthday"
                valueFormat="YYYY/MM/DD"
                label="Birthday"
                placeholder="select your date of birth"
                value={userData?.birthday || parseDateBirthday}
                onChange={handleDateChange}
              />
              <TextInput
                name="email"
                label="Email"
                placeholder="Enter your email"
                required
                defaultValue={userAuth?.email}
                onChange={handleInputChange}
              />
              <TextInput
                name="phone"
                // colSpan={2}
                label="Phone"
                placeholder="38 (097) 123 45 67"
                defaultValue={userAuth?.phone}
                onChange={handleInputChange}
              />
              <TextInput
                name="skype"
                // colSpan={2}
                label="Skype"
                placeholder="Add a skype number"
                maxLength={16}
                defaultValue={userAuth?.skype}
                onChange={handleInputChange}
              />
            </SimpleGrid>

            <Group justify="center" mt="md">
              <Button
                type="submit"
                className={classes.control}
                disabled={!formChange}
              >
                Save changes
              </Button>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}

// /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
