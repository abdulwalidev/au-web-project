// AWS S3 upload configuration
const bucketName = 'au-web-project-photoupload';
const region = 'us-east-2'; // Your S3 region
const accessKey = 'AKIARHQBNKIKY6EVWKWO'; // Your AWS Access Key
const secretKey = 'Sb5np4lMIBSAYvBSCZKTEqOaOUhMlUGQhiAMK/b'; // Your AWS Secret Key

AWS.config.update({
  region: region,
  credentials: new AWS.Credentials(accessKey, secretKey)
});

const s3 = new AWS.S3();

// Handle file upload to S3
document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();
  
  const file = document.getElementById("fileInput").files[0];
  const params = {
    Bucket: bucketName,
    Key: file.name, // You can customize the file name here
    Body: file,
    ACL: 'public-read' // Makes the file publicly accessible
  };

  s3.upload(params, function (err, data) {
    if (err) {
      console.error("Error uploading file: ", err);
      alert("Error uploading file.");
    } else {
      console.log("File uploaded successfully: ", data);
      alert("File uploaded successfully!");
    }
  });
});
