import { FC, Dispatch, SetStateAction } from 'react';
import { Box, Typography, Modal } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import EmployeeForm from './EmployeeForm';
import { EmployeeType } from '../../types/Employee';

interface EmployeeFormModalProps {
  type: 'add' | 'edit';
  employee?: EmployeeType;
  isFormModalOpen: boolean;
  setIsFormModalOpen: Dispatch<SetStateAction<boolean>>;
}

const EmployeeFormModal: FC<EmployeeFormModalProps> = ({
  type,
  employee,
  isFormModalOpen,
  setIsFormModalOpen,
}) => {
  const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100%', sm: 600, md: 800 },
    bgcolor: 'background.paper',
    borderRadius: '0.25rem',
    p: 4,
  };

  return (
    <Modal open={isFormModalOpen} onClose={() => setIsFormModalOpen(false)}>
      <Box sx={boxStyle}>
        <CloseIcon
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            cursor: 'pointer',
          }}
          onClick={() => setIsFormModalOpen(false)}
        />
        <Typography variant='h6' mb={2}>
          {`${type === 'add' ? 'Add' : 'Edit'} Employee`}
        </Typography>
        <EmployeeForm
          type={type}
          employee={employee}
          setIsFormModalOpen={setIsFormModalOpen}
        />
      </Box>
    </Modal>
  );
};

export default EmployeeFormModal;
