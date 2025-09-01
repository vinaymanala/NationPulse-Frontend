import { theme, useTheme } from '@shared/styles/theme';
import { Box, Divider, Grid, LinearProgress, Skeleton } from '@mui/material';

import { z } from 'zod';
import { TitleCard } from '@shared/components/TitleCard';
import { SectionContainer } from '@shared/components/SectionContainer';
import { useHealthData } from '@shared/hooks/useHealthData';
import { formatHealthDataByCountry } from '@shared/utils/utils';
import type { HealthDataByCountrySchema } from '@shared/types/api';
import type {
  DataProps,
  HealthDataByCountryProps,
  HealthDataFormattedByCountryProps,
} from '@shared/types/common';
import CustomLineChart from '../../shared/components/CustomLineChart';
import { useEffect, useState } from 'react';
function MainPage() {
  const {
    data: healthData,
    isLoading: isHealthDataPending,
    error,
  } = useHealthData('JPN');

  const [healthStateData, setHealthStateData] = useState<{
    maleMortality: HealthDataByCountryProps;
    maleLifeExpectancy: HealthDataByCountryProps;
    femaleMortality: HealthDataByCountryProps;
    femaleLifeExpectency: HealthDataByCountryProps;
    totalLifeExpectancyHealth: HealthDataByCountryProps;
    totalMortalityHealth: HealthDataByCountryProps;
    totalAccidentsHealth: HealthDataByCountryProps;
  }>({
    maleMortality: [],
    maleLifeExpectancy: [],
    femaleMortality: [],
    femaleLifeExpectency: [],
    totalLifeExpectancyHealth: [],
    totalMortalityHealth: [],
    totalAccidentsHealth: [],
  });

  const healthChartData: HealthDataFormattedByCountryProps =
    formatHealthDataByCountry(
      healthData as z.infer<typeof HealthDataByCountrySchema>
    );

  useEffect(() => {
    if (!isHealthDataPending) {
      setHealthStateData({
        maleMortality: healthChartData.maleHealthData.filter(
          (item) => item.indicatorCode === 'CSEM'
        ),
        maleLifeExpectancy: healthChartData.maleHealthData.filter(
          (item) => item.indicatorCode === 'LFEXP'
        ),
        femaleMortality: healthChartData.femaleHealthData.filter(
          (item) => item.indicatorCode === 'CSEM'
        ),
        femaleLifeExpectency: healthChartData.femaleHealthData.filter(
          (item) => item.indicatorCode === 'LFEXP'
        ),
        totalLifeExpectancyHealth: healthChartData.totalHealthData.filter(
          (item) => item.indicatorCode === 'LFEXP'
        ),
        totalMortalityHealth: healthChartData.totalHealthData.filter(
          (item) => item.indicatorCode === 'CSEM'
        ),
        totalAccidentsHealth: healthChartData.totalHealthData.filter(
          (item) => item.indicatorCode === 'IRTA'
        ),
      });
    }
  }, [isHealthDataPending]);

  const isLoading = isHealthDataPending;
  return (
    <Box component="main" sx={{ flexGrow: 1, padding: theme.padding }}>
      <TitleCard
        title="Health"
        description="View country's health status & insights"
      />
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
                {healthStateData?.maleMortality.length ? (
                  <Grid size={6}>
                    <CustomLineChart
                      title={`Male ${
                        healthStateData?.maleMortality[0].indicator.toLocaleLowerCase() as string
                      }`}
                      data={healthStateData?.maleMortality as DataProps}
                      xAxisLabelName={
                        healthStateData?.maleMortality[0].cause as string
                      }
                      colorFill={'#43A047'}
                    />
                  </Grid>
                ) : null}
                {healthStateData?.maleLifeExpectancy.length ? (
                  <Grid size={6}>
                    <CustomLineChart
                      title={`Male ${
                        healthStateData?.maleLifeExpectancy[0].indicator.toLocaleLowerCase() as string
                      } at birth`}
                      data={healthStateData?.maleLifeExpectancy as DataProps}
                      xAxisLabelName={
                        healthStateData?.maleLifeExpectancy[0]
                          .indicator as string
                      }
                      colorFill={'#43A047'}
                    />
                  </Grid>
                ) : null}
                {healthStateData?.femaleMortality.length ? (
                  <Grid size={6}>
                    <CustomLineChart
                      title={`Female ${
                        healthStateData?.femaleMortality[0].indicator.toLocaleLowerCase() as string
                      }`}
                      data={healthStateData?.femaleMortality as DataProps}
                      xAxisLabelName={
                        healthStateData?.femaleMortality[0].cause as string
                      }
                      colorFill={'#43A047'}
                    />
                  </Grid>
                ) : null}
                {healthStateData?.femaleLifeExpectency?.length ? (
                  <Grid size={6}>
                    <CustomLineChart
                      title={`Female ${
                        healthStateData?.femaleLifeExpectency[0].indicator.toLocaleLowerCase() as string
                      } at birth`}
                      data={
                        healthStateData?.femaleLifeExpectency as HealthDataByCountryProps
                      }
                      xAxisLabelName={
                        healthStateData?.femaleLifeExpectency[0]
                          .indicator as string
                      }
                      colorFill={'#43A047'}
                    />
                  </Grid>
                ) : null}
                {healthStateData?.totalMortalityHealth?.length ? (
                  <Grid size={6}>
                    <CustomLineChart
                      title={`Total ${
                        healthStateData?.totalMortalityHealth[0].indicator.toLocaleLowerCase() as string
                      }`}
                      data={
                        healthStateData?.totalMortalityHealth as HealthDataByCountryProps
                      }
                      xAxisLabelName={
                        healthStateData?.totalMortalityHealth[0]
                          .indicator as string
                      }
                      colorFill={'#43A047'}
                    />
                  </Grid>
                ) : null}
                {healthStateData?.totalLifeExpectancyHealth?.length ? (
                  <Grid size={6}>
                    <CustomLineChart
                      title={`Total ${
                        healthStateData?.totalLifeExpectancyHealth[0].indicator.toLocaleLowerCase() as string
                      } at birth`}
                      data={
                        healthStateData?.totalLifeExpectancyHealth as HealthDataByCountryProps
                      }
                      xAxisLabelName={
                        healthStateData?.totalLifeExpectancyHealth[0]
                          .indicator as string
                      }
                      colorFill={'#43A047'}
                    />
                  </Grid>
                ) : null}
                {healthStateData?.totalAccidentsHealth?.length ? (
                  <Grid size={6}>
                    <CustomLineChart
                      title={`Total ${
                        healthStateData?.totalAccidentsHealth[0].indicator.toLocaleLowerCase() as string
                      }`}
                      data={
                        healthStateData?.totalAccidentsHealth as HealthDataByCountryProps
                      }
                      xAxisLabelName={
                        healthStateData?.totalAccidentsHealth[0]
                          .indicator as string
                      }
                      colorFill={'#43A047'}
                    />
                  </Grid>
                ) : null}
              </Grid>
            </Box>
          </SectionContainer>
        </Box>
      )}
    </Box>
  );
}

export default MainPage;
