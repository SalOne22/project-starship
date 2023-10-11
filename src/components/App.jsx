import { MantineProvider } from '@mantine/core';

import theme from '@/theme';

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

function App() {
  return <MantineProvider theme={theme}></MantineProvider>;
}

export default App;
