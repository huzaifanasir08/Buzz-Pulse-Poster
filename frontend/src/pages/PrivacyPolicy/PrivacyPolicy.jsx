import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h1 className="privacy-title">
        Privacy Policy for Buzz Pulse Poster
      </h1>
      <p className="effective-date">Effective Date: 01/02/2025</p>

      <p>
        Thank you for choosing to be part of our community
        (“Company”, “we”, “us”, or “our”). We are committed to protecting your
        personal information and your right to privacy. This Privacy Policy
        explains how we collect, use, disclose, and safeguard your information
        when you use our Buzz Pulse Poster service (“Service”).
      </p>

      <p>
        Please read this privacy policy carefully as it will help you
        understand what we do with the information that we collect.
      </p>

      <SectionPP title="1. Information We Collect">
        <SubsectionPP title="a. Personal Information You Disclose to Us" list={[
          "Full Name",
          "Email Address",
          "Contact Information",
          "Billing Information (if applicable)",
          "Login Credentials for Social Media Accounts (OAuth tokens, not raw passwords)",
          "Company or Brand Name (if provided)"
        ]} />

        <SubsectionPP title="b. Information Automatically Collected" list={[
          "IP address",
          "Device Information",
          "Browser Type",
          "Operating System",
          "Access Times",
          "Referring URLs",
          "Usage Logs and Analytics Data"
        ]} />

        <SubsectionPP title="c. Social Media Data" list={[
          "Public Profile Information",
          "Account Handles or IDs",
          "Page or Profile Content (for scheduling and posting)",
          "Media (e.g., images, videos)",
          "Engagement Metrics (likes, comments, shares)"
        ]}>
          <p>We do not collect or store your social media passwords.</p>
        </SubsectionPP>
      </SectionPP>

      <SectionPP title="2. How We Use Your Information" list={[
        "Provide, maintain, and improve the Service",
        "Schedule and publish content on your behalf",
        "Respond to user inquiries and support requests",
        "Send administrative information (e.g., confirmations, support messages)",
        "Send promotional communications (only with your consent)",
        "Ensure legal compliance and protect against misuse"
      ]} />

      <SectionPP title="3. Sharing Your Information">
        <p>We do not sell your personal information.</p>
        <p>We may share your data with:</p>
        <ul className="ic">
          <li>Third-party service providers</li>
          <li>Social Media Platforms</li>
          <li>Legal Authorities</li>
          <li>Business Transfers</li>
        </ul>
        <p>All data shared is limited to the scope necessary for the service.</p>
      </SectionPP>

      <SectionPP title="4. Data Retention" list={[
        "User account data: retained until you delete your account or request deletion",
        "OAuth tokens: stored securely and revoked upon disconnectionPP",
        "Logs and analytics: retained up to 12 months for performance and security"
      ]} />

      <SectionPP title="5. Data Security" list={[
        "SSL encryption",
        "Token-based authentication (OAuth)",
        "Firewalls and secure access controls",
        "Periodic security audits"
      ]}>
        <p>While we strive to protect your information, no system can guarantee absolute security.</p>
      </SectionPP>

      <SectionPP title="6. Your Privacy Rights" list={[
        "Access to personal data",
        "CorrectionPP of inaccurate data",
        "Deletion of your data (“Right to be forgotten”)",
        "Data portability",
        "Object to or restrict processing"
      ]}>
        <p>To exercise your rights, contact us at: <strong>[Insert Contact Email]</strong></p>
      </SectionPP>

      <SectionPP title="7. Third-Party Services">
        <p>
          Our Service may contain links to or integrate with third-party services
          (e.g., Facebook, Twitter, Instagram). These platforms have their own
          privacy policies, which we do not control.
        </p>
        <p>We use only authorized APIs to interact with such platforms in compliance with their policies.</p>
      </SectionPP>

      <SectionPP title="8. Children’s Privacy">
        <p>
          Our service is not intended for users under the age of 13 (or 16 in the EU).
          We do not knowingly collect data from minors.
        </p>
      </SectionPP>

      <SectionPP title="9. Changes to This Privacy Policy">
        <p>
          We may update this policy periodically. We will notify users via email or
          through our platform. Continued use of the Service after updates indicates
          acceptance.
        </p>
      </SectionPP>

      <SectionPP title="10. Contact Us">
        <p>Attar Projects<br />
          Email: <a href="mailto:attarprojects7@gmail.com">attarprojects7@gmail.com</a><br />
          Address: Sialkot</p>
      </SectionPP>
    </div>
  );
};

const SectionPP = ({ title, list, children }) => (
  <div className="sectionPP">
    <h2 className="sectionPP-title">{title}</h2>
    {list && (
      <ul className="ic">
        {list.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    )}
    {children}
  </div>
);

const SubsectionPP = ({ title, list, children }) => (
  <div className="subsectionPP">
    <h3 className="subsectionPP-title">{title}</h3>
    {list && (
      <ul className="ic">
        {list.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    )}
    {children}
  </div>
);

export default PrivacyPolicy;
