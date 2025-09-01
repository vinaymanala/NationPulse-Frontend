import { Typography } from '@mui/material';
import { theme } from '@shared/styles/theme';
import type { SectionContainerProps } from '@shared/types/common';

export const SectionContainer = ({
  title,
  children,
}: SectionContainerProps) => (
  <>
    <Typography variant="h2" padding={theme.logoPadding.padding}>
      {title}
    </Typography>
    {children}
  </>
);
