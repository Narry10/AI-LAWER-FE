import { documentFetch } from "contexts/document";
import { useAppSelector, useAppDispatch } from "contexts/hooks";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Divider } from "@mui/material";
import {
  Person,
  Description,
  Phone,
  Wc,
  QuestionAnswer,
  Event,
} from "@mui/icons-material";
import LawFirmSlider from "views/containers/LawFirmSlider";

const DocumentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const document = useAppSelector((state) => state.document.data);
  const loading = useAppSelector((state) => state.document.loading);
  const error = useAppSelector((state) => state.document.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(documentFetch({ ref_id: id }));
    }
  }, [dispatch, id]);

  return (
    <>
      <div>
        <LawFirmSlider />
      </div>
      <Box className="max-h-max bg-gray-800 rounded-br-none rounded-bl-none  min-h-[50vh] p-2 overflow-auto">
        <Box className="w-full h-full rounded-2xl flex p-6 flex-col gap-4 bg-gray-900">
          {loading ? (
            <CircularProgress className="text-primary-color" />
          ) : error ? (
            <Typography variant="body1" className="text-red-500">
              Something went wrong. Please try again later.
            </Typography>
          ) : document ? (
            <div className="container">
              <Typography variant="h6" className="text-white p-2 ">
                Thông tin bản án ( Liên hệ ngay hổ trợ liền tay ! )
              </Typography>
              <Divider className="bg-gray-700 my-4" />
              <Box className="flex flex-col gap-2">
                <Box className="flex items-center gap-2">
                  <Person className="text-primary-color" />
                  <Typography variant="body1" className="text-white">
                    <strong>Full Name:</strong> {document?.fullName}
                  </Typography>
                </Box>
                <Box className="flex items-center gap-2">
                  <Description className="text-primary-color" />
                  <Typography variant="body1" className="text-white">
                    <strong>Case Type:</strong> {document?.caseType}
                  </Typography>
                </Box>
                <Box className="flex items-center gap-2">
                  <Phone className="text-primary-color" />
                  <Typography variant="body1" className="text-white">
                    <strong>Phone:</strong> {document?.phone}
                  </Typography>
                </Box>
                <Box className="flex items-center gap-2">
                  <Wc className="text-primary-color" />
                  <Typography variant="body1" className="text-white">
                    <strong>Gender:</strong> {document?.gender}
                  </Typography>
                </Box>
                <Box className="flex items-center gap-2">
                  <QuestionAnswer className="text-primary-color" />
                  <Typography variant="body1" className="text-white">
                    <strong>Question:</strong> {document?.question}
                  </Typography>
                </Box>
                <Box className="flex items-center gap-2">
                  <QuestionAnswer className="text-primary-color" />
                  <Typography variant="body1" className="text-white">
                    <strong>Answer:</strong> {document?.answer}
                  </Typography>
                </Box>
                <Box className="flex items-center gap-2">
                  <Event className="text-primary-color" />
                  <Typography variant="body1" className="text-white">
                    <strong>Created At:</strong>{" "}
                    {new Date(document?.create_at || "").toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </div>
          ) : (
            <Typography variant="body1" className="text-white">
              No document found.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default DocumentDetail;
