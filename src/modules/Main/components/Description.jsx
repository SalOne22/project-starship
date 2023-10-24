import { Container, List } from '@mantine/core';
import DescriptionItem from './DescriptionItem';
import css from '../styles/Description.module.css';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function Description() {
  const { t } = useTranslation();
  const descrs = t('main.descrs', {
    returnObjects: true,
  });
  return (
    <div>
      <section>
        <Container>
          <List className={css.list}>
            {descrs.map((descr, index) => (
              <DescriptionItem
                key={descr.id}
                descr={descr}
                order={index}
                className={index === descrs.length - 1 ? css.lastitem : ''}
              />
            ))}
          </List>
        </Container>
      </section>
    </div>
  );
}

Description.propTypes = {
  descrs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      number: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    }),
  ),
};

export default Description;
