import axios from 'axios'

export const fetchWeiboList = async () => {
  const response = await axios.get('https://api.weibo.com/2/statuses/user_timeline.json', {
    timeout: 8000,
    params: {
      access_token: process.env.NEXT_PUBLIC_WEB_ACCESS_TOKEN,
    },
  })

  if (response.status === 200 && response.data.statuses) {
    return response.data.statuses
  } else {
    throw response.data
  }
}

export const fetchGithubContributions = async () => {
  const response = await axios.get('https://skyline.github.com/wujihua118/2022.json', {
    timeout: 8000,
  })

  if (response.status === 200 && response.data) {
    return response.data
  } else {
    throw response.data
  }
}
