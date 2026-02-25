import nodemailer from 'nodemailer';

export const sendContactEmails = async (details) => {
  const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, 
  port: Number(process.env.SMTP_PORT), // Force it to be a number
  secure: process.env.SMTP_PORT == 465, // True for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

  // --- 1. Admin Notification (Your Team) ---
  const adminMailOptions = {
    from: `"Renny Strips Website" <${process.env.SMTP_USER}>`,
    to: "raju.patil@webisdom.com", // Your office email
    subject: `New Lead: ${details.enquiryType} - ${details.fullName}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
        <h2>New Website Enquiry</h2>
        <p><strong>Name:</strong> ${details.fullName}</p>
        <p><strong>Email:</strong> ${details.email}</p>
        <p><strong>Phone:</strong> ${details.phoneNumber}</p>
        <p><strong>Type:</strong> ${details.enquiryType}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f4f4f4; p: 15px; border-radius: 5px;">${details.message}</div>
      </div>
    `,
  };

  // --- 2. User Auto-Reply (The Customer) ---
  const userMailOptions = {
    from: `"Renny Strips Ltd" <${process.env.SMTP_USER}>`,
    to: details.email, // The user's email from the form
    subject: `Thank you for contacting Renny Strips`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
        <h2 style="color: #292c44;">Hello ${details.fullName},</h2>
        <p>Thank you for reaching out to <strong>Renny Strips Limited</strong>. We have received your enquiry regarding <strong>${details.enquiryType}</strong>.</p>
        <p>Our team is currently reviewing your message and will get back to you within 24-48 business hours.</p>
        <br />
        <p>Best Regards,</p>
        <p><strong>Customer Support Team</strong><br />Renny Strips Ltd.</p>
        <hr style="border: 0; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #888;">This is an automated reply. Please do not reply directly to this email.</p>
      </div>
    `,
  };

  // Execute both (Promise.all ensures they are both attempted)
  return await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(userMailOptions)
  ]);
};

export const sendCareerApplicationEmails = async (details) => {
  // details: { firstName, lastName, email, jobTitle, jobDepartment }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT == 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const fullName = `${details.firstName} ${details.lastName}`;

  // --- 1. Admin Notification ---
  const adminMailOptions = {
    from: `"Renny Strips Website" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Job Application: ${details.jobTitle} - ${fullName}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #292c44;">New Career Application Received</h2>
        <p><strong>Applicant Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${details.email}</p>
        <p><strong>Phone:</strong> ${details.phoneNumber}</p>
        <p><strong>Applied For:</strong> ${details.jobTitle}</p>
        <p><strong>Department:</strong> ${details.jobDepartment}</p>
        <hr style="border: 0; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #888;">Login to the admin panel to review the full application and resume.</p>
      </div>
    `,
  };

  // --- 2. Candidate Confirmation Email ---
  const userMailOptions = {
    from: `"Renny Strips Ltd" <${process.env.SMTP_USER}>`,
    to: details.email,
    subject: `Application Received – ${details.jobTitle} | Renny Strips Ltd`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto;">
        <div style="background: #292c44; padding: 24px 32px; border-radius: 8px 8px 0 0;">
          <h2 style="color: #ffffff; margin: 0;">Application Received!</h2>
        </div>
        <div style="background: #f9f9f9; padding: 28px 32px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
          <p style="font-size: 16px;">Dear <strong>${fullName}</strong>,</p>
          <p>Thank you for applying for the position of <strong>${details.jobTitle}</strong> (${details.jobDepartment}) at <strong>Renny Strips Limited</strong>.</p>
          <p>We have successfully received your application and our HR team will carefully review it. If your qualifications match our requirements, we will reach out to you regarding the next steps.</p>
          <div style="background: #fff; border-left: 4px solid #292c44; padding: 12px 16px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; font-size: 14px; color: #555;"><strong>What happens next?</strong></p>
            <ul style="margin: 8px 0 0; padding-left: 18px; font-size: 14px; color: #555;">
              <li>Our team reviews your application within 5–7 business days.</li>
              <li>Shortlisted candidates will be contacted for an initial interview.</li>
              <li>You will be notified of your application status via email.</li>
            </ul>
          </div>
          <p>We appreciate your interest in joining Renny Strips Limited and wish you the very best!</p>
          <br />
          <p>Warm Regards,</p>
          <p><strong>HR Team</strong><br />Renny Strips Ltd.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin-top: 24px;" />
          <p style="font-size: 11px; color: #aaa;">This is an automated confirmation. Please do not reply to this email.</p>
        </div>
      </div>
    `,
  };

  return await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(userMailOptions),
  ]);
};