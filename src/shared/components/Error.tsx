import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';
export const Error = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'grid',
        //   alignItems: 'center',
        placeItems: 'center',
        margin: '20% auto',
        maxWidth: 500,
      }}
    >
      <Card variant="outlined">
        <CardContent
          sx={{
            padding: '1em',
          }}
        >
          <Typography
            variant="h5"
            component="div"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '.5em',
              marginBottom: '.5em',
            }}
          >
            <ErrorOutlineIcon color="error" />
            Error occured
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            Looks like the link is broken. Kindly try again.
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            paddingBottom: '1.25em',
          }}
        >
          <Button
            size="large"
            variant="contained"
            sx={{ marginLeft: '.5em' }}
            onClick={() => (window.location.pathname = '/')}
          >
            Try again
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
