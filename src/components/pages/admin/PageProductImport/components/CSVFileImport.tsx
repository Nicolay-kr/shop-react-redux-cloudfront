import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";

type CSVFileImportProps = {
  url: string;
  title: string;
  showMessage: (message: string, severity: string) => void;
};

export default function CSVFileImport({
  url,
  title,
  showMessage,
}: CSVFileImportProps) {
  const [file, setFile] = React.useState<File | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const uploadFile = async () => {
    // Get the presigned URL
    if (file) {
      try {
        const response = await axios({
          method: "GET",
          url,
          params: {
            name: encodeURIComponent(file.name),
          },
          headers: {
            Authorization: localStorage.getItem("authorization_token") || {},
          },
        });
        const result = await fetch(response.data, {
          method: "PUT",
          body: file,
        });
        console.log("Result: ", result);
        // if (result.status === 200) {
        //   showMessage("The file was successfully uploaded", "success");
        // }
      } catch (e) {
        console.log("Error: ", e);
        // if (e.response.status === 401) {
        //   showMessage("user is not Aythorized", "error");
        // } else if (e.response.status === 403) {
        //   showMessage("user data is incorrect", "error");
        // } else {
        //   showMessage("The file was not uploaded", "error");
        // }
      }
    }
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
