async function uploadFile(file) {
    const response = await fetch("https://YOUR_BACKEND_API_URL"); // Replace with presigned URL generator API
    const { uploadURL } = await response.json();
  
    const result = await fetch(uploadURL, {
      method: "PUT",
      body: file
    });
  
    if (result.ok) {
      alert("File uploaded successfully!");
    } else {
      alert("Error uploading file.");
    }
  }
  
