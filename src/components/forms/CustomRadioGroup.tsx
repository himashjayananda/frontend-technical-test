import { FC, ChangeEvent } from 'react';
import {
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from '@mui/material';

interface CustomRadioGroupProps {
  label: string;
  name: string;
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  options: RadioOptionType[];
}

export type RadioOptionType = {
  value: string;
  label: string;
};

const CustomRadioGroup: FC<CustomRadioGroupProps> = ({
  label,
  name,
  value,
  handleChange,
  options,
}) => {
  return (
    <FormControl>
      <FormLabel id={name}>{label}</FormLabel>
      <RadioGroup
        aria-labelledby={name}
        row
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options.map(option => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioGroup;
