import { z } from 'zod';

export const PopulationResponseSchema = z.object({
  data: z
    .object({
      id: z.number(),
      countryCode: z.string(),
      countryName: z.string(),
      indicatorCode: z.string(),
      indicator: z.string(),
      year: z.number(),
      value: z.number().or(z.null()),
    })
    .array(),
});

export const HealthResponseSchema = z.object({
  data: z
    .object({
      id: z.number(),
      countryCode: z.string(),
      countryName: z.string(),
      indicatorCode: z.string(),
      indicator: z.string(),
      sexCode: z.string(),
      sexName: z.string(),
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
      id: z.number(),
      countryCode: z.string(),
      countryName: z.string(),
      indicatorCode: z.string(),
      indicator: z.string(),
      year: z.string(),
      value: z.number().or(z.null()),
    })
    .array(),
});

export const PopulationDataByCountrySchema = z.object({
  data: z
    .object({
      id: z.number(),
      countryCode: z.string(),
      countryName: z.string(),
      indicatorCode: z.string(),
      indicator: z.string(),
      sexCode: z.string(),
      sexName: z.string(),
      age: z.string(),
      year: z.number(),
      value: z.number().or(z.null()),
    })
    .array(),
});

export const PerformancePopulationDataByCountrySchema = z.object({
  data: z
    .object({
      id: z.number(),
      countryCode: z.string(),
      countryName: z.string(),
      indicatorCode: z.string(),
      indicator: z.string(),
      year: z.number(),
      value: z.number().or(z.null()),
    })
    .array(),
});

export const HealthDataByCountrySchema = z.object({
  data: z
    .object({
      id: z.number(),
      countryCode: z.string(),
      countryName: z.string(),
      indicatorCode: z.string(),
      indicator: z.string(),
      sexName: z.string(),
      sexCode: z.string(),
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
      countryCode: z.string(),
      countryName: z.string(),
      indicatorCode: z.string(),
      indicator: z.string(),
      year: z.number(),
      value: z.number().or(z.null()),
    })
    .array(),
});

export const GdpPerCapitaDataByCountrySchema = z.object({
  data: z
    .object({
      id: z.number(),
      countryCode: z.string(),
      countryName: z.string(),
      indicatorCode: z.string(),
      indicator: z.string(),
      year: z.number(),
      value: z.number().or(z.null()),
    })
    .array(),
});
