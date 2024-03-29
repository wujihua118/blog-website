import { fetchArticleListBySlug, fetchCategoryBySlug } from 'api'
import ArticleList from 'components/article/list'
import BlurImage from 'components/common/blur-image'
import Ad from 'components/common/ad'
import Layout from 'components/layout'
import { META } from 'config/app.config'
import type { NextPageWithLayout } from 'pages/_app'
import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import type { Article, Category } from 'types'

interface Props {
  articles: Array<Article>
  category: Category
  total: number
  totalPage: number
}

const CategoryPage: NextPageWithLayout<Props> = ({ articles, category, total, totalPage }) => {
  return (
    <>
      <Helmet>
        <title>{`${category.name} - ${META.title}`}</title>
      </Helmet>
      <div className="w-full h-[168px] sm:h-[210px] mt-3 sm:mt-0 rounded overflow-hidden relative">
        <BlurImage
          src={category?.background}
          alt={category?.name}
          className="duration-200 scale-[1.02] hover:scale-100 rounded"
        >
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <h1 className="text-center text-white text-lg">{category?.name}</h1>
            <p className="text-center text-white text-sm mt-2">{category?.description}</p>
          </div>
        </BlurImage>
      </div>
      <Ad />
      <ArticleList
        articles={articles}
        total={total}
        totalPage={totalPage}
      />
    </>
  )
}

CategoryPage.getLayout = page => <Layout>{page}</Layout>

CategoryPage.getInitialProps = async ({ query }) => {
  const { slug } = query
  const { data, total, total_page } = await fetchArticleListBySlug(slug as string, 'category')
  const category = await fetchCategoryBySlug(slug as string)

  return {
    category,
    articles: data,
    total,
    totalPage: total_page,
  }
}

export default CategoryPage
