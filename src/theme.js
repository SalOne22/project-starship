import { createTheme, em } from '@mantine/core';

const theme = createTheme({
  white: '#fff',
  black: '#111',
  primaryShade: 4,
  colors: {
    // TODO: Добавить больше цветов
    dark: [
      '#ffffff', // brand dark.0
      '#f7f6f9', // brand dark.1
      '#909296',
      '#5c5f66',
      '#373a40',
      '#2c2e33',
      '#343434', // brand dark.6
      '#171820', // brand dark.7
      '#13151A', // brand dark.8
      '#000000', // brand dark.9
    ],
    gray: [
      '#cec9c1', // brand gray.0
      '#f8f8f8', // brand gray.1
      '#E3F3FF26', // brand gray.2
      '#ccccd0',
      '#b0afb4',
      '#84828a', // brand gray.5
      '#343434', // brand gray.6
      '#21222c', // brand gray.7
      '#171820', // brand gray.8
      '#13151a', // brand gray.9
    ],
    blue: [
      '#e3f3ff', // brand blue.0
      '#cae8ff', // brand blue.1
      '#dcebf7', // brand blue.2
      '#6da3f7',
      '#3e85f3', // brand blue.4
      '#2b78ef', // brand blue.5
      '#126df2',
      '#005cd8',
      '#0052c3',
      '#0046ac',
      '#72c2f8', // brand blue.10
      '#dce3e5',
      '#007bff',
    ],
    orange: [
      '#fff6e0',
      '#ffeccb',
      '#ffd799',
      '#ffc063',
      '#ffac33', // brand orange.4
      '#ffa118',
      '#ff9b04',
      '#e48700',
      '#cb7600',
      '#b06500',
      '#f3b249',
    ],
    red: [
      '#ffeae9',
      '#ffd6d3',
      '#f6aca5',
      '#ef7f74',
      '#e74a3b', // brand red.4
      '#e64131',
      '#e53423',
      '#cb2517',
      '#b61e13',
      '#9f130c',
      '#ea3d65',
    ],
    green: [
      '#e7fdf2',
      '#d7f5e7',
      '#b3e7cf',
      '#8adab5',
      '#68ce9e',
      '#52c791',
      '#3cbc81', // brand green.6
      '#34ac75',
      '#299a67',
      '#138557',
    ],
  },
  fontFamily: 'Inter',
  breakpoints: {
    xs: em(375),
    md: em(768),
    xl: em(1440),
  },
});

export default theme;
