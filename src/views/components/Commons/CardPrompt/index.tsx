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
import { ChatForm, QuestionTemplate } from "contexts/question/quesitionType";
import { useAppDispatch } from "contexts/hooks";
import {
  questionUpdateForm,
  questionChangeView,
} from "contexts/question/questionActions";
import { ViewFactory } from "contexts/question/quesitionType";

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

interface CardPromptProps extends QuestionTemplate {}

const CardPrompt: React.FC<CardPromptProps> = ({
  description,
  example,
  image,
  specificSituation,
  subheader,
  tags,
  title,
}) => {
  const [expanded, setExpanded] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
      setExpanded(false);
    }
  };

  const handleApplyQuestion = () => {
    const updates = [
      { key: "description", value: description },
      { key: "specificSituation", value: specificSituation },
    ] as { key: keyof ChatForm; value: string }[];

    Promise.all(
      updates.map(({ key, value }) => dispatch(questionUpdateForm(key, value)))
    )
      .then(() => {
        dispatch(questionChangeView(ViewFactory.question));
      })
      .catch((error) => {
        console.error("Error updating form:", error);
      });
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
    <Card className="relative flex flex-col p-1 h-[100%]" variant="outlined">
      <CssBaseline />
      <CardMedia
        component="img"
        sx={{
          height: 240,
          objectFit: "contain",
          width: "100%",
          objectPosition: "center",
        }}
        image={image}
        alt={title}
      />
      <CardContent sx={{ padding: 1, flexGrow: 1 }}>
        <Typography variant="h6" className="text-white font-bold text-sm">
          {title}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between mt-auto">
        <Box className="flex flex-wrap gap-2">
          {tags.map((tag, tagIndex) => (
            <Chip key={tagIndex} label={tag} icon={<Tag />} size="small" />
          ))}
        </Box>
        <Box className="flex flex-wrap gap-1">
          <IconButton aria-label="copy" onClick={handleApplyQuestion}>
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
            className="h-80 overflow-auto"
            ref={boxRef}
            onClick={() => setExpanded(false)}
          >
            <Puller />
            <Typography sx={{ p: 2, color: "text.secondary" }}>
              {title}
            </Typography>
            <CardContent className="h-80 overflow-auto" sx={{ padding: 1 }}>
              <Typography variant="body2" className="text-gray-300">
                {description}
              </Typography>
              <Typography variant="body2" className="text-gray-300">
                {specificSituation}
              </Typography>
            </CardContent>
          </StyledBox>
        </motion.div>
      )}
    </Card>
  );
};

export default React.memo(CardPrompt);
