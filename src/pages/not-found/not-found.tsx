import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 w-fit items-center">
        <h1>
          Oops, this page hasn't been created, our engineers are working on it
        </h1>
        <p>
          Why don't you take a look at our objectively beautiful homepage for a
          while though?
        </p>
        <Link
          to=""
          className="w-fit px-6 py-2 text-sm text-white bg-primaryOrange rounded-lg"
        >
          Go To Homepage
        </Link>
      </div>
    </div>
  );
};

export { NotFound };
