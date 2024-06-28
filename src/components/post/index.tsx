import { formatDate } from '@/utils/date'
import Tag from '@/components/tag'
import PrismLoader from '@/components/prism-loader'

interface PostProps {
  title: string
  content: string
  date: string
  tags: string[]
}

export function Post(props: PostProps) {
  const { title, content, date, tags } = props

  tags.forEach((tag) => {
    console.log(tag)
  })

  return (
    <article className="flex min-h-screen flex-col items-center bg-black text-white">
      <div className="mt-10 w-full max-w-2xl px-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-2 text-gray-500">{formatDate(date)}</p>
        <div className="mt-2 flex">
          {tags.map((tag, index) => (
            <Tag key={index} label={tag} />
          ))}
        </div>
        <div
          className="notion-render prose prose-p:text-white prose-headings:text-white text-md mb-10 mt-4 max-w-3xl leading-7"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
      <PrismLoader />
    </article>
  )
}
