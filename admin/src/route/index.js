import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import createListView from '../components/views/CreateListView'
import createEditView from '../components/views/CreateEditView'
import createMarkdownView from '../components/views/CreateMarkdownView'

import Main from '../components/Main'
import Dashboard from '../components/pages/Dashboard'
import Login from '../components/pages/Login'
import Logout from '../components/pages/Logout'

export default new VueRouter({
  mode: 'history',
  scrollBehavior: function(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/admin/login',
      name: 'login',
      components: {
        default: Login
      }
    },
    {
      path: '/admin/logout',
      name: 'logout',
      components: {
        default: Logout
      }
    },
    {
      path: '/dashboard',
      component: Main,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: Dashboard
        }
      ]
    },
    {
      path: '/post',
      name: 'post',
      component: Main,
      children: [
        {
          path: 'list',
          name: 'postList',
          component: createListView({
            name: 'post',
            model: 'post',
            isButtonFixed: true,
            items: [
              {
                prop: 'title',
                label: '标题',
                width: 300
              },
              {
                prop: 'pathName',
                label: '路径',
                width: 300
              }
            ],
            query: {
              conditions: {
                type: 'post'
              },
              select: {
                title: 1,
                pathName: 1,
                tags: 1,
                category: 1
              },
              sort: {
                createdAt: -1
              }
            }
          })
        },
        {
          path: 'create/:id?',
          name: 'postCreate',
          component: createMarkdownView({
            name: 'post',
            model: 'post',
            items: [
              {
                prop: 'title',
                label: '标题',
                type: 'input',
                default: '',
                width: 250
              },
              {
                prop: 'pathName',
                label: '路径',
                type: 'input',
                default: '',
                width: 250,
                description: '作为文章的唯一标志在前端路径中显示，例如test-article'
              },
              {
                prop: 'markdownContent',
                label: '内容',
                type: 'markdown',
                default: '',
                width: 170,
                subProp: 'markdownToc'
              },
              {
                type: 'split'
              },
              {
                prop: 'createdAt',
                label: '创建日期',
                type: 'date-picker',
                default: '',
                width: 170
              },
              {
                prop: 'updatedAt',
                label: '修改日期',
                type: 'date-picker',
                default: '',
                width: 170
              },
              {
                prop: 'tags',
                label: '标签',
                type: 'select',
                default: [],
                width: 170
              },
              {
                prop: 'category',
                label: '分类',
                type: 'radio',
                default: '',
                width: 170
              },
              {
                prop: 'isPublic',
                label: '是否公开',
                type: 'switch',
                default: true,
                width: 170
              },
              {
                prop: 'allowComment',
                label: '允许评论',
                type: 'switch',
                default: true,
                width: 170
              }
            ],
            query: {
              conditions: {
                type: 'post'
              },
              select: {
                title: 1,
                pathName: 1,
                tags: 1,
                category: 1,
                isPublic: 1,
                allowComment: 1,
                updatedAt: 1,
                createdAt: 1,
                markdownContent: 1,
                type: 1,
                markdownToc: 1
              }
            }
          })
        }
      ]
    },
    {
      path: '/page',
      name: 'page',
      component: Main,
      children: [
        {
          path: 'list',
          name: 'pageList',
          component: createListView({
            name: 'page',
            model: 'post',
            items: [
              {
                prop: 'title',
                label: '标题',
                width: 250
              },
              {
                prop: 'pathName',
                label: '路径',
                width: 170
              },
              {
                prop: 'createdAt',
                label: '创建日期',
                width: 170
              },
              {
                prop: 'updatedAt',
                label: '修改日期',
                width: 170
              }
            ],
            query: {
              conditions: {
                type: 'page'
              },
              select: {
                title: 1,
                pathName: 1,
                createdAt: 1,
                updatedAt: 1
              },
              sort: {
                createdAt: -1
              }
            }
          })
        },
        {
          path: 'create/:id?',
          name: 'pageCreate',
          component: createMarkdownView({
            name: 'page',
            model: 'post',
            items: [
              {
                prop: 'title',
                label: '标题',
                type: 'input',
                default: '',
                width: 250
              },
              {
                prop: 'pathName',
                label: '路径',
                type: 'input',
                default: '',
                width: 250,
                description: '作为文章的唯一标志在前端路径中显示，例如test-article'
              },
              {
                prop: 'markdownContent',
                label: '内容',
                type: 'markdown',
                default: '',
                width: 170,
                subProp: 'markdownToc'
              },
              {
                type: 'split'
              },
              {
                prop: 'createdAt',
                label: '创建日期',
                type: 'date-picker',
                default: '',
                width: 170
              },
              {
                prop: 'updatedAt',
                label: '修改日期',
                type: 'date-picker',
                default: '',
                width: 170
              },
              {
                prop: 'isPublic',
                label: '是否公开',
                type: 'switch',
                default: true,
                width: 170
              },
              {
                prop: 'allowComment',
                label: '允许评论',
                type: 'switch',
                default: true,
                width: 170
              }
            ],
            query: {
              conditions: {
                type: 'page'
              },
              select: {
                title: 1,
                pathName: 1,
                isPublic: 1,
                allowComment: 1,
                updatedAt: 1,
                createdAt: 1,
                markdownContent: 1,
                type: 1,
                markdownToc: 1
              }
            }
          })
        }
      ]
    },
    {
      path: '/theme',
      name: 'theme',
      component: Main,
      children: [
        {
          path: 'list',
          name: 'themeList',
          component: createListView({
            name: 'theme',
            model: 'theme',
            items: [
              {
                prop: 'name',
                label: '主题',
                width: 250
              },
              {
                prop: 'author',
                label: '作者',
                width: 170
              }
            ],
            query: {}
          })
        },
        {
          path: 'create/:id?',
          name: 'themeEdit',
          component: createEditView({
            name: 'theme',
            model: 'theme',
            items: [
              {
                prop: 'name',
                label: '主题名称',
                width: 250
              },
              {
                prop: 'author',
                label: '作者',
                width: 170
              },
              {
                prop: 'option',
                label: '配置',
                width: 170,
                type: 'textarea',
                sourceType: 'Object',
                description: '配置内容应为一个JSON对象，不符合JSON格式时提交将被忽略'
              }
            ],
            query: {}
          })
        }
      ]
    },
    {
      path: '/cate',
      name: 'cate',
      component: Main,
      children: [
        {
          path: 'list',
          name: 'cateList',
          component: createListView({
            name: 'cate',
            model: 'category',
            items: [
              {
                prop: 'name',
                label: '分类',
                width: 250
              }
            ],
            query: {}
          })
        },
        {
          path: 'create/:id?',
          name: 'cateCreate',
          component: createEditView({
            name: 'cate',
            model: 'category',
            items: [
              {
                prop: 'name',
                label: '分类名称',
                width: 250
              }
            ],
            query: {}
          })
        }
      ]
    },
    {
      path: '/tag',
      name: 'tag',
      component: Main,
      children: [
        {
          path: 'list',
          name: 'tagList',
          component: createListView({
            name: 'tag',
            model: 'tag',
            items: [
              {
                prop: 'name',
                label: '标签',
                width: 250
              }
            ],
            query: {}
          })
        },
        {
          path: 'create/:id?',
          name: 'tagCreate',
          component: createEditView({
            name: 'tag',
            model: 'tag',
            items: [
              {
                prop: 'name',
                label: '标签名称',
                width: 250
              }
            ],
            query: {}
          })
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: Main,
      children: [
        {
          path: 'edit',
          name: 'userEdit',
          component: createEditView({
            name: 'user',
            model: 'user',
            isPlain: true,
            items: [
              {
                prop: 'name',
                label: '账号',
                default: '',
                width: 250
              },
              {
                prop: 'password',
                label: '密码',
                default: '',
                width: 170
              },
              {
                prop: 'displayName',
                label: '昵称',
                default: '',
                width: 170,
                description: '在后台管理的顶部导航栏中显示'
              },
              {
                prop: 'email',
                label: '邮箱',
                default: '',
                width: 170,
                description: '在文章被回复时博客需要通知的目标邮箱，空则不通知'
              }
            ],
            query: {}
          })
        }
      ]
    },
    {
      path: '/option',
      name: 'option',
      component: Main,
      children: [
        {
          path: 'general',
          name: 'optionGeneral',
          component: createEditView({
            name: 'general',
            model: 'option',
            isPlain: true,
            items: [
              {
                prop: 'title',
                label: '网站名称',
                default: '',
                width: 250,
                description: '网站的名称，作为前后台的标题'
              },
              {
                prop: 'logoUrl',
                label: 'logo地址',
                default: '',
                width: 170,
                description: '前台单页的正方形图标，80x80'
              },
              {
                prop: 'description',
                label: '站点描述',
                default: '',
                width: 170,
                description: '作为前台的侧边栏描述'
              },
              {
                prop: 'siteUrl',
                label: '网站地址',
                default: '',
                width: 170,
                description: '博客前台的域名,建议加上http/https前缀'
              },
              {
                prop: 'faviconUrl',
                label: 'favicon地址',
                default: '',
                width: 170,
                description: '博客前台的favicon地址，请填写相对前台域名的根路径'
              },
              {
                prop: 'keywords',
                label: '关键词',
                default: '',
                width: 170,
                description: '作为前台单页的meta中的keywords，以供搜索引擎收录'
              },
              {
                prop: 'githubUrl',
                label: 'github地址',
                default: '',
                width: 170,
                description: 'github地址，填写用户昵称即可'
              },
              {
                prop: 'weiboUrl',
                label: '微博地址',
                default: '',
                width: 170,
                description: '微博地址，请填写全部链接,包括http/https前缀'
              },
              {
                prop: 'miitbeian',
                label: '网站备案号',
                default: '',
                width: 170,
                description: '网站的备案号，在前台单页的底部显示'
              }
            ],
            query: {}
          })
        },
        {
          path: 'comment',
          name: 'optionComment',
          component: createEditView({
            name: 'comment',
            model: 'option',
            isPlain: true,
            items: [
              {
                prop: 'commentType',
                label: '评论类型',
                default: '',
                width: 250,
                description: '目前仅支持disqus，计划支持duoshuo'
              },
              {
                prop: 'commentName',
                label: '评论名称',
                default: '',
                width: 250,
                description: 'disqus或duoshuo中分配给博客的id'
              }
            ],
            query: {}
          })
        },
        {
          path: 'analytic',
          name: 'optionAnalytic',
          component: createEditView({
            name: 'analytic',
            model: 'option',
            isPlain: true,
            items: [
              {
                prop: 'analyzeCode',
                label: '统计代码',
                default: '',
                width: 250,
                description: '目前仅支持谷歌统计，填入谷歌统计分配给博客的ID即可'
              }
            ],
            query: {}
          })
        }
      ]
    },
    {
      path: '/',
      redirect: '/admin/login'
    }
  ]
})
