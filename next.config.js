/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
      },
    images:{
        domains:[
            "res.cloudinary.com",
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com'
        ]
    },
    "builds": [
        {
          "src": "build-command",
          "use": "@vercel/static"
        }
      ],
      "version": 2,
      "env": {
        "PRISMA_GENERATE_ON_BUILD": "true"
      }
}

module.exports = nextConfig
