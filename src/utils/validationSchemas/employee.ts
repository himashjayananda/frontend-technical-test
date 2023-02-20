import * as Yup from 'yup';

export const employeeFormSchema = Yup.object().shape({
  fname: Yup.string()
    .required('Please enter your first name.')
    .min(6, 'Minimum character length is 6.')
    .max(10, 'Maximum character length is 10.'),
  lname: Yup.string()
    .required('Please enter your last name.')
    .min(6, 'Minimum character length is 6.')
    .max(10, 'Maximum character length is 10.'),
  email: Yup.string()
    .required('Please enter your email.')
    .email('Invalid email.'),
  phone: Yup.string()
    .required('Please enter the phone number.')
    .matches(/\65(6|8|9)\d{7}/g, 'Invalid Singapore phone number format.'),
});
