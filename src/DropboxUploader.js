// src/DropboxUploader.js
export async function uploadToDropbox(file) {
  // Read token from environment (REACT_APP_* variables are exposed to the browser by Create React App)
  const ACCESS_TOKEN = process.env.REACT_APP_DROPBOX_TOKEN;

  if (!ACCESS_TOKEN) {
    throw new Error(
      'Dropbox access token is not set. Add REACT_APP_DROPBOX_TOKEN to your .env.local (no spaces around `=`) and restart the dev server.'
    );
  }

  const url = "https://content.dropboxapi.com/2/files/upload";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Dropbox-API-Arg": JSON.stringify({
          path: "/" + file.name,
          mode: "add",
          autorename: true,
          mute: false,
        }),
        "Content-Type": "application/octet-stream",
      },
      body: file,
    });

    if (!response.ok) {
      // include body (usually has JSON with error summary) to help debugging
      let bodyText;
      try {
        bodyText = await response.text();
      } catch (e) {
        bodyText = response.statusText || '';
      }
      throw new Error(`Upload failed (status ${response.status}): ${bodyText}`);
    }

    return await response.json();
  } catch (err) {
    // rethrow after logging so caller (UI) can present a friendly message
    console.error('uploadToDropbox error:', err);
    throw err;
  }
}
