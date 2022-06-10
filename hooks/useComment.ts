import * as React from 'react'
import * as mainApi from '../api'

function useComment (refreshComments: () => void, setId?: (id: number) => void) {
  const [nickname, setNickname] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [site, setSite] = React.useState('')
  const [comment, setComment] = React.useState('')

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value)
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleSiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSite(event.target.value)
  }

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value)
  }

  const handleReply = (comment: IComment) => {
    mainApi.commentService.create({
      content: comment.content,
      parentId: comment.id || comment.parentId,
      name: nickname,
      email,
      site,
      replyUserName: comment.name,
      replyUserEmail: comment.email,
    })
    .then(() => {
      refreshComments()
    })

  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, replyComment?: IComment) => {
    event.preventDefault()

    let parentId = replyComment?.parentId

    if (replyComment?.parentId === null) {
      parentId = replyComment?.id
    }

    mainApi.commentService.create({
      parentId,
      name: nickname,
      email,
      site,
      content: comment,
      replyUserName: replyComment?.name,
      replyUserEmail: replyComment?.email,
    })
      .then(() => {
        setNickname('')
        setEmail('')
        setSite('')
        setComment('')
        refreshComments()
        setId?.(0)
      })
  }

  return {
    nickname,
    email,
    site,
    comment,
    handleNicknameChange,
    handleEmailChange,
    handleSiteChange,
    handleCommentChange,
    handleSubmit,
    handleReply
  }
}

export default useComment
