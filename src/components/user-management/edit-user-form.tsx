import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateUser } from "../../store/user/usersSlice";
import { UserType } from "../../types/user";
import "../../styles/edit-page.css";
const EditUserPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);
  const user = users.find((user) => user.id.toString() === userId);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { register, handleSubmit, setValue, control } = useForm<UserType>({
    defaultValues: {
      academicBackground: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "academicBackground",
  });

  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) => {
        setValue(key as keyof UserType, user[key as keyof UserType]);
      });

      if (user.profilePhoto) {
        setImagePreview(user.profilePhoto);
      }
    }
  }, [user, setValue]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024) {
        alert("File size must be less than 500 KB");
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Only JPEG or PNG images are allowed");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setValue("profilePhoto", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate: SubmitHandler<UserType> = (data) => {
    if (!user) return;
    const updatedUser = {
      ...user!,
      ...data,
      profilePhoto: imagePreview || user.profilePhoto,
    };

    dispatch(updateUser(updatedUser));
    alert("User updated successfully!");
    navigate("/users"); //
  };

  if (!user) {
    return <p>Matching user not found</p>;
  }

  return (
    <div className="form-container edit-page w-screen max-w-[100vw] overflow-x-hidden min-h-screen pt-5 flex flex-col items-center">
      <h1 className="w-full text-center text-2xl font-semibold">Edit User</h1>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="w-full flex flex-col px-4 sm:px-12"
      >
        <div className="flex flex-col items-center w-full">
          <label>Profile Image</label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 rounded-full"
            />
          )}
          <input
            type="file"
            {...register("profilePhoto")}
            onChange={handleImageUpload}
          />
        </div>
        <div>
          <div className="flex gap-2">
            <label>First Name: </label>
            <input
              {...register("firstName", { required: "First name is required" })}
            />
          </div>
          <div className="flex gap-2">
            <label>Last Name: </label>
            <input
              {...register("lastName", { required: "Last name is required" })}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <label>Date of Birth: </label>
          <input
            type="date"
            {...register("dob", { required: "Date of Birth is required" })}
          />
        </div>

        <div className="flex gap-2">
          <label>Gender: </label>
          <select {...register("gender", { required: "Gender is required" })}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <div className="flex gap-2">
            <label>Address: </label>
            <input
              type="text"
              {...register("address", {
                required: "Address is required",
              })}
            />
          </div>
          <div className="flex gap-2">
            <label>City: </label>
            <input {...register("city", { required: "City is required" })} />
          </div>
          <div className="flex gap-2">
            <label>State: </label>
            <input {...register("state", { required: "State is required" })} />
          </div>
          <div className="flex gap-2">
            <label>Country: </label>
            <input
              {...register("country", { required: "Country is required" })}
            />
          </div>
          <div className="flex gap-2">
            <label>Zip Code: </label>
            <input
              {...register("zipCode", { required: "Zip Code is required" })}
            />
          </div>
        </div>
        <div>
          <div className="flex gap-2">
            <label>Phone: </label>
            <input
              type="tel"
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
            />
          </div>
          <div className="flex gap-2">
            <label>Email: </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
            />
          </div>
        </div>
        <div className="py-4">
          <h3 className="py-4 font-medium">Academic Background</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="academic-item flex flex-wrap gap-2">
              <label>Institution: </label>
              <input
                {...register(`academicBackground.${index}.institutionName`, {
                  required: true,
                })}
                className="w-fit"
              />

              <label>Start Year: </label>
              <input
                type="number"
                {...register(`academicBackground.${index}.startYear`, {
                  required: true,
                })}
                className="w-fit"
              />

              <label>End Year: </label>
              <input
                type="number"
                {...register(`academicBackground.${index}.endYear`, {
                  required: true,
                })}
                className="w-fit"
              />

              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              append({
                level: "tertiary",
                institutionName: "",
                startYear: 0,
                endYear: 0,
                degree: "",
              })
            }
            className="bg-darkBlue500 px-5 py-1 rounded-lg text-white"
          >
            Add Academic Background
          </button>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-primaryOrange px-6 py-2 rounded-lg w-fit"
            type="submit"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export { EditUserPage };
