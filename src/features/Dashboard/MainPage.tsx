import { useTheme } from '@shared/styles/theme';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  LinearProgress,
  Skeleton,
} from '@mui/material';

import { z } from 'zod';
import {
  useGDPPerCapitaData,
  useHealthData,
  usePopulationData,
} from '@shared/hooks/useDashboard';
import {
  GDPPerCapitaResponseSchema,
  HealthResponseSchema,
  PopulationResponseSchema,
} from '@shared/types/api';

import PopulationChart from './components/PopulationChart';
import HealthChart from './components/HealthChart';
import {
  formattedGdpPerCapitaData,
  formattedHealthData,
  formattedPopulationData,
} from '@shared/utils/utils';
import GdpPerCapitaChart from './components/GdpPerCapitaChart';
import { TitleCard } from '@shared/components/TitleCard';
import { SectionContainer } from '@shared/components/SectionContainer';
import { useMemo } from 'react';

function MainPage() {
  const theme = useTheme();

  const { data: populationData, isLoading: isPopulationDataPending } =
    usePopulationData();
  const populationChartData = useMemo(
    () =>
      populationData
        ? formattedPopulationData(
            populationData as z.infer<typeof PopulationResponseSchema>
          )
        : [],
    [populationData]
  );

  const { data: healthData, isLoading: isHealthDataPending } = useHealthData();
  const healthChartData = useMemo(
    () =>
      healthData
        ? formattedHealthData(
            healthData as z.infer<typeof HealthResponseSchema>
          )
        : [],
    [healthData]
  );

  const { data: gdpPerCapitaData, isLoading: isGdpPerCapitaDataPending } =
    useGDPPerCapitaData();
  const gdpPerCapitaChartData = useMemo(
    () =>
      gdpPerCapitaData
        ? formattedGdpPerCapitaData(
            gdpPerCapitaData as z.infer<typeof GDPPerCapitaResponseSchema>
          )
        : [],
    [gdpPerCapitaData]
  );

  const isLoading =
    isPopulationDataPending && isHealthDataPending && isGdpPerCapitaDataPending;
  return (
    <Box component="main" sx={{ flexGrow: 1, padding: theme.padding }}>
      <TitleCard
        title="Dashboard"
        description="An overview of key metrics and insights"
      />
      {/* <Divider /> */}
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Box sx={{ width: '100%', background: isLoading ? '#F0F2F5' : 'none' }}>
          <Divider />
          <SectionContainer title={"Recent highlight's"}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 1, md: 5 }}
                padding={theme.logoPadding.padding}
              >
                <Grid size={6}>
                  {isPopulationDataPending ? (
                    <>
                      <Skeleton
                        sx={{ bgcolor: 'slate.900' }}
                        variant="rectangular"
                        width={500}
                        height={500}
                      />
                    </>
                  ) : (
                    <>
                      <PopulationChart data={populationChartData} />
                    </>
                  )}
                </Grid>
                <Grid size={6}>
                  {isHealthDataPending ? (
                    <>
                      <Skeleton
                        sx={{ bgcolor: 'slate.900' }}
                        variant="rectangular"
                        width={500}
                        height={500}
                      />
                    </>
                  ) : (
                    <>
                      <HealthChart data={healthChartData} />
                    </>
                  )}
                </Grid>
                <Grid size={6}>
                  {isGdpPerCapitaDataPending ? (
                    <>
                      <Skeleton
                        sx={{ bgcolor: 'slate.900' }}
                        variant="rectangular"
                        width={500}
                        height={500}
                      />
                    </>
                  ) : (
                    <GdpPerCapitaChart data={gdpPerCapitaChartData} />
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
