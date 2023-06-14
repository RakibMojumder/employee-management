import { Box, Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useState } from "react";
import UpdateUser from "./UpdateUser";

const UserDetails = () => {
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "350px",
          display: "flex",
          alignItems: "center",
          border: 1,
          p: 2,
          gap: 3,
          position: "relative",
        }}
      >
        <img
          src="https://img.freepik.com/free-icon/user_318-159711.jpg"
          alt=""
          height={150}
          width={150}
        />
        <Box>
          <Typography variant="h5">{`${state?.firstName} ${state?.lastName}`}</Typography>
          <Typography>User Type: {state.employeeType}</Typography>
          <Typography>Division: {state.disvision}</Typography>
          <Typography>District: {state.district}</Typography>
        </Box>
        <Button
          startIcon={<BorderColorIcon />}
          size="small"
          onClick={handleOpen}
          sx={{ position: "absolute", top: "10px", right: "20px" }}
        ></Button>
      </Box>
      {open && (
        <UpdateUser
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          user={state}
        />
      )}
    </Box>
  );
};

export default UserDetails;
