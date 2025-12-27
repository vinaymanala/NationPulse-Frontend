import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { countries } from '@shared/utils/data/countries.json';
import { useMemo } from 'react';

type CountrySelectionDropdownProps = {
  selectedValue: {
    label: string;
    code: string;
  };
  onSelectCountry: (v: any) => void;
};
export default function CountrySelectionDropdown(
  props: CountrySelectionDropdownProps
) {
  const { selectedValue, onSelectCountry } = props;

  const data = useMemo(
    () =>
      countries.length
        ? countries.map((c) => {
            return {
              label: c.countryName,
              code: c.countryCode,
            };
          })
        : [],
    [countries]
  );
  return (
    <Autocomplete
      key={'select-country'}
      disablePortal
      options={data}
      sx={{ width: 300, marginTop: '2rem' }}
      value={selectedValue}
      // inputValue={selectedValue?.label}
      onChange={(_, newValue: any) => {
        onSelectCountry(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Select a country" />
      )}
    />
  );
}
