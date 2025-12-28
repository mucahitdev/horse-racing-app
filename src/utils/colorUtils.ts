/**
 * Gets text color based on background color for optimal contrast
 * @param hexColor - Background color in hex format (#RRGGBB)
 * @returns Text color (#000000 for light backgrounds, #FFFFFF for dark backgrounds)
 */
export function getTextColor(hexColor: string): string {
  // Remove # if present
  const hex = hexColor.replace('#', '')

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Return black or white based on luminance
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

