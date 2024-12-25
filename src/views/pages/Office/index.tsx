import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useAppSelector } from "contexts/hooks";
import useFetchClientoffice from "hooks/useFetchClientoffice";
import React from "react";
import { useParams } from "react-router-dom";
import Loading from "views/components/Commons/Loading";

const OfficeScreen = () => {
  const { ref_id } = useParams<{ ref_id: string }>();
  const office = useAppSelector((state) => state.business.client.data);

  useFetchClientoffice(ref_id || "");

  if (!office) {
    return <Loading />;
  }

  return (
    <div className="container">
      <Box className="p-4">
        <Card className="flex flex-col gap-4 p-4" sx={{ boxShadow: 'none', border: 'none' }}>
          <CardMedia
            component="img"
            image={office.image}
            alt={office.name}
            sx={{ objectFit: "contain", height: "40vh" }}
          />
          <CardContent>
            <Typography variant="h5">{office.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {office.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {office.action}
            </Typography>
            <Box
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: office.body }}
            />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default OfficeScreen;
