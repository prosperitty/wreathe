'use client'
import Comment from '@/app/(Content)/components/Comment'
import LikeButton from '@/app/(Content)/components/LikeButton'
import { useAuthContext } from '@/app/components/context'
import { useEffect, useState } from 'react'

export default function CommentsSection(props) {
  let { userData } = useAuthContext()
  let [commentList, setCommentList] = useState([])

  useEffect(() => {
    if (userData) {
      const commentList = props.comments.map((post) => {
        const isLiked = post.comment_likes.some(
          (like) =>
            like.user_uid === userData.user_uid &&
            like.comment_uid === post.comment_uid
        )
        console.log(isLiked)
        return (
          <li key={post.comment_uid}>
            <Comment
              commentData={post}
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
              likeButton={<LikeButton isLiked={false} commentData={post} />}
            />
          </li>
        )
      })
      setCommentList(commentList)
    }
  }, [userData])

  return (
    <section className='mt-12'>
      <ul>{commentList}</ul>
    </section>
  )
}
