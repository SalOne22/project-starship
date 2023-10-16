import { useDisclosure } from '@mantine/hooks';
import { UnstyledButton } from '@mantine/core';
import { useEffect } from 'react';

import Modal from '@/components/Modal';
import FeedbackForm from './components/FeedbackForm';
import css from './styles/FeedbackBtn.module.css';
import { useDispatch } from 'react-redux';
import { findOne } from '../Reviews/redux/reviewsOperations';

function FeedbackBtn() {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findOne());
  }, [dispatch]);

  return (
    <>
      <UnstyledButton className={css.feedbackBtn} onClick={open}>
        Feedback
      </UnstyledButton>
      {opened && (
        <Modal onClose={close}>
          <FeedbackForm onClose={close} />
        </Modal>
      )}
    </>
  );
}

export default FeedbackBtn;
