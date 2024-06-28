import React from 'react'

interface TagProps {
  label: string
}

const Tag: React.FC<TagProps> = ({ label }) => {
  return (
    <span className="mr-2 rounded-lg bg-gray-200 px-2.5 py-0.5 font-mono text-sm font-medium text-black">
      {label}
    </span>
  )
}

export default Tag
