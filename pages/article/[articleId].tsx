import Color from 'color'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { fetchArticleComments, fetchArticleDetail, fetchArticleList } from 'api'
import CommentList from 'components/comment/list'
import Publish from 'components/comment/publish'
import DateTime from 'components/common/date'
import Divider from 'components/common/divider'
import Layout from 'components/layout'
import type { NextPageWithLayout } from 'pages/_app'
import markdownToHTML from 'plugins/markdown'
import { Article, CommentReponse } from 'types'

type Props = {
  article: Article
  comments: CommentReponse
}

const ArticlePage: NextPageWithLayout<Props> = ({ article, comments }) => {

  const html = markdownToHTML(article.content)

  return (
    <div>
      <div className="w-full h-full bg-bg-100 rounded p-3">
        {/* <Helmet>
        <title>{'evanone.site' + ' - ' + article?.title}</title>
      </Helmet> */}
        <article>
          <h1 className="text-center font-bold text-font-100 text-xl my-2">{article.title}</h1>
          <div className="mt-3 text-center">
            <DateTime date={article.created_at * 1000} from={false} />
            <span>&nbsp;&nbsp;·&nbsp;&nbsp;阅读 {article.views}</span>
          </div>
          <div className="w-full h-[210px] mt-3 p-2 rounded-sm border border-bg-200">
            <img className="w-full h-full rounded-sm" src={article.thumb} alt={article.title} />
          </div>
          <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
          <Divider type="dashed" />
          <div>
            <span>分类：</span>
            <a
              className="underline underline-offset-2 text-font-200 hover:text-blue duration-200"
              href={`/category/${article.category?.slug}`}
            >
              {article.category?.name}
            </a>
          </div>
          <div className="mt-2">
            <span>标签：</span>
            {article.tags?.map(tag => (
              <a
                href={`/tag/${tag.slug}`}
                className="px-[10px] py-1 text-xs rounded-sm mr-2"
                key={tag.id}
                style={{
                  color: tag.color,
                  background: Color(tag.color).alpha(0.2).lighten(0.2).hsl().string()
                }}
              >{tag.name}</a>
            ))}
          </div>
          <div className="mt-2">
            <span>永久链接：</span>
            <a
              href={`https://evanone.site/article/${article.article_id}`}
              className="underline underline-offset-2 text-font-200 hover:text-blue duration-200"
            >https://evanone.site/article/{article.article_id}</a>
          </div>
          <a
            className="mt-2 inline-block text-font-200 underline-offset-2 hover:text-blue hover:underline duration-200"
            href="">
            遵循CC 4.0 BY-SA版权协议，转载请注明出处，严禁非法转载
          </a>
        </article>
      </div>
      <div className="my-3 w-full h-full rounded bg-bg-100 p-3">
        <Publish articleId={article?.id} />
        <Divider />
        <CommentList
          comments={comments?.data}
          total={comments?.total}
          totalPage={comments?.total_page}
        />
      </div>
    </div>
  )
}

ArticlePage.getLayout = (page) => <Layout>{page}</Layout>

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const result = await fetchArticleList({ page_size: 999 })
    const paths = result.data.map(article => {
      return {
        params: { articleId: article.article_id }
      }
    })
    return { paths: paths, fallback: false }
  } catch (error) {
    return { paths: [], fallback: false }
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  const article = await fetchArticleDetail(params?.articleId as string)
  const comments = await fetchArticleComments(article.id)

  return {
    props: {
      article,
      comments
    }
  }
}

export default ArticlePage
