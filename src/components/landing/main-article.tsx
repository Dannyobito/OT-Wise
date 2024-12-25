import Assessment from "../../assets/assessment.svg";

import add from "../../assets/add-ta.svg";
import upload from "../../assets/upload.svg";

const MainArticle = () => {
  return (
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
          <p className="text-2xl md:text-[2.5rem] md:leading-[3rem] font-bold">
            Empowering Communities Through Home Adaptation Support
          </p>
          <p className="text-sm lg:text-xl lg:leading-[1.875rem]">
            We are a platform dedicated to supporting local authorities, private
            bodies, and healthcare professionals in providing the right
            resources for disabled and elderly individuals to adapt their homes.
            By bridging the gap between authorities, therapists, assessors, and
            applicants, we make the grant application process seamless and
            efficient.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-2xl">What we offer</p>
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
  );
};

export default MainArticle;
