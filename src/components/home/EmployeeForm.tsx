import { FC, Dispatch, SetStateAction } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField, Button, Grid, MenuItem } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import CustomRadioGroup from '../forms/CustomRadioGroup';
import {
  genders,
  getInitialValues,
  handleAddSubmission,
  handleEditSubmission,
} from './utils';
import { employeeFormSchema } from '../../utils/validationSchemas';
import { EmployeeInputType, EmployeeType } from '../../types/Employee';
import {
  useAddEmployeeMutation,
  useUpdatePostMutation,
} from '../../behavior/api/employees.api';

interface EmployeeFormProps {
  type: 'add' | 'edit';
  employee?: EmployeeType;
  setIsFormModalOpen: Dispatch<SetStateAction<boolean>>;
}

const EmployeeForm: FC<EmployeeFormProps> = ({
  type,
  employee,
  setIsFormModalOpen,
}) => {
  const [addEmployee] = useAddEmployeeMutation();
  const [editEmployee] = useUpdatePostMutation();
  const initialValues: EmployeeInputType = getInitialValues(type, employee);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: employeeFormSchema,
    onSubmit: async (props: EmployeeInputType) => {
      if (type === 'add') {
        handleAddSubmission(props, setIsFormModalOpen, addEmployee);
      } else {
        employee &&
          handleEditSubmission(
            employee.id,
            props,
            setIsFormModalOpen,
            editEmployee,
          );
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} md={6}>
          <TextField
            label='First name'
            variant='outlined'
            type='text'
            fullWidth
            size='small'
            margin='dense'
            name='fname'
            value={values.fname}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.fname && errors.fname ? true : false}
            helperText={(touched.fname && errors.fname) ?? false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label='Last name'
            variant='outlined'
            type='text'
            fullWidth
            size='small'
            margin='dense'
            name='lname'
            value={values.lname}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.lname && errors.lname ? true : false}
            helperText={(touched.lname && errors.lname) ?? false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label='Email'
            variant='outlined'
            type='email'
            fullWidth
            size='small'
            margin='dense'
            name='email'
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.email && errors.email ? true : false}
            helperText={(touched.email && errors.email) ?? false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label='Phone'
            variant='outlined'
            type='text'
            fullWidth
            size='small'
            margin='dense'
            name='phone'
            value={values.phone}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.phone && errors.phone ? true : false}
            helperText={(touched.phone && errors.phone) ?? false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomRadioGroup
            label='Gender'
            name='gender'
            value={values.gender}
            handleChange={handleChange}
            options={genders}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              label='Date desktop'
              inputFormat='YYYY/MM/DD'
              value={values.joinedDate}
              onChange={(value: any) =>
                value && setFieldValue('joinedDate', value)
              }
              maxDate={moment()}
              renderInput={(params: any) => (
                <TextField
                  name='joinedDate'
                  size='small'
                  margin='dense'
                  fullWidth
                  error={touched.gender && errors.gender ? true : false}
                  helperText={(touched.gender && errors.gender) ?? false}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Button variant='contained' type='submit'>
        {`${type === 'add' ? 'Add' : 'Edit'} Employee`}
      </Button>
    </form>
  );
};

EmployeeForm.defaultProps = {
  employee: undefined,
};

export default EmployeeForm;
