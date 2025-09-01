import { dashboardService } from '@shared/services/api/dashboardService';
import {
  GDPPerCapitaResponseSchema,
  HealthResponseSchema,
  PopulationResponseSchema,
} from '@shared/types/api';
import { useQuery } from '@tanstack/react-query';

export const usePopulationData = () => {
  return useQuery({
    queryKey: ['populationData'],
    queryFn: async () =>
      dashboardService.getPopulation(PopulationResponseSchema),
  });
};

export const useHealthData = () => {
  return useQuery({
    queryKey: ['healthData'],
    queryFn: async () => dashboardService.getHealth(HealthResponseSchema),
  });
};

export const useGDPPerCapitaData = () => {
  return useQuery({
    queryKey: ['gdpPerCapitaData'],
    queryFn: async () =>
      dashboardService.getGDPPerCapita(GDPPerCapitaResponseSchema),
  });
};
