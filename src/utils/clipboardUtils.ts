/**
 * Copy a URL to the clipboard
 */
export async function copyUrlToClipboard(url: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(url);
  } catch (error) {
    throw new Error(`Failed to copy URL to clipboard: ${error}`);
  }
}
