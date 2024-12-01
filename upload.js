// Configure AWS with access key and secret key (be careful with hardcoding in production)
AWS.config.update({
  region: "us-east-2", // AWS region (replace with your region)
  accessKeyId: "YOUR_AWS_ACCESS_KEY", // Replace with your AWS Access Key
  secretAccessKey: "YOUR_AWS_SECRET_KEY" // Replace with your AWS Secret Key
});

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: "au-web-project-photoupload" } // Replace with your actual S3 bucket name
});

document.getElementById("uploadForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Check if files are selected
  const files = document.getElementById("fileInput").files;
  if (files.length > 0) {
    alert("Files selected. Proceeding with upload...");
    uploadFiles(files);
  } else {
    alert("No file selected. Please select a file to upload.");
  }
});

function uploadFiles(files) {
  alert("Starting the upload process...");
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    alert(`Uploading file: ${file.name}`);

    const params = {
      Bucket: "au-web-project-photoupload", // Replace with your actual S3 bucket name
      Key: file.name,
      Body: file,
      ContentType: file.type,
      ACL: "public-read" // Makes the file publicly accessible
    };

    s3.upload(params, function(err, data) {
      if (err) {
        console.log("Error uploading file:", err);
        alert("Error uploading file. Please check the console for more details.");
      } else {
        console.log("File uploaded successfully:", data);
        alert("File uploaded successfully!");
      }
    });
  }
}
