import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center px-4">
      <div className="flex flex-col gap-4 w-fit items-center">
        <h1 className="text-3xl font-semibold">Oops!!!</h1>
        <p className="text-center">
          This page hasn't been created, our engineers are working on it.
          <br /> Why don't you take a look at our objectively beautiful homepage
          for a while though?
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
