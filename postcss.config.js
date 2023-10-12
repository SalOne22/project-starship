export default {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '23.4375em',
        'mantine-breakpoint-md': '48em',
        'mantine-breakpoint-xl': '90em',
      },
    },
  },
};
