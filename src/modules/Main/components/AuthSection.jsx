import { Container, Title } from '@mantine/core';
import css from '../styles/AuthSection.module.css';
import GooseTrackLogo from '@/assets/icons/logo.svg?react';
import clsx from 'clsx';
import { Button } from '@mantine/core';
import { IconLogin2 } from '@tabler/icons-react';

function AuthSection() {
  return (
    <div>
      <section className={css.sectionhero}>
        <Container>
          <GooseTrackLogo className={css.logo} />
          <Title order={1} className={css.text}>
            G<span>oo</span>seTrack
          </Title>
          <div className={css.wraper}>
            <Button
              className={clsx(css.login)}
              radius="lg"
              rightSection={<IconLogin2 width={18} height={18} />}
              classNames={{
                section: css.section,
              }}
            >
              Log in
            </Button>
            <Button className={clsx(css.signup)}>Sign up</Button>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default AuthSection;
