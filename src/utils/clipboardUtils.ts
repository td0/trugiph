/**
 * Copy an image to the clipboard
 * Handles different image formats and converts unsupported types (like GIF) to PNG
 */
export async function copyImageToClipboard(
  imageUrl: string,
  staticImageUrl?: string,
  useStatic: boolean = false
): Promise<void> {
  // Check if clipboard supports image writing
  if (!navigator.clipboard.write) {
    throw new Error('Clipboard API not supported');
  }

  // Fetch the image as a blob
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  
  // Check if the blob type is supported for clipboard
  const supportedTypes = ['image/png', 'image/jpeg', 'image/webp'];
  
  if (supportedTypes.includes(blob.type)) {
    // Copy supported image types directly
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ]);
  } else {
    // For unsupported types (like GIF), convert to PNG
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.crossOrigin = 'anonymous';
      img.src = useStatic && staticImageUrl ? staticImageUrl : imageUrl;
    });
    
    canvas.width = img.width;
    canvas.height = img.height;
    ctx?.drawImage(img, 0, 0);
    
    // Convert to PNG blob
    const pngBlob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), 'image/png');
    });
    
    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': pngBlob
      })
    ]);
  }
}

/**
 * Copy image with fallback to URL if image copying fails
 */
export async function copyImageWithFallback(
  imageUrl: string,
  staticImageUrl?: string,
  useStatic: boolean = false
): Promise<void> {
  try {
    await copyImageToClipboard(imageUrl, staticImageUrl, useStatic);
  } catch (error) {
    console.error('Failed to copy image:', error);
    // Fallback to copying URL if image copy fails
    await navigator.clipboard.writeText(imageUrl);
  }
}
