import { FC, useEffect, useState } from 'react';
import { Container, Typography, Divider } from '@mui/material';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts';
import { useGetEmployeesQuery } from '../behavior/api/employees.api';
import LoadingAlert from '../components/LoadingAlert';
import { EmployeeType } from '../types/Employee';
import { ChartDataType } from '../types/Chart';

interface ChartProps {}

const Chart: FC<ChartProps> = () => {
  const { data: employees, isLoading } = useGetEmployeesQuery();
  const [chartData, setChartData] = useState<ChartDataType[]>([]);

  useEffect(() => {
    if (!isLoading && employees) {
      const formattedData = employees.reduce((acc: any, obj: EmployeeType) => {
        const year = obj.joinedDate.substring(0, 4);
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(obj);
        return acc;
      }, {});

      const data = Object.keys(formattedData).map(year => {
        return {
          name: year,
          employees: formattedData[year].length,
        };
      });

      setChartData(data);
    }
  }, [employees]);

  return (
    <Container maxWidth='xl' className='chart-wrapper'>
      {!isLoading && chartData ? (
        <>
          <Typography variant='h5' mt={3} mb={5}>
            Employees joined in the past years
          </Typography>
          <LineChart width={800} height={300} data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='employees' stroke='#1976d2' />
          </LineChart>
          <Divider
            sx={{
              margin: '2.5rem 0',
            }}
          />
          <BarChart width={800} height={250} data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='employees' fill='#1976d2' />
          </BarChart>
        </>
      ) : (
        <LoadingAlert />
      )}
    </Container>
  );
};

export default Chart;
