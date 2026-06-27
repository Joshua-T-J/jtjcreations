export const environment = {
  space: import.meta.env.NG_APP_SPACE_KEY,
  accessToken: import.meta.env.NG_APP_ACCESS_TOKEN,
  contentTypeIds: {
    gallery: 'galleryItems',
    galleryHero: 'galleryContent',
  },
  GoogleSheetsAPI: import.meta.env.NG_APP_GOOGLE_SHEET_URL,
};
