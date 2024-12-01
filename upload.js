// AWS S3 Bucket Configuration
const bucketName = 'au-web-project-photoupload'; // Your S3 Bucket name
const region = 'us-east-2'; // Your region (us-east-2 for Ohio)
const accessKeyId = 'AKIARHQBNKIKY6EVWKWO'; // Your Access Key ID
const secretAccessKey = 'SBa5np4lMIBSAYvBSCZKTEqOaOUhMlUGQhiAMK/b'; // Your Secret Access Key

// Initialize AWS SDK
AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region
});

const s3 = new AWS.S3();

function uploadFiles() {
  const files = document.getElementById('fileInput').files;
  if (files.length === 0) {
    alert('Please select files to upload');
    return;
  }

  // Loop through selected files
  Array.from(files).forEach(file => {
    const params = {
      Bucket: bucketName,
      Key: `uploads/${file.name}`, // Uploading to 'uploads' folder
      Body: file,
      ACL: 'public-read', // Make the file publicly accessible
      ContentType: file.type
    };

    // Check file size (optional, to make sure it's under 50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert('File is too large. Please upload files smaller than 50MB.');
      return;
    }

    // Upload the file to S3
    s3.upload(params, function(err, data) {
      if (err) {
        console.error('Error uploading file:', err);
        alert('Error uploading file. Please try again.');
      } else {
        console.log('File uploaded successfully:', data);
        alert(`File uploaded successfully! View it at: ${data.Location}`);
      }
    });
  });
}
