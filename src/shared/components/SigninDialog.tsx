import { useAuth } from '@app/context';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useUserSignin } from '@shared/hooks/useUser';
import { usePermissions } from '@shared/hooks/useUtils';
import type { TUserObject } from '@shared/types/common';
import React, { useState } from 'react';

type DialogProps = {
  handleDialogClose?: () => void;
  open?: boolean;
  handleSignOut: () => void;
};

export function SigninDialog(props: DialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { open = false, handleDialogClose, handleSignOut } = props;
  const auth = useAuth();
  const { mutate: mutateSignin, isError } = useUserSignin();
  const {
    mutateAsync: mutatePermissions,
    isError: isPermissionErr,
    error: permissionsErr,
  } = usePermissions();

  const removeSessionTimeout = () => {
    console.log('Timeout started..');
    var timeoutId;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(
      () => {
        localStorage.removeItem('user');
        localStorage.removeItem('permissions');
        console.log('User Session Timeout');
        handleSignOut();
      },
      3 * 60 * 1000 // 5min session
    );
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const name = formJson.name as string;
    const email = formJson.email as string;
    setIsLoading(true);
    mutateSignin(
      { name, email },
      {
        onSuccess: (res) => {
          console.log('Success Signin', res);
          mutatePermissions(res.data.user.id, {
            onSuccess: (data) => {
              auth.signin({
                id: res.data.user.id,
                name: res.data.user.name,
                email: res.data.user.email,
                signin: true,
                isAdmin: res.data.user.id === '2' ? true : false,
                permissions: data.data,
              } as TUserObject);
              const isAdmin = res.data.user.id === '2' ? true : false;
              localStorage.setItem(
                'user',
                JSON.stringify({
                  ...res.data.user,
                  isAdmin,
                  roleID: isAdmin ? 2 : 1,
                })
              );
              localStorage.setItem('permissions', JSON.stringify(data.data));
              removeSessionTimeout();
            },
            onError: (err) => {
              console.log('Permissions fetch error', err);
            },
            onSettled: (data) => {
              console.log('SETTLED', { data });
            },
          });
          if (isPermissionErr) {
            console.error('Error', permissionsErr);
          }
          handleDialogClose && handleDialogClose();
        },
        onError: (err) => {
          console.log('Signin error', err);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Signin</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Guest user has access to Population and Health modules only.
            <br />
            Username: <b>man</b>
            <br />
            Email: <b>man@edu.u</b>
            <br />
            <br />
            Demo user can access all modules.
            <br />
            Username: <b>woman</b>
            <br />
            Email: <b>woman@edu.u</b>
            <br />
            <br />
            *The above credentials permissions can be changed using admin access
            only.
          </DialogContentText>
          <br />
          {isError ? (
            <Alert severity="error">Signin Failed. Try again.</Alert>
          ) : null}
          <form onSubmit={(e) => handleSubmit(e)} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Enter your username"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              //   autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="Enter your email address"
              type="email"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" form="subscription-form" disabled={isLoading}>
            Signin
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
