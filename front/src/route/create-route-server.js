export const CreatePostView = require('../views/CreatePostView')
export const TagPager = require('../components/TagPager')
export const Tag = require('../components/Tag')
export const BlogPager = require('../components/BlogPager')
export const Archive = require('../components/Archive')

export const Post = CreatePostView('post')
export const Page = CreatePostView('page')

Post.chunkName = Page.chunkName = 'CreatePostView'
TagPager.chunkName = 'TagPager'
Tag.chunkName = 'Tag'
BlogPager.chunkName = 'BlogPager'
Archive.chunkName = 'Archive'
