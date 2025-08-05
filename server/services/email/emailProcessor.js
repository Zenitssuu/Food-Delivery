import { transporter } from "./mailer.js";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    // console.log(to, subject, html);
    await transporter.sendMail({
      from: '"Easy Eats" <no-reply@yourapp.com>',
      to,
      subject,
      html,
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error);
    throw error; // allows BullMQ to retry or record failure
  }
};
