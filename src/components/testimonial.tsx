import stars from "../assets/stars.svg";
import jb from "../assets/jb.svg";
const Testimonial = () => {
  return (
    <div className="p-6 flex flex-col gap-8 w-full max-w-[21rem] sm:max-w-[24.125rem] border border-[#D9D9D9] rounded-lg">
      <p className="text-gray500">
        “I love how easy the interface is right from onboarding others who are
        to work with me in getting the applicants onboards. I was also able to
        manage them and the application process. The process they have is
        seamless and easy for any one. I rate them highly”
      </p>
      <div className="flex flex-col gap-6">
        <div>
          <img src={stars} />
        </div>
        <div className="flex gap-3 items-center">
          <img src={jb} />
          <div className="flex flex-col gap-[0.125rem]">
            <p className="text-gray700">James Brown</p>
            <p className="text-gray500">Manchester LA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Testimonial };
