import { Link } from "react-router-dom";
import { IconBack } from "../icons";
import { useSiteTheme, FONTS_LINK } from "../theme";

const SUPPORT_EMAIL = "support@fitcrave.app";
const DELETION_DAYS = 7;
const BACKUP_RETENTION_DAYS = 30;

export default function AccountDeletion() {
  const { t, SF, SS, SM, acT } = useSiteTheme();

  const W = { maxWidth: 800, margin: "0 auto", padding: "0 32px" };
  const hd = { fontFamily: SF, fontStyle: "italic", fontSize: "1.3rem", marginTop: 40, marginBottom: 14, color: t.tx };
  const sub = { fontFamily: SS, fontWeight: 700, fontSize: ".95rem", marginTop: 24, marginBottom: 10, color: t.tx };
  const pg = { fontSize: ".88rem", lineHeight: 1.85, color: t.tx2, marginBottom: 12 };
  const li = { fontSize: ".88rem", lineHeight: 1.85, color: t.tx2, marginBottom: 10, paddingLeft: 4 };
  const link = { color: t.ac, fontWeight: 600, textDecoration: "none" };

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
              ACCOUNT
            </span>
            <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.1, letterSpacing: "-.04em", marginTop: 14 }}>
              <span style={{ fontFamily: SS, fontWeight: 800 }}>Delete your </span>
              <span style={{ fontFamily: SF, fontStyle: "italic", ...acT }}>FitCrave account</span>
            </h1>
            <p style={{ fontFamily: SM, fontSize: ".68rem", color: t.tx3, marginTop: 12 }}>
              FitCrave mobile app · FitCrave Pvt. Ltd.
            </p>
          </div>

          <p style={pg}>
            This page explains how to request deletion of your <strong style={{ color: t.tx }}>FitCrave</strong> account and
            associated personal data processed by the FitCrave mobile app. You do not need to sign in to read this page.
          </p>

          <h2 style={hd}>How to request deletion</h2>
          <ol style={{ margin: "0 0 20px 20px", padding: 0 }}>
            <li style={li}>
              Send an email to{" "}
              <a href={`mailto:${SUPPORT_EMAIL}?subject=FitCrave%20account%20deletion%20request`} style={link}>
                {SUPPORT_EMAIL}
              </a>
              .
            </li>
            <li style={li}>
              Use the subject line: <strong style={{ color: t.tx }}>FitCrave account deletion request</strong>.
            </li>
            <li style={li}>
              In your message, include the sign-in method you use (phone number, Google, or Apple) and any details that help us
              verify your account (for example, the phone number or email on the account).
            </li>
            <li style={li}>
              We will verify your request and complete account deletion within{" "}
              <strong style={{ color: t.tx }}>{DELETION_DAYS} business days</strong>.
            </li>
          </ol>

          <div style={{ background: t.bg2, border: `1px solid ${t.bd}`, borderRadius: 14, padding: "20px 22px", marginBottom: 24 }}>
            <p style={{ ...pg, marginBottom: 0, fontWeight: 600, color: t.tx }}>
              Subscriptions: If you have an active subscription through Google Play or another store, cancel it separately in
              that store’s settings. Deleting your FitCrave account does not automatically cancel billing.
            </p>
          </div>

          <h2 style={hd}>What we delete</h2>
          <p style={pg}>
            After your request is verified, we delete or anonymize your account and associated data, including where applicable:
          </p>
          <ul style={{ margin: "0 0 20px 20px", padding: 0 }}>
            <li style={li}>Your authentication record and account credentials (Firebase Authentication).</li>
            <li style={li}>Your profile and app data stored for your account (for example, Cloud Firestore documents under your user ID, such as daily stats, workout logs, and chat sessions).</li>
            <li style={li}>Community data tied to your account on our servers (for example, MongoDB profile, posts, and comments linked to your Firebase user ID).</li>
            <li style={li}>Media you uploaded for community features, where stored in our storage systems (for example, Firebase Cloud Storage).</li>
            <li style={li}>Meal, workout, and health data associated with your account on our backend services.</li>
          </ul>

          <h2 style={hd}>What we may retain</h2>
          <ul style={{ margin: "0 0 20px 20px", padding: 0 }}>
            <li style={li}>
              <strong style={{ color: t.tx }}>Backups and logs:</strong> Residual copies may remain in encrypted backups for up to{" "}
              <strong style={{ color: t.tx }}>{BACKUP_RETENTION_DAYS} days</strong> before automatic rotation.
            </li>
            <li style={li}>
              <strong style={{ color: t.tx }}>Legal and security:</strong> We may retain minimal information if required to comply with law,
              resolve disputes, enforce our terms, or prevent fraud or abuse.
            </li>
          </ul>

          <h2 style={sub}>Questions</h2>
          <p style={pg}>
            For general privacy practices, see our{" "}
            <Link to="/privacy" style={link}>Privacy Policy</Link>. For help with your request, email{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} style={link}>{SUPPORT_EMAIL}</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
