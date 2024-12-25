import "swiper/swiper-bundle.css";
import "../../styles/landing-page.css";
import { Hero } from "../../components/landing/hero";
import { Footer } from "../../components/landing/footer";
import { HowItWorks } from "../../components/landing/how-it-works";
import { Testimonials } from "../../components/landing/testimonials";
const LandingPage = () => {
  return (
    <div className="text-white w-full overflow-x-hidden">
      <Hero />
      <main className="flex flex-col py-[5.5rem] pt-[7.5rem] gap-[7.5rem]">
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export { LandingPage };
