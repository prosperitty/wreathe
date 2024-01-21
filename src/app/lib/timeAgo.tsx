export default function timeAgo(postTimestamp: string) {
  // Convert the post timestamp to a Date object
  const postDate = new Date(postTimestamp)

  // Get the current date and time
  const currentDate = new Date()

  // Calculate the difference in milliseconds
  const timeDifference = currentDate - postDate

  // Calculate seconds, minutes, and hours
  const seconds = Math.floor(timeDifference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  // Display the result based on the time elapsed
  if (seconds < 60) {
    return seconds + ' seconds ago'
  } else if (minutes < 60) {
    return minutes + ' minutes ago'
  } else if (hours < 24) {
    return hours + ' hours ago'
  } else {
    // You may want to add more logic for days, weeks, etc.
    return postDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
}
