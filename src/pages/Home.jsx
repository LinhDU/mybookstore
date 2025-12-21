import FeaturedHero from "../components/FeaturedHero";
import FeaturedBooks from "../components/FeatureBooks";

const Home = () => {
  return (
    <>
      <FeaturedHero />
      <FeaturedBooks />
      {/* Các thành phần khác của trang chủ nếu có */}
    </>
  );
};

export default Home;