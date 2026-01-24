export const metadata = {
  title: 'Privacy Policy | SaafAI',
  description: 'Privacy Policy for SaafAI platform explaining data collection, use, storage, and protection practices.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-slate-950 text-slate-200 mt-10">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-16">
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Privacy Policy
        </h1>

        <p className="text-sm text-slate-400 mb-8">
          Last Updated: 24 January 2026
        </p>

        <p className="text-slate-300 mb-10 leading-relaxed">
          SaafAI (“SaafAI”, “we”, “our”, or “us”) respects the privacy of individuals and is committed to protecting personal and operational data processed through its website, mobile applications, dashboards, and related digital services (collectively, the “Platform”).
          <br /><br />
          This Privacy Policy explains how we collect, use, store, share, and protect information when you access or use the SaafAI Platform.
        </p>

        {/* Section */}
        <Section title="1. Scope of This Policy">
          <ul className="list-disc pl-6 space-y-2">
            <li>Visitors to the SaafAI website</li>
            <li>Registered users (government authorities, facility operators, supervisors)</li>
            <li>Janitorial staff using SaafAI-enabled applications</li>
            <li>Citizens providing optional feedback or ratings</li>
          </ul>
          <p className="mt-4">
            This policy does not apply to third-party websites or services linked from the Platform.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <SubSection title="2.1 Personal Information (Limited and Role-Based)">
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, phone number</li>
              <li>User role (e.g., supervisor, janitor, administrator)</li>
              <li>Login credentials and authentication details</li>
            </ul>
            <p className="mt-4">
              Personal information is collected only when required for platform access, accountability, or communication.
            </p>
          </SubSection>

          <SubSection title="2.2 Operational and Service Data">
            <ul className="list-disc pl-6 space-y-2">
              <li>Cleaning activity logs and timestamps</li>
              <li>QR code scan records linked to washroom units</li>
              <li>Task completion status and SLA indicators</li>
              <li>System usage and audit logs</li>
            </ul>
            <p className="mt-4">
              This data relates primarily to facilities and workflows, not personal behavior.
            </p>
          </SubSection>

          <SubSection title="2.3 Image and Visual Data">
            <ul className="list-disc pl-6 space-y-2">
              <li>Images of washroom facilities may be uploaded or captured by authorized systems</li>
              <li>Images are processed using AI solely to assess hygiene and cleanliness</li>
            </ul>
            <p className="mt-4 font-semibold text-slate-300">Important clarifications:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>SaafAI does not intentionally collect biometric data or facial images</li>
              <li>Incidentally captured individuals are not identified and may be ignored, blurred, or deleted</li>
            </ul>
          </SubSection>

          <SubSection title="2.4 Location and Device Information">
            <ul className="list-disc pl-6 space-y-2">
              <li>Static location data of washroom facilities</li>
              <li>Device identifiers, timestamps, and system metadata</li>
            </ul>
            <p className="mt-4">
              SaafAI does not perform continuous personal location tracking.
            </p>
          </SubSection>

          <SubSection title="2.5 Citizen Feedback (Optional)">
            <ul className="list-disc pl-6 space-y-2">
              <li>Ratings or feedback on washroom conditions</li>
              <li>Optional contact details if voluntarily provided</li>
            </ul>
            <p className="mt-4">
              Anonymous feedback is supported wherever possible.
            </p>
          </SubSection>
        </Section>

        <Section title="3. Purpose of Data Collection">
          <ul className="list-disc pl-6 space-y-2">
            <li>Hygiene scoring and sanitation quality assessment</li>
            <li>Operational monitoring and workflow management</li>
            <li>Accountability and compliance reporting</li>
            <li>Service improvement, analytics, and policy insights</li>
            <li>System security, audits, and troubleshooting</li>
          </ul>
          <p className="mt-4">
            Data is not used for surveillance or profiling of individuals.
          </p>
        </Section>

        <Section title="4. Use of Artificial Intelligence">
          <ul className="list-disc pl-6 space-y-2">
            <li>Analyze facility images for hygiene indicators</li>
            <li>Generate cleanliness and hygiene scores</li>
            <li>Support decision-making for sanitation management</li>
          </ul>
          <p className="mt-4">
            AI outputs are decision-support tools and do not independently result in disciplinary, financial, or legal actions without human oversight.
          </p>
        </Section>

        <Section title="5. Data Storage and Retention">
          <ul className="list-disc pl-6 space-y-2">
            <li>Secure cloud infrastructure with appropriate safeguards</li>
            <li>Retention only as long as operationally or legally necessary</li>
            <li>Anonymization or aggregation for long-term analytics</li>
          </ul>
        </Section>

        <Section title="6. Data Sharing and Disclosure">
          <p>SaafAI does not sell personal data.</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Authorized government bodies or facility owners</li>
            <li>Trusted service providers under confidentiality obligations</li>
            <li>Legal or government requirements</li>
          </ul>
          <p className="mt-4">
            Access is strictly role-based and purpose-limited.
          </p>
        </Section>

        <Section title="7. Data Security">
          <ul className="list-disc pl-6 space-y-2">
            <li>Role-based access controls</li>
            <li>Encrypted data transmission and storage</li>
            <li>Secure authentication mechanisms</li>
            <li>System monitoring and audit trails</li>
          </ul>
          <p className="mt-4">
            No system is completely risk-free.
          </p>
        </Section>

        <Section title="8. User Rights">
          <ul className="list-disc pl-6 space-y-2">
            <li>Access personal data</li>
            <li>Request corrections</li>
            <li>Request deletion where permissible</li>
            <li>Raise grievances or concerns</li>
          </ul>
        </Section>

        <Section title="9. Children and Sensitive Data">
          <ul className="list-disc pl-6 space-y-2">
            <li>Platform not intended for children</li>
            <li>No knowing collection of children’s data</li>
            <li>Data relates to infrastructure, not personal habits</li>
          </ul>
        </Section>

        <Section title="10. Legal Compliance">
          <ul className="list-disc pl-6 space-y-2">
            <li>India’s Digital Personal Data Protection Act (DPDP Act)</li>
            <li>Applicable government data-handling requirements</li>
            <li>International privacy and responsible AI principles</li>
          </ul>
        </Section>

        <Section title="11. Policy Updates">
          <p>
            This policy may be updated periodically. Continued use of the Platform constitutes acceptance of the revised policy.
          </p>
        </Section>

        <Section title="12. Contact Information">
          <p>
            SaafAI – Data Protection / Privacy Team<br />
            Email:{' '}
            <a href="mailto:info@saafai.in" className="text-cyan-400 hover:underline">
              info@saafai.in
            </a>
          </p>
        </Section>

      </div>
    </main>
  )
}

/* ---------- Helpers ---------- */

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <div className="text-slate-300 leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  )
}

function SubSection({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="font-semibold text-white mb-3">{title}</h3>
      <div className="text-slate-300 leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  )
}
