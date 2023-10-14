import { useDisclosure } from '@mantine/hooks';
import { UnstyledButton } from '@mantine/core';
import { useState } from 'react';

import Modal from '@/components/Modal';
import FeedbackForm from './components/FeedbackForm';
import css from './styles/FeedbackBtn.module.css';

const mock = {
  rating: 3,
  review:
    'GooseTrack is impressive, the calendar view and filter options make it easy to stay organized and focused. Highly recommended.',
};

function FeedbackBtn() {
  const [opened, { open, close }] = useDisclosure(false);
  const [feedback] = useState(mock);

  return (
    <>
      <UnstyledButton className={css.feedbackBtn} onClick={open}>
        Feedback
      </UnstyledButton>
      {opened && (
        <Modal onClose={close}>
          <FeedbackForm feedback={feedback} onClose={close} />
        </Modal>
      )}
    </>
  );
}

export default FeedbackBtn;
