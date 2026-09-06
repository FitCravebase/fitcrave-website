import { Link } from "react-router-dom";
import { IconBack } from "../icons";
import { useSiteTheme, FONTS_LINK } from "../theme";

const SUPPORT = "support@fitcrave.co";

export default function TermsOfService() {
  const { t, SF, SS, SM, acT } = useSiteTheme();

  const W = { maxWidth: 800, margin: "0 auto", padding: "0 32px" };
  const hd = { fontFamily: SF, fontStyle: "italic", fontSize: "1.3rem", marginTop: 40, marginBottom: 14, color: t.tx };
  const pg = { fontSize: ".88rem", lineHeight: 1.85, color: t.tx2, marginBottom: 12 };
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
              LEGAL
            </span>
            <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.1, letterSpacing: "-.04em", marginTop: 14 }}>
              <span style={{ fontFamily: SS, fontWeight: 800 }}>Terms of </span>
              <span style={{ fontFamily: SF, fontStyle: "italic", ...acT }}>Use</span>
            </h1>
            <p style={{ fontFamily: SM, fontSize: ".68rem", color: t.tx3, marginTop: 12 }}>
              Last updated: August 2026 · FitCrave Pvt. Ltd.
            </p>
          </div>

          <p style={pg}>
            These Terms of Use ("Terms") govern your use of the FitCrave mobile application, website, and related services
            (the "Service") operated by FitCrave Pvt. Ltd. ("FitCrave", "we", "us"). By creating an account or using the Service,
            you agree to these Terms and to our{" "}
            <Link to="/privacy" style={link}>Privacy Policy</Link>.
          </p>

          <h2 style={hd}>1. Eligibility and account</h2>
          <p style={pg}>
            You must be at least 18 years old to use FitCrave. You are responsible for the accuracy of information you provide
            and for activity on your account. Keep your phone, email, and Google sign-in secure. You may request deletion of
            your account at any time from the app or our{" "}
            <Link to="/account-deletion" style={link}>account deletion page</Link>.
          </p>

          <h2 style={hd}>2. What FitCrave provides</h2>
          <p style={pg}>
            FitCrave is a fitness and nutrition app. Features currently include personalized meal and workout plans, meal
            logging (photo, barcode, manual, and mess-menu scan), an AI coach, Health Connect / Apple Health sync, a
            location-based community, and ordering healthy bowls from FitCrave kitchens where delivery is available.
            Features may vary by region and may change as we improve the Service. Some items in the app (for example Market
            Place or FitCrave Plus) may be marked as coming soon and are not part of the live Service until we say they are.
          </p>

          <h2 style={hd}>3. Health disclaimer</h2>
          <div style={{ background: t.bg2, border: `1px solid ${t.bd}`, borderRadius: 14, padding: "24px 22px", margin: "16px 0 24px" }}>
            <p style={{ ...pg, fontWeight: 600, color: t.warn, marginBottom: 8 }}>Not medical advice</p>
            <p style={{ ...pg, marginBottom: 0 }}>
              FitCrave is not a medical device and does not provide medical advice, diagnosis, or treatment. Meal plans,
              workouts, health scores, and AI suggestions are for general fitness and education only. Results vary. Consult a
              qualified clinician before changing diet or exercise, especially if you have a medical condition, are pregnant,
              or take medication.
            </p>
          </div>

          <h2 style={hd}>4. Food orders and payments</h2>
          <p style={pg}>
            Where bowl delivery is offered, prices, delivery fees, taxes, and availability are confirmed at checkout. Payments
            are processed by our payment partner (currently Cashfree). You agree to provide accurate delivery details. Issues
            with an order (quality, delay, non-delivery) can be reported from Help &amp; Support in the app. Refunds for food
            orders are reviewed case by case. Deleting your FitCrave account does not cancel a charge already made through
            Google Play or a payment provider; cancel those separately if needed.
          </p>

          <h2 style={hd}>5. Community guidelines</h2>
          <p style={pg}>
            Community groups, posts, comments, photos, and videos are user-generated. You must not post illegal content,
            harassment, hate speech, sexual content involving minors, spam, scams, or misleading health or medical claims.
            You grant FitCrave a license to host and display content you upload so the Service can function. You can report
            posts and comments and block users in the app. We may remove content or suspend accounts that violate these Terms. We do not
            guarantee that all content is reviewed before it appears.
          </p>

          <h2 style={hd}>6. Acceptable use</h2>
          <p style={pg}>
            You agree not to misuse the Service, including attempting to access other users' accounts or data, reverse
            engineer the app, overload our systems, scrape content, or use the Service for any unlawful purpose.
          </p>

          <h2 style={hd}>7. Intellectual property</h2>
          <p style={pg}>
            The FitCrave name, app, designs, and software are owned by or licensed to FitCrave Pvt. Ltd. You keep ownership of
            content you post. You give us a non-exclusive license to use that content only to operate and improve the Service.
          </p>

          <h2 style={hd}>8. Limitation of liability</h2>
          <p style={pg}>
            The Service is provided "as is". To the fullest extent allowed by law, FitCrave is not liable for indirect or
            consequential damages, or for health outcomes from following plans or AI suggestions. Our total liability for a
            claim related to the Service will not exceed the amount you paid us for food orders or other paid features in the
            12 months before the claim (or INR 1,000 if you paid nothing).
          </p>

          <h2 style={hd}>9. Termination</h2>
          <p style={pg}>
            We may suspend or end access if you break these Terms or if we reasonably believe your use harms other users or
            the Service. You may stop using FitCrave and delete your account at any time.
          </p>

          <h2 style={hd}>10. Governing law</h2>
          <p style={pg}>
            These Terms are governed by the laws of India. Courts in Kolkata, West Bengal, India have exclusive jurisdiction,
            except where consumer law in your state requires otherwise.
          </p>

          <h2 style={hd}>11. Changes</h2>
          <p style={pg}>
            We may update these Terms. The "Last updated" date will change. Continued use after an update means you accept
            the revised Terms. Material changes may also be noted in the app.
          </p>

          <h2 style={hd}>12. Contact</h2>
          <p style={pg}>
            Questions: <a href={`mailto:${SUPPORT}`} style={link}>{SUPPORT}</a> · FitCrave Pvt. Ltd., IIT Kharagpur, West Bengal, India.
          </p>
        </div>
      </div>
    </div>
  );
}
