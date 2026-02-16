export interface NotionData {
  email: string;
  language: string;
  country: string;
}

export async function submitToNotion(data: NotionData): Promise<void> {
  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        language: data.language,
        country: data.country,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to submit Notion");
    }
  } catch (error) {
    console.error("Error submitting to Notion:", error);
    throw error;
  }
}

export async function getUserLocation(): Promise<{
  language: string;
  country: string;
}> {
  try {
    // Get IP address
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    // Get geolocation data
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoResponse.json();

    return {
      language: geoData.languages?.[0] || "en",
      country: geoData.country_name || "Unknown",
    };
  } catch (error) {
    console.error("Error getting user location:", error);
    return {
      language: "en",
      country: "Unknown",
    };
  }
}
