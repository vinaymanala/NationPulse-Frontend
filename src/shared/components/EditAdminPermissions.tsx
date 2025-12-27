import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import type { ModulePermissions, UserData } from '@shared/types/common';

export const EditPermissionsDialog = (props: {
  userID: string;
  user: UserData;
  data: ModulePermissions[];
  setData: (data: ModulePermissions[]) => void;
  open: boolean;
  isGetUserPermissionsLoading: boolean;
  isSetUserPermissionsLoading: boolean;
  isGetUserPermissionsError: boolean;
  isSetUserPermissionsError: boolean;
  setUserPermissions: () => void;
  isLoading: boolean;
  handleDialogClose: () => void;
}) => {
  const {
    userID,
    user,
    data,
    setData,
    open,
    isGetUserPermissionsLoading,
    isSetUserPermissionsLoading,
    // isGetUserPermissionsError,
    // isSetUserPermissionsError,
    handleDialogClose,
    setUserPermissions,
  } = props;

  if (!isGetUserPermissionsLoading) {
    console.log({ data });
  }

  const handleSingleSelect = (value: boolean, id: number) => {
    const ups = data?.map((mp) => {
      if (mp.moduleID === id) {
        return {
          ...mp,
          checked: value,
        };
      }
      return mp;
    });
    setData(ups);
  };
  return (
    <Dialog key={userID} open={open} onClose={handleDialogClose}>
      <DialogTitle>Edit permissions</DialogTitle>
      <DialogContent>
        <DialogContentText>User: {user.username}</DialogContentText>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Module ID</TableCell>
                <TableCell align="left">Module name</TableCell>
                <TableCell align="left">PermissionID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((mp) => (
                <TableRow
                  key={mp.moduleID}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <Checkbox
                    checked={mp.checked}
                    onChange={(_, value) =>
                      handleSingleSelect(value, mp.moduleID)
                    }
                    disabled={mp.permissionIndex === 7}
                  />
                  <TableCell component="th" scope="row">
                    {mp.moduleID}
                  </TableCell>
                  <TableCell align="left">{mp.moduleName}</TableCell>
                  <TableCell align="left">{mp.permissionID}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDialogClose}
          disabled={isSetUserPermissionsLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="subscription-form"
          disabled={isSetUserPermissionsLoading}
          onClick={setUserPermissions}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
