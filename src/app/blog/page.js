// src/app/blog/page.js
import sanityClient from '../../sanity/lib/sanity';

const query = `*[_type == "post"]{title, summary, slug}`;

export default async function Blog() {
  // Fetch data from Sanity
  const blogPosts = await sanityClient.fetch(query);

  return (
    <div>
      <h1>Blog Posts</h1>
      {blogPosts.map((post, index) => (
        <div key={index}>
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
          <a href={`/post/${post.slug.current}`}>Read more</a>
        </div>
      ))}
    </div>
  );
}



