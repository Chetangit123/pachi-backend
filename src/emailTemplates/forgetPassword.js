module.exports.forgetPasswordTemplateFun = (userName, otp) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lyrics Web - Reset Your Password</title>
        <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        
        .container {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            max-width: 400px;
            text-align: center;
        }
        
        .reset-box h1 {
            color: #333;
            margin-bottom: 20px;
        }
        
        .reset-box p {
            color: #666;
            margin-bottom: 20px;
        }
        
        .reset-box #username {
            color: #333;
            font-weight: bold;
        }
        
        .otp-box {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 24px;
            font-weight: bold;
        }
        
        </style>
    </head>
    <body>
        <div class="container">
            <div class="reset-box">
                <h1>Reset Your Password</h1>
                <p>Hello, <span id="username">${userName}</span></p>
                <p>We received a request to reset your password for your Lyrics Web account. Use the OTP below to reset your password:</p>
                <div class="otp-box">${otp}</div>
                <p>If you did not request a password reset, please ignore this email.</p>
            </div>
        </div>
    </body>
    </html>`;
}
