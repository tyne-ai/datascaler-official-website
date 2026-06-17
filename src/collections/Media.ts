import type { CollectionConfig } from 'payload';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const staticDir = process.env.MEDIA_DIR || path.resolve(dirname, '../../media');

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  admin: {
    useAsTitle: 'alt',
    description:
      'Images and assets. Alt text is mandatory — it is what screen readers announce and what shows when the image fails to load. Describe the image, not the file.',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description:
          'Required. Describe the image in one sentence (e.g. "Anker 30-day social listening dashboard with platform sentiment breakdown"). Used by screen readers and search engines.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption rendered under the image in the article.',
      },
    },
    {
      name: 'credit',
      type: 'text',
      admin: {
        description: 'Optional photo / source credit.',
      },
    },
  ],
  upload: {
    staticDir,
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: undefined },
      { name: 'card', width: 768, height: undefined },
      { name: 'feature', width: 1400, height: undefined },
    ],
  },
};
