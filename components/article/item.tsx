import Link from 'next/link'
import * as React from 'react'
import DateTime from 'components/common/date'

const ArticleItem: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="bg-bg-100 rounded p-3 flex justify-start mt-3">
      <div className="rounded w-[180px] h-[102px] border border-border overflow-hidden">
        <Link href={`/article/${article.articleId}`}>
          <img
            className="duration-200
            scale-100 hover:scale-105 cursor-pointer w-full h-full"
            src={article.thumb}
            alt={article.title}
          />
        </Link>
      </div>
      <div className="ml-3 flex-1 flex flex-col justify-between">
        <Link href={`/article/${article.articleId}`}>
          <a className="inline-block self-start">
            <h1 className="text-lg text-font-100 mb-3 hover:underline hover:text-blue duration-200 hover:underline-offset-4">{article.title}</h1>
          </a>
        </Link>
        <p className="mb-4 text-font-200">{article.summary}</p>
        <div className="flex w-full justify-between items-center text-font-200 text-[12px]">
          <span className="flex items-center">
            <i className="iconfont">&#xe680;</i>
            <DateTime className="ml-[2px]" date={article.createdAt} />
          </span>
          <span className="flex items-center">
            <i className="iconfont">&#xe63d;</i>
            <span className="ml-[2px]">{article.views}</span>
          </span>
          <span className="flex items-center">
            <i className="iconfont">&#xe7c8;</i>
            <span className="ml-[2px]">{article.likes}</span>
          </span>
          <span className="flex items-center">
            <i className="iconfont">&#xe6aa;</i>
            <span className="ml-[2px]">{article.comments}</span>
          </span>
          <span className="flex items-center">
            <i className="iconfont">&#xe748;</i>
            <span className="ml-[2px]">{article.category.name}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ArticleItem
