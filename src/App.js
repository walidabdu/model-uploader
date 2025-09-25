import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

function App() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = () => {
    if (!file || !name) {
      setMessage("Please select a file and enter a name.");
      return;
    }
    console.log("File:", file);
    console.log("Name:", name);
    console.log("Description:", description);
    setMessage(`Ready to upload: ${file.name}`);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          3D Model Uploader
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadFileIcon />}
            fullWidth
          >
            Choose File (.fbx/.glb)
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {file && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected: {file.name}
            </Typography>
          )}
        </Box>

        <Box sx={{ mt: 3 }}>
          <TextField
            label="Model Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleUpload}
          >
            Upload Model
          </Button>
        </Box>

        {message && (
          <Alert severity="info" sx={{ mt: 3 }}>
            {message}
          </Alert>
        )}
      </Paper>
    </Container>
  );
}

export default App;
