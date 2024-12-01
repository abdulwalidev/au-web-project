document.addEventListener('DOMContentLoaded', function () {
    // AWS S3 Config
    AWS.config.update({
        region: 'us-east-2', // Your AWS region
        accessKeyId: 'AKIARHQBNKIKQQCWOOAE', // Your AWS Access Key
        secretAccessKey: 'XRIfIuhz66qwzBOsXhqi7h6uVfruWklUUgAVGUHv' // Your AWS Secret Key
    });

    // Create an S3 service object
    const s3 = new AWS.S3();

    // Select the file input and upload button
    const fileInput = document.getElementById('file-upload');
    const uploadBtn = document.getElementById('upload-btn');
    const messageDiv = document.getElementById('message');

    // Button click event
    uploadBtn.addEventListener('click', function () {
        const files = fileInput.files;

        // Check if files are selected
        if (files.length === 0) {
            messageDiv.textContent = 'No files selected!';
            return;
        }

        // Loop through each file and upload
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // S3 upload parameters
            const params = {
                Bucket: 'au-web-project-photoupload', // Your S3 Bucket Name
                Key: 'uploads/' + file.name, // File path (uploads folder in S3)
                Body: file,
                ContentType: file.type,
                ACL: 'public-read' // Make the file publicly accessible
            };

            // Upload to S3
            s3.upload(params, function (err, data) {
                if (err) {
                    messageDiv.textContent = 'Error uploading file: ' + err.message;
                    console.error('Error uploading file:', err);
                } else {
                    messageDiv.textContent = 'File uploaded successfully: ' + data.Location;
                    console.log('File uploaded successfully:', data);
                }
            });
        }
    });
});
