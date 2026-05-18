import { Link } from "react-router-dom";
import { IconBack } from "../icons";
import { useSiteTheme, FONTS_LINK } from "../theme";

export default function PrivacyPolicy() {
  const { t, SF, SS, SM, acT } = useSiteTheme();

  const W = { maxWidth: 800, margin: "0 auto", padding: "0 32px" };
  const hd = { fontFamily: SF, fontStyle: "italic", fontSize: "1.3rem", marginTop: 40, marginBottom: 14, color: t.tx };
  const sub = { fontFamily: SS, fontWeight: 700, fontSize: ".95rem", marginTop: 24, marginBottom: 10, color: t.tx };
  const pg = { fontSize: ".88rem", lineHeight: 1.85, color: t.tx2, marginBottom: 12 };

  return (
    <div style={{ fontFamily: SS, background: t.bg, color: t.tx, minHeight: "100vh" }}>
      <link href={FONTS_LINK} rel="stylesheet" />
      <div style={{ minHeight: "100vh", paddingTop: 100, paddingBottom: 80 }}>
        <div style={W}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: `1px solid ${t.bd}`,
              borderRadius: 10,
              padding: "8px 18px",
              cursor: "pointer",
              color: t.tx2,
              fontSize: ".8rem",
              fontWeight: 600,
              fontFamily: SM,
              marginBottom: 32,
              textDecoration: "none",
            }}
          >
            <IconBack /> Back to Home
          </Link>

          <div style={{ marginBottom: 48 }}>
            <span style={{ fontFamily: SM, fontSize: ".62rem", fontWeight: 700, color: t.ac, letterSpacing: ".14em", textTransform: "uppercase" }}>
              LEGAL
            </span>
            <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.1, letterSpacing: "-.04em", marginTop: 14 }}>
              <span style={{ fontFamily: SS, fontWeight: 800 }}>Privacy </span>
              <span style={{ fontFamily: SF, fontStyle: "italic", ...acT }}>Policy</span>
            </h1>
            <p style={{ fontFamily: SM, fontSize: ".68rem", color: t.tx3, marginTop: 12 }}>
              Last updated: March 2026 · FitCrave Pvt. Ltd.
            </p>
          </div>

          <p style={pg}>
            FitCrave Pvt. Ltd. ("FitCrave", "we", "us", "our") is committed to protecting your personal information and your right to privacy. This Privacy Policy describes what information we collect, how we use it, and what rights you have in relation to it. By using FitCrave's services, you agree to the collection and use of information in accordance with this policy.
          </p>

          <h2 style={hd}>1. Information We Collect</h2>
          <h3 style={sub}>1.1 Information You Provide</h3>
          <p style={pg}>
            When you register for early access, create an account, or use our services, we may collect the following personal information: your email address for account creation, communication, and early access registration; your name for personalization of the FitCrave experience; fitness goals and preferences including but not limited to fat loss, muscle gain, health maintenance, and discipline objectives; and in future releases, health-related inputs such as dietary preferences, meal logs, workout activity, body measurements, and health scores.
          </p>
          <h3 style={sub}>1.2 Automatically Collected Information</h3>
          <p style={pg}>
            When you interact with our platform, we automatically collect certain information including usage analytics such as pages visited, features used, session duration, and interaction patterns; device information including device type, operating system, browser type, and screen resolution; and approximate location data derived from IP address for service optimization.
          </p>

          <h2 style={hd}>2. How We Use Your Information</h2>
          <p style={pg}>
            We use the information we collect for the following purposes: to provide AI-powered personalization of nutrition plans, workout programming, health scores, and meal recommendations tailored to your goals; for product improvement by analyzing aggregated usage patterns to improve features, fix issues, and develop new capabilities; for communication purposes including sending early access updates, product announcements, health tips, and service-related notifications; and to maintain platform integrity by preventing misuse, enforcing our Terms of Service, and ensuring community safety.
          </p>

          <h2 style={hd}>3. Data Storage and Security</h2>
          <p style={pg}>
            Your data is stored on secure servers with industry-standard protection measures. We implement encryption in transit (TLS/SSL) and at rest for sensitive data. Access to personal data is restricted to authorized personnel only, and we conduct regular security reviews and updates to our infrastructure. While no method of electronic storage is 100% secure, we strive to use commercially acceptable means to protect your personal information.
          </p>

          <h2 style={hd}>4. Third-Party Services</h2>
          <p style={pg}>
            We may employ third-party companies and services to facilitate our platform, including analytics tools such as Google Analytics, Mixpanel, or similar services to understand usage patterns and improve the product; cloud infrastructure providers for secure data storage and processing; and in future releases, payment processors for subscription billing and meal delivery transactions. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>

          <h2 style={hd}>5. Your Rights</h2>
          <p style={pg}>
            You have the following rights regarding your personal data: the right to request deletion of your personal data by contacting us at charan@fitcrave.co; the right to unsubscribe from marketing communications at any time via email unsubscribe links; the right to request access to and a copy of the personal data we hold about you; and the right to request correction of any inaccurate personal data.
          </p>

          <h2 style={hd}>6. Cookies</h2>
          <p style={pg}>
            FitCrave uses cookies and similar tracking technologies to maintain your session, remember your preferences, and analyze platform usage. You can control cookie preferences through your browser settings. Essential cookies required for basic platform functionality cannot be disabled while using our service.
          </p>

          <h2 style={hd}>7. Disclaimer</h2>
          <div style={{ background: t.bg2, border: `1px solid ${t.bd}`, borderRadius: 14, padding: "24px 22px", margin: "16px 0 24px" }}>
            <p style={{ ...pg, fontWeight: 600, color: t.warn, marginBottom: 8 }}>Important Health Disclaimer</p>
            <p style={pg}>
              FitCrave is a health and fitness technology platform and does not constitute medical advice. The AI-generated nutrition plans, health scores, workout recommendations, and meal suggestions provided by FitCrave are for informational and educational purposes only. Individual results may vary. Always consult a qualified healthcare professional before making significant changes to your diet, exercise routine, or health regimen, especially if you have pre-existing medical conditions.
            </p>
          </div>

          <h2 style={hd}>8. Changes to This Policy</h2>
          <p style={pg}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically.
          </p>

          <h2 style={hd}>9. Contact Us</h2>
          <p style={pg}>
            If you have any questions about this Privacy Policy, please contact us at charan@fitcrave.co or write to FitCrave Pvt. Ltd., IIT Kharagpur, West Bengal, India.
          </p>
        </div>
      </div>
    </div>
  );
}
