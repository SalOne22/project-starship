import { Box, Button } from '@mantine/core';
import {
  IconCircleArrowRight,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';

function TaskToolbar() {
  return (
    <Box
      style={{
        display: 'flex',
        gap: '10px',
      }}
    >
      <Button
        variant="transparent"
        p={0}
        styles={{
          label: { alignItems: 'end' },
        }}
      >
        <IconCircleArrowRight size={16} color="#111111" />
      </Button>
      <Button
        variant="transparent"
        p={0}
        styles={{
          label: { alignItems: 'end' },
        }}
      >
        <IconPencil size={16} color="#111111" />
      </Button>
      <Button
        variant="transparent"
        p={0}
        styles={{
          label: { alignItems: 'end' },
        }}
      >
        <IconTrash size={16} color="#111111" />
      </Button>
    </Box>
  );
}

export default TaskToolbar;
