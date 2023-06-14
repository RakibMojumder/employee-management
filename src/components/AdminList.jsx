import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import SearchBox from "./SearchBox";
import User from "./User";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { isLoading } = useQuery(["employee"], async () => {
    const res = await axios.get(
      "http://59.152.62.177:8085/api/Employee/EmployeeData "
    );

    let admins = [];
    res.data.readEmployeeData.forEach((user) => {
      if (user.employeeType.toLowerCase() === "admin") {
        admins.push(user);
      }
    });
    setAdmins(admins);
  });

  if (isLoading) return;

  return (
    <Box>
      <Box
        sx={{
          textAlign: "end",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          gap: "20px",
          marginBottom: "10px",
        }}
      >
        <SearchBox setSearchValue={setSearchValue} />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                User Type
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Division
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                District
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins
              .filter((item) => {
                if (searchValue === "") {
                  return item;
                } else {
                  return item.firstName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
                }
              })
              .map((admin) => (
                <User key={admin.empId} user={admin} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminList;
