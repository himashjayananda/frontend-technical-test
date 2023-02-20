import { FC, useState } from 'react';
import { TableCell } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteEmployeeModal from './DeleteEmployeeModal';
import { EmployeeType } from '../../types/Employee';
import EmployeeFormModal from './EmployeeFormModal';

interface IconSectionProps {
  employee: EmployeeType;
}

const IconSection: FC<IconSectionProps> = ({ employee }) => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <TableCell>
        <EditIcon
          sx={{
            cursor: 'pointer',
            transition: '150ms',
            '&:hover': {
              color: 'primary.main',
            },
          }}
          onClick={() => setIsFormModalOpen(true)}
        />
      </TableCell>
      <TableCell>
        <DeleteIcon
          sx={{
            cursor: 'pointer',
            transition: '150ms',
            '&:hover': {
              color: 'error.main',
            },
          }}
          onClick={() => setIsDeleteModalOpen(true)}
        />
      </TableCell>
      <EmployeeFormModal
        type='edit'
        employee={employee}
        isFormModalOpen={isFormModalOpen}
        setIsFormModalOpen={setIsFormModalOpen}
      />
      <DeleteEmployeeModal
        employee={employee}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
    </>
  );
};

export default IconSection;
