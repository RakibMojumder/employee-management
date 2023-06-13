import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useFormik, Formik, Form, Field } from "formik";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";
import { addUserSchema } from "../YupSchema/YupSchema";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

let initialValues = {
  firstName: "",
  lastName: "",
  division: "",
  district: "",
  employeeType: "",
};

const AddUser = ({ open, handleClose }) => {
  const [district, setDistrict] = useState([]);
  const [divisionId, setDivisionId] = useState(null);
  const [districtID, setDistrictID] = useState(null);

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

  // SUBMITTING FORM
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    // If i add validation schema "form" is not submitted. I don't know why. I google it but could not find anything
    // validationSchema: addUserSchema,
    onSubmit: async (values) => {
      const res = await axios.post(
        "http://59.152.62.177:8085/api/Employee/SaveEmployeeInformation",
        { ...values, divisionId, districtID }
      );
      console.log({ ...values, districtID, divisionId });
      console.log(res.data);
    },
  });

  if (isLoading) return;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Add User
          </Typography>
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
              sx={{ width: "100%" }}
              onChange={handleChange}
              value={values.firstName}
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              size="small"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              sx={{ width: "100%" }}
            />
            {/* DIVISION */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" size="small">
                Division
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                values={values.division}
                onChange={handleChange}
                label="Division"
                size="small"
                name="division"
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

            {/* DISTRICT */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" size="small">
                District
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                values={values.district}
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
                    onClick={() => setDistrictID(district.districtID)}
                  >
                    {district?.districtName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* EMPLOYEE TYPE */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" size="small">
                User Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                values={values.employeeType}
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
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddUser;
