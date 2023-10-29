GOOGLE_API_KEY = "AIzaSyAOH8ALmNuLj7RR5soz5UcocVI_jYm75vQ";

export function googleMapPreview(lat, lng) {
  const imgPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imgPreviewUrl;
}
