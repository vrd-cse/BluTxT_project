export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};

export const formatDate = (date: Date): string => {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Today
  if (date.toDateString() === now.toDateString()) {
    return formatTime(date);
  }
  
  // Yesterday
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  
  // Within the last week
  if (now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
  }
  
  // Default format for older dates
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  }).format(date);
};