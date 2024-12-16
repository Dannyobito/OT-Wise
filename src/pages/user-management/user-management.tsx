import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { deleteUser } from "../../store/user/usersSlice";

const UserManagement = () => {
  const users = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col px-4 md:px-16 gap-16 pt-16">
      <h1 className="w-full text-center text-2xl font-semibold">
        User Management
      </h1>
      <div className="flex flex-col justify-center md:block md:w-fit">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-col md:flex-row md:flex-wrap gap-2 border border-darkBlue500 py-2"
          >
            <p className="p-2 border md:border-r-darkBlue500">{`${user.firstName} ${user.lastName}`}</p>
            <p className="p-2 border md:border-r-darkBlue500">{user.email}</p>
            <button
              onClick={() => {
                navigate(`/view/${user.id}`);
              }}
              className="p-2 mx-2 rounded-md border border-r-darkBlue500 bg-darkBlue500 text-white"
            >
              View User
            </button>
            <button
              onClick={() => {
                navigate(`/users/${user.id}`);
              }}
              className="p-2 mx-2 rounded-md border border-r-darkBlue500 bg-darkBlue500 text-white"
            >
              Edit User
            </button>
            <button
              onClick={() => {
                dispatch(deleteUser(user.id));
              }}
              className="p-2 mx-2 rounded-md text-white bg-red-500"
            >
              Delete User
            </button>
          </div>
        ))}
        <button
          className="px-6 py-2 rounded-lg bg-primaryOrange mt-5 text-white"
          onClick={() => {
            navigate("/add-user");
          }}
        >
          Add New User +
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
