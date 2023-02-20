import { Moment } from 'moment';

export type EmployeeType = {
  id: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  gender: string;
  joinedDate: string;
};

export type EmployeeInputType = {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  gender: string;
  joinedDate: Moment;
};
