/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchByTags } from '@/lib/notion'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/utils/date'
import Tag from '@/components/tag'

export default async function Page({ params }: { params: { tag: string } }) {
  const tagPosts = await fetchByTags(params.tag)
  const tagTitle = params.tag
  if (!tagPosts) {
    return notFound()
  }

  console.log(tagTitle)

  console.log(
    tagPosts.map((post: any) =>
      post.properties.Title.title.map((title: any) => title.plain_text)
    )
  )

  return (
    <div className="flex min-h-screen flex-col items-center bg-black text-white">
      <div className="mt-10 w-full max-w-2xl px-4">
        <h1 className="text-left text-5xl font-bold">{tagTitle}</h1>
        <div className="mt-10 w-full max-w-2xl space-y-6">
          {tagPosts.map((post: any) => (
            <Link
              legacyBehavior
              key={post.id}
              href={`/blog/tags/${post.properties.Slug.formula.string}`}
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
                <div className="mt-2 flex">
                  {post.properties.Tags.multi_select.map(
                    (tag: any, index: number) => (
                      <Tag key={index} label={tag.name} />
                    )
                  )}
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
