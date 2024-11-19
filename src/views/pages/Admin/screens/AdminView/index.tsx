import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import useAdmin from "hooks/useAdmin";
import { useAppSelector } from "contexts/hooks";
import RoleService from "server/role";

const AdminView: React.FC = () => {
  const [admins, setAdmins] = useState<string[]>([]);
  const [newAdminUid, setNewAdminUid] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const isAdmin = useAdmin();
  const currentUser = useAppSelector((state) => state.user.data);

  useEffect(() => {
    const fetchAdmins = async () => {
      const adminList = await RoleService.getAdminUids();
      setAdmins(adminList);
    };

    if (isAdmin) {
      fetchAdmins();
    }
  }, [isAdmin]);

  const handleAddAdmin = async () => {
    try {
      await RoleService.createRole({
        uid: newAdminUid,
        state: "admin",
        create_at: new Date(),
      });
      setAdmins((prevAdmins) => [...prevAdmins, newAdminUid]);
      setNewAdminUid("");
      setSnackbarMessage("Admin added successfully");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to add admin");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteAdmin = async (uid: string) => {
    if (uid === currentUser?.uid) {
      setSnackbarMessage("You cannot delete yourself");
      setSnackbarOpen(true);
      return;
    }

    try {
      await RoleService.deleteRole(uid);
      setAdmins((prevAdmins) =>
        prevAdmins.filter((adminUid) => adminUid !== uid)
      );
      setSnackbarMessage("Admin deleted successfully");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to delete admin");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (!isAdmin) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Chip label="You do not have permission to view this page." color="error" />
      </Box>
    );
  }

  return (
    <Box className="p-4">
      <Typography variant="h4" className="mb-4">
        Admin Management
      </Typography>
      <Box className="flex gap-4 mb-4">
        <TextField
          label="New Admin UID"
          value={newAdminUid}
          onChange={(e) => setNewAdminUid(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddAdmin}
        >
          Add Admin
        </Button>
      </Box>
      <div className=" grid grid-cols-4">
        {admins.map((uid) => (
          <ListItem key={uid} className="bg-slate-900 rounded-sm p-2 max-w-max flex justify-between items-center">
            <Chip label={uid} />
            <IconButton onClick={() => handleDeleteAdmin(uid)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminView;
