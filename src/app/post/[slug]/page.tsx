
// src/app/post/[slug]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import sanityClient from '../../../sanity/lib/sanity'; // Import sanityClient
import { Post } from '../../../sanity/lib/types'; // Import Post type
import { urlFor } from '../../../sanity/lib/image';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post: Post | null = await sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      description
    }`,
    { slug: params.slug }
  );

  return {
    title: post?.title || 'Post Not Found',
    description: post?.description || 'Detailed blog post content',
  };
}

// Generate static params for dynamic routing
export async function generateStaticParams() {
  const query = `*[_type == "post"]{slug}`;
  const posts: Post[] = await sanityClient.fetch(query);

  return posts.map((post: Post) => ({
    slug: post.slug.current,
  }));
}

// Main Post Page Component
export default async function PostPage({ params }: { params: { slug: string } }) {
  // Fetch post data based on the slug
  const post: Post | null = await sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      publishedAt,
      content,
      mylogo,
      author-> {
        name,
        bio,
        image {
          asset-> {
            url
          }
        }
      }
    }`,
    { slug: params.slug }  // Ensure `params.slug` is being passed correctly
  );
  

  // Log the fetched data for debugging
  console.log(post);

  // If post is not found, return a 404 page
  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
        <h1 className="text-red-500 text-4xl font-bold mb-4">Post Not Found</h1>
        <Link href="/" className="text-blue-400 underline">
          &lt;&lt; Back to Home Page
        </Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <article className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-green-400 text-3xl font-bold hover:underline hover:text-orange-400 hover:scale-y-125 mb-4">
          {post.title}
        </h1>
        <p className="text-white text-xl md:text-lg lg:text-lg font-bold hover:underline hover:text-yellow-300 hover:scale-y-125 mb-4">
          Published on: {new Date(post.publishedAt).toDateString()}
        </p>
        {/* Display logo image if available */}
        {post.mylogo ? (
  <Image
    src={urlFor(post.mylogo).width(800).height(400).url()}
    alt={`Picture of ${post.title}`}
    width={800}
    height={400}
    className="hover:scale-110"
  />
) : (
  <div className="bg-gray-300 w-full h-48 flex items-center justify-center">
    <span className="text-gray-700">No Image</span>
  </div>
)}


        {/* Display blog content */}
        <PortableText value={post.content} />
      </article>

      {/* About the author section */}
      <section className="mt-8 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-white text-lg font-bold hover:underline hover:text-yellow-300 hover:scale-y-125 mb-4">
          About the Author
        </h3>
        <div className="flex items-center space-x-4">
          {/* Author's image */}
          {post.author?.image?.asset?.url ? (
            <Image
              src={post.author.image.asset.url}
              alt={`Picture of ${post.author.name || 'Author'}`}
              width={100}
              height={100}
              className="rounded-full hover:scale-110"
            />
          ) : (
            <div className="bg-gray-500 rounded-full w-24 h-24 flex items-center justify-center">
              <span className="text-white">No Image</span>
            </div>
          )}

          {/* Author's name */}
          <p className="text-white font-bold hover:text-orange-400">
            {post.author?.name || 'No author name available'}
          </p>
        </div>
        {/* Display author bio if available */}
        {post.author?.bio ? (
          <PortableText value={post.author.bio} />
        ) : (
          <p className="text-white">No bio available</p>
        )}
      </section>

      {/* Back to Home link */}
      <div className="hover:text-yellow-300 mt-8">
        <Link href="/">&lt;&lt; Back to Home Page</Link>
      </div>
    </main>
  );
}





