import { Dispatch, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import moment from 'moment';
import { EmployeeInputType, EmployeeType } from '../../types/Employee';
import {
  useAddEmployeeMutation,
  useUpdatePostMutation,
} from '../../behavior/api/employees.api';

export const genders = [
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

export const getInitialValues = (type: string, employee?: EmployeeType) =>
  type === 'edit' && employee
    ? {
        fname: employee.fname,
        lname: employee.lname,
        email: employee.email,
        phone: employee.phone,
        gender: employee.gender,
        joinedDate: moment(employee.joinedDate),
      }
    : {
        fname: '',
        lname: '',
        email: '',
        phone: '',
        gender: genders[0].value,
        joinedDate: moment(),
      };

export const handleAddSubmission = async (
  employee: EmployeeInputType,
  setIsFormModalOpen: Dispatch<SetStateAction<boolean>>,
  addEmployee: Function,
) => {
  const body = {
    id: uuidv4(),
    fname: employee.fname,
    lname: employee.lname,
    email: employee.email,
    phone: employee.phone,
    gender: employee.gender,
    joinedDate: employee.joinedDate.format('YYYY-MM-DD'),
  };
  try {
    const response: EmployeeType = await addEmployee(body).unwrap();

    if (response) {
      setIsFormModalOpen(false);
      toast.success('Employee added!');
    }
  } catch (error) {
    toast.error('Something went wrong!');
    console.error(error);
  }
};

export const handleEditSubmission = async (
  id: string,
  employee: EmployeeInputType,
  setIsFormModalOpen: Dispatch<SetStateAction<boolean>>,
  updateEmployee: Function,
) => {
  const body = {
    id,
    fname: employee.fname,
    lname: employee.lname,
    email: employee.email,
    phone: employee.phone,
    gender: employee.gender,
    joinedDate: employee.joinedDate.format('YYYY-MM-DD'),
  };

  try {
    const response: EmployeeType = await updateEmployee(body).unwrap();

    if (response) {
      setIsFormModalOpen(false);
      toast.success('Employee updated!');
    }
  } catch (error) {
    toast.error('Something went wrong!');
    console.error(error);
  }
};
