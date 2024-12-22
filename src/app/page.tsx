// src/app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { getPosts } from '../sanity/lib/getPosts';

export default async function Page() {
  const posts = await getPosts();

  return (
    <main className='bg-black'>
      <h1 className='text-green-400 text-3xl md:text-3xl lg:text-4xl font-bold hover:underline hover:text-orange-400 hover:scale-y-150'>Welcome to my First Blog with Sanity</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link href={`/post/${post.slug.current}`}>
              <h2 className='text-blue-400 text-3xl font-bold hover:underline hover:text-pink-400 hover:scale-y-125 mb-4'>{post.title}</h2>
              <p className='text-white text-sm font-bold hover:text-yellow-300 hover:scale-y-110 mb-4'>{post.summary}</p>
              
              <div className="flex justify-center items-center">
  <Image
    src={post.mylogo?.asset.url || '/placeholder.png'}
    alt={`${post.title} logo`}
    width={700}
    height={100}
    className="hover:scale-125"
  />
</div>

              
            </Link>
          </li>
        ))}
      </ul>
      <div className='text-center hover:text-yellow-300'>
      <Link href="/post/artificial-intelligence">Go to Blog &gt;&gt;</Link>
      </div>
    </main>
  );
}

/* https://youtu.be/flQ0hzAjk_o?si=StgKOnizZ3BebCRS */