'use client'

import { useEffect } from 'react'
import Prism from 'prismjs'
// import 'prismjs/themes/prism-tomorrow.css'
import 'prism-themes/themes/prism-atom-dark.css'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'

export default function PrismLoader() {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return <div className="hidden"></div>
}
