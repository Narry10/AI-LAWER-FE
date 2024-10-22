import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  IconButton,
  CssBaseline,
} from "@mui/material";
import { Tag, ExpandMore, ContentCopy } from "@mui/icons-material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  ...(theme.palette.mode === "dark" && {
    backgroundColor: grey[800],
  }),
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  padding: theme.spacing(2),
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 10,
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
  ...(theme.palette.mode === "dark" && {
    backgroundColor: grey[900],
  }),
}));

const CardPrompt = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    if (expanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expanded]);

  return (
    <Card className="relative flex-1 p-1" variant="outlined">
      <CssBaseline />
      <CardMedia
        component="img"
        sx={{
          height: 240,
          objectFit: "contain",
          width: "100%",
          objectPosition: "center",
        }}
        image={item.image}
        alt={item.label}
      />
      <CardContent sx={{ padding: 1 }}>
        <Typography variant="h6" className="text-white font-bold text-sm">
          {item.label}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between">
        <Box className="flex flex-wrap gap-2">
          {item.tags.map((tag, tagIndex) => (
            <Chip key={tagIndex} label={tag} icon={<Tag />} size="small" />
          ))}
        </Box>
        <Box className="flex flex-wrap gap-1">
          <IconButton aria-label="copy">
            <ContentCopy />
          </IconButton>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          >
            <ExpandMore />
          </IconButton>
        </Box>
      </CardActions>
      {expanded && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute h-100 bottom-0 left-0 right-0 z-10"
        >
          <StyledBox
            className="h-80"
            ref={boxRef}
            onClick={() => setExpanded(false)}
          >
            <Puller />
            <Typography sx={{ p: 2, color: "text.secondary" }}>
              {item.label}
            </Typography>
            <CardContent className="h-80" sx={{ padding: 1 }}>
              <Typography variant="body2" className="text-gray-300">
                {item.content}
              </Typography>
            </CardContent>
          </StyledBox>
        </motion.div>
      )}
    </Card>
  );
};

export default React.memo(CardPrompt);
