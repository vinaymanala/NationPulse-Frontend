import type {
  DataProps,
  EconomyDataByCountryProps,
} from '@shared/types/common';
import { getCombineData, getFilteredData } from '@shared/utils/utils';

export const revenue = <T>(governmentChartData: DataProps) =>
  getFilteredData<T>(governmentChartData, 'indicatorCode', 'GR');

export const expenditure = <T>(governmentChartData: DataProps) =>
  getFilteredData<T>(governmentChartData, 'indicatorCode', 'GE');

export const getGovernmentFiscalData = <T>(governmentChartData: DataProps) =>
  getFilteredData<T>(governmentChartData, 'indicatorCode', 'GNLB');

export const getGovernmentGrossDebtData = <T>(governmentChartData: DataProps) =>
  getFilteredData<T>(governmentChartData, 'indicatorCode', 'GGD');

export const getGovernmentInvestmentData = <T>(
  governmentChartData: DataProps
) => getFilteredData<T>(governmentChartData, 'indicatorCode', 'GINV');

export const getRevenueVsExpenditureData = (
  revenueData: DataProps,
  expenditureData: DataProps
) =>
  getCombineData(
    revenueData,
    expenditureData,
    'Government revenue vs expenditure',
    'Revenue',
    'Expenditure'
  );

export const getImportsVsExportsData = <T extends any[]>(
  importTradeData: T,
  exportTradeData: T
) =>
  getCombineData<T>(
    importTradeData,
    exportTradeData,
    'Imports vs Exports Growth',
    'Imports',
    'Exports'
  );
export const getImportsData = <T>(tradeChartData: DataProps) =>
  getFilteredData<T>(tradeChartData, 'indicatorCode', 'MGSV_ANNPCT');

export const getExportsData = <T>(tradeChartData: DataProps) =>
  getFilteredData<T>(tradeChartData, 'indicatorCode', 'XGSV_ANNPCT');

export const getCoreInflationData = <T>(tradeChartData: DataProps) =>
  getFilteredData<T>(tradeChartData, 'indicatorCode', 'PCORE_YTYPCT');
