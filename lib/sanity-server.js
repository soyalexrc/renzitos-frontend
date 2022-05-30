import { createClient } from 'next-sanity';
import { config } from '../utils/config';

export const sanityClient = createClient(config);

export const previewClient = createClient({
  ...config,
  useCdn: true,
  token: process.env.SANITY_TOKEN,
});

export const getClient = (userPreview) => userPreview ? previewClient : sanityClient;
