const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: '89b865002@smtp-brevo.com',
    pass: 'FvIpnGVsZOUa6KtY'
  }
});

const sendOrderEmail = async (orderData) => {
  try {
    const mailOptions = {
      from: 'no-reply@ninashop.online',
      to: 'hachem03000@gmail.com',
      subject: `New Order from ${orderData.fullName}`,
      text: `New Order Details:
        
Name: ${orderData.fullName}
Phone: ${orderData.phone}
State: ${orderData.state}
Quantity: ${orderData.quantity}

Order Date: ${new Date().toLocaleString()}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff6b6b;">New Order Received 🛍️</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <p><strong>👤 Name:</strong> ${orderData.fullName}</p>
            <p><strong>📞 Phone:</strong> ${orderData.phone}</p>
            <p><strong>📍 State:</strong> ${orderData.state}</p>
            <p><strong>📦 Quantity:</strong> ${orderData.quantity}</p>
          </div>
          <p style="margin-top: 20px; color: #666; font-size: 0.9em;">
            Order received on ${new Date().toLocaleString()}
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email' };
  }
};

module.exports = { sendOrderEmail };
