import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { addUserSchema } from "../YupSchema/YupSchema";
import Form from "./Form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

let initialValues = {
  firstName: "",
  lastName: "",
  disvision: "",
  district: "",
  employeeType: "",
};

const AddUser = ({ open, setOpen, handleClose }) => {
  const [divisionId, setDivisionId] = useState(null);
  const [districeID, setDistriceID] = useState(null);

  // SUBMITTING FORM
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    // If i add validation schema "Form" is not submitted. I don't know why. I google it but could not find anything
    // validationSchema: addUserSchema,
    onSubmit: async (values) => {
      const res = await axios.post(
        "http://59.152.62.177:8085/api/Employee/SaveEmployeeInformation",
        { ...values, divisionId, districeID }
      );
      console.log(res);
      setOpen(false);
    },
  });

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
          <Form
            handleChange={handleChange}
            setDivisionId={setDivisionId}
            setDistriceID={setDistriceID}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddUser;
