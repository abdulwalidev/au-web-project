// Include the AWS SDK (Ensure you have included the AWS SDK script in your HTML file)
AWS.config.update({
  region: 'us-east-2', // Your AWS region
  accessKeyId: 'AKIARHQBNKIKQQCWOOAE', // Use your AWS Access Key
  secretAccessKey: 'XRIfIuhz66qwzBOsXhqi7h6uVfruWklUUgAVGUHv' // Use your AWS Secret Key
});

// S3 Bucket configuration
var bucketName = 'au-web-project-photoupload';
var bucketRegion = 'us-east-2'; // Ensure this matches the region of your S3 bucket
var bucket = new AWS.S3({
  params: { Bucket: bucketName },
  region: bucketRegion
});

// Handle file upload
function handleFileUpload(event) {
  var files = event.target.files;
  if (files.length === 0) {
    alert('No files selected');
    return;
  }

  // Loop through each file and upload it
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var fileName = file.name;
    var fileType = file.type;

    var params = {
      Key: fileName, // Use the file name as the S3 key
      ContentType: fileType,
      Body: file,
      ACL: 'public-read' // Make the file public
    };

    // Upload the file to S3
    bucket.putObject(params, function(err, data) {
      if (err) {
        console.log('Error uploading file:', err);
        alert('Error uploading file: ' + err.message);
      } else {
        console.log('File uploaded successfully:', data);
        alert('File uploaded successfully');
      }
    });
  }
}

// Add event listener for file input
document.getElementById('file-upload').addEventListener('change', handleFileUpload);
