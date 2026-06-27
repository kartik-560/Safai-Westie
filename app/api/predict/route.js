import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    
    // Proxy the request to the external AI scoring API
    const response = await fetch("https://pugarch-c-score-776087882401.europe-west1.run.app/predict", {
      method: "POST",
      body: formData,
    });
    
    if (!response.ok) {
      const text = await response.text();
      console.error("AI API Error:", response.status, text);
      return NextResponse.json({ error: `API returned status ${response.status}`, details: text }, { status: response.status });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json({ error: error.message || "Failed to proxy request" }, { status: 500 });
  }
}
