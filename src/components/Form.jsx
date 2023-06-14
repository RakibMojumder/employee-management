import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const Form = ({
  setDivisionId,
  values,
  handleChange,
  setDistriceID,
  handleSubmit,
  user,
}) => {
  const [district, setDistrict] = useState([]);

  // GET DIVISION DATA
  const { data: divisions, isLoading } = useQuery(["division"], async () => {
    const res = await axios.get(
      "http://59.152.62.177:8085/api/Employee/Division "
    );
    return res.data.readDivisionData;
  });

  // SET DISTRICT DATA
  const handleDistrict = async (divisionId) => {
    const res = await axios.get(
      `http://59.152.62.177:8085/api/Employee/District/${divisionId} `
    );
    setDistrict(res.data.readDistrictData);
    setDivisionId(divisionId);
  };

  if (isLoading) return;

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        id="outlined-basic"
        label="First Name"
        variant="outlined"
        size="small"
        name="firstName"
        defaultValue={user ? user.firstName : ""}
        sx={{ width: "100%" }}
        onChange={handleChange}
      />
      <TextField
        id="outlined-basic"
        label="Last Name"
        variant="outlined"
        size="small"
        name="lastName"
        defaultValue={user ? user.lastName : ""}
        onChange={handleChange}
        sx={{ width: "100%" }}
      />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" size="small">
          Division
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={user ? user.disvision : ""}
          onChange={handleChange}
          label="Division"
          size="small"
          name="disvision"
        >
          {divisions.map((division) => (
            <MenuItem
              key={division.divID}
              value={division.divisionName}
              onClick={() => handleDistrict(division.divID)}
            >
              {division.divisionName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" size="small">
          District
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={user ? user.district : ""}
          onChange={handleChange}
          label="District"
          size="small"
          name="district"
          disabled={district?.length === 0}
        >
          {district?.map((district) => (
            <MenuItem
              key={district?.districtID}
              value={district?.districtName}
              onClick={() => setDistriceID(district.districtID)}
            >
              {district?.districtName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" size="small">
          User Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={user ? user.employeeType : ""}
          onChange={handleChange}
          label="User Type"
          size="small"
          name="employeeType"
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Employee">Employee</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Form;
