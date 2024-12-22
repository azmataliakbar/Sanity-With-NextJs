
// src/app/sanity/lib/sanity.js
import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: 'xqfy5gkj',  // Replace with your correct project ID
  dataset: 'production',  // Replace with your correct dataset (e.g., 'production' or 'development')
  apiVersion: '2023-01-01', // Use the appropriate API version
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
});

export default sanityClient;
