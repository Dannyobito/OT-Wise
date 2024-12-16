import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateUser } from "../../store/user/usersSlice";
import { UserType } from "../../types/user";

const EditUserPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // Extract user ID from URL
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);
  console.log(users);
  const user = users.find((user) => user.id.toString() === userId);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, control } =
    useForm<UserType>({
      defaultValues: {
        academicBackground: [],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "academicBackground",
  });

  // Load user data into the form on component mount
  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) => {
        setValue(key as keyof UserType, user[key as keyof UserType]);
      });

      if (user.profilePhoto) {
        setImagePreview(user.profilePhoto); // Show existing profile image
      }
    }
  }, [user, setValue]);

  // Handle file input preview for updated profile image
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
        setValue("profilePhoto", reader.result as string); // Save Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate: SubmitHandler<UserType> = (data) => {
    if (!user) return;
    const updatedUser = {
      ...user!,
      ...data,
      profilePhoto: data.profilePhoto || user.profilePhoto, // Retain old image if not updated
    };

    dispatch(updateUser(updatedUser));
    alert("User updated successfully!");
    navigate("/users"); // Redirect to users list page
  };

  if (!user) {
    return <p>Matching user not found</p>;
  }

  return (
    <div className="form-container">
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit(handleUpdate)}>
        {/* Personal Details Section */}
        <div>
          <label>First Name</label>
          <input
            {...register("firstName", { required: "First name is required" })}
          />
          <p>{watch("firstName")}</p>

          <label>Last Name</label>
          <input
            {...register("lastName", { required: "Last name is required" })}
          />
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            {...register("dob", { required: "Date of Birth is required" })}
          />
        </div>

        <div>
          <label>Gender</label>
          <select {...register("gender", { required: "Gender is required" })}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Contact Details */}
        <div>
          <label>Phone</label>
          <input
            type="tel"
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
          />
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label>Profile Image</label>
          {imagePreview && <img src={imagePreview} alt="Preview" width={100} />}
          <input
            type="file"
            {...register("profilePhoto")}
            onChange={handleImageUpload}
          />
        </div>

        {/* Academic Background */}
        <div>
          <h3>Academic Background</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="academic-item">
              {/* <label>Degree</label>
                <input {...register(`academicBackground.${index}.degree`, { required: true })} /> */}

              <label>Institution</label>
              <input
                {...register(`academicBackground.${index}.institutionName`, {
                  required: true,
                })}
              />

              <label>Start Year</label>
              <input
                type="number"
                {...register(`academicBackground.${index}.startYear`, {
                  required: true,
                })}
              />

              <label>End Year</label>
              <input
                type="number"
                {...register(`academicBackground.${index}.endYear`, {
                  required: true,
                })}
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
          >
            Add Academic Background
          </button>
        </div>

        {/* Submit */}
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export { EditUserPage };
