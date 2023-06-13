import { Box, Button, Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { useState } from "react";
import EmployeeList from "./EmployeeList";
import AddUser from "./AddUser";
import AdminList from "./AdminList";

const Dashboard = () => {
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);

  const handleChange = (e, value) => {
    setValue(value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ p: 0, marginTop: "10px" }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            width: "400px",
            margin: "auto",
          }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="User" value="1" sx={{ fontWeight: 600 }} />
            <Tab label="Employee" value="2" sx={{ fontWeight: 600 }} />
            <Button onClick={handleOpen} sx={{ fontWeight: 600 }}>
              Add User
            </Button>
          </TabList>
        </Box>
        <TabPanel value="1">
          <AdminList />
        </TabPanel>
        <TabPanel value="2">
          <EmployeeList />
        </TabPanel>
      </TabContext>
      {open && <AddUser open={open} handleClose={handleClose} />}
    </Box>
  );
};

export default Dashboard;
