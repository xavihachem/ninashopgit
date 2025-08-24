const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = Number(process.env.PORT) || 5000;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Helper to mask sensitive values in logs
const mask = (val) => (val ? val.replace(/.(?=.{4})/g, '*') : '');

const smtpPort = Number(process.env.BREVO_SMTP_PORT) || 587;
const smtpSecure = smtpPort === 465;

// Log effective SMTP config (masked)
console.log('[SMTP] Using config:', {
  host: process.env.BREVO_SMTP_HOST,
  port: smtpPort,
  secure: smtpSecure,
  user: mask(process.env.BREVO_SMTP_USER),
  from: process.env.FROM_EMAIL,
  to: process.env.TO_EMAIL,
});

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: smtpPort,
  secure: smtpSecure, // true for 465, false for 587 (STARTTLS)
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASSWORD,
  },
  // Helpful timeouts and debugging
  connectionTimeout: 20_000,
  greetingTimeout: 20_000,
  socketTimeout: 30_000,
  logger: true,
  debug: true,
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// SMTP verify route (debug)
app.get('/api/smtp-verify', async (req, res) => {
  try {
    const verified = await transporter.verify();
    return res.json({
      ok: true,
      verified,
      config: {
        host: process.env.BREVO_SMTP_HOST,
        port: Number(process.env.BREVO_SMTP_PORT) || 587,
        user: mask(process.env.BREVO_SMTP_USER),
        from: process.env.FROM_EMAIL,
        to: process.env.TO_EMAIL,
      }
    });
  } catch (err) {
    console.error('[SMTP] verify failed', err);
    return res.status(500).json({
      ok: false,
      error: {
        name: err.name,
        message: err.message,
        code: err.code,
        command: err.command,
        response: err.response,
        responseCode: err.responseCode,
      },
      config: {
        host: process.env.BREVO_SMTP_HOST,
        port: Number(process.env.BREVO_SMTP_PORT) || 587,
        user: mask(process.env.BREVO_SMTP_USER),
        from: process.env.FROM_EMAIL,
        to: process.env.TO_EMAIL,
      }
    });
  }
});

// Send email endpoint
app.post('/api/send-order', async (req, res) => {
  try {
    const { fullName, phone, state, quantity } = req.body;

    const mailOptions = {
      from: `"Ninashop" <${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL,
      subject: `New Order from ${fullName}`,
      text: `New Order Details:
        
Name: ${fullName}
Phone: ${phone}
State: ${state}
Quantity: ${quantity}

Order Date: ${new Date().toLocaleString()}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff6b6b;">New Order Received 🛍️</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <p><strong>👤 Name:</strong> ${fullName}</p>
            <p><strong>📞 Phone:</strong> ${phone}</p>
            <p><strong>📍 State:</strong> ${state}</p>
            <p><strong>📦 Quantity:</strong> ${quantity}</p>
          </div>
          <p style="margin-top: 20px; color: #666; font-size: 0.9em;">
            Order received on ${new Date().toLocaleString()}
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Order submitted successfully!' });
  } catch (error) {
    console.error('[SMTP] Error sending email:', {
      name: error.name,
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
      address: error.address,
      port: error.port,
    });
    res.status(500).json({ success: false, message: 'Failed to submit order. Please try again.' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
