import { Box, Typography } from '@mui/material';
import type { DataProps } from '@shared/types/common';

type BasicSchemaDataPropsType = {
  country_name: string;
  country_code: string;
  indicator: string;
  indicatorCode: string;
  year: string | number;
  value: number | null;
  color?: string;
  cause?: string;
  unitRange?: string;
  value1: number;
  value2: number;
  unitKey1?: string;
  unitKey2?: string;
} & {};

export const CustomToolTip = (props: any) => {
  const { active, payload } = props;
  const isVisible = active && payload && payload.length;
  const ToolTipInfo = ({
    item,
    index,
  }: {
    item: BasicSchemaDataPropsType;
    index: number;
  }) => {
    if (index !== 0) return;
    if (item.indicatorCode === 'POP') {
      return (
        <Typography key={`item-${index}`} variant="body2" color={item.color}>
          {item.indicator}:{' '}
          <strong>
            {item.value && (item.value / 1e9).toLocaleString('en-US')}bn
          </strong>
        </Typography>
      );
    } else if (
      item.indicatorCode === 'CSEM' ||
      item.indicatorCode === 'IRTA' ||
      item.indicatorCode === 'LFEXP'
    ) {
      return (
        <Typography key={`item-${index}`} variant="body2" color={item.color}>
          {item.indicator}:{}
          <strong>
            {item.value?.toLocaleString('en-US')}{' '}
            {item.unitRange && item.unitRange}
          </strong>
        </Typography>
      );
    } else if (item.indicatorCode === 'B1GQ_POP') {
      return (
        <Typography key={`item-${index}`} variant="body2" color={item.color}>
          {item.indicator}:{' '}
          <strong>
            {item.value?.toLocaleString('en-US', { maximumFractionDigits: 0 })}{' '}
            USD
          </strong>
        </Typography>
      );
    } else if (item.indicatorCode === 'POP1574') {
      return (
        <Typography key={`item-${index}`} variant="body2" color={item.color}>
          {item.indicator}:{' '}
          <strong>
            {item.value?.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </strong>
        </Typography>
      );
    } else if (
      item.indicatorCode === 'PCORE_YTYPCT' ||
      item.indicatorCode === 'XGSV_ANNPCT' ||
      item.indicatorCode === 'GDPV_ANNPCT' ||
      item.indicatorCode === 'TDDV_ANNPCT' ||
      item.indicatorCode == 'GNLB' ||
      item.indicatorCode === 'GE' ||
      item.indicatorCode === 'GGD' ||
      item.indicatorCode === 'GGINTN' ||
      item.indicatorCode === 'GNLBP' ||
      item.indicatorCode === 'GNLB' ||
      item.indicatorCode === 'GINV' ||
      item.indicatorCode === 'UNR' ||
      item.indicatorCode === 'ET_ANNPCT' ||
      item.indicatorCode === 'ERS1574'
    ) {
      return (
        <Typography key={`item-${index}`} variant="body2" color={item.color}>
          {item.indicator}:{' '}
          <strong>{item?.value && item.value.toFixed(2)}%</strong>
        </Typography>
      );
    } else if (
      item.indicatorCode === 'GR' ||
      item.indicatorCode === 'MGSV_ANNPCT'
    ) {
      return (
        <div key={index}>
          <Typography key={`item-${index}`} variant="body2" color={item.color}>
            {item.unitKey1}:{' '}
            <strong>{item?.value1 && item.value1.toFixed(2)}%</strong>
          </Typography>
          <Typography key={`item-${index}`} variant="body2" color={item.color}>
            {item.unitKey2}:{' '}
            <strong>{item?.value2 && item.value2.toFixed(2)}%</strong>
          </Typography>
        </div>
      );
    }
  };

  return (
    <div style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {isVisible && (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: 3,
          }}
        >
          {payload.map((entry: any, index: number) => {
            if (index === 0) {
              return (
                <div key={index}>
                  <Typography variant="subtitle1" color="text.primary">
                    {`Country: ${entry.payload.name}`}
                  </Typography>
                  <Typography variant="subtitle1" color="text.primary">
                    {entry.payload.info}
                  </Typography>
                  <ToolTipInfo item={entry.payload} index={index} />
                </div>
              );
            }
          })}
        </Box>
      )}
    </div>
  );
};
