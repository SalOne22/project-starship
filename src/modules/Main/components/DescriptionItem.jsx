import { List, Title, Text, Image } from '@mantine/core';
import PropTypes from 'prop-types';
import css from '../styles/Description.module.css';
import clsx from 'clsx';
import descrsImgs from '../data/descriptionData';

function DescriptionItem({ descr, className, order }) {
  const { number, title, text, description, id } = descr;

  return (
    <div>
      <List.Item className={clsx(className, css.listitem)}>
        <div className={id % 2 !== 1 ? css.even : css.wrap}>
          <div className={id % 2 !== 1 ? css.wraper : css.wraperleft}>
            <Text className={css.number}>{number}</Text>
            {title && (
              <Title order={2} className={css.title}>
                {title}
              </Title>
            )}
            <Text className={css.text}>{text}</Text>
            <Text className={css.description}>{description}</Text>
          </div>
          <div>
            <Image
              className={css.img}
              src={descrsImgs[order].image}
              alt={text}
            />
          </div>
        </div>
      </List.Item>
    </div>
  );
}
DescriptionItem.propTypes = {
  descr: PropTypes.shape({
    id: PropTypes.number.isRequired,
    number: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    description: PropTypes.string,
  }),
  order: PropTypes.number,
  className: PropTypes.string,
};

export default DescriptionItem;
