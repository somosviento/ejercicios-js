/**
 * Format a date string to a more readable format
 * @param {string} dateString - Date string in ISO format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

/**
 * Truncate text to a specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 150) => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};

/**
 * Calculate reading time for an article
 * @param {string} content - Article content
 * @returns {number} Reading time in minutes
 */
export const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

/**
 * Generate a slug from a string
 * @param {string} text - Text to convert to slug
 * @returns {string} URL-friendly slug
 */
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

/**
 * Get related posts based on categories and tags
 * @param {Object} currentPost - Current post
 * @param {Array} allPosts - All available posts
 * @param {number} limit - Maximum number of related posts to return
 * @returns {Array} Related posts
 */
export const getRelatedPosts = (currentPost, allPosts, limit = 3) => {
  return allPosts
    .filter(post => post.id !== currentPost.id)
    .sort((a, b) => {
      // Calculate relevance score based on matching categories and tags
      const aScore = calculateRelevanceScore(currentPost, a);
      const bScore = calculateRelevanceScore(currentPost, b);
      return bScore - aScore;
    })
    .slice(0, limit);
};

/**
 * Calculate relevance score between two posts
 * @param {Object} post1 - First post
 * @param {Object} post2 - Second post
 * @returns {number} Relevance score
 */
const calculateRelevanceScore = (post1, post2) => {
  let score = 0;
  
  // Category match has higher weight
  if (post1.category === post2.category) {
    score += 3;
  }
  
  // Count matching tags
  const matchingTags = post1.tags.filter(tag => post2.tags.includes(tag));
  score += matchingTags.length;
  
  return score;
};
