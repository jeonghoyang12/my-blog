import { Client } from '@notionhq/client'
import React from 'react'
import type {
  BlockObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

if (
  !process.env.NEXT_PUBLIC_NOTION_API_KEY ||
  !process.env.NEXT_PUBLIC_NOTION_DATABASE_ID
) {
  console.error(
    'Missing required environment variables NOTION_API_KEY or NOTION_DATABASE_ID'
  )
  throw new Error(
    'Missing required environment variables NOTION_API_KEY or NOTION_DATABASE_ID'
  )
}

export const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_API_KEY,
})

export const fetchPages = React.cache(() => {
  return notion.databases.query({
    database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID ?? '',
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
  })
})

export const fetchPageBySlug = React.cache((slug: string) => {
  return notion.databases
    .query({
      database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID ?? '',
      filter: {
        property: 'Slug',
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0] as PageObjectResponse | undefined)
})

export const fetchByTags = React.cache((tag: string) => {
  return notion.databases
    .query({
      database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID ?? '',
      filter: {
        property: 'Tags',
        multi_select: {
          contains: tag,
        },
      },
    })
    .then((res) => res.results as PageObjectResponse[])
})

export const fetchPageBlocks = React.cache((pageId: string) => {
  return notion.blocks.children
    .list({ block_id: pageId })
    .then((res) => res.results as BlockObjectResponse[])
})
