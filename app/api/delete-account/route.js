export async function POST(req) {
  try {
    const { contact, reason } = await req.json();

    if (!contact) {
      return Response.json(
        { message: "Email or contact number is required" },
        { status: 400 }
      );
    }

    console.log("Delete request received:", { contact, reason });

    return Response.json({
      message: "Your account deletion request has been submitted successfully."
    });

  } catch (error) {
    console.error("API Error:", error);

    return Response.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}