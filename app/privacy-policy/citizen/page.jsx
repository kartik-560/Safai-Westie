export const metadata = {
  title: 'Privacy Policy – SaafAI Citizen App',
  description:
    'Privacy Policy for the SaafAI Citizen App explaining how citizen data, feedback, images, and location information are handled.',
}

export default function CitizenPrivacyPolicyPage() {
  return (
    <main className="bg-slate-950 text-slate-200 mt-10">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-16">

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Privacy Policy – SaafAI Citizen App
        </h1>

        <p className="text-sm text-slate-400 mb-8">
          Last Updated: 24 January 2026
        </p>

        <p className="text-slate-300 mb-10 leading-relaxed">
          SaafAI (“SaafAI”, “we”, “our”, or “us”) values the privacy of citizens using
          the SaafAI Citizen Mobile Application (“Citizen App”). This Privacy Policy
          explains how information is collected, used, stored, and protected when
          users search for public toilets, view hygiene ratings, and submit feedback
          through the Citizen App.
        </p>

        <Section title="1. Purpose of the Citizen App">
          <ul className="list-disc pl-6 space-y-2">
            <li>Discover nearby public toilets and sanitation facilities</li>
            <li>View hygiene ratings and facility information</li>
            <li>Provide feedback to improve sanitation quality</li>
            <li>Support better public hygiene outcomes</li>
          </ul>
          <p className="mt-4">
            The App is designed to improve public convenience, transparency, and
            accountability, not to monitor or track individuals.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <SubSection title="2.1 Information You Provide Voluntarily">
            <ul className="list-disc pl-6 space-y-2">
              <li>Ratings and written feedback on facilities</li>
              <li>Images of washroom conditions (optional)</li>
              <li>Contact details (only if users wish to be contacted)</li>
            </ul>
            <p className="mt-4">
              Providing personal information is optional unless clearly stated.
            </p>
          </SubSection>

          <SubSection title="2.2 Image and Content Submissions">
            <ul className="list-disc pl-6 space-y-2">
              <li>Images may be uploaded to support feedback</li>
              <li>Images are used to understand facility conditions and improve hygiene scores</li>
            </ul>

            <p className="mt-4 font-semibold text-slate-300">Safeguards:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Images should focus on infrastructure, not individuals</li>
              <li>SaafAI does not intend to collect facial or biometric data</li>
              <li>Images with identifiable individuals may be ignored, blurred, or removed</li>
            </ul>
          </SubSection>

          <SubSection title="2.3 Location Information">
            <ul className="list-disc pl-6 space-y-2">
              <li>Location access is used to show nearby toilets</li>
              <li>Location data is used only at the time of search</li>
            </ul>
            <p className="mt-4">
              SaafAI does not continuously track users or store precise movement history.
            </p>
          </SubSection>

          <SubSection title="2.4 Device and Usage Data">
            <ul className="list-disc pl-6 space-y-2">
              <li>Device type and operating system</li>
              <li>App usage statistics and error logs</li>
            </ul>
            <p className="mt-4">
              This data is used solely to improve performance and security.
            </p>
          </SubSection>
        </Section>

        <Section title="3. Purpose of Data Use">
          <ul className="list-disc pl-6 space-y-2">
            <li>Enable toilet discovery and navigation</li>
            <li>Display hygiene ratings and facility information</li>
            <li>Improve sanitation services and user experience</li>
            <li>Generate anonymized insights for authorities and operators</li>
            <li>Maintain system security and reliability</li>
          </ul>
          <p className="mt-4">
            SaafAI does not use citizen data for advertising or commercial profiling.
          </p>
        </Section>

        <Section title="4. Anonymous and Aggregated Use">
          <ul className="list-disc pl-6 space-y-2">
            <li>Feedback and ratings may be processed anonymously</li>
            <li>Data may be aggregated to identify sanitation trends and gaps</li>
            <li>Aggregated insights may be shared with authorities or facility managers</li>
          </ul>
          <p className="mt-4">
            Individual users are not personally identified in reports.
          </p>
        </Section>

        <Section title="5. Use of AI and Automation">
          <ul className="list-disc pl-6 space-y-2">
            <li>Analyze feedback and images related to washroom hygiene</li>
            <li>Support generation of hygiene ratings</li>
          </ul>
          <p className="mt-4">
            AI outputs focus on facility conditions, do not make decisions about users,
            and are used only to support service improvement and public reporting.
          </p>
        </Section>

        <Section title="6. Data Sharing and Disclosure">
          <p>SaafAI does not sell personal data.</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Government authorities or facility operators (aggregated or relevant data)</li>
            <li>Service providers under confidentiality obligations</li>
            <li>Legal or regulatory requirements</li>
          </ul>
        </Section>

        <Section title="7. Data Storage and Retention">
          <ul className="list-disc pl-6 space-y-2">
            <li>Secure storage with access controls</li>
            <li>Retention only as long as operationally necessary</li>
            <li>Anonymization or deletion once purpose is fulfilled</li>
          </ul>
        </Section>

        <Section title="8. Data Security">
          <ul className="list-disc pl-6 space-y-2">
            <li>Encrypted data transmission</li>
            <li>Controlled system access</li>
            <li>Monitoring for misuse or unauthorized access</li>
          </ul>
          <p className="mt-4">
            No digital system can be guaranteed to be completely secure.
          </p>
        </Section>

        <Section title="9. User Rights">
          <ul className="list-disc pl-6 space-y-2">
            <li>Access information provided by the user</li>
            <li>Request correction or deletion where applicable</li>
            <li>Withdraw consent for optional data sharing</li>
          </ul>
        </Section>

        <Section title="10. Children and Sensitive Content">
          <ul className="list-disc pl-6 space-y-2">
            <li>App intended for general public use</li>
            <li>Children should use the App under parental guidance</li>
            <li>Sensitive personal content or images of individuals should not be uploaded</li>
          </ul>
        </Section>

        <Section title="11. Legal Compliance">
          <ul className="list-disc pl-6 space-y-2">
            <li>India’s Digital Personal Data Protection Act (DPDP Act)</li>
            <li>Government norms for public digital platforms</li>
            <li>Responsible AI and data protection principles</li>
          </ul>
        </Section>

        <Section title="12. Changes to This Policy">
          <p>
            This Privacy Policy may be updated periodically. Continued use of the App
            indicates acceptance of the updated policy.
          </p>
        </Section>

        <Section title="13. Contact Information">
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
