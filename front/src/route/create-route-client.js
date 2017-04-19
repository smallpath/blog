const CreatePostView = type => resolve => {
  return import(/* webpackChunkName: "CreatePostView" */ '../views/CreatePostView').then(factory => {
    const component = factory(type)
    return resolve(component)
  })
}
export const Post = CreatePostView('post')
export const Page = CreatePostView('page')

export const TagPager = () => import(/* webpackChunkName: "TagPager" */ '../components/TagPager')
export const Tag = () => import(/* webpackChunkName: "Tag" */ '../components/Tag')
export const BlogPager = () => import(/* webpackChunkName: "BlogPager" */ '../components/BlogPager')
export const Archive = () => import(/* webpackChunkName: "Archive" */ '../components/Archive')
