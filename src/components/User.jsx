import { Button, TableCell, TableRow } from "@mui/material";

const User = ({ user }) => {
  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": {
          border: 0,
        },
      }}
    >
      <TableCell component="th" scope="row">
        {`${user.firstName} ${user.lastName}`}
      </TableCell>
      <TableCell align="center">{user.employeeType}</TableCell>
      <TableCell align="center">{user.disvision}</TableCell>
      <TableCell align="center">{user.district}</TableCell>
      <TableCell align="center">
        <Button variant="outlined" size="small">
          Details
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default User;
