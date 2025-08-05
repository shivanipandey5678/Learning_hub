const Registration_Template = `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px;">
      <h2 style="color: #4f46e5;">Welcome to Learning_hub 🚀</h2>
      <p>Hi {{name}},</p>
      <p>Thank you for registering on our platform. We're excited to have you on board!</p>
      <p>Your email <strong>{{email}}</strong> has been successfully registered.</p>
      <p>If you have any questions, feel free to reach out to our support team anytime.</p>
      <br />
      <p style="color: #6b7280;">Cheers, <br/>Team Learning_hub 💙</p>
    </div>
  </body>
</html>
`;


const passwordResetEmail = `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background-color: #fff; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #f9f9f9; padding: 30px; border-radius: 8px;">
      <h2 style="color: #ef4444;">Password Reset Verification</h2>
      <p>Hi {{name}},</p>
      <p>We received a request to reset your password. Use the OTP below to proceed:</p>
      
      <div style="font-size: 24px; font-weight: bold; color: #4f46e5; background-color: #e0e7ff; padding: 10px 20px; display: inline-block; border-radius: 6px;">
        {{otp}}
      </div>
      
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you didn’t request this, you can safely ignore this email.</p>
      <br />
      <p style="color: #6b7280;">Stay secure, <br/>Team Learning_hub 🔒</p>
    </div>
  </body>
</html>
`;



const accountVerifyEmail = `
  <!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f0fdf4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 8px;">
      <h2 style="color: #22c55e;">Account Verified Successfully</h2>
      <p>Hi {{name}},</p>
      <p>Your account has been verified and you're now ready to explore everything on Learning_hub!</p>
      <p>Enjoy the features and happy learning 😊</p>
      <br />
      <p style="color: #6b7280;">Regards, <br/>Team Learning_hub 🎓</p>
    </div>
  </body>
</html>

`;

const Email_Verification_Template = `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f0f9ff; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px;">
      <h2 style="color: #4f46e5;">Verify Your Email ✉️</h2>
      <p>Hi {{name}},</p>
      <p>Thanks for signing up on Learning_hub!</p>
      <p>Please verify your email using the OTP below:</p>
      <h1 style="letter-spacing: 6px; text-align: center; color: #1e293b;">{{otp}}</h1>
      <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
      <br />
      <p style="color: #6b7280;">Best, <br/>Team Learning_hub 💙</p>
    </div>
  </body>
</html>
`;


const Password_Changed_Template = `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background-color: #fef2f2; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 8px;">
      <h2 style="color: #ef4444;">Password Changed Successfully</h2>
      <p>Hi {{name}},</p>
      <p>This is to confirm that your password was recently changed on Learning_hub.</p>
      <p>If this wasn't you, please contact our support team immediately.</p>
      <br />
      <p style="color: #6b7280;">Stay safe, <br/>Team Learning_hub 🔐</p>
    </div>
  </body>
</html>
`;


export {Registration_Template,passwordResetEmail,accountVerifyEmail,Password_Changed_Template,Email_Verification_Template}