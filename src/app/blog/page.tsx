/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchPages } from '@/lib/notion'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/utils/date'

export default async function Blog() {
  const { results } = await fetchPages()
  if (!results) {
    return notFound()
  }

  console.log(
    results.map((post: any) => post.properties.Updated.last_edited_time)
  )

  return (
    <div className="flex min-h-screen flex-col items-center bg-black text-white">
      <div className="mt-10 w-full max-w-2xl px-4">
        <h1 className="text-left text-5xl font-bold">Blog</h1>
        <div className="mt-10 w-full max-w-2xl space-y-6">
          {results.map((post: any) => (
            <Link
              legacyBehavior
              key={post.id}
              href={`/blog/${post.properties.Slug.formula.string}`}
            >
              <a className="block border-b border-gray-800 pb-6">
                <h2 className="text-2xl font-semibold">
                  {post.properties.Title.title[0].plain_text}
                </h2>
                <p className="text-gray-500">
                  {post.properties.Description.rich_text[0].plain_text}
                </p>
                <p className="text-gray-500">
                  {formatDate(post.properties.Updated.last_edited_time)}
                </p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
