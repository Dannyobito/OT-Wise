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
    <div className="form-container edit-page w-screen max-w-[100vw] overflow-x-hidden min-h-screen pt-5 flex flex-col justify-center items-center">
      <div>
        <h1 className="w-full text-center text-2xl font-semibold">Edit User</h1>
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="w-full flex flex-col gap-6 px-4 sm:px-12"
        >
          <div>
            <h3 className="text-lg font-semibold mb-4 text-left">
              Profile Image
            </h3>

            <div className="flex gap-4 items-center flex-col sm:flex-row">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full mt-4"
                />
              )}

              <div>
                <input
                  type="file"
                  {...register("profilePhoto")}
                  onChange={handleImageUpload}
                  className=" border border-slate-600 bg-[#F0F0F0] px-6 py-2 flex gap-8 rounded-lg max-w-[18rem] sm:max-w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start">
            <h2 className="text-2xl font-semibold mb-1">Bio Data</h2>
            <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
              <div className="pl-4 flex flex-col gap-2 items-start">
                <label className="font-medium text-lg" htmlFor="firstName">
                  First Name
                </label>
                <input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  id="firstName"
                  placeholder="First Name"
                  className="outline-0 border border-darkBlue500 px-6 py-2 rounded-lg sm:min-w-80 w-full max-w-[18rem] sm:max-w-[24rem]"
                />
              </div>
              <div className="pl-4 flex flex-col gap-2 items-start">
                <label className="font-medium text-lg" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  placeholder="Last Name"
                  id="lastName"
                  className="outline-0 border border-darkBlue500 px-6 py-2 rounded-lg sm:min-w-80 w-full max-w-[18rem] sm:max-w-[24rem]"
                />
              </div>
              <div className="pl-4 flex flex-col gap-2 items-start">
                <label className="font-medium text-lg" htmlFor="dob">
                  Date Of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  {...register("dob", {
                    required: "Date of birth is required",
                  })}
                  className="outline-0 border border-darkBlue500 px-6 py-2 rounded-lg sm:min-w-80 w-full max-w-[18rem] sm:max-w-[24rem]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="pl-4 flex flex-col gap-2 items-start">
                <label className="font-medium text-lg" htmlFor="occupation">
                  Occupation
                </label>
                <input
                  {...register("occupation", {
                    required: "Occupation is required",
                  })}
                  placeholder="Occupation"
                  id="occupation"
                  className="outline-0 border border-darkBlue500 px-6 py-2 rounded-lg sm:min-w-80 w-full max-w-[18rem] sm:max-w-[24rem]"
                />
              </div>
              <div className="pl-4 flex flex-col gap-2 items-start">
                <label className="font-medium text-lg" htmlFor="firstName">
                  Gender
                </label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className="outline-0 border border-darkBlue500 px-6 py-2 rounded-lg sm:min-w-80 w-full max-w-[18rem] sm:max-w-[24rem]"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold mb-1">Address Information</h2>
            <div className="pl-4 flex flex-col md:flex-row md:flex-wrap gap-2 items-start">
              <div className="flex flex-col gap-2 items-start">
                <label className="font-medium text-lg" htmlFor="address">
                  Address
                </label>
                <input
                  {...register("address", { required: "Address is required" })}
                  placeholder="Address"
                  id="address"
                  className="outline-0 border border-darkBlue500 px-6 py-2 rounded-lg sm:min-w-80 w-full max-w-[18rem] sm:max-w-[24rem]"
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <label className="font-medium text-lg" htmlFor="city">
                  City
                </label>
                <input
                  {...register("city", {
                    required: "city is required",
                  })}
                  placeholder="City"
                  id="city"
                  className="outline-0 border border-darkBlue500 px-6 py-2 rounded-lg sm:min-w-80 w-full max-w-[18rem] sm:max-w-[24rem]"
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <label className="font-medium text-lg" htmlFor="state">
                  State
                </label>
                <input
                  {...register("state", {
                    required: "state is required",
                  })}
                  placeholder="State"
                  id="state"
                  className="outline-0 border border-darkBlue500 px-6 py-2 rounded-lg sm:min-w-80 w-full max-w-[18rem] sm:max-w-[24rem]"
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <label className="font-medium text-lg" htmlFor="country">
                  Country
                </label>
                <input
                  {...register("country", {
                    required: "country is required",
                  })}
                  placeholder="Country"
                  id="country"
                  className="outline-0 border border-darkBlue500 px-6 py-2 rounded-lg sm:min-w-80 w-full max-w-[18rem] sm:max-w-[24rem]"
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <label className="font-medium text-lg" htmlFor="zipCode">
                  Zip Code
                </label>
                <input
                  {...register("zipCode", {
                    required: "Zip Code is required",
                  })}
                  placeholder="Zip Code"
                  type="number"
                  id="zipCode"
                  className="outline-0 border border-darkBlue500 px-6 py-2 rounded-lg sm:min-w-80 w-full max-w-[18rem] sm:max-w-[24rem]"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold mb-1">Contact Information</h2>
            <div className="pl-4 flex flex-col gap-4 md:flex-row md:flex-wrap">
              <div className="flex flex-col gap-2 items-start">
                <label className="font-medium text-lg" htmlFor="email">
                  Email
                </label>
                <input
                  {...register("email", { required: "Email is required" })}
                  placeholder="Email"
                  id="email"
                  className="outline-0 border border-darkBlue500 px-6 py-2 rounded-lg sm:min-w-80 w-full max-w-[18rem] sm:max-w-[24rem]"
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <label className="font-medium text-lg" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                  })}
                  placeholder="Phone Number"
                  id="phoneNumber"
                  className="outline-0 border border-darkBlue500 px-6 py-2 rounded-lg sm:min-w-80 w-full max-w-[18rem] sm:max-w-[24rem]"
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <label className="font-medium text-lg" htmlFor="fax">
                  Fax (Optional)
                </label>
                <input
                  {...register("fax")}
                  placeholder="Fax (Optional)"
                  id="fax"
                  className="outline-0 border border-darkBlue500 px-6 py-2 rounded-lg sm:min-w-80 w-full max-w-[18rem] sm:max-w-[24rem]"
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <label className="font-medium text-lg" htmlFor="linkedInUrl">
                  LinkedIn URL (Optional)
                </label>
                <input
                  {...register("linkedInUrl")}
                  placeholder="LinkedIn URL (Optional)"
                  id="linkedInUrl"
                  className="outline-0 border border-darkBlue500 px-6 py-2 rounded-lg sm:min-w-80 w-full max-w-[18rem] sm:max-w-[24rem]"
                />
              </div>
            </div>
          </div>
          <div className="py-4">
            <h2 className="text-2xl font-semibold mb-1">Academic Background</h2>
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="pl-4 flex flex-wrap gap-4 mb-4 border-b-4 pb-4 border-b-darkBlue500"
              >
                <div className="flex flex-col gap-2 items-start">
                  <label
                    className="font-medium text-lg"
                    htmlFor="institutionName"
                  >
                    Institution Name
                  </label>
                  <input
                    {...register(
                      `academicBackground.${index}.institutionName` as const,
                      { required: "Institution name is required" }
                    )}
                    placeholder="Institution Name"
                    id="institutionName"
                    className="outline-0 border border-darkBlue500 px-6 py-2 rounded-lg sm:min-w-80 w-full max-w-[18rem] sm:max-w-[24rem]"
                  />
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <label className="font-medium text-lg" htmlFor="degreeName">
                    Degree Name
                  </label>
                  <input
                    {...register(
                      `academicBackground.${index}.degree` as const,
                      {
                        required: "Degree name is required",
                      }
                    )}
                    placeholder="Degree e.g, B.Sc Computer Science"
                    id="degreeName"
                    className="outline-0 border border-darkBlue500 px-6 py-2 rounded-lg sm:min-w-80 w-full max-w-[18rem] sm:max-w-[24rem]"
                  />
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <label
                    className="font-medium text-lg"
                    htmlFor="institutionLevel"
                  >
                    Institution level
                  </label>
                  <select
                    {...register(`academicBackground.${index}.level` as const, {
                      required: "Institution level is required",
                    })}
                    className="outline-0 border border-darkBlue500 px-6 py-2 rounded-lg sm:min-w-80 w-full max-w-[18rem] sm:max-w-[24rem]"
                    id="institutionLevel"
                  >
                    <option value="">Select Level</option>
                    <option value="tertiary">Tertiary</option>
                    <option value="secondary">Secondary</option>
                    <option value="post-graduate">Post Graduate</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <label className="font-medium text-lg" htmlFor="startYear">
                    Start Year
                  </label>
                  <input
                    type="number"
                    {...register(
                      `academicBackground.${index}.startYear` as const,
                      {
                        required: "Start year is required",
                      }
                    )}
                    placeholder="Start Year"
                    id="startYear"
                    className="outline-0 border border-darkBlue500 px-6 py-2 rounded-lg sm:min-w-80 w-full max-w-[18rem] sm:max-w-[24rem]"
                  />
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <label className="font-medium text-lg" htmlFor="endYear">
                    End Year
                  </label>
                  <input
                    type="number"
                    {...register(
                      `academicBackground.${index}.endYear` as const,
                      {
                        required: "End year is required",
                      }
                    )}
                    placeholder="End Year"
                    id="endYear"
                    className="outline-0 border border-darkBlue500 px-6 py-2 rounded-lg sm:min-w-80 w-full max-w-[18rem] sm:max-w-[24rem]"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="bg-red-500 text-white py-2 px-6 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() =>
                  append({
                    institutionName: "",
                    level: "tertiary",
                    startYear: 0,
                    endYear: 0,
                    degree: "",
                  })
                }
                className="bg-darkBlue500 text-white rounded-lg px-6 py-2"
              >
                Add Academic Entry
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="bg-primaryOrange px-6 py-2 rounded-lg w-fit"
              type="submit"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { EditUserPage };
