import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addUser } from "../../store/user/usersSlice";
import { UserType } from "../../types/user";
import { useState } from "react";

const CreateUserForm = () => {
  const { register, handleSubmit, control, formState, watch, setValue } =
    useForm<UserType>({
      defaultValues: {
        academicBackground: [],
      },
      mode: "all", // Enables validation feedback immediately
    });
  const { errors, isValid } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "academicBackground",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const usersState = useAppSelector((state) => state.users);

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

  const handleComplete: SubmitHandler<UserType> = (data) => {
    const createdId = usersState.length
      ? usersState[usersState.length - 1].id + 1
      : 1;
    dispatch(addUser({ ...data, id: createdId }));
    alert("User added successfully!");
  };

  return (
    <FormWizard stepSize="sm" onComplete={handleSubmit(handleComplete)}>
      <FormWizard.TabContent title="Personal Details" icon="ti-user">
        <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
        <h3 className="text-xl font-semibold mb-4">Upload Profile Photo</h3>

        <input type="file" onChange={handleImageUpload} className="input" />
        <div className="w-full flex justify-center">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full mt-4"
            />
          )}
        </div>
        <input
          {...register("firstName", { required: "First name is required" })}
          placeholder="First Name"
          className="input"
        />
        {errors.firstName && (
          <p className="error">{errors.firstName.message}</p>
        )}
        <input
          {...register("lastName", { required: "Last name is required" })}
          placeholder="Last Name"
          className="input"
        />
        {errors.lastName && <p className="error">{errors.lastName.message}</p>}
        <input
          type="date"
          {...register("dob", { required: "Date of birth is required" })}
          className="input"
        />
        {errors.dob && <p className="error">{errors.dob.message}</p>}
        <input
          {...register("occupation")}
          placeholder="Occupation"
          className="input"
        />
        <select
          {...register("gender", { required: "Gender is required" })}
          className="input"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p className="error">{errors.gender.message}</p>}
      </FormWizard.TabContent>
      <FormWizard.TabContent title="Contact Info" icon="ti-settings">
        <h2 className="text-xl font-semibold mb-4">Contact Info</h2>
        <input
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          className="input"
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
        <input
          {...register("phoneNumber", {
            required: "Phone number is required",
          })}
          placeholder="Phone Number"
          className="input"
        />
        {errors.phoneNumber && (
          <p className="error">{errors.phoneNumber.message}</p>
        )}
        <input
          {...register("fax")}
          placeholder="Fax (Optional)"
          className="input"
        />
        <input
          {...register("linkedInUrl")}
          placeholder="LinkedIn URL (Optional)"
          className="input"
        />
      </FormWizard.TabContent>
      <FormWizard.TabContent title="Address" icon="ti-settings">
        <h2 className="text-xl font-semibold mb-4">Address Info</h2>
        <input
          {...register("address", { required: "Address is required" })}
          placeholder="address"
          className="input"
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
        <input
          {...register("city", {
            required: "City is required",
          })}
          placeholder="City"
          className="input"
        />
        {errors.phoneNumber && (
          <p className="error">{errors.phoneNumber.message}</p>
        )}
        <input
          {...register("state", {
            required: "State is required",
          })}
          placeholder="State"
          className="input"
        />
        <input
          {...register("country", {
            required: "Country is required",
          })}
          placeholder="Country"
          className="input"
        />
        <input
          {...register("zipCode", {
            required: "Zip Code is required",
          })}
          placeholder="Zip Code"
          className="input"
          type="number"
        />
      </FormWizard.TabContent>
      <FormWizard.TabContent title="Academic Background" icon="ti-book">
        <h2 className="text-xl font-semibold mb-4">Academic Background</h2>
        {fields.map((item, index) => (
          <div key={item.id} className="flex gap-4 mb-4">
            <input
              {...register(
                `academicBackground.${index}.institutionName` as const,
                { required: "Institution name is required" }
              )}
              placeholder="Institution Name"
              className="input"
            />
            <input
              {...register(`academicBackground.${index}.degree` as const, {
                required: "Degree name is required",
              })}
              placeholder="Degree e.g, B.Sc Computer Science"
              className="input"
            />
            <select
              {...register(`academicBackground.${index}.level` as const, {
                required: "Institution level is required",
              })}
              className="input"
            >
              <option value="">Select Level</option>
              <option value="tertiary">Tertiary</option>
              <option value="secondary">Secondary</option>
              <option value="post-graduate">Post Graduate</option>
            </select>
            <input
              type="number"
              {...register(`academicBackground.${index}.startYear` as const, {
                required: "Start year is required",
              })}
              placeholder="Start Year"
              className="input"
            />
            <input
              type="number"
              {...register(`academicBackground.${index}.endYear` as const, {
                required: "End year is required",
              })}
              placeholder="End Year"
              className="input"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="btn btn-danger"
            >
              Remove
            </button>
          </div>
        ))}
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
          className="btn btn-primary"
        >
          Add Academic Entry
        </button>
      </FormWizard.TabContent>
      <FormWizard.TabContent
        title="Review"
        icon="ti-check"
        isValid={isValid}
        validationError={() => alert("Please complete all required fields.")}
      >
        <h2 className="text-xl font-semibold mb-4">Review Your Information</h2>
        <div className="p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-bold">Personal Details</h3>
          {imagePreview && (
            <div className="">
              <div className="w-full flex justify-center">
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-32 h-32 rounded-full"
                />
              </div>
            </div>
          )}
          <p>
            Name: {watch("firstName")} {watch("lastName")}
          </p>
          <p>Date of Birth: {watch("dob")}</p>
          <p>Occupation: {watch("occupation")}</p>
          <p>Gender: {watch("gender")}</p>

          <h3 className="text-lg font-bold mt-4">Contact Info</h3>
          <p>Email: {watch("email")}</p>
          <p>Phone: {watch("phoneNumber")}</p>
          {watch("linkedInUrl") ? (
            <p>LinkedIn: {watch("linkedInUrl")}</p>
          ) : null}
          {watch("fax") ? <p>Fax: {watch("fax")}</p> : null}

          <h3 className="text-lg font-bold mt-4">Academic Background</h3>
          <ul>
            {watch("academicBackground")?.map((item, index) => (
              <li key={index}>
                {item.degree} {", "} {item.institutionName} ({item.startYear} -{" "}
                {item.endYear})
              </li>
            ))}
          </ul>
        </div>
      </FormWizard.TabContent>
    </FormWizard>
  );
};

export { CreateUserForm };
