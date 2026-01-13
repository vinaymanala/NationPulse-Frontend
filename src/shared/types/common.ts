import type { Dispatch, SetStateAction } from 'react';

export type AuthContextType = {
  signedInUser?: TUserObject | null;
  signin: (user: TUserObject | null) => void;
  signout: (callback: VoidFunction) => void;
  selectedCountry: { label: string; code: string };
  setSelectedCountry: Dispatch<SetStateAction<{ label: string; code: string }>>;
  openReportStatus: { type: string; message: string; open: boolean };
  setOpenReportStatus: Dispatch<
    SetStateAction<{ type: string; message: string; open: boolean }>
  >;
};

export type TUserPermissionsPayload = {
  user_id: number;
  role_id: number;
  modules: number[];
  permissions: number[];
};

export type ModulePermissions = {
  moduleIndex: number;
  permissionIndex: number;
  checked?: boolean;
  moduleID: number;
  moduleName: string;
  path: string;
  permissionID: number;
};

export type UserData = {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type TModules = {
  moduleID: number;
  moduleName: string;
  path: string;
  permissionID: number;
};
export type TAPIResponse = {
  isSuccess: boolean;
  data: any;
  error: string | null;
};

export type TUserFormInput = {
  name: string;
  email: string;
};
export type TUserObject = {
  signin?: boolean;
  isAdmin?: boolean;
  id?: string;
  accessToken?: string;
  permissions?: number[];
  selectCountry: {
    name: string;
    code: string;
  };
} & TUserFormInput;

export type TitleCardProps = {
  title: string;
  description?: string;
};

export type SectionContainerProps = {
  title: string;
  children: React.ReactNode;
};

export type ChartDataProps = {
  data: {
    [k: string]: string | number | null | [];
  }[];
};

export type DataProps = {
  [k: string]: string | number | null;
}[];

export type PopulationByCountryProps = {
  name: string;
  shortName: string;
  indicator: string;
  indicatorCode: string;
  unitRange?: string;
  year: number;
  value: number | null;
  info: string;
  last_updated: string;
}[];

export type PerformancePopulationDataByCountryProps = {
  totalPopulationGrowth: DataProps;
  totalEmploymentGrowth: DataProps;
  workingPopulationGrowth: DataProps;
  employmentRateTrendGrowth: DataProps;
  unemploymentGrowth: DataProps;
};

export type PerformancePopulationGrowthChartData = {
  data: PerformancePopulationDataByCountryProps;
};

export type HealthDataByCountryProps = {
  name: string;
  shortName: string;
  indicator: string;
  indicatorCode: string;
  sexName: string;
  sexCode: string;
  cause: string;
  unitRange: string;
  year: number;
  value: number | null;
  info: string;
  last_updated: string;
}[];

export type HealthDataFormattedByCountryProps = {
  maleHealthData: HealthDataByCountryProps;
  femaleHealthData: HealthDataByCountryProps;
  totalHealthData: HealthDataByCountryProps;
};

export type HealthChartDataByCountryProps = {
  data: HealthDataFormattedByCountryProps;
};

export type EconomyDataByCountryProps = {
  name: string;
  shortName: string;
  indicator: string;
  indicatorCode: string;
  year: number;
  value: number | null;
  info: string;
  last_updated: string;
}[];
