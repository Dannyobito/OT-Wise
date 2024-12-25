import Step from "./steps";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="px-10 pt-16 pb-8">
      <div className="flex flex-col gap-12">
        <div>
          <h3 className="pb-3 text-secondaryYellow500 text-xl leading-[1.875rem] text-center font-bold">
            How it Works
          </h3>
          <h2 className="text-center text-2xl sm:text-[2.5rem] sm:leading-[1.7025rem] font-bold text-black700 ">
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
  );
};

export { HowItWorks };
