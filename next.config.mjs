/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  },
  webpack: (config, { webpack }) => {
    // Log the environment variables to verify they are set
    console.log('NOTION_API_KEY:', process.env.NOTION_API_KEY)
    console.log('NOTION_DATABASE_ID:', process.env.NOTION_DATABASE_ID)

    // Define the environment variables for the client-side
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NOTION_API_KEY': JSON.stringify(
          process.env.NOTION_API_KEY
        ),
        'process.env.NOTION_DATABASE_ID': JSON.stringify(
          process.env.NOTION_DATABASE_ID
        ),
      })
    )

    return config
  },
}

export default nextConfig
