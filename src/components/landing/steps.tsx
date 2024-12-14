interface StepProps {
  title: string;
  content: string;
  step: number;
  isLast?: boolean;
}
const Step = ({ title, content, step, isLast }: StepProps) => {
  return (
    <div className="w-full sm:w-fit flex justify-center">
      <div
        className={`w-[16.25rem] py-4 flex flex-col gap-4 ${
          isLast ? "rounded-tr-[2rem] rounded-bl-[2rem] shadow-step4" : ""
        }`}
      >
        <h4 className="relative -left-2 p-3 pr-[9.1875] w-[13rem] bg-darkBlue500 rounded-xl">{`Step ${step}`}</h4>
        <div className="flex flex-col gap-3 pt-4">
          <p className="pl-4 pr-2 text-xl text-black900">{title}</p>
          <p className="pl-4 pr-2 text-black600">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Step;
