import AnchorLink from "react-anchor-link-smooth-scroll";
import Logo from "../../assets/logo.svg";
const Footer = () => {
  return (
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
  );
};

export { Footer };
