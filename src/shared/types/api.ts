import { z } from 'zod';

export const CountriesSchema = z.object({
  data: z.object({
    message: z.string(),
    success: z.boolean(),
    countries: z.object({}),
  }),
});

export const UsersSchema = z.object({
  data: z
    .object({
      id: z.int(),
      username: z.string(),
      email: z.string().email(),
      created_at: z.string(),
      updated_at: z.string(),
    })
    .array(),
  isSuccess: z.boolean(),
  error: z.string().nullable(),
});

export const UserSigninSchema = z.object({
  data: z.object({
    user: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      created_at: z.string().optional(),
      updated_at: z.string().optional(),
    }),
    access_token: z.string(),
  }),
  isSuccess: z.boolean(),
  error: z.string().nullable(),
});

export const UserRefreshTokenSchema = z.object({
  data: z.object({
    access_token: z.string(),
  }),
  isSuccess: z.boolean(),
  error: z.string().nullable(),
});

export const UserSignOutSchema = z.object({
  data: z.object({}),
  isSuccess: z.boolean(),
  error: z.string().nullable(),
});

export const AllPermissionsSchema = z.object({
  data: z
    .object({
      username: z.string(),
      email: z.string().email(),
      module_id: z.number(),
      module_name: z.string(),
      module_value: z.number(),
      permission_id: z.number(),
      permission_name: z.string(),
      permission_value: z.number(),
      role_description: z.string(),
      role_id: z.number(),
      role_name: z.string(),
    })
    .array(),
  isSuccess: z.boolean(),
  error: z.string().nullable(),
});
export const PermissionsSchema = z.object({
  data: z.array(z.number()),
  isSuccess: z.boolean(),
  error: z.string().nullable(),
});

export const PopulationResponseSchema = z.object({
  data: z
    .object({
      // id: z.number(),
      country_code: z.string(),
      country_name: z.string(),
      indicator: z.string(),
      indicator_code: z.string(),
      year: z.number(),
      value: z.number().or(z.null()),
    })
    .array(),
});

export const HealthResponseSchema = z.object({
  data: z
    .object({
      // id: z.number(),
      country_code: z.string(),
      country_name: z.string(),
      indicator: z.string(),
      indicator_code: z.string(),
      sex_name: z.string(),
      cause: z.string(),
      unitRange: z.string(),
      year: z.number(),
      value: z.number().or(z.null()),
    })
    .array(),
});

export const GDPPerCapitaResponseSchema = z.object({
  data: z
    .object({
      country_code: z.string(),
      country_name: z.string(),
      indicator: z.string(),
      indicator_code: z.string(),
      year: z.string(),
      value: z.number().or(z.null()),
    })
    .array(),
});

export const PopulationDataByCountrySchema = z.object({
  data: z
    .object({
      countryCode: z.string(),
      countryName: z.string(),
      indicatorCode: z.string(),
      indicator: z.string(),
      sexCode: z.string(),
      sexName: z.string(),
      age: z.string(),
      year: z.string(),
      value: z.number().or(z.null()),
    })
    .array(),
});

export const PerformancePopulationDataByCountrySchema = z.object({
  data: z
    .object({
      id: z.number(),
      country_code: z.string(),
      country_name: z.string(),
      indicator_code: z.string(),
      indicator: z.string(),
      year: z.string(),
      value: z.number().or(z.null()),
    })
    .array(),
});

export const HealthDataByCountrySchema = z.object({
  data: z
    .object({
      id: z.number(),
      country_code: z.string(),
      country_name: z.string(),
      indicator_code: z.string(),
      indicator: z.string(),
      sex_name: z.string(),
      sex_code: z.string(),
      cause: z.string(),
      unitRange: z.string(),
      year: z.number(),
      value: z.number().or(z.null()),
    })
    .array(),
});

export const GovernmentDataByCountrySchema = z.object({
  data: z
    .object({
      id: z.number(),
      country_code: z.string(),
      country_name: z.string(),
      indicator_code: z.string(),
      indicator: z.string(),
      year: z.string(),
      value: z.number().or(z.null()),
    })
    .array(),
});

export const GdpPerCapitaDataByCountrySchema = z.object({
  data: z
    .object({
      id: z.number(),
      country_code: z.string(),
      country_name: z.string(),
      indicator_code: z.string(),
      indicator: z.string(),
      year: z.string(),
      value: z.number().or(z.null()),
    })
    .array(),
});
