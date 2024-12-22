// src/sanity/lib/getPost.ts
import { client } from './client';  // Assuming you have a client instance set up
import { Post } from './getPosts';  // Assuming you have a Post type defined

export async function getPost(slug: string): Promise<Post | null> {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
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
  return await client.fetch(query, { slug });
}
