// import { useAuth } from '@app/context';
import { useAuth } from '@app/context';
import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  type SelectChangeEvent,
} from '@mui/material';
import CountrySelectionDropdown from '@shared/components/CountrySelectionDropdown';
import { SectionContainer } from '@shared/components/SectionContainer';
import SelectModuleDropdown from '@shared/components/SelectModuleDropdown';
import { TitleCard } from '@shared/components/TitleCard';
import { usePublishReport } from '@shared/hooks/useUtils';
import { theme } from '@shared/styles/theme';
import { subscribeReportEvent } from '@shared/utils/utils';
import { useMemo, useState } from 'react';

const MainPage = () => {
  const auth = useAuth();
  const [selectedCountry, setSelectCountry] = useState<{
    label: string;
    code: string;
  }>({ label: 'United States', code: 'USA' });

  const [selectedModule, setSelectedModule] = useState<any>('population');

  const {
    data: exportStatus,
    isSuccess,
    isError,
    mutate: triggerPublishReportMutate,
  } = usePublishReport();

  const handleSelectCountry = useMemo(
    () => (v: any) => {
      setSelectCountry({
        label: v.label,
        code: v.code,
      });
    },
    [selectedCountry]
  );

  const handleSelectedModule = useMemo(
    () => (e: SelectChangeEvent) => {
      console.log(e.target.value);
      setSelectedModule(e.target.value as string);
    },
    [selectedModule]
  );

  const handleGenerateReport = () => {
    const payload = {
      exportID: `${selectedModule}:${selectedCountry.code}`,
      userID: Number(auth.signedInUser?.id),
      filters: { headers: [], records: [], query: '' },
      requestTableString: selectedModule,
      requestCountryCode: selectedCountry.code,
    };
    triggerPublishReportMutate(payload, {
      onSuccess: (data) => {
        if (data.data.statusCode == 0) {
          auth.setOpenReportStatus({
            type: 'info',
            message: 'We will notify you once your report is generated.',
            open: true,
          });
        } else if (data.data.statusCode == -1) {
          auth.setOpenReportStatus({
            type: 'error',
            message: 'Error occured while generating report. Kindly try again.',
            open: true,
          });
        }
        const event = subscribeReportEvent(auth);
        event.onopen = () => {
          console.log('Reconneected to SSE.');
        };
      },

      onError: () => {
        auth.setOpenReportStatus({
          type: 'error',
          message: 'Error occured while generating report. Kindly try again.',
          open: true,
        });
      },
    });
  };
  const isLoading = false;
  return (
    <Box component="main" sx={{ flexGrow: 1, padding: theme.padding }}>
      <TitleCard
        title="Reports"
        description="Filter and generate new reports"
      />
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Box sx={{ width: '100%', background: isLoading ? '#F0F2F5' : 'none' }}>
          <Divider sx={{ marginTop: '.5rem' }} />
          <SectionContainer title="Generate a report">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container columns={{ xs: 4, sm: 0, md: 15 }}>
                <Grid size={6}>
                  <SelectModuleDropdown
                    key={'module'}
                    onSelectChange={handleSelectedModule}
                    selectedValue={selectedModule}
                  />
                </Grid>
                <Grid size={6}>
                  <CountrySelectionDropdown
                    key={'country'}
                    selectedValue={selectedCountry}
                    onSelectCountry={handleSelectCountry}
                  />
                </Grid>
              </Grid>
              <Grid size={6} sx={{ marginTop: '3rem' }}>
                <Button
                  variant="contained"
                  sx={{
                    background: theme.titleColor,
                    padding: '.75em',
                  }}
                  onClick={handleGenerateReport}
                >
                  Generate report
                </Button>
              </Grid>
            </Box>
          </SectionContainer>
        </Box>
      )}
    </Box>
  );
};

export default MainPage;
