import { theme } from '@shared/styles/theme';
import { Box, Divider, Grid, LinearProgress, Skeleton } from '@mui/material';

import { z } from 'zod';
import { TitleCard } from '@shared/components/TitleCard';
import { SectionContainer } from '@shared/components/SectionContainer';
import {
  capitalizeFirstLetter,
  formattedEconomyDataByCountry,
} from '@shared/utils/utils';
import type {
  GdpPerCapitaDataByCountrySchema,
  GovernmentDataByCountrySchema,
} from '@shared/types/api';
import type {
  DataProps,
  EconomyDataByCountryProps,
} from '@shared/types/common';
import { useEffect, useState } from 'react';
import {
  useGdpPerCapitaDataByCountry,
  useGovernmentDataByCountry,
} from '@shared/hooks/useEconomyData';
import CustomBarChart from '@shared/components/CustomBarChart';
import CustomComposedBarLineChart from '@shared/components/CustomComposeBarLineChart';
import CustomComposedBarBarChart from '@shared/components/CustomComposedBarBarChart';
import {
  expenditure,
  getCoreInflationData,
  getExportsData,
  getGovernmentFiscalData,
  getGovernmentGrossDebtData,
  getGovernmentInvestmentData,
  getImportsData,
  getImportsVsExportsData,
  getRevenueVsExpenditureData,
  revenue,
} from './utils/utils';

