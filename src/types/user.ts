interface academicBackgroundType {
  level: "secondary" | "tertiary" | "post-graduate";
  degree: string;
  institutionName: string;
  startYear: number;
  endYear: number;
}

interface UserType {
  id: number;
  profilePhoto: string;
  firstName: string;
  lastName: string;
  dob: string;
  occupation: string;
  gender: "male" | "female";
  email: string;
  phoneNumber: string;
  fax?: string;
  linkedInUrl?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: number;
  academicBackground: academicBackgroundType[];
}
export type { UserType, academicBackgroundType };
