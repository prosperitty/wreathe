interface CommentData {
  comment_uid: string
  content: string
  ispublished: boolean
  comment_timestamp: Date
  thread_ref: string
  author_ref: string
  wreathe_user: wreathe_user
  thread: thread
  comment_likes: CommentLikes[]
}

interface ThreadData {
  thread_uid: string
  content: string
  ispublished: boolean
  thread_timestamp: Date
  author_ref: string
  comment: Array<Comment>
  wreathe_user: UserData
  likes: Array<Likes>
}

interface UserData {
  user_uid: string
  first_name: string
  last_name: string
  email: string
  username: string
  user_password: string
  bio: string
  refresh_token: string
  comment: Array<CommentData>
  thread: Array<ThreadData>
  likes: Array<Likes>
  comment_likes: Array<CommentLikes>
  following: Array<Follower>
  followers: Array<Follower>
  sender: Array<Message>
  recepient: Array<Message>
}

interface Likes {
  user_uid: string
  thread_uid: string
  timestamp: Date
  thread: ThreadData
  wreathe_user: UserData
}

interface CommentLikes {
  user_uid: string
  comment_uid: string
  timestamp: Date
  comment: CommentData
  wreathe_user: UserData
}

interface Follower {
  followerId: string
  followingId: string
  follower: UserData
  following: UserData
}

interface Message {
  message_uid: string
  sender_ref: string
  recepient_ref: string
  content: string
  message_timestamp: Date
  sender: UserData
  recepient: UserData
}

interface UserCookie {
  user_uid: string
  first_name: string
  last_name: string
  email: string | null
  username: string
}
