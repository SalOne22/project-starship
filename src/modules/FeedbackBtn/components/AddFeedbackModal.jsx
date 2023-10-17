import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import FeedbackForm from './FeedbackForm';
import { selectReviewsIsLoading } from '@/modules/Reviews/redux/reviewsSelectors';
import { findOne } from '@/modules/Reviews/redux/reviewsOperations';

function AddFeedbackModal({ onClose }) {
  const isLoading = useSelector(selectReviewsIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(findOne());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <>
      {!isLoading && (
        <Modal onClose={onClose}>
          <FeedbackForm onClose={onClose} />
        </Modal>
      )}
    </>
  );
}

AddFeedbackModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default AddFeedbackModal;
