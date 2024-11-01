import React, { useState } from 'react';
import { History } from 'contexts/history';
import { Box, Typography, IconButton, Collapse, Chip } from '@mui/material';
import { Person, Event, Description, ExpandMore, ExpandLess, Phone, Info, Wc } from '@mui/icons-material';

interface HistoryCardProps extends History {}

const HistoryCard: React.FC<HistoryCardProps> = ({ answer, caseType, fullName, gender, phone, question, uid, create_at }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box className="max-h-max bg-gray-800  rounded-2xl p-2 overflow-auto">
      <Box className="w-full h-full rounded-2xl flex p-6 flex-col gap-4 bg-gray-900">
        <Box className="flex items-center gap-2">
          <Person className="text-primary-color" />
          <Typography variant="h6" className="text-white">
            {fullName}
          </Typography>
          <Event className="text-primary-color" />
          <Typography variant="body2" className="text-white">
            {new Date(create_at || '').toLocaleDateString()}
          </Typography>
        </Box>

        <Box className="flex items-center gap-2">
          <Typography variant="body1" className="text-white">
            {question}
          </Typography>
        </Box>

        <Box className="flex justify-between items-center">
          <Chip label={caseType} className="text-white" />
          <IconButton onClick={handleExpandClick} className="text-white">
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        <Collapse in={expanded} timeout="auto" className='p-2' unmountOnExit>
          <Box className="flex flex-col gap-2 p-2 bg-gray-800 rounded-md">
            <Box className="flex items-center gap-2">
              <Wc className="text-primary-color" />
              <Typography variant="body2" className="text-white">
                <strong>Giới tính:</strong> {gender}
              </Typography>
            </Box>
            <Box className="flex items-center gap-2">
              <Phone className="text-primary-color" />
              <Typography variant="body2" className="text-white">
                <strong>số điện thoại:</strong> {phone}
              </Typography>
            </Box>
            <Box className="flex items-center gap-2">
              <Info className="text-primary-color" />
              <Typography variant="body2" className="text-white" style={{ whiteSpace: 'pre-wrap' }}>
                <strong>Câu trả lời:</strong> {answer}
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default HistoryCard;