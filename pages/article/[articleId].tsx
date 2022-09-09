import React from 'react'
import Layout from 'components/layout'
import type { NextPageWithLayout } from 'pages/_app'

const ArticlePage: NextPageWithLayout = () => {
  // const value = "好久没写文章了，说忙是假话，懒才是真的。\n\n话不多说，进入正题\n\nNuxt 3 rc 发布已经有一段时间了，刚看了一下，三个小时前发布了 `v3.0.0-rc.9`，本来想着把博客前台用 Nuxt 3 重构，但毕竟现在还是 rc 阶段，还是不太敢上车。而且社区很多 [Plugin](https://modules.nuxtjs.org/) 还不太支持 Nuxt 3，所以放弃了。等发布正式版本之后，也许会折腾一波。以下是 Nuxt 3 的一些初体验\n\n> 踩坑指南： `Node` 版本需要高于 v14.16.0\n\n## 创建项目/安装依赖/运行\n\n```bash\npnpm dlx nuxi init nuxt-app\n\npnpm install --shamefully-hoist\n\npnpm run dev -o\n```\n\n跑起来是这样子的\n\n![welcome](https://static.evanone.site/1662217260075-nuxt-welcome-1.png)\n\n项目基本结构\n\n```js\n|-root\n--| .nuxt/                                  ---运行生成\n--| .output/                                ---输出目录\n--| assets/                                 ---静态资源\n--| components/                             ---公共组件\n--| composables/                            ---不知道咋叫\n--| layout/                                 ---布局目录\n--| middleware/                             ---中间件\n--| server/                                 ---服务端\n--| pages/                                  ---页面组件\n--| plugins/                                ---插件目录\n--| public/                                 ---公共目录\n--| nuxt.config.ts                          ---配置\n\n```\n\n## Components\n\n这个目录是放置所有 Vue 组件的地方，可以将这些组件导入您的页面或其他组件中\n\nNuxt 会自动导入 `components/` 目录中的任何组件\n\n比如\n\n```js\n| components/\n--| Header.vue\n--| Footer.vue\n```\n\n```vue\n<template>\n  <div>\n    <Header />\n    <slot />\n    <Footer />\n  </div>\n</template>\n```\n\n如果是嵌套，比如\n\n```js\n| components/\n--| common/\n----| Button.vue\n```\n\n那个在页面中使用时，就是这样\n\n```vue\n<CommonButton />\n```\n\n如果需要动态导入，前面加上 `Lazy` 即可\n\n```vue\n<LazyCommonButton />\n```\n\n## Composables\n\n这个目录下的所有文件也都会自动导入到应用程序中，无需手动导入\n\n用法\n\n- 使用命名导出\n\n```ts\nexport const useCounter = () => {\n  return useState('count', () => Math.round(Math.random() * 1000))\n}\n```\n\n- 使用默认导出\n\n```ts\nexport default function () {\n  return useState('count', () => Math.round(Math.random() * 1000))\n}\n```\n\n可以在`.js`, `.ts` 和`.vue` 文件中使用自动导入的 composables\n```vue\n<template>\n  <div>\n    {{ count }}\n  </div>\n</template>\n\n<script setup>\nconst count = useCounter()\n</script>\n```\n\n## Layout\n\n布局目录，使用时将通过异步导入自动加载\n\n通过添加 `<NuxtLayout>` 到 `app.vue`，并将 layout 属性设置为页面元数据的一部分\n\n- 默认布局\n\n`~/layouts/default.vue`，文件名不可修改\n\n```vue\n<template>\n  <div>\n    <slot />\n  </div>\n</template>\n```\n在 `app.vue` 中加入 `<NuxtLayout>`\n\n```vue\n<template>\n  <NuxtLayout>\n    page content\n  </NuxtLayout>\n</template>\n```\n\n- 覆盖默认布局\n\n```js\n-| layouts/\n---| default.vue\n---| custom.vue\n```\n\n```vue\n<script setup lang=\"ts\">\nconst layout = 'custom'\n</script>\n\n<template>\n  <NuxtLayout :name=\"layout\">\n    <NuxtPage />\n  </NuxtLayout>\n</template>\n```\n\n更多请参考 [官方文档](https://v3.nuxtjs.org/guide/directory-structure/layouts)\n\n## Middleware\n\n中间件，基本没咋用过，不讲\n\n## Server\n\n自动扫描 `~/server/api`，`~/server/routes` 以及 `~/server/middleware` 这些目录中的文件，注册具有 HMR 支持的 API 和服务器处理程序\n\n每个文件都应该导出一个 `defineEventHandler()`\n\n可以直接返回 JSON 数据，`Promise` 或者用于 `event.res.end()` 发送响应\n\n例如 `~server/api/hello.ts`\n\n```ts\nexport default defineEventHandler((event) => {\n  return {\n    api: 'hello world'\n  }\n})\n```\n然后在页面中使用 `$fetch` 去获取\n\n```vue\n<script setup lang=\"ts\">\nconst data = await $fetch('/api/hello')\n</script>\n\n<template>\n  <p>{{data}}</p>\n</template>\n\n```\n\n更多高级用法请参考 [官方文档](https://v3.nuxtjs.org/guide/features/server-routes)\n\n## Pages\n\n基于文件的路由页面\n\n比如 `~pages/index.vue`\n\n```vue\n<template>\n  <h1>Index page</h1>\n</template>\n```\n\n`app.vue` 加上 `<NuxtPage />`\n\n```vue\n<template>\n  <div>\n    <NuxtPage />\n  </div>\n</template>\n```\n\n那么文件将映射到 `/` 路由，也就是根路由\n\n- 动态路由\n\n```js\n-| pages/\n---| index.vue\n---| user/\n-----| [id].vue\n```\n通过 `$route` 对象访问组件内的 `ID`\n\n```vue\n<template>\n  <p>UserId: {{ $route.params.id }}</p>\n</template>\n```\n\n嵌套路由\n\n```js\n-| pages/\n---| article/\n------| detail.vue\n---| article.vue\n```\n\n将生成以下路由\n\n```js\n[\n  {\n    path: '/article',\n    component: '~/pages/article.vue',\n    name: 'article',\n    children: [\n      {\n        path: 'detail',\n        component: '~/pages/article/detail.vue',\n        name: 'article-detail'\n      }\n    ]\n  }\n]\n```\n\n要显示 detail.vue 组件，需要在 `pages/article.vue` 中插入 `<NuxtPage>` 组件\n\n```vue\n<template>\n  <div>\n    <h1>Article Page</h1>\n    <NuxtPage :articleId=\"1\" />\n  </div>\n</template>\n```\n\n- 页面元数据\n\n使用 `definePageMeta` 来定义页面元数据\n\n```vue\n<script setup lang=\"ts\">\ndefinePageMeta({\n  title: 'home page'\n})\n</script>\n```\n\n然后可以从 `route.meta` 对象在整个应用程序的其余部分访问此数据\n\n```vue\n<script setup lang=\"ts\">\nconst route = useRoute()\n\nconsole.log(route.meta.title) // home page\n</script>\n```\n\n更多请参考 [官方文档](https://v3.nuxtjs.org/guide/directory-structure/layouts)\n\n## Plugins\n\n插件目录，自动读取该目录中的文件并加载\n\n可以在文件名中使用 `.server` 或 `.client` 后缀以仅在服务器或客户端加载插件\n\n只有目录顶层的 `plugins/` 文件（或任何子目录中的索引文件）才会被注册\n\n```js\nplugins\n | - swiper.ts\n | - highlight\n | --- register.ts\n | --- index.ts\n```\n\n只有 `swiper.ts` 和 `highlight/index.ts` 会被注册\n\n- 定义插件\n\n使用 `defineNuxtPlugin`，传递给插件的**唯一参数**为 `nuxtApp`\n\n```ts\nexport default defineNuxtPlugin(nuxtApp => {\n  // Doing something with nuxtApp\n})\n```\n\n- 在插件中使用 Composables\n\n```ts\nexport default defineNuxtPlugin((NuxtApp) => {\n  const count = useCounter()\n  // Doing something...\n})\n\n```\n\n- Automatically Providing Helpers\n\n```ts\nexport default defineNuxtPlugin(() => {\n  return {\n    provide: {\n      hello: (msg: string) => `Hello ${msg}!`\n    }\n  }\n})\n```\n\n如果通过 `provide` 返回，Nuxt 会将其自动注入到 `NuxtApp` 中，并添加 `$` 前缀，那么你可以这样使用它\n\n```vue\n<template>\n  <div>\n    {{ $hello('world') }}\n  </div>\n</template>\n\n<script setup lang=\"ts\">\nconst { $hello } = useNuxtApp()\n</script>\n```\n\n## Config\n\n`nuxt.config.ts` 配置文件，请查阅 [官方文档](https://v3.nuxtjs.org/guide/directory-structure/nuxt.config)\n\n```ts\nimport { defineNuxtConfig } from 'nuxt'\n\nexport default defineNuxtConfig({\n  // Nuxt config\n})\n```\n\n说两个比较常用的配置\n\n- alias\n\n默认是这样的\n\n```json\n{\n  \"~~\": \"/<rootDir>\",\n  \"@@\": \"/<rootDir>\",\n  \"~\": \"/<rootDir>\",\n  \"@\": \"/<rootDir>\",\n  \"assets\": \"/<rootDir>/assets\",\n  \"public\": \"/<rootDir>/public\"\n}\n```\n\n你也可以自己定义\n\n```ts\nimport { defineNuxtConfig } from 'nuxt'\n\nexport default defineNuxtConfig({\n  alias: {\n    'images': fileURLToPath(new URL('./assets/images', import.meta.url)),\n    'style': fileURLToPath(new URL('./assets/style', import.meta.url)),\n  }\n})\n```\n\n- css\n\n```ts\nexport default defineNuxtConfig({\n  css: [\n  // Load a Node.js module directly (here it's a Sass file).\n  'bulma',\n  // CSS file in the project\n  '@/assets/css/main.css',\n  // SCSS file in the project\n  '@/assets/css/main.scss'\n]\n})\n```\n\n下次讲数据获取，以及一些内置的 composables，至于什么时候，那就不一定了。\n\n好，完。"

  // const html = markdownToHTML(value)

  return <div>ArticlePage</div>
}

ArticlePage.getLayout = (page) => (
  <Layout mobile={false}>
    {page}
  </Layout>
)

export default ArticlePage
