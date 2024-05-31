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
  let { userData } = useAuthContext()
  let [commentList, setCommentList] = useState<JSX.Element[]>([])

  useEffect(() => {
    if (userData !== null) {
      const commentList = props.comments.map((post) => {
        const isLiked = post.comment_likes.some(
          (like) =>
            like.user_uid === userData.user_uid &&
            like.comment_uid === post.comment_uid,
        )
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
      setCommentList(commentList)
    } else {
      const commentList = props.comments.map((post) => {
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
      setCommentList(commentList)
    }
  }, [props.comments, props.threadAuthor, userData])

  return <ul>{commentList}</ul>
}
