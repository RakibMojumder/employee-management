import { useQuery } from "react-query";
import axios from "axios";
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
import User from "./User";
import SearchBox from "./SearchBox";
import { useState } from "react";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { isLoading } = useQuery(["employee"], async () => {
    const res = await axios.get(
      "http://59.152.62.177:8085/api/Employee/EmployeeData "
    );

    let employees = [];
    res.data.readEmployeeData.forEach((user) => {
      if (user.employeeType.toLowerCase() === "employee") {
        employees.push(user);
      }
    });
    setEmployees(employees);
  });

  const handleSearch = (searchValue) => {
    console.log(searchValue);
  };

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
            {employees.map((employee) => (
              <User key={employee.empId} user={employee} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeeList;
