/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post } from '@/components/post'
import { fetchPageBlocks, fetchPageBySlug, notion } from '@/lib/notion'
import bookmarkPlugin from '@notion-render/bookmark-plugin'
import { NotionRenderer } from '@notion-render/client'
import hljsPlugin from '@notion-render/hljs-plugin'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await fetchPageBySlug(params.slug)
  if (!post) {
    return notFound()
  }

  const blocks = await fetchPageBlocks(post.id)

  const renderer = new NotionRenderer({
    client: notion,
  })

  renderer.use(hljsPlugin({}))
  renderer.use(bookmarkPlugin(undefined))

  const html = await renderer.render(...blocks)

  // console.log((post.properties.Tags as any)?.multi_select?.map((tag: any) => tag.name))

  return (
    <Post
      title={(post.properties.Title as any).title[0].plain_text}
      date={(post.properties.Updated as any).last_edited_time}
      tags={(post.properties.Tags as any)?.multi_select?.map(
        (tag: any) => tag.name
      )}
      content={html}
    />
  )
}
