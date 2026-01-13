import { Box, Divider, Grid, LinearProgress } from '@mui/material';
import { EditPermissionsDialog } from '@shared/components/EditAdminPermissions';
import { Error } from '@shared/components/Error';
import { SectionContainer } from '@shared/components/SectionContainer';
import { TitleCard } from '@shared/components/TitleCard';
import UsersTable from '@shared/components/UsersTable';
import {
  useGetAllUsers,
  useGetUserPermissions,
  useSetUserPermissions,
} from '@shared/hooks/useAdminData';
import { theme } from '@shared/styles/theme';
import type {
  ModulePermissions,
  TUserPermissionsPayload,
  UserData,
} from '@shared/types/common';
import { modules } from '@shared/utils/permissions';
import { useEffect, useState } from 'react';

const MainPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData>();
  const [userID, setUserID] = useState('');
  const [updatedUserPermissions, setUpdatedUserPermissions] =
    useState<ModulePermissions[]>();
  const {
    isPending: isUsersDataPending,
    data: usersData,
    // isSuccess: isUsersDataSuccess,
    isError: isUserDataError,
  } = useGetAllUsers();

  const {
    isPending: isGetUserPermissionsPending,
    isSuccess: isGetUserPermissionsSuccess,
    data: userPermissionsData,
    isError: isGetUserPermissionsError,
    mutate: getUserPermissionsMutate,
  } = useGetUserPermissions();

  const {
    isPending: isSetUserPermissionsPending,
    isError: isSetUserPermissionError,
    mutate: setUserPermissionsMutate,
  } = useSetUserPermissions();

  useEffect(() => {
    if (isGetUserPermissionsSuccess) {
      const userPermissionsSet = new Set(
        userPermissionsData?.data?.map((p) => p)
      );
      const modulePermissions = modules?.map((m) => {
        if (userPermissionsSet.has(m.moduleID)) {
          return {
            checked: true,
            ...m,
          };
        } else {
          return {
            checked: false,
            ...m,
          };
        }
      });
      setUpdatedUserPermissions(modulePermissions);
    }
  }, [userPermissionsData?.data, isGetUserPermissionsSuccess]);

  const selectedPermissions = updatedUserPermissions?.filter((p) => p.checked);

  const userPermissionsPayload: TUserPermissionsPayload = {
    user_id: Number(userID),
    role_id: Number(userID) === 2 ? 2 : 1,
    modules: selectedPermissions?.map((p) => p.moduleIndex) as number[],
    permissions: selectedPermissions?.map((p) => p.permissionIndex) as number[],
  };
  const isLoading = isUsersDataPending;
  const isError = isUserDataError;
  return (
    <Box component="main" sx={{ flexGrow: 1, padding: theme.padding }}>
      <TitleCard
        title="Admin Dashboard"
        description="Manage users and view platform statistics"
      />
      {isLoading ? (
        <LinearProgress />
      ) : isError ? (
        <Error />
      ) : (
        <Box sx={{ width: '100%', background: isLoading ? '#F0F2F5' : 'none' }}>
          <Divider sx={{ marginTop: '1rem' }} />
          <SectionContainer title={"Recent highlight's"}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={{ xs: 1, md: 7 }} padding={'3rem'}>
                <UsersTable
                  data={usersData.data || []}
                  editPermissions={(userID: number) => {
                    setOpenDialog(true);
                    // console.log('Clicked', userID);
                    getUserPermissionsMutate(userID.toString());
                    setUserID(userID.toString());
                    setSelectedUser(
                      usersData.data.find((u) => u.id === userID)
                    );
                  }}
                />
              </Grid>
              {openDialog && isGetUserPermissionsSuccess ? (
                <EditPermissionsDialog
                  key={userID}
                  userID={userID}
                  user={selectedUser as UserData}
                  setData={(data) => setUpdatedUserPermissions(data)}
                  open={openDialog}
                  isLoading={false}
                  data={updatedUserPermissions as ModulePermissions[]}
                  handleDialogClose={() => setOpenDialog(false)}
                  isGetUserPermissionsLoading={isGetUserPermissionsPending}
                  isSetUserPermissionsLoading={isSetUserPermissionsPending}
                  isGetUserPermissionsError={isGetUserPermissionsError}
                  isSetUserPermissionsError={isSetUserPermissionError}
                  setUserPermissions={() => {
                    // console.log({ userPermissionsPayload });
                    setUserPermissionsMutate(userPermissionsPayload);
                    setOpenDialog(false);
                  }}
                />
              ) : null}
            </Box>
          </SectionContainer>
        </Box>
      )}
    </Box>
  );
};

export default MainPage;
