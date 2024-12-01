// Include the AWS SDK
AWS.config.update({
    accessKeyId: "AKIARZDBH42I2OTFPC72",
    secretAccessKey: "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",
    region: "us-east-2"
});

// Initialize S3 service
const s3 = new AWS.S3();

// Select file input and submit button
const fileInput = document.getElementById("file-input");
const uploadButton = document.getElementById("upload-button");

// Upload function
uploadButton.addEventListener("click", () => {
    const file = fileInput.files[0];
    if (!file) {
        alert("Please select a file to upload.");
        return;
    }

    const params = {
        Bucket: "gallory",
        Key: file.name,
        Body: file,
        ContentType: file.type
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.error("Error uploading file:", err);
            alert("Failed to upload file. Check console for details.");
        } else {
            console.log("File uploaded successfully:", data);
            alert("File uploaded successfully!");
        }
    });
});
