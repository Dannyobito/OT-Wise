import { useState } from "react";

import AnchorLink from "react-anchor-link-smooth-scroll";

import Logo from "../../assets/logo.svg";
import HeroImage from "../../assets/hero-image.svg";
import menu_icon from "../../assets/menu.svg";
import close_icon from "../../assets/close.svg";

const Hero = () => {
  const [visible, setVisible] = useState(false);
  const toggleMenu = () => {
    setVisible(!visible);
  };
  return (
    <header
      id="home"
      className="h-[75vh] lg:h-screen bg-darkBlue500 pt-[4.5rem]"
    >
      <nav
        className={`flex fixed top-0 left-0 right-0 z-50 justify-around lg:justify-between items-center bg-darkBlue500 h-[4.5rem] lg:px-[7.5rem] ${
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
        <div className="flex gap-4 text-sm">
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
            <div className="flex justify-center gap-4 text-sm">
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
            <p className="text-2xl font-bold md:text-[3.5rem] md:leading-[4rem]">
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
  );
};

export { Hero };
