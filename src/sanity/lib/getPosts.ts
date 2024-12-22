import { client } from './client';

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  summary: string;
  gender: string;
  publishedAt: string;
  mylogo?: { asset: { url: string } };
  content: Block[];
  author: {
    name: string;
    bio: Block[];
    image?: { asset: { url: string } };
  };
}

interface Block {
  _type: 'block';
  _key: string;
  children: { _key: string; text: string }[];
  markDefs: { _key: string; type: string }[];
  style: string;
}

export async function getPosts(): Promise<Post[]> {
  const query = `
    *[_type == "post"] | order(_createdAt asc) {
      _id,
      title,
      slug,
      summary,
      gender,
      publishedAt,
      mylogo {
        asset -> {
          url
        }
      },
      content,
      "author": author->{
        name,
        bio,
        image {
          asset -> {
            url
          }
        }
      }
    }
  `;
  return await client.fetch(query);
}