function EconomyPageContainer() {
  const [economyData, setEconomyData] = useState<{
    governmentFiscalBalance: EconomyDataByCountryProps;
    governmentExpenditure: EconomyDataByCountryProps;
    governmentGrossDebt: EconomyDataByCountryProps;
    governmentRevenues: EconomyDataByCountryProps;
    governmentInvestment: EconomyDataByCountryProps;
    governmentRevenueVsExpenditure: DataProps;
    coreInflation: EconomyDataByCountryProps;
    exportsGoodServices: EconomyDataByCountryProps;
    importsGoodServices: EconomyDataByCountryProps;
    gdpValueGrowth: EconomyDataByCountryProps;
    importvsexportsTradeData: DataProps;
  }>({
    governmentFiscalBalance: [],
    governmentExpenditure: [],
    governmentGrossDebt: [],
    governmentRevenues: [],
    governmentInvestment: [],
    governmentRevenueVsExpenditure: [],
    coreInflation: [],
    exportsGoodServices: [],
    importsGoodServices: [],
    gdpValueGrowth: [],
    importvsexportsTradeData: [],
  });

  const { data: governmentData, isLoading: isGovernmentDataPending } =
    useGovernmentDataByCountry('JPN');

  const governmentChartData: EconomyDataByCountryProps =
    formattedEconomyDataByCountry(
      governmentData as z.infer<typeof GovernmentDataByCountrySchema>
    );

  const { data: tradeData, isLoading: isTradeDataPending } =
    useGdpPerCapitaDataByCountry('JPN');

  const tradeChartData: EconomyDataByCountryProps =
    formattedEconomyDataByCountry(
      tradeData as z.infer<typeof GdpPerCapitaDataByCountrySchema>
    );

  useEffect(() => {
    if (!isGovernmentDataPending) {
      console.log(governmentChartData);

      const revenueData =
        revenue<EconomyDataByCountryProps>(governmentChartData);
      const expenditureData =
        expenditure<EconomyDataByCountryProps>(governmentChartData);
      const govermentGrossDebtData =
        getGovernmentGrossDebtData<EconomyDataByCountryProps>(
          governmentChartData
        );
      const governmentFiscalData =
        getGovernmentFiscalData<EconomyDataByCountryProps>(governmentChartData);
      const governmentInvestmentsData =
        getGovernmentInvestmentData<EconomyDataByCountryProps>(
          governmentChartData
        );
      const revenuevsexpenditureData = getRevenueVsExpenditureData(
        revenueData,
        expenditureData
      );
      setEconomyData((prev) => ({
        ...prev,
        governmentFiscalBalance: governmentFiscalData,
        governmentExpenditure: expenditureData,
        governmentGrossDebt: govermentGrossDebtData,
        governmentInvestment: governmentInvestmentsData,
        governmentRevenues: revenueData,
        governmentRevenueVsExpenditure: revenuevsexpenditureData,
      }));
      if (!isTradeDataPending) {
        const importTradeData =
          getImportsData<EconomyDataByCountryProps>(tradeChartData);
        const exportTradeData =
          getExportsData<EconomyDataByCountryProps>(tradeChartData);
        const coreInflationData =
          getCoreInflationData<EconomyDataByCountryProps>(tradeChartData);
        const importsvsexportsdata =
          getImportsVsExportsData<EconomyDataByCountryProps>(
            importTradeData,
            exportTradeData
          );
        setEconomyData((prev) => ({
          ...prev,
          coreInflation: coreInflationData,
          exportsGoodServices: exportTradeData,
          importsGoodServices: importTradeData,
          importvsexportsTradeData: importsvsexportsdata,
          gdpValueGrowth: tradeChartData.filter(
            (item) => item.indicatorCode === 'GDPV_ANNPCT'
          ),
        }));
      }
    }
  }, [isGovernmentDataPending, isTradeDataPending]);

  const isLoading = isGovernmentDataPending && isTradeDataPending;
  return (
    <Box component="main" sx={{ flexGrow: 1, padding: theme.padding }}>
      <TitleCard
        title="Economy"
        description="View country's economy strength"
      />
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Box sx={{ width: '100%', background: isLoading ? '#F0F2F5' : 'none' }}>
          <Divider />
          <SectionContainer title={'Fiscal'}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 1, md: 5 }}
                padding={theme.logoPadding.padding}
              >
                {economyData?.governmentFiscalBalance.length ? (
                  <Grid size={6}>
                    <CustomBarChart
                      title={
                        capitalizeFirstLetter(
                          economyData?.governmentFiscalBalance[0].indicator
                        ) as string
                      }
                      data={economyData?.governmentFiscalBalance as DataProps}
                      xAxisLabelName={
                        economyData?.governmentFiscalBalance[0]
                          .indicator as string
                      }
                      colorFill={'#1E88E5'}
                    />
                  </Grid>
                ) : null}
                {economyData?.governmentGrossDebt.length ? (
                  <Grid size={6}>
                    <CustomBarChart
                      title={
                        capitalizeFirstLetter(
                          economyData?.governmentGrossDebt[0].indicator
                        ) as string
                      }
                      data={economyData?.governmentGrossDebt as DataProps}
                      xAxisLabelName={
                        economyData?.governmentGrossDebt[0].indicator as string
                      }
                      colorFill={'#1E88E5'}
                    />
                  </Grid>
                ) : null}
                {economyData?.governmentInvestment.length ? (
                  <Grid size={6}>
                    <CustomBarChart
                      title={
                        capitalizeFirstLetter(
                          economyData?.governmentInvestment[0].indicator
                        ) as string
                      }
                      data={economyData?.governmentInvestment as DataProps}
                      xAxisLabelName={
                        economyData?.governmentInvestment[0].indicator as string
                      }
                      colorFill={'#1E88E5'}
                    />
                  </Grid>
                ) : null}
                {economyData?.governmentRevenueVsExpenditure.length ? (
                  <Grid size={6}>
                    <CustomComposedBarLineChart
                      title={'Imports vs exports'}
                      data={
                        economyData?.governmentRevenueVsExpenditure as DataProps
                      }
                      xAxisLabelName1={
                        economyData?.governmentRevenueVsExpenditure[0]
                          .indicator1 as string
                      }
                      xAxisLabelName2={
                        economyData?.governmentRevenueVsExpenditure[0]
                          .indicator2 as string
                      }
                      colorFill={'#1E88E5'}
                    />
                  </Grid>
                ) : null}
              </Grid>
            </Box>
          </SectionContainer>
          <SectionContainer title={'Trade'}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 1, md: 5 }}
                padding={theme.logoPadding.padding}
              >
                {economyData?.coreInflation.length ? (
                  <Grid size={6}>
                    <CustomBarChart
                      title={capitalizeFirstLetter(
                        economyData?.coreInflation[0].indicator as string
                      )}
                      data={economyData?.coreInflation as DataProps}
                      xAxisLabelName={
                        economyData?.coreInflation[0].indicator as string
                      }
                      colorFill={'#1E88E5'}
                    />
                  </Grid>
                ) : null}
                {economyData?.importvsexportsTradeData.length ? (
                  <Grid size={6}>
                    <CustomComposedBarBarChart
                      title={capitalizeFirstLetter(
                        economyData?.importvsexportsTradeData[0]
                          .indicator as string
                      )}
                      data={economyData?.importvsexportsTradeData as DataProps}
                      xAxisLabelName1={
                        economyData?.importvsexportsTradeData[0]
                          .indicator1 as string
                      }
                      xAxisLabelName2={
                        economyData?.importvsexportsTradeData[0]
                          .indicator2 as string
                      }
                      colorFill={'#1E88E5'}
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

export default EconomyPageContainer;
