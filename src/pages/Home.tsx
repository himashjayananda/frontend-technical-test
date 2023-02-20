import { FC, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
} from '@mui/material';
import { useAppSelector } from '../behavior/hooks';
import { useGetEmployeesQuery } from '../behavior/api/employees.api';
import EmployeeFormModal from '../components/home/EmployeeFormModal';
import IconSection from '../components/home/IconSection';
import LoadingAlert from '../components/LoadingAlert';
import { EmployeeType } from '../types/Employee';
import { ROLES } from '../utils/constants';
import { genders } from '../components/home/utils';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { role } = useAppSelector(state => state.session);
  const { data: employees, isLoading } = useGetEmployeesQuery();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const showGenderLabel = (genderValue: string) =>
    genders.filter(gender => gender.value === genderValue)[0].label;

  return (
    <div className='home-wrapper'>
      <Container maxWidth='xl'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          my={3}
        >
          <Typography variant='h5'>Employees</Typography>
          {role === ROLES.ADMIN && (
            <Button
              variant='contained'
              onClick={() => setIsFormModalOpen(true)}
            >
              Add Employee
            </Button>
          )}
        </Box>

        {!isLoading ? (
          <TableContainer component={Paper}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>First name</TableCell>
                  <TableCell>Last name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Joined date</TableCell>
                  {role === ROLES.ADMIN && (
                    <>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {employees?.map((employee: EmployeeType) => (
                  <TableRow
                    key={employee.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {employee.fname}
                    </TableCell>
                    <TableCell>{employee.lname}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.phone}</TableCell>
                    <TableCell>{showGenderLabel(employee.gender)}</TableCell>
                    <TableCell>{employee.joinedDate}</TableCell>
                    {role === ROLES.ADMIN && (
                      <IconSection employee={employee} />
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <LoadingAlert />
        )}
      </Container>
      <EmployeeFormModal
        type='add'
        isFormModalOpen={isFormModalOpen}
        setIsFormModalOpen={setIsFormModalOpen}
      />
    </div>
  );
};

export default Home;
