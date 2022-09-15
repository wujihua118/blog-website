import React from 'react'
import ReactTooltip from 'react-tooltip'
import { NextPageWithLayout } from './_app'
import Layout from 'components/layout'
import { CONNECT_LINKS } from 'config/app.config'

const AboutPage: NextPageWithLayout = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-[210px] rounded overflow-hidden relative">
        <img
          className="duration-200 w-full h-full scale-[1.02] hover:scale-100"
          src={'/about.jpeg'}
          alt={'about'}
        />
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col">
          <i className="iconfont mx-auto text-white !text-7xl">&#xe61d;</i>
          <p className="text-center text-white text-sm mt-4">
            寄蜉蝣于天地，渺沧海之一粟
          </p>
        </div>
      </div>
      <div className="bg-bg-100 rounded my-3 p-3">
        <div className="flex flex-col items-center ">
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-border">
            <img className="hover:rotate-[360deg] duration-500" src="/avatar.jpeg" alt="avatar" />
          </div>
          <h1 className="mt-2 text-lg text-font-100 font-bold">Evan</h1>
          <p className="italic">电子迷 / 代码控 / 强迫患者</p>
          <ul className="grid grid-cols-3 gap-3 mt-3">
            <li className="px-3 py-2 bg-green flex justify-center items-center rounded">
              <i className="iconfont text-white">&#xe602;</i>
            </li>
            <li className="px-3 py-2 bg-[#29A8EB] flex justify-center items-center rounded">
              <a href="">
                <i className="iconfont text-white">&#xe9ac;</i>
              </a>
            </li>
            <li className="px-3 py-2 bg-[#e6162d] flex justify-center items-center rounded">
              <a href="">
                <i className="iconfont text-white">&#xe6c4;</i>
              </a>
            </li>
          </ul>
          <ul className="grid grid-cols-4 gap-3 mt-3">
            <li className="px-3 py-2 bg-black flex justify-center items-center rounded">
              <a href={CONNECT_LINKS.github} target="_blank" rel="noreferrer">
                <i className="iconfont text-white">&#xe601;</i>
                <span className="text-white ml-1">Github</span>
              </a>
            </li>
            <li className="px-3 py-2 bg-[#056CE8] flex justify-center items-center rounded">
              <a href={CONNECT_LINKS.zhihu} target="_blank" rel="noreferrer">
                <i className="iconfont text-white">&#xea8b;</i>
                <span className="text-white ml-1">知乎</span>
              </a>
            </li>
            <li className="px-3 py-2 bg-[#1F80FF] flex justify-center items-center rounded">
              <a href={CONNECT_LINKS.juejin} target="_blank" rel="noreferrer">
                <i className="iconfont text-white">&#xe60b;</i>
                <span className="text-white ml-1">掘金</span>
              </a>
            </li>
            <li className="px-3 py-2 bg-red flex justify-center items-center rounded">
              <a href={CONNECT_LINKS.music_163} target="_blank" rel="noreferrer">
                <i className="iconfont text-white">&#xe622;</i>
                <span className="text-white ml-1">网抑云</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-bg-100 rounded my-3 p-3">
        <h1 className="text-base text-blue">关于我</h1>
        <ul className="list-disc list-inside mt-2">
          <li>Base 成都 95 后</li>
          <li className="my-1">页面仔</li>
          <li>游戏公司、主要写界面、偶尔写游戏</li>
          <li className="mt-1">相信代码改变世界</li>
        </ul>
      </div>
      <div className="bg-bg-100 rounded my-3 p-3">
        <h1 className="text-base text-green">关于网站</h1>
        <ul className="list-[square] list-inside mt-2">
          <li>前台：React + Next + TypeScript</li>
          <li className="my-1">后台：React + TypeScript + Ant Design</li>
          <li>服务端：Nest + TypeScript + MySQL + TypeORM</li>
        </ul>

      </div>
      <div className="bg-bg-100 rounded my-3 p-3">
        <h1 className="text-base text-orangered">关于未来</h1>
        <ul className="list-[decimal] list-inside mt-2">
          <li>不确定</li>
          <li className="my-1">希望保持对代码的热爱</li>
          <li>奔赴山海、高处见</li>
        </ul>
      </div>
      <div className="bg-bg-100 rounded my-3 p-3 min-h-[120px] flex justify-center items-center">
        种一个月亮 🌛
      </div>
    </div>
  )
}

AboutPage.getLayout = (page) => <Layout>{page}</Layout>

export default AboutPage
