export default function imageLoader({ src, width, quality }) {
  const finalSrc = src || "/images/placeHolder.webp";
  return `${finalSrc}?w=${width}&q=${quality || 75}`;
}
