module.exports.welcomeTemplateFun = (userName, otp) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lyrics Web - Verify Your Account</title>
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
        
        .verification-box h1 {
            color: #333;
            margin-bottom: 20px;
        }
        
        .verification-box p {
            color: #666;
            margin-bottom: 20px;
        }
        
        .verification-box #username {
            color: #333;
            font-weight: bold;
        }
        
        .otp-box {
            display: inline-block;
            padding: 10px 20px;
            background-color: #28a745;
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
            <div class="verification-box">
                <h1>Verify Your Account</h1>
                <p>Hello, <span id="username">${userName}</span>!</p>
                <p>Thank you for signing up for Lyrics Web. Use the OTP below to verify your email address.</p>
                <div class="otp-box">${otp}</div>
            </div>
        </div>
    </body>
    </html>`;
}
