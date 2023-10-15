import { LoadingOverlay, MantineProvider } from '@mantine/core';

function ScreenLoader() {
  return (
    <MantineProvider>
      <LoadingOverlay visible />
    </MantineProvider>
  );
}

export default ScreenLoader;
