import { getImage } from '../components/service/imageService';

const windowWidth = window.innerWidth;
const isRetina = window.devicePixelRatio > 1;
const deviceType =
  windowWidth <= 767 ? 'mobile' : windowWidth <= 1439 ? 'tablet' : 'desktop';

const descrs = [
  {
    id: 1,
    number: '1.',
    title: 'calendar',
    text: 'VIEW',
    description:
      "GooseTrack's Calendar view provides a comprehensive overview of your schedule, displaying all your tasks, events, and appointments in a visually appealing and intuitive layout.",
    image: getImage(deviceType, isRetina, 1),
  },
  {
    id: 2,
    number: '2.',
    text: 'SIDEBAR',
    description:
      'GooseTrack offers easy access to your account settings, calendar, and filters. The "My Account" section allows you to manage your profile information and preferences, while the calendar provides a quick and convenient way to view your upcoming events and tasks.',
    image: getImage(deviceType, isRetina, 2),
  },
  {
    id: 3,
    number: '3.',
    title: 'all in',
    text: 'one',
    description:
      'GooseTrack is an all-in-one productivity tool that helps you stay on top of your tasks, events, and deadlines. Say goodbye to scattered to-do lists and hello to streamlined productivity with GooseTrack.',
    image: getImage(deviceType, isRetina, 3),
  },
];

export default descrs;
