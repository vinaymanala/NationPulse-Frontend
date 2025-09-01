import { Box, Divider, Grid, LinearProgress, Skeleton } from '@mui/material';
import { SectionContainer } from '@shared/components/SectionContainer';
import { TitleCard } from '@shared/components/TitleCard';
import { usePerformancePopulationData } from '@shared/hooks/usePopulation';
import { theme } from '@shared/styles/theme';
import type { PerformancePopulationDataByCountrySchema } from '@shared/types/api';
import { formattedPerformancePopulationData } from '@shared/utils/utils';
import type z from 'zod';
import TotalPopulationByCountryChart from './components/TotalPopulationByCountryChart';
import type {
  PerformancePopulationDataByCountryProps,
  PerformancePopulationGrowthChartData,
} from '@shared/types/common';
import TotalWorkingPopulationByCountryChart from './components/TotalWorkingPopulation';
import TotalEmploymentByCountryChart from './components/TotalEmploymentByCountryChart';
import TotalUnEmploymentByCountryChart from './components/TotalUnEmploymentByCountryChart';
import EmploymentRateTrendByCountryChart from './components/EmploymentRateTrendByCountryChart';

function MainPage() {
  const {
    data: perforamncePopulationData,
    isLoading: isPerformancePopulationDataPending,
    error,
  } = usePerformancePopulationData('JPN');

  if (error) console.log(error);
  const populationChartDataByCountry = formattedPerformancePopulationData(
    perforamncePopulationData as z.infer<
      typeof PerformancePopulationDataByCountrySchema
    >
  );
  const isLoading = isPerformancePopulationDataPending;
  return (
    <Box component="main" sx={{ flexGrow: 1, padding: theme.padding }}>
      <TitleCard
        title="Population"
        description="View population related insights"
      />
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Box sx={{ width: '100%', background: isLoading ? '#F0F2F5' : 'none' }}>
          <Divider />
          <SectionContainer title={'Population growth'}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 1, md: 1 }}
                padding={theme.logoPadding.padding}
              >
                <Grid size={6}>
                  {isPerformancePopulationDataPending ? (
                    <>
                      <Skeleton
                        sx={{ bgcolor: 'grey.900' }}
                        variant="rectangular"
                        width={500}
                        height={500}
                      />
                    </>
                  ) : (
                    <TotalPopulationByCountryChart
                      data={
                        populationChartDataByCountry as PerformancePopulationDataByCountryProps
                      }
                    />
                  )}
                </Grid>
                <Grid size={6}>
                  {isPerformancePopulationDataPending ? (
                    <>
                      <Skeleton
                        sx={{ bgcolor: 'grey.900' }}
                        variant="rectangular"
                        width={500}
                        height={500}
                      />
                    </>
                  ) : (
                    <TotalWorkingPopulationByCountryChart
                      data={
                        populationChartDataByCountry as PerformancePopulationDataByCountryProps
                      }
                    />
                  )}
                </Grid>
                <Grid size={6}>
                  {isPerformancePopulationDataPending ? (
                    <>
                      <Skeleton
                        sx={{ bgcolor: 'grey.900' }}
                        variant="rectangular"
                        width={500}
                        height={500}
                      />
                    </>
                  ) : (
                    <TotalEmploymentByCountryChart
                      data={
                        populationChartDataByCountry as PerformancePopulationDataByCountryProps
                      }
                    />
                  )}
                </Grid>
                <Grid size={6}>
                  {isPerformancePopulationDataPending ? (
                    <>
                      <Skeleton
                        sx={{ bgcolor: 'grey.900' }}
                        variant="rectangular"
                        width={500}
                        height={500}
                      />
                    </>
                  ) : (
                    <TotalUnEmploymentByCountryChart
                      data={
                        populationChartDataByCountry as PerformancePopulationDataByCountryProps
                      }
                    />
                  )}
                </Grid>
                <Grid size={12}>
                  {isPerformancePopulationDataPending ? (
                    <>
                      <Skeleton
                        sx={{ bgcolor: 'grey.900' }}
                        variant="rectangular"
                        width={500}
                        height={500}
                      />
                    </>
                  ) : (
                    <EmploymentRateTrendByCountryChart
                      data={
                        populationChartDataByCountry as PerformancePopulationDataByCountryProps
                      }
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
          </SectionContainer>
        </Box>
      )}
    </Box>
  );
}

export default MainPage;
