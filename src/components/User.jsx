import { Button, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";

const User = ({ user }) => {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/user/${id}`, { state: user });
  };

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
        <Button
          onClick={() => handleNavigate(user.empID)}
          variant="outlined"
          size="small"
        >
          Details
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default User;
