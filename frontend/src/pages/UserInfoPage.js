import { Container, Paper } from '@mui/material';
import BreadcrumbsBar from '../components/BreadcrumbsBar';
import UserInfoForm from '../components/UserInfoForm';
import CustomTab from '../components/CustomTab';
import { useGetUserByIdQuery } from '../store';
import { useParams } from 'react-router-dom';

function UserInfoPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetUserByIdQuery(id);

  let fullName;
  if (isLoading) {
    fullName = '-';
  } else if (error) {
    fullName = 'Error fetching name...';
  } else {
    fullName =
      data.data.data.firstName.split(' ')[0].charAt(0) +
      '. ' +
      (data.data.data.firstName.split(' ')[1] || '') +
      ' ' +
      data.data.data.lastName;
  }

  return (
    <Container maxWidth="xl" sx={{ marginTop: 8 }}>
      <Paper sx={{ height: '100%', overflow: 'hidden' }}>
        <BreadcrumbsBar
          paths={[
            {
              pathName: 'Home',
              path: '/',
            },
            {
              pathName: 'Users',
              path: '/users',
            },
          ]}
          currentPage={fullName}
        />
        <CustomTab
          tabs={[<UserInfoForm />, <div>Tab 2</div>, <div>Tab3</div>]}
        />
      </Paper>
    </Container>
  );
}

export default UserInfoPage;
