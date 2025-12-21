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
export const NotFound = () => {
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
            Page not found
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            Looks like either you dont have access to the requested URL or the
            link is broken. Kindly signin and try again.
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
            onClick={() => navigate('/')}
          >
            Return to dashboard
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
