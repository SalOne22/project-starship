export default {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '375px',
        'mantine-breakpoint-md': '768px',
        'mantine-breakpoint-xl': '1440px',
      },
    },
  },
};
