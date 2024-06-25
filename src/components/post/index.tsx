import { formatDate } from '@/utils/date'

interface PostProps {
  title: string
  content: string
  date: string
}

export function Post(props: PostProps) {
  const { title, content, date } = props

  return (
    <article className="flex min-h-screen flex-col items-center bg-black text-white">
      <div className="mt-10 w-full max-w-2xl px-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-2 text-gray-500">{formatDate(date)}</p>
        <div
          className="notion-render prose prose-p:text-white prose-headings:text-white text-md mt-4 max-w-3xl leading-10"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </article>
  )
}
