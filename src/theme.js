import { createTheme } from '@mantine/core';

const theme = createTheme({
  white: '#fff',
  black: '#111',
  colors: {
    // TODO: Добавить больше цветов
    dark: [
      '#cec9c1', // brand dark 1
      '#a6a7ab',
      '#909296',
      '#5c5f66',
      '#373a40',
      '#2c2e33',
      '#343434', // brand dark 2
      '#21222c', // brand dark 3
      '#171820', // brand dark 4
      '#13151a', // brand dark 5
    ],
    gray: [
      '#f8f8f8', // brand light gray
      '#e7e7ec',
      '#ccccd0',
      '#b0afb4',
      '#99979d',
      '#8a888e',
      '#84828a', // brand gray
      '#706e76',
      '#63616b',
      '#555361',
    ],
    blue: [
      '#e3f3ff', // brand light blue (lighter)
      '#cae8ff', // brand light blue
      '#dcebf7', // brand blue 1
      '#6da3f7',
      '#3e85f3', // brand blue 2
      '#2b78ef', // brand blue 2 (darker)
      '#126df2',
      '#005cd8',
      '#0052c3',
      '#0046ac',
    ],
    orange: [
      '#fff6e0',
      '#ffeccb',
      '#ffd799',
      '#ffc063',
      '#ffac33', // brand orange
      '#ffa118',
      '#ff9b04',
      '#e48700',
      '#cb7600',
      '#b06500',
    ],
    red: [
      '#ffeae9',
      '#ffd6d3',
      '#f6aca5',
      '#ef7f74',
      '#e9594c',
      '#e74a3b', // brand red
      '#e53423',
      '#cb2517',
      '#b61e13',
      '#9f130c',
    ],
    green: [
      '#e7fdf2',
      '#d7f5e7',
      '#b3e7cf',
      '#8adab5',
      '#68ce9e',
      '#52c791',
      '#3cbc81', // brand green
      '#34ac75',
      '#299a67',
      '#138557',
    ],
  },
});

export default theme;
