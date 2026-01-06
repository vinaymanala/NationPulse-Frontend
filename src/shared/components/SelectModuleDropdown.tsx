import {
  FormControl,
  //   FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';

type SelectModuleDropdownProps = {
  onSelectChange: (e: SelectChangeEvent) => void;
  selectedValue: any;
};
const SelectModuleDropdown = (props: SelectModuleDropdownProps) => {
  const { selectedValue, onSelectChange } = props;
  return (
    <FormControl
      sx={{ width: 300, marginTop: '2rem' }}
      key={'module-form-control'}
    >
      <InputLabel id="demo-simple-select-helper-label">
        {'Select a metric'}
      </InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={selectedValue}
        label="module-metric"
        onChange={onSelectChange}
      >
        <MenuItem value={'population'} selected>
          Country's Population
        </MenuItem>
        <MenuItem value={'health'}>Country's Health</MenuItem>
        <MenuItem value={'economy:gov'}>
          Country's Government Performance{' '}
        </MenuItem>
        <MenuItem value={'economy:gdp'}>Country's GDP Performance</MenuItem>
        <MenuItem value={'growth:population'}>
          Country's Population Growth
        </MenuItem>
        <MenuItem value={'growth:gdp'}>Country's GDP Growth</MenuItem>
      </Select>
      {/* <FormHelperText>With label + helper text</FormHelperText> */}
    </FormControl>
  );
};

export default SelectModuleDropdown;
