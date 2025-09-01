import { healthService } from '@shared/services/api/healthService';
import { HealthDataByCountrySchema } from '@shared/types/api';
import { useQuery } from '@tanstack/react-query';

export const useHealthData = (countryCode: string) => {
  return useQuery({
    queryKey: ['healthDataByCountry'],
    queryFn: async () =>
      healthService.getHealthDataByCountry(
        countryCode,
        HealthDataByCountrySchema
      ),
  });
};
