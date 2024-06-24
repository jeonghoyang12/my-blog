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

  return <div dangerouslySetInnerHTML={{ __html: html }}></div>
}
