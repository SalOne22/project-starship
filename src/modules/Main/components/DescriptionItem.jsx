import { List, Title, Text, Image } from '@mantine/core';
import PropTypes from 'prop-types';
import css from '../styles/Description.module.css';
import clsx from 'clsx';

function DescriptionItem({ descr, className }) {
  const { number, title, text, description, image, id } = descr;

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
              src={image}
              alt="Description Image"
              sizes={[
                { maxWidth: 375, size: '100vw' },
                { maxWidth: 768, size: '50vw' },
                { size: '30vw' },
              ]}
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
    image: PropTypes.string,
  }),
  className: PropTypes.string,
};

export default DescriptionItem;
