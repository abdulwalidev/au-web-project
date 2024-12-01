<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SpDumP - Upload</title>
    <style>
        /* General styling */
        * {
            font-family: 'Courier New', Courier, monospace;
            color: black;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background-color: #87CEEB;
            overflow-x: hidden;
        }

        /* Container for centering content */
        .center-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
        }

        /* Header styling */
        .header {
            background-color: black;
            padding: 20px;
            text-align: center;
            width: 100%;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }

        .Homepagelogo {
            color: #FF7F24;
            text-decoration: none;
            font-size: 2rem;
            letter-spacing: 1px;
        }

        /* Button styling */
        .upload-button {
            background-color: black;
            color: white;
            border: none;
            padding: 15px 30px;
            font-weight: bold;
            cursor: pointer;
            border-radius: 30px;
            font-size: 1rem;
            text-decoration: none;
            margin-top: 20px;
            text-align: center;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
        }

        .upload-button:hover {
            background-color: #333;
            transform: translateY(-5px);
        }

        /* File input styling */
        .file-input {
            margin: 20px 0;
        }

        .status {
            margin-top: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="center-container">
        <div class="header">
            <h1><a class="Homepagelogo" href="index.html">SpDumP</a></h1>
        </div>

        <h2 class="headline">Upload Your Images</h2>
        <p class="description">Easily upload your images to our secure cloud storage.</p>

        <input type="file" class="file-input" id="fileInput" multiple>
        <button class="upload-button" id="uploadButton">Upload</button>

        <div class="status" id="statusMessage"></div>
    </div>

    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.1317.0.min.js"></script>
    <script>
        // AWS S3 Configuration
        AWS.config.update({
            accessKeyId: 'AKIARHQBNKIKQQCWOOAE',
            secretAccessKey: 'XRIfIuhz66qwzBOsXhqi7h6uVfruWklUUgAVGUHv',
            region: 'us-east-2'
        });

        const s3 = new AWS.S3();
        const bucketName = 'your-s3-bucket-name'; // Replace with your bucket name

        // Select elements
        const fileInput = document.getElementById('fileInput');
        const uploadButton = document.getElementById('uploadButton');
        const statusMessage = document.getElementById('statusMessage');

        // Upload function
        uploadButton.addEventListener('click', () => {
            const files = fileInput.files;

            if (!files.length) {
                statusMessage.textContent = 'Please select a file to upload.';
                return;
            }

            Array.from(files).forEach(file => {
                const params = {
                    Bucket: bucketName,
                    Key: file.name,
                    Body: file,
                    ContentType: file.type
                };

                s3.upload(params, (err, data) => {
                    if (err) {
                        statusMessage.textContent = `Error uploading ${file.name}: ${err.message}`;
                    } else {
                        statusMessage.textContent = `File ${file.name} uploaded successfully.`;
                    }
                });
            });
        });
    </script>
</body>
</html>
