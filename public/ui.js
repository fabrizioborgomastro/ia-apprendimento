export function parseRoute(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  const lessonMatch = path.match(/^\/lesson\/([^/]+)$/)
  if (lessonMatch) return { name: 'lesson', slug: decodeURIComponent(lessonMatch[1]) }
  if (path === '/sprint') return { name: 'sprint' }
  if (path === '/review') return { name: 'review' }
  if (path === '/interview') return { name: 'interview' }
  if (path === '/login') return { name: 'login' }
  return { name: 'dashboard' }
}

export function getDashboardState(lessons, progress) {
  const completedCount = lessons.filter((lesson) => progress[lesson.id]?.status === 'completed').length
  const nextLesson = lessons.find((lesson) => progress[lesson.id]?.status !== 'completed') || lessons.at(-1)
  const reviewCount = Object.values(progress).reduce((count, item) => count + (item.reviewQuestionIds?.length || 0), 0)
  return {
    completedCount,
    nextLesson,
    reviewCount,
    percent: lessons.length ? Math.round((completedCount / lessons.length) * 100) : 0
  }
}

export function quizFeedback(question, selectedOption) {
  const correct = selectedOption === question.correctOption
  return { correct, label: correct ? 'Corretto' : 'Da rivedere', explanation: question.explanation }
}
