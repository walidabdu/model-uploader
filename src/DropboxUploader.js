// src/DropboxUploader.js
export async function uploadToDropbox(file) {
  const ACCESS_TOKEN = "PASTE_YOUR_DROPBOX_ACCESS_TOKEN_HERE"; // replace with your token

  const url = "https://content.dropboxapi.com/2/files/upload";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${ACCESS_TOKEN}`,
      "Dropbox-API-Arg": JSON.stringify({
        path: "/" + file.name, // stores at root of your Dropbox app folder
        mode: "add",
        autorename: true,
        mute: false,
      }),
      "Content-Type": "application/octet-stream",
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error("Upload failed: " + response.statusText);
  }

  return await response.json();
}
