'use client'
import Comment from '@/app/(Content)/components/Comment'
import LikeButton from '@/app/(Content)/components/LikeButton'
import { useAuthContext } from '@/app/components/context'
import { useEffect, useState } from 'react'

interface Props {
  comments: Array<CommentData>
  threadAuthor: string
}

export default function CommentsSection(props: Props) {
  const { userData } = useAuthContext()
  const [commentList, setCommentList] = useState<JSX.Element[]>([])

  const personalizedComments = props.comments.map((post) => {
    const isLiked = userData
      ? post.comment_likes.some(
          (like) =>
            like.user_uid === userData.user_uid &&
            like.comment_uid === post.comment_uid,
        )
      : false
    console.log(isLiked)
    return (
      <li key={post.comment_uid}>
        <Comment
          commentData={post}
          threadAuthor={props.threadAuthor}
          likeButton={<LikeButton isLiked={isLiked} commentData={post} />}
        />
      </li>
    )
  })

  const comments = props.comments.map((post) => {
    return (
      <li key={post.comment_uid}>
        <Comment
          commentData={post}
          threadAuthor={props.threadAuthor}
          likeButton={<LikeButton isLiked={false} commentData={post} />}
        />
      </li>
    )
  })

  useEffect(() => {
    if (userData) {
      setCommentList(personalizedComments)
    } else {
      setCommentList(comments)
    }
  }, [userData, comments, personalizedComments])

  return <ul>{commentList}</ul>
}
