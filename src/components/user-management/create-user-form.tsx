import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addUser } from "../../store/user/usersSlice";
import { UserType } from "../../types/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUserForm = () => {
  const navigate = useNavigate();
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
    navigate("/users");
  };
  const tab1Valid = (): boolean => {
    return (!(
      errors.firstName ||
      errors.lastName ||
      errors.dob ||
      errors.occupation ||
      errors.gender
    ) &&
      watch("firstName") &&
      watch("lastName") &&
      watch("dob") &&
      watch("occupation") &&
      watch("gender")) as boolean;
  };
  const tab2Valid = (): boolean => {
    return (
      !(errors.email || errors.phoneNumber) &&
      !!(watch("email") && watch("phoneNumber"))
    );
  };
  const tab3Valid = (): boolean => {
    return (
      !(
        errors.address ||
        errors.city ||
        errors.state ||
        errors.country ||
        errors.zipCode
      ) &&
      !!(
        watch("address") &&
        watch("city") &&
        watch("state") &&
        watch("country") &&
        watch("zipCode")
      )
    );
  };
  const tab4Valid = (): boolean => {
    return (
      !errors.academicBackground &&
      !!(
        watch("academicBackground.0.startYear") &&
        watch("academicBackground.0.endYear") &&
        watch("academicBackground.0.level") &&
        watch("academicBackground.0.degree") &&
        watch("academicBackground.0.institutionName")
      )
    );
  };
  return (
    <main className="w-screen h-screen overflow-x-hidden max-w-[100vw] px-4 md:px-8 lg:px-12">
      <FormWizard stepSize="sm" onComplete={handleSubmit(handleComplete)}>
        <FormWizard.TabContent title="Personal Details" icon="ti-user">
          <section className="w-full h-full flex flex-col">
            <h1 className="text-3xl font-semibold mb-4">Personal Details</h1>
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-left">
                  Upload Profile Photo
                </h3>

                <div className="flex gap-4 items-center flex-col sm:flex-row">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="w-32 h-32 rounded-full mt-4 object-cover"
                    />
                  )}

                  <div>
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      className=" border border-slate-600 bg-[#F0F0F0] px-6 py-2 flex gap-8 rounded-lg max-w-[18rem] sm:max-w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-start">
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
                {errors.firstName && (
                  <p className="error text-red-400">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 items-start">
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
                {errors.lastName && (
                  <p className="error text-red-400">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 items-start">
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
                {errors.dob && (
                  <p className="error text-red-400">{errors.dob.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 items-start">
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
                {errors.occupation && (
                  <p className="error text-red-400">
                    {errors.occupation.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 items-start">
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
                {errors.gender && (
                  <p className="error text-red-400">{errors.gender.message}</p>
                )}
              </div>
            </div>
          </section>
        </FormWizard.TabContent>
        <FormWizard.TabContent
          title="Contact Info"
          icon="ti-settings"
          isValid={tab1Valid()}
        >
          <section className="w-full h-full flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Contact Info</h2>
            <div className="flex flex-col gap-4">
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
                {errors.email && (
                  <p className="error text-red-400">{errors.email.message}</p>
                )}
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
                {errors.phoneNumber && (
                  <p className="error text-red-400">
                    {errors.phoneNumber.message}
                  </p>
                )}
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
          </section>
        </FormWizard.TabContent>
        <FormWizard.TabContent
          title="Address"
          icon="ti-settings"
          isValid={tab2Valid()}
        >
          <section>
            <h2 className="text-xl font-semibold mb-4">Address Info</h2>
            <div className="flex flex-col gap-4">
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
                {errors.address && (
                  <p className="error text-red-400">{errors.address.message}</p>
                )}
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
                {errors.city && (
                  <p className="error text-red-400">{errors.city.message}</p>
                )}
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
                {errors.state && (
                  <p className="error text-red-400">{errors.state.message}</p>
                )}
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
                {errors.country && (
                  <p className="error text-red-400">{errors.country.message}</p>
                )}
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
                {errors.zipCode && (
                  <p className="error text-red-400">{errors.zipCode.message}</p>
                )}
              </div>
            </div>
          </section>
        </FormWizard.TabContent>
        <FormWizard.TabContent
          title="Academic Background"
          icon="ti-book"
          isValid={tab3Valid()}
        >
          <h2 className="text-xl font-semibold mb-4">Academic Background</h2>
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-wrap gap-4 mb-4 border-b-4 pb-4 border-b-darkBlue500"
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
                  {...register(`academicBackground.${index}.degree` as const, {
                    required: "Degree name is required",
                  })}
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
                  {...register(`academicBackground.${index}.endYear` as const, {
                    required: "End year is required",
                  })}
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
        </FormWizard.TabContent>
        <FormWizard.TabContent
          title="Review"
          icon="ti-check"
          isValid={tab4Valid() && isValid}
          validationError={() => alert("Please complete all required fields.")}
        >
          <h2 className="text-xl font-semibold mb-4">
            Review Your Information
          </h2>
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
            <h3 className="text-lg font-bold">Address Information</h3>
            <p>Address: {watch("address")}</p>
            <p>City: {watch("city")}</p>
            <p>State: {watch("state")}</p>
            <p>Country: {watch("country")}</p>
            <p>Zip Code: {watch("zipCode")}</p>
            <h3 className="text-lg font-bold mt-4">Academic Background</h3>
            <ul>
              {watch("academicBackground")?.map((item, index) => (
                <li key={index}>
                  {item.degree} {", "} {item.institutionName} ({item.startYear}{" "}
                  - {item.endYear})
                </li>
              ))}
            </ul>
          </div>
        </FormWizard.TabContent>
      </FormWizard>
    </main>
  );
};

export { CreateUserForm };
