export type Data = {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: keyof typeof Gender;
  about: string;
  languages: string[];
  profile_pic: string;
  specialty: Specialty;
  clinics: Clinic[];
};

export type Clinic = {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
};

export const Gender = {
  Female: "female",
  Male: "male",
  Other: "other",
} as const;

export type Specialty = {
  id: number;
  name: string;
};
