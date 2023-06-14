import {
  Backdrop,
  Box,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useQuery } from "react-query";
import Form from "./Form";

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

const UpdateUser = ({ open, setOpen, handleClose, user }) => {
  const [divisionId, setDivisionId] = useState(null);
  const [districeID, setDistriceID] = useState(null);
  const { empID, ...rest } = user;

  // SUBMITTING FORM
  const { errors, handleChange, handleSubmit } = useFormik({
    initialValues: rest,
    // If i add validation schema "form" is not submitted. I don't know why. I google it but could not find anything
    // validationSchema: addUserSchema,
    onSubmit: async (values) => {
      const res = await axios.put(
        `http://59.152.62.177:8085/api/Employee/UpdateEmployeeInformation/${empID}`,
        { ...values, divisionId, districeID }
      );
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
            Update user
          </Typography>

          <Form
            handleChange={handleChange}
            setDivisionId={setDivisionId}
            setDistriceID={setDistriceID}
            handleSubmit={handleSubmit}
            user={user}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default UpdateUser;
