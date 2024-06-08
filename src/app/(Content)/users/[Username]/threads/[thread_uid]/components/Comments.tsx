'use client'
import Comment from '@/app/(Content)/components/Comment'
import LikeButton from '@/app/(Content)/components/LikeButton'
import { callRefreshToken } from '@/app/lib/callRefreshToken'
import { useEffect, useState } from 'react'

interface Props {
  comments: Array<CommentData>
  threadAuthor: string
}

export default function CommentsSection(props: Props) {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    ;(async () => {
      const data = await callRefreshToken()
      setUserData(data)
    })()
  }, [])

  if (userData) {
    return (
      <ul>
        {props.comments.map((post) => {
          const isLiked = userData
            ? post.comment_likes.some(
                (like) =>
                  like.user_uid === userData.user_uid &&
                  like.comment_uid === post.comment_uid,
              )
            : false
          return (
            <li key={post.comment_uid}>
              <Comment
                commentData={post}
                threadAuthor={props.threadAuthor}
                likeButton={<LikeButton isLiked={isLiked} commentData={post} />}
              />
            </li>
          )
        })}
      </ul>
    )
  } else {
    return (
      <ul>
        {props.comments.map((post) => {
          return (
            <li key={post.comment_uid}>
              <Comment
                commentData={post}
                threadAuthor={props.threadAuthor}
                likeButton={<LikeButton isLiked={false} commentData={post} />}
              />
            </li>
          )
        })}
      </ul>
    )
  }
}
