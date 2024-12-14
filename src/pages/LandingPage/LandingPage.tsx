import Logo from "../../assets/logo.svg";
import HeroImage from "../../assets/hero-image.svg";
import Assessment from "../../assets/assessment.svg";
import menu_icon from "../../assets/menu.svg";
import close_icon from "../../assets/close.svg";
import add from "../../assets/add-ta.svg";
import upload from "../../assets/upload.svg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useState } from "react";
import Step from "../../components/landing/steps";
import { Testimonial } from "../../components/testimonial";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "../../styles/landing-page.css";
const LandingPage = () => {
  const [visible, setVisible] = useState(false);
  const toggleMenu = () => {
    setVisible(!visible);
  };
  return (
    <div className="text-white w-full overflow-x-hidden">
      <header id="home" className="h-[75vh] lg:h-screen bg-darkBlue500">
        <nav
          className={`flex justify-around lg:justify-between items-center bg-darkBlue500 h-[4.5rem] lg:px-[7.5rem] ${
            visible ? "" : "border-b border-b-[#F2F2F2]"
          }`}
        >
          <img
            src={visible ? close_icon : menu_icon}
            alt="Nenu-icon"
            className="sm:hidden w-5 cursor-pointer "
            onClick={toggleMenu}
          />

          <div>
            <img src={Logo} />
          </div>
          <div className="text-base leading-6 hidden sm:flex gap-8">
            <AnchorLink href="#home">
              <p>Home</p>
            </AnchorLink>
            <AnchorLink href="#about">
              <p>About Us </p>
            </AnchorLink>
            <AnchorLink href="#how-it-works">
              <p>How it works </p>
            </AnchorLink>
          </div>
          <div className="flex gap-4">
            <button className="px-[2.3125rem] py-[0.625rem] border border-white">
              Login
            </button>
            <button className="hidden sm:inline px-[2.3125rem] py-[0.625rem] bg-primaryOrange">
              Register
            </button>
          </div>
          {visible && (
            <div className="w-full bg-darkBlue500 text-white text-base font-mediumm flex flex-col gap-3 py-4 pb-7 px-4 absolute top-[72px] left-0 shadow-lg sm:hidden z-50">
              <AnchorLink href="#home">
                <p>Home</p>
              </AnchorLink>
              <AnchorLink href="#about">
                <p>About Us </p>
              </AnchorLink>
              <AnchorLink href="#how-it-works">
                <p>How it works </p>
              </AnchorLink>
              <div className="flex justify-center gap-4">
                <button className="w-full py-[0.625rem] border border-white">
                  Login
                </button>
                <button className="w-full py-[0.625rem] bg-primaryOrange">
                  Register
                </button>
              </div>
            </div>
          )}
        </nav>
        <div className="flex justify-between xl:justify-center items-center px-8 sm:px-16 xl:gap-[5.875rem] relative h-full">
          <div className="max-w-[35.9375rem] w-full flex flex-col gap-8 pr-5 xl:pr-0 z-10">
            <div className="flex flex-col gap-6">
              <p className="text-2xl md:text-[3.5rem] md:leading-[4rem]">
                Providing the Right{" "}
                <span className="text-secondaryYellow300">Support</span> for{" "}
                <span className="text-secondaryYellow300">Home Adaptation</span>{" "}
                Grants
              </p>
              <p className="text-sm lg:text-xl lg:leading-[1.875rem]">
                A platform for local authorities and private bodies to onboard
                trusted assessors and occupational therapists to support home
                adaptation for the elderly and disabled.
              </p>
            </div>
            <button className="px-6 py-3 bg-primaryOrange w-fit">
              Register Now
            </button>
          </div>
          <div className="max-w-[34.1875rem] w-full absolute right-4 lg:relative bg-darkBlue300 rounded-[1.25rem] sm:h-full max-h-[27rem] brightness-50 lg:brightness-100 sm:px-0">
            <img
              src={HeroImage}
              className="sm:relative sm:top-[-1rem] sm:left-[-1rem] w-full h-full sm:max-h-[27rem] sm:px-0"
            />
          </div>
        </div>
      </header>
      <main className="flex flex-col py-[5.5rem] pt-[7.5rem] gap-[7.5rem]">
        <article
          id="about"
          className="flex flex-col-reverse gap-4 lg:flex-row justify-between xl:justify-center items-center px-4 sm:px-16 xl:gap-[5.875rem] relative h-full"
        >
          <div className="max-w-[38.16125rem] w-full right-4 relative bg-darkBlue100 rounded-lg max-h-[26.9375rem] p-2 sm:p-8 sm:px-0 flex items-center justify-center sm:justify-start">
            <img
              src={Assessment}
              className="sm:relative left-8 sm:max-h-[27rem] sm:px-0"
            />
          </div>
          <div className="max-w-[35.9375rem] w-full flex flex-col gap-8 z-10 text-black">
            <div className="flex flex-col gap-6">
              <p className="text-2xl md:text-[2.5rem] md:leading-[3rem]">
                Empowering Communities Through Home Adaptation Support
              </p>
              <p className="text-sm lg:text-xl lg:leading-[1.875rem]">
                We are a platform dedicated to supporting local authorities,
                private bodies, and healthcare professionals in providing the
                right resources for disabled and elderly individuals to adapt
                their homes. By bridging the gap between authorities,
                therapists, assessors, and applicants, we make the grant
                application process seamless and efficient.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-2xl ">What we offer</p>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex gap-2 items-center">
                    <img src={add} />
                    <p>Adding TAs & OTs</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <img src={upload} />
                    <p>Uploading applicants</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex gap-2 items-center">
                    <img src={add} />
                    <p>Adding TAs & OTs</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <img src={upload} />
                    <p>Uploading applicants</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        <section id="how-it-works" className="px-10 pt-16 pb-8">
          <div className="flex flex-col gap-12">
            <div>
              <h3 className="pb-3 text-secondaryYellow500 text-xl leading-[1.875rem] text-center">
                How it Works
              </h3>
              <h2 className="text-center text-2xl sm:text-[2.5rem] sm:leading-[1.7025rem] font-bold text-black700">
                A Glimpse Into How It Works
              </h2>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-[repeat(auto-fit,_minmax(16.25rem,_1fr))] gap-4 w-full max-w-[68rem] justify-center">
                <Step
                  title="Fill out the application form."
                  content="Complete our simple application form with your personal and disability details"
                  step={1}
                />
                <Step
                  title="Onboard your OTs and Assessors"
                  content="Complete our simple application form with your personal and disability details"
                  step={2}
                />
                <Step
                  title="They Onboard Applicants"
                  content="Complete our simple application form with your personal and disability details"
                  step={3}
                />
                <Step
                  title="Help in Grant Application and implementation"
                  content="Complete our simple application form with your personal and disability details"
                  step={4}
                  isLast
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button className="bg-primaryOrange py-3 px-[1.90625rem]">
                Get Started
              </button>
            </div>
          </div>
        </section>
        <section className="px-10">
          <div className="flex flex-col gap-12">
            <div>
              <h3 className="pb-3 text-xl leading-[1.875rem] text-secondaryYellow500 text-center">
                Testimonials
              </h3>
              <h2 className="text-center text-2xl sm:text-[2.5rem] sm:leading-[1.7025rem] font-bold text-black700">
                Hear from our Trusted Users
              </h2>
            </div>
            <div className="flex justify-center">
              <div className="hidden lg:grid grid-cols-[repeat(auto-fit,_minmax(16.25rem,_1fr))] gap-4 w-full max-w-[76.125rem] justify-center">
                <Testimonial />
                <Testimonial />
                <Testimonial />
              </div>
              <div className="block lg:hidden">
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={16} // Space between slides
                  slidesPerView={1} // 1 slide per view on small screens
                  pagination={{ clickable: true }} // Dots for pagination
                >
                  <SwiperSlide className="!w-full flex justify-between">
                    <Testimonial />
                  </SwiperSlide>
                  <SwiperSlide className="!w-full flex justify-between">
                    <Testimonial />
                  </SwiperSlide>
                  <SwiperSlide className="!w-full flex justify-between">
                    <Testimonial />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="px-4 sm:px-[3rem] lg:px-[7rem] bg-darkBlue500 pt-16 pb-12 flex flex-col gap-6 sm:gap-16">
        <div className="px-8 flex flex-col gap-8">
          <div>
            <img src={Logo} />
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-8">
            <AnchorLink href="#home">
              <span>Home</span>
            </AnchorLink>
            <AnchorLink href="#about">
              <span>About Us</span>
            </AnchorLink>
            <AnchorLink href="#how-it-works">
              <span>How it works</span>
            </AnchorLink>
            <span>Self Assessment</span>
            <span>Contact us</span>
          </div>
        </div>
        <div className="px-8 flex flex-col gap-8">
          <div className="w-full border-t border-t-[#fff]"></div>
          <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
            <small>© 2077 OT-Wise. All rights reserved.</small>
            <div className="flex gap-4">
              <p>Terms</p>
              <p>Privacy</p>
              <p>Cookies</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export { LandingPage };
