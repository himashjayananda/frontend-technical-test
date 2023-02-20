import { FC, Dispatch, SetStateAction } from 'react';
import { Box, Button, Typography, Modal } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { useDeleteEmployeeMutation } from '../../behavior/api/employees.api';
import { EmployeeType } from '../../types/Employee';

interface DeleteEmployeeModalProps {
  employee: EmployeeType;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
}

const DeleteEmployeeModal: FC<DeleteEmployeeModalProps> = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  employee,
}) => {
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100%', sm: 400 },
    bgcolor: 'background.paper',
    borderRadius: '0.25rem',
    p: 4,
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteEmployee(id).unwrap();

      if (response) {
        setIsDeleteModalOpen(false);
        toast.success('Employee deleted!');
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(error);
    }
  };

  return (
    <Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
      <Box sx={boxStyle}>
        <CloseIcon
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            cursor: 'pointer',
          }}
          onClick={() => setIsDeleteModalOpen(false)}
        />
        <Typography variant='h6' mb={2}>
          Delete Employee
        </Typography>
        <Typography variant='body1' mb={3}>
          {`This action will remove the user, ${employee.fname} ${employee.lname}.`}
        </Typography>
        <Button
          variant='contained'
          color='error'
          sx={{ marginRight: '1.25rem' }}
          onClick={() => handleDelete(employee.id)}
        >
          Confirm Deletion
        </Button>
        <Button variant='text' onClick={() => setIsDeleteModalOpen(false)}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteEmployeeModal;
