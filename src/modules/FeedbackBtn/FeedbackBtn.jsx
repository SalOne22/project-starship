import { useDisclosure } from '@mantine/hooks';
import { UnstyledButton } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import css from './styles/FeedbackBtn.module.css';
import AddFeedbackModal from './components/AddFeedbackModal';

function FeedbackBtn() {
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();

  return (
    <>
      <UnstyledButton className={css.feedbackBtn} onClick={open}>
        {t('common.feedback')}
      </UnstyledButton>
      {opened && <AddFeedbackModal onClose={close} />}
    </>
  );
}

export default FeedbackBtn;
