import { Typography } from '@mui/material';
import { theme } from '@shared/styles/theme';
import type { TitleCardProps } from '@shared/types/common';

export const TitleCard = ({ title, description }: TitleCardProps) => (
  <>
    <Typography
      variant="h1"
      color={theme.titleColor}
      marginTop={'1rem'}
      gutterBottom
    >
      {title}
    </Typography>
    <Typography
      variant="h3"
      padding={theme.logoPadding.padding}
      color={theme.textColor}
    >
      {description}
    </Typography>
  </>
);
