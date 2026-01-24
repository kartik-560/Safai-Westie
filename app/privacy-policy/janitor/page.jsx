export const metadata = {
  title: 'Privacy Policy – SaafAI Janitor App',
  description:
    'Privacy Policy for the SaafAI Janitor App detailing how sanitation worker data is collected, used, and protected.',
}

export default function JanitorPrivacyPolicyPage() {
  return (
    <main className="bg-slate-950 text-slate-200 mt-10">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-16">

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Privacy Policy – SaafAI Janitor App
        </h1>

        <p className="text-sm text-slate-400 mb-8">
          Last Updated: 24 January 2026
        </p>

        <p className="text-slate-300 mb-10 leading-relaxed">
          SaafAI (“SaafAI”, “we”, “our”, or “us”) is committed to protecting the
          privacy and dignity of sanitation workers using the SaafAI Janitor Mobile
          Application (“Janitor App”). This Privacy Policy explains how information
          is collected, used, stored, and protected when janitorial staff and
          supervisors use the Janitor App.
        </p>

        <Section title="1. Purpose of the Janitor App">
          <ul className="list-disc pl-6 space-y-2">
            <li>Log and verify cleaning activities</li>
            <li>Improve accountability and hygiene standards</li>
            <li>Support fair workload distribution and operational transparency</li>
            <li>Enable sanitation teams to demonstrate service quality</li>
          </ul>
          <p className="mt-4">
            The App is not intended for surveillance, profiling, or punitive
            monitoring of workers.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <SubSection title="2.1 Personal Identification Information">
            <ul className="list-disc pl-6 space-y-2">
              <li>Name or worker ID</li>
              <li>Mobile number (for login and communication)</li>
              <li>Assigned role or designation (e.g., janitor, supervisor)</li>
            </ul>
            <p className="mt-4">
              This information is collected only where required for operational use.
            </p>
          </SubSection>

          <SubSection title="2.2 Work Activity & Operational Data">
            <ul className="list-disc pl-6 space-y-2">
              <li>Cleaning task logs (time, frequency, completion status)</li>
              <li>QR code scans linked to specific washroom units</li>
              <li>Shift or duty activity records</li>
              <li>Supervisor verification actions (if applicable)</li>
            </ul>
            <p className="mt-4">
              This data reflects work performed and does not capture personal behavior
              outside assigned duties.
            </p>
          </SubSection>

          <SubSection title="2.3 Images of Facilities">
            <ul className="list-disc pl-6 space-y-2">
              <li>Images of washroom facilities may be uploaded after cleaning</li>
              <li>Images may include toilets, urinals, floors, washbasins, or infrastructure</li>
            </ul>

            <p className="mt-4 font-semibold text-slate-300">
              Important safeguards:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Images are collected only for hygiene verification and scoring</li>
              <li>The App does not intentionally capture facial or biometric data</li>
              <li>
                If a person is incidentally visible, the image is not used for
                identification and may be ignored, blurred, or deleted
              </li>
            </ul>
          </SubSection>

          <SubSection title="2.4 Location and Time Data">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Location is captured only at the time of QR scan or task submission
              </li>
              <li>Timestamp data is recorded for accountability and audits</li>
            </ul>
            <p className="mt-4">
              The App does not track real-time movement or continuous location of
              workers.
            </p>
          </SubSection>

          <SubSection title="2.5 Device and Technical Data">
            <ul className="list-disc pl-6 space-y-2">
              <li>Device type and operating system</li>
              <li>App usage logs and error reports</li>
            </ul>
            <p className="mt-4">
              This data is used only to improve reliability and security.
            </p>
          </SubSection>
        </Section>

        <Section title="3. Purpose of Data Use">
          <ul className="list-disc pl-6 space-y-2">
            <li>Verify completion of cleaning tasks</li>
            <li>Generate hygiene and performance reports</li>
            <li>Assign and manage sanitation workflows</li>
            <li>Ensure service-level compliance</li>
            <li>Improve operational efficiency and public hygiene outcomes</li>
          </ul>
          <p className="mt-4">
            Data is not used for automated disciplinary action without human review.
          </p>
        </Section>

        <Section title="4. Use of AI and Automation">
          <ul className="list-disc pl-6 space-y-2">
            <li>Analyze facility images for cleanliness indicators</li>
            <li>Support objective hygiene scoring</li>
          </ul>
          <p className="mt-4">
            AI outputs do not identify individuals, do not replace human supervision,
            and are used strictly as decision-support tools.
          </p>
        </Section>

        <Section title="5. Data Access and Visibility">
          <ul className="list-disc pl-6 space-y-2">
            <li>Janitors can access their own task-related records</li>
            <li>Supervisors can view data limited to assigned teams or facilities</li>
            <li>
              Authorities may view aggregated or contractually relevant information
            </li>
          </ul>
          <p className="mt-4">
            No unauthorized third party can access personal or work-related data.
          </p>
        </Section>

        <Section title="6. Data Storage and Retention">
          <ul className="list-disc pl-6 space-y-2">
            <li>Secure servers with access controls</li>
            <li>Retention limited to audit, verification, or contractual needs</li>
            <li>Anonymization or aggregation for reporting and policy analysis</li>
          </ul>
        </Section>

        <Section title="7. Data Security">
          <ul className="list-disc pl-6 space-y-2">
            <li>Secure login mechanisms</li>
            <li>Role-based access controls</li>
            <li>Encrypted data transmission</li>
            <li>Audit trails for system access</li>
          </ul>
        </Section>

        <Section title="8. Worker Rights">
          <ul className="list-disc pl-6 space-y-2">
            <li>Access personal information</li>
            <li>Request correction of incorrect records</li>
            <li>Raise concerns or grievances regarding data use</li>
            <li>Seek clarification on data processing practices</li>
          </ul>
          <p className="mt-4">
            Requests may be raised through supervisors or official SaafAI support
            channels.
          </p>
        </Section>

        <Section title="9. No Continuous Surveillance Assurance">
          <ul className="list-disc pl-6 space-y-2">
            <li>No audio recording</li>
            <li>No continuous video monitoring</li>
            <li>No GPS tracking outside task verification</li>
            <li>No behavioral profiling</li>
          </ul>
          <p className="mt-4">
            The App is designed to support dignity, transparency, and fairness in
            sanitation work.
          </p>
        </Section>

        <Section title="10. Legal Compliance">
          <ul className="list-disc pl-6 space-y-2">
            <li>India’s Digital Personal Data Protection Act (DPDP Act)</li>
            <li>Applicable labor, municipal, and government data-handling norms</li>
            <li>Responsible AI and worker protection principles</li>
          </ul>
        </Section>

        <Section title="11. Changes to This Policy">
          <p>
            Updates to this Privacy Policy will be communicated through the App or
            official channels. Continued use of the App indicates acceptance of the
            updated policy.
          </p>
        </Section>

        <Section title="12. Contact Information">
          <p>
            SaafAI – Privacy & Data Protection Team<br />
            Email:{' '}
            <a
              href="mailto:info@saafai.in"
              className="text-cyan-400 hover:underline"
            >
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
