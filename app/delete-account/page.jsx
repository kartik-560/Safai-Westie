import DeleteAccountForm from "@/components/DeleteAccountForm";

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-center px-4 py-10 mt-20">

      <div className="bg-gray-900 border border-gray-800 shadow-xl rounded-xl max-w-3xl w-full p-6 sm:p-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Delete Account
        </h1>

        {/* Description requested by senior */}
        <p className="text-gray-400 mb-6 text-sm sm:text-base">
          Below is the form to request deletion of your account. Once your account
          is deleted, all associated data will be permanently removed from our
          system. Please note that this action is irreversible and account
          recovery will not be possible.
        </p>

        <h2 className="text-lg sm:text-xl font-semibold text-white mt-4">
          Steps
        </h2>

        <ul className="list-disc ml-6 text-gray-400 mt-2 mb-6 space-y-1 text-sm sm:text-base">
          <li>Enter your registered email address</li>
          <li>Submit the account deletion request</li>
          <li>Your account and associated data will be permanently deleted</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold text-white">
          Data Deleted
        </h2>

        <ul className="list-disc ml-6 text-gray-400 mt-2 mb-6 space-y-1 text-sm sm:text-base">
          <li>User profile information</li>
          <li>Account login details</li>
          <li>Application activity history</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold text-white">
          Data Retained
        </h2>

        <ul className="list-disc ml-6 text-gray-400 mt-6 mb-6 space-y-1 text-sm sm:text-base">
          <li>Security logs (for fraud prevention)</li>
          <li>Legal compliance records</li>
        </ul>

        <DeleteAccountForm />

        {/* Contact section requested */}
        <div className="mt-8 text-sm text-gray-400 border-t border-gray-800 pt-4">
          <p>
            For any assistance regarding account deletion, please contact us at:
          </p>

          <p className="mt-2 font-medium text-white">
            Email: support@saafai.in
          </p>
        </div>

      </div>
    </div>
  );
}