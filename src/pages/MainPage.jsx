import Reviews from '@/modules/Reviews';
import AuthSection from '@/modules/Main/components/AuthSection';
import Description from '@/modules/Main/components/Description';

function MainPage() {
  return (
    <>
      <AuthSection />
      <Description />
      <Reviews />
    </>
  );
}

export default MainPage;
