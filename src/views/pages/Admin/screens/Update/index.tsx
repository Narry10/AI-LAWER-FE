import React, { useState, useEffect, useCallback } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Office } from "contexts/business";
import { useAppDispatch } from "contexts/hooks";
import { useParams, useNavigate } from "react-router-dom";
import OfficeService from "server/office";

const UpdateBusiness: React.FC = () => {
  const { ref_id } = useParams<{ ref_id: string }>();
  const [office, setOffice] = useState<Office | null>(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffice = async () => {
      if (ref_id) {
        const fetchedOffice = await OfficeService.getOfficeById(ref_id);
        if (fetchedOffice) {
          setOffice(fetchedOffice);
          setEditorState(
            EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(fetchedOffice.body).contentBlocks
              )
            )
          );
        }
      }
    };

    fetchOffice();
  }, [ref_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOffice((prevOffice) => {
      if (!prevOffice) return null;
      return {
        ...prevOffice,
        [name]: name === "priority" ? Number(value) : value,
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOffice((prevOffice) => {
          if (!prevOffice) return null;
          return {
            ...prevOffice,
            image: reader.result as string,
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorChange = useCallback((state: EditorState) => {
    setEditorState(state);
    setOffice((prevOffice) => {
      if (!prevOffice) return null;
      return {
        ...prevOffice,
        body: draftToHtml(convertToRaw(state.getCurrentContent())),
      };
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (office && ref_id) {
      await OfficeService.updateOffice(ref_id, office);
      alert("Update business success");
    }
  };

  if (!office) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg"
    >
      <Typography variant="h4" className="text-center mb-4">
        Update Business
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={office.name}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Image"
        name="image"
        type="file"
        onChange={handleFileChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      {office.image && (
        <img
          src={office.image}
          alt="Preview"
          className="w-full h-40 object-contain my-4"
        />
      )}
      <TextField
        label="Action"
        name="action"
        value={office.action}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Description"
        name="description"
        value={office.description}
        onChange={handleChange}
        fullWidth
        required
        multiline
        rows={4}
      />
      <TextField
        label="Priority"
        name="priority"
        type="number"
        value={office.priority}
        onChange={handleChange}
        fullWidth
        required
      />
      <div className="bg-gray-100 p-2 rounded-sm">
        <Typography variant="h6">Body</Typography>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={handleEditorChange}
        />
      </div>
      <Box className="flex justify-between mt-4">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/admin")}
        >
          Back to Admin
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </Box>
    </Box>
  );
};

UpdateBusiness.propTypes = {};

export default UpdateBusiness;