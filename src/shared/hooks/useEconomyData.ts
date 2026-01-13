import { economyService } from '@shared/services/api/economyService';
import {
  GovernmentDataByCountrySchema,
  GdpPerCapitaDataByCountrySchema,
} from '@shared/types/api';
import { useQuery } from '@tanstack/react-query';

export const useGovernmentDataByCountry = (countryCode: string) => {
  // console.log({ countryCode });
  return useQuery({
    queryKey: ['governmentDataByCountry', countryCode],
    queryFn: async () =>
      economyService.getGovernmentDataByCountry(
        countryCode,
        GovernmentDataByCountrySchema
      ),
    // enabled: Boolean(countryCode),
  });
};

export const useGdpPerCapitaDataByCountry = (countryCode: string) => {
  return useQuery({
    queryKey: ['gdpPerCapitaDataByCountry', countryCode],
    queryFn: async () =>
      economyService.getGdpPerCapitaDataByCountry(
        countryCode,
        GdpPerCapitaDataByCountrySchema
      ),
    // enabled: Boolean(countryCode),
  });
};
