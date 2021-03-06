import * as React from 'react'
import type { NextPage } from 'next'
import InfiniteScroll from 'react-infinite-scroller'
import ArticleList from '../components/Article/ArticleList'
import Recommend from '../components/Recommend'
import Swiper from '../components/Swiper'
import { GlobalContext } from '../context/globalContext'
import { HomeContainer } from '../styles/home'
import * as mainApi from '../api'
import { Main } from '../styles/components'

interface HomeProps {
  total: number
  articles: IArticle[]
  swipers: ISwiper[]
}

const pageSize = 12

const Home: NextPage<HomeProps> = ({
  total = 0,
  articles: defaultArticles = [],
  swipers
}) => {

  const { categories } = React.useContext(GlobalContext)
  const [page, setPage] = React.useState<number>(1)
  const [articles, setArticles] = React.useState<IArticle[]>(defaultArticles)

  React.useEffect(() => {
    setArticles(defaultArticles)
  }, [defaultArticles])

  const getArticles = React.useCallback((page: number) => {
    mainApi.articleService.findAll({
      page,
      pageSize
    }).then((res) => {
      setPage(page)
      setArticles((articles) => [...articles, ...res.data?.data])
    })
  }, [])

  return (
    <Main>
      <HomeContainer>
        <div className='home-left'>
          <div className='swiper-container'>
            <Swiper swipers={swipers} />
          </div>
          <InfiniteScroll
            pageStart={1}
            loadMore={getArticles}
            hasMore={page * pageSize < total}
            loader={
              <div className={'loading'} key={0}>
                loading ...
              </div>
            }
          >
            <ArticleList categories={categories} articles={articles} />
          </InfiniteScroll>
        </div>
        <Recommend />
      </HomeContainer>
    </Main>
  )
}

Home.getInitialProps = async () => {
  const [articles, swipers] = await Promise.all([
    mainApi.articleService.findAll({ page: 1, pageSize }),
    mainApi.swiperService.findAll({ page: 1, pageSize: 6 })
  ])

  return {
    total: articles.data?.total,
    articles: articles.data?.data,
    swipers: swipers.data?.data
  }
}

export default Home
