import {
  Autocomplete,
  Box,
  Divider,
  Grid,
  LinearProgress,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import { SectionContainer } from '@shared/components/SectionContainer';
import { TitleCard } from '@shared/components/TitleCard';
import { usePerformancePopulationData } from '@shared/hooks/usePopulation';
import { theme } from '@shared/styles/theme';
import type { PerformancePopulationDataByCountrySchema } from '@shared/types/api';
import { formattedPerformancePopulationData } from '@shared/utils/utils';
import type z from 'zod';
import TotalPopulationByCountryChart from './components/TotalPopulationByCountryChart';
import type { PerformancePopulationDataByCountryProps } from '@shared/types/common';
import TotalWorkingPopulationByCountryChart from './components/TotalWorkingPopulation';
import TotalEmploymentByCountryChart from './components/TotalEmploymentByCountryChart';
import TotalUnEmploymentByCountryChart from './components/TotalUnEmploymentByCountryChart';
import EmploymentRateTrendByCountryChart from './components/EmploymentRateTrendByCountryChart';
import { useMemo, useState } from 'react';
import CountrySelectionDropdown from '@shared/components/CountrySelectionDropdown';
import { useAuth } from '@app/context';
import { Error } from '@shared/components/Error';

function MainPage() {
  const auth = useAuth();
  const [selectedCountry, setSelectCountry] = useState<{
    label: string;
    code: string;
  }>(auth.selectedCountry || { label: 'United States', code: 'USA' });

  const {
    data: perforamncePopulationData,
    isLoading: isPerformancePopulationDataPending,
    error,
    isError: isPerformancePopulationDataError,
  } = usePerformancePopulationData(selectedCountry.code);

  if (error) console.log(error);
  const populationChartDataByCountry = useMemo(
    () =>
      perforamncePopulationData
        ? formattedPerformancePopulationData(
            perforamncePopulationData as z.infer<
              typeof PerformancePopulationDataByCountrySchema
            >
          )
        : [],
    [perforamncePopulationData]
  );

  const handleSelectCountry = (v: any) => {
    setSelectCountry({
      label: v.label,
      code: v.code,
    });
    auth.setSelectedCountry({
      label: v.label,
      code: v.code,
    });
  };
  const isLoading = isPerformancePopulationDataPending;
  const isError = isPerformancePopulationDataError;
  const popData =
    populationChartDataByCountry as PerformancePopulationDataByCountryProps;
  // console.log({ isLoading });
  return (
    <Box component="main" sx={{ flexGrow: 1, padding: theme.padding }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <TitleCard
            title="Population"
            description="View population related insights"
          />
          <Typography variant="h4" padding={'1em 0em'}>
            {`Last updated data: ${popData?.totalPopulationGrowth && popData?.totalPopulationGrowth[0].last_updated}`}
          </Typography>
        </div>
        <CountrySelectionDropdown
          selectedValue={selectedCountry}
          onSelectCountry={handleSelectCountry}
        />
      </div>
      {isLoading ? (
        <LinearProgress />
      ) : isError ? (
        <Error />
      ) : (
        <Box sx={{ width: '100%', background: isLoading ? '#F0F2F5' : 'none' }}>
          <Divider sx={{ marginTop: '1rem' }} />
          <SectionContainer title={'Growth'}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 1, md: 1 }}
                padding={theme.logoPadding.padding}
              >
                <Grid size={6}>
                  {isLoading ? (
                    <>
                      <Skeleton
                        sx={{ bgcolor: 'slate.900' }}
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
                  {isLoading ? (
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
                  {isLoading ? (
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
                  {isLoading ? (
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
                  {isLoading ? (
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
