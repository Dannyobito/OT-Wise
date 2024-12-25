import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
const ViewUser = () => {
  const { userId } = useParams<{ userId: string }>();
  const users = useAppSelector((state) => state.users);
  const user = users.find((user) => user.id.toString() === userId);
  if (!user) {
    return <p>Matching user not found</p>;
  }
  return (
    <div className="w-screen min-h-screen overflow-x-hidden flex flex-col items-center py-4 px-4 sm:px-8 md:px-16">
      <div className="w-fit flex flex-col items-center max-w-[52rem]">
        <div className="w-full flex justify-center">
          <img
            className="h-32 w-32 rounded-full object-cover"
            src={user.profilePhoto}
          />
        </div>
        <h1 className="text-2xl font-semibold">{`${user.firstName} ${user.lastName}`}</h1>
        <h2 className="text-xl font-medium">{`${user.occupation}`}</h2>
        <div className="flex flex-wrap justify-center gap-2 px-2">
          <div className="flex gap-1">
            <p>Gender:</p>
            <p className="capitalize">{user.gender}</p>
            <span className="font-semibold">|</span>
          </div>
          <div className="flex gap-1">
            <p>Date Of Birth:</p>
            <p>{user.dob}</p>
            <span className="font-semibold">|</span>
          </div>
          <div className="flex gap-1 max-w-80">
            <p>Email:</p>
            <p>{user.email}</p>
            <span className="font-semibold">|</span>
          </div>
          {user.linkedInUrl ? (
            <div className="flex items-center max-w-80 gap-1">
              <p>Linkedin:</p>
              <p className="text-xs sm:text-base">{user.linkedInUrl}</p>
              <span className="font-semibold">|</span>
            </div>
          ) : null}
          <div className="flex gap-1">
            <p>Phone:</p>
            <p>{user.phoneNumber}</p>
            <span className="font-semibold">|</span>
          </div>
          <div className="flex gap-1 capitalize">
            <p>Address:</p>
            <p>{`${user.address} ${user.city} ${user.state} ${user.country}`}</p>
            <span className="font-semibold">|</span>
          </div>
          <div className="flex gap-1">
            <p>Zip Code:</p>
            <p>{user.zipCode}</p>
            <span className="font-semibold">|</span>
          </div>
          {user.fax ? (
            <div className="flex gap-1">
              <p>Fax:</p>
              <p>{user.fax}</p>
              <span className="font-semibold">|</span>
            </div>
          ) : null}
        </div>
        <div className="pt-8 w-full">
          <h3 className="border-b border-black w-full py-4">Education</h3>
          <div className="flex flex-col gap-4">
            {user.academicBackground.map((academic) => (
              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between w-full">
                  <p className="capitalize">{academic.degree}</p>
                  <p>{`${academic.startYear} - ${academic.endYear}`}</p>
                </div>

                <p className="capitalize">
                  {academic.institutionName}, {academic.level}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ViewUser };
