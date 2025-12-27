import { countryService } from '@shared/services/api/countryService';
import { CountriesSchema } from '@shared/types/api';
import { useQuery } from '@tanstack/react-query';

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => countryService.getAllCountries(CountriesSchema),
  });
};
