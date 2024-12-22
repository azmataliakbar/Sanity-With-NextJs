import { PortableTextBlock } from '@portabletext/types';

export interface Post {
  title: string;
  publishedAt: string;
  content: PortableTextBlock[]; // Specify the type as PortableTextBlock[] for rich text content
  mylogo?: { asset: { url: string } };
  author?: {
    name?: string;
    bio?: PortableTextBlock[]; // Bio can also be rich text, so use the same type
    image?: { asset: { url: string } };
  };
  slug: { current: string };
  description?: string; // Optional description field
}

