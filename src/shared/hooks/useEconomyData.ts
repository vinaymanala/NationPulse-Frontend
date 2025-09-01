import { economyService } from '@shared/services/api/economyService';
import {
  GovernmentDataByCountrySchema,
  GdpPerCapitaDataByCountrySchema,
} from '@shared/types/api';
import { useQuery } from '@tanstack/react-query';

export const useGovernmentDataByCountry = (countryCode: string) => {
  return useQuery({
    queryKey: ['governmentDataByCountry'],
    queryFn: async () =>
      economyService.getGovernmentDataByCountry(
        countryCode,
        GovernmentDataByCountrySchema
      ),
  });
};

export const useGdpPerCapitaDataByCountry = (countryCode: string) => {
  return useQuery({
    queryKey: ['gdpPerCapitaDataByCountry'],
    queryFn: async () =>
      economyService.getGdpPerCapitaDataByCountry(
        countryCode,
        GdpPerCapitaDataByCountrySchema
      ),
  });
};
