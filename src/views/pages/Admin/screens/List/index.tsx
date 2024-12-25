import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  CardActions,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "contexts/hooks";
import useFetchOffice from "hooks/useFetchOffice";
import { Link, useNavigate } from "react-router-dom";
import { Info as InfoIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { officeDelete } from "contexts/business";

const ListBusiness = () => {
  const { refetch } = useFetchOffice();
  const offices = useAppSelector((state) => state.business.office.data);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleNavigate = (ref_id: string) => {
    navigate(`/admin/doc/${ref_id}`);
  };

  const handleDelete = (ref_id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(officeDelete({ ref_id }));
    refetch();
  };

  return (
    <Box className="grid grid-cols-4 gap-4 p-4">
      {offices.map((office) => (
        <Link to={`/admin/doc/${office.ref_id}`}>
          <Card key={office.ref_id} className="flex flex-col gap-4 p-4">
            <CardMedia
              component="img"
              image={office.image}
              alt={office.name}
              sx={{ objectFit: "contain", height: "20vh" }}
            />
            <CardContent>
              <Box className="flex justify-between items-center">
                <Typography variant="h5">{office.name}</Typography>
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {office.description}
              </Typography>
            </CardContent>
            <CardActions className="flex justify-between">
              <Typography color="textSecondary">
                Priority: {office.priority}
              </Typography>
              <IconButton
                onClick={(event) =>
                  handleDelete(`${office.ref_id || ""}`, event)
                }
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Link>
      ))}
    </Box>
  );
};

export default ListBusiness;
