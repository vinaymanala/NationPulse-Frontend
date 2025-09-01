import { populationService } from '@shared/services/api/populationService';
import {
  PerformancePopulationDataByCountrySchema,
  PopulationDataByCountrySchema,
} from '@shared/types/api';
import { useQuery } from '@tanstack/react-query';

export const usePopulationData = (countryCode: string) => {
  return useQuery({
    queryKey: ['populationDataByCountry'],
    queryFn: async () =>
      populationService.getPopulationDataByCountry(
        countryCode,
        PopulationDataByCountrySchema
      ),
  });
};

export const usePerformancePopulationData = (countryCode: string) => {
  return useQuery({
    queryKey: ['performancePopulationDataByCountry'],
    queryFn: async () =>
      populationService.getPopulationPerformanceGrowthByCountry(
        countryCode,
        PerformancePopulationDataByCountrySchema
      ),
  });
};
