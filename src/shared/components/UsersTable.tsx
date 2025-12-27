import type { UserData } from '@shared/types/common';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
} from '@mui/material';

export default function UsersTable(props: {
  data: UserData[];
  editPermissions: (id: number) => void;
}) {
  const { data, editPermissions } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">User name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="right">Created at</TableCell>
            <TableCell align="right">Updated at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">
                <Link
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    editPermissions(row.id);
                  }}
                >
                  {row.username}
                </Link>
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="right">
                {new Date(row.created_at).toLocaleString()}
              </TableCell>
              <TableCell align="right">
                {new Date(row.updated_at).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
