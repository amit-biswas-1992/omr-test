import { Metadata } from "next";
import AboutUsComponent from "../../components/aboutComponent/about";

export const metadata: Metadata = {
  title: "About Us",
};

const AboutUs = () => {
  return (
    <>
      <AboutUsComponent />
    </>
  );
};

export default AboutUs;
