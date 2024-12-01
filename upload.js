// Initialize the Amazon Cognito credentials provider
AWS.config.update({
  region: "us-east-2", // your AWS region
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "YOUR_IDENTITY_POOL_ID" // replace with your identity pool ID
  })
});

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: "au-web-project-photoupload" } // replace with your S3 bucket name
});

document.getElementById("uploadForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const files = document.getElementById("fileInput").files;
  if (files.length > 0) {
    uploadFiles(files);
  } else {
    alert("Please select a file to upload.");
  }
});

function uploadFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const params = {
      Bucket: "au-web-project-photoupload", // replace with your S3 bucket name
      Key: file.name,
      Body: file,
      ContentType: file.type,
      ACL: "public-read" // makes the file publicly accessible
    };

    s3.upload(params, function(err, data) {
      if (err) {
        console.log("Error uploading file:", err);
        alert("Error uploading file.");
      } else {
        console.log("File uploaded successfully:", data);
        alert("File uploaded successfully!");
      }
    });
  }
}
