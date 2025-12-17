import { Box, Typography } from '@mui/material';
import type { DataProps } from '@shared/types/common';

type BasicSchemaDataPropsType = {
  country_name: string;
  country_code: string;
  indicator: string;
  indicator_code: string;
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
    // console.log('I', item);
    if (index !== 0) return;
    if (item.indicator_code === 'POP') {
      // console.log(item.country_name);
      return (
        <Typography key={`item-${index}`} variant="body2" color={item.color}>
          {item.indicator}:{' '}
          <strong>
            {item.value && (item.value / 1e9).toLocaleString('en-US')}bn
          </strong>
        </Typography>
      );
    } else if (
      item.indicator_code === 'CSEM' ||
      item.indicator_code === 'IRTA' ||
      item.indicator_code === 'LFEXP'
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
    } else if (item.indicator_code === 'B1GQ_POP') {
      // console.log('HIT', item.country_name);
      return (
        <Typography key={`item-${index}`} variant="body2" color={item.color}>
          {item.indicator}:{' '}
          <strong>
            {item.value?.toLocaleString('en-US', { maximumFractionDigits: 0 })}{' '}
            USD
          </strong>
        </Typography>
      );
    } else if (item.indicator_code === 'POP1574') {
      return (
        <Typography key={`item-${index}`} variant="body2" color={item.color}>
          {item.indicator}:{' '}
          <strong>
            {item.value?.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </strong>
        </Typography>
      );
    } else if (
      item.indicator_code === 'PCORE_YTYPCT' ||
      item.indicator_code === 'XGSV_ANNPCT' ||
      item.indicator_code === 'GDPV_ANNPCT' ||
      item.indicator_code === 'TDDV_ANNPCT' ||
      item.indicator_code == 'GNLB' ||
      item.indicator_code === 'GE' ||
      item.indicator_code === 'GGD' ||
      item.indicator_code === 'GGINTN' ||
      item.indicator_code === 'GNLBP' ||
      item.indicator_code === 'GNLB' ||
      item.indicator_code === 'GINV' ||
      item.indicator_code === 'UNR' ||
      item.indicator_code === 'ET_ANNPCT' ||
      item.indicator_code === 'ERS1574'
    ) {
      return (
        <Typography key={`item-${index}`} variant="body2" color={item.color}>
          {item.indicator}:{' '}
          <strong>{item?.value && item.value.toFixed(2)}%</strong>
        </Typography>
      );
    } else if (
      item.indicator_code === 'GR' ||
      item.indicator_code === 'MGSV_ANNPCT'
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
