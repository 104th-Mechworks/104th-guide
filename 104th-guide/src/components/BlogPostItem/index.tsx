import React from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import AuthorWithRank from '../AuthorWithRank';
import styles from './styles.module.css';

export default function BlogPostItem(): React.JSX.Element {
  const {metadata, frontMatter} = useBlogPost();
  
  const {title, description, authors, tags, date} = metadata;
  
  // For now, we'll use a simplified approach since we need to access authors data differently
  const authorEntries = authors.map((author) => ({
    name: author.name,
    title: author.title,
    rank: (author as any).rank, // We'll need to extend the author type
    image_url: (author as any).image_url,
    url: (author as any).url,
  }));

  return (
    <article className={styles.blogPostItem}>
      <header className={styles.blogPostHeader}>
        <h2 className={styles.blogPostTitle}>
          <a href={metadata.permalink}>{title}</a>
        </h2>
        <div className={styles.blogPostMeta}>
          <time dateTime={new Date(date).toISOString()}>
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </header>
      
      {description && (
        <div className={styles.blogPostDescription}>
          {description}
        </div>
      )}
      
      {authorEntries.length > 0 && (
        <div className={styles.blogPostAuthors}>
          <h4>Authors:</h4>
          {authorEntries.map((author, index) => (
            <AuthorWithRank key={index} author={author} />
          ))}
        </div>
      )}
      
      {tags.length > 0 && (
        <div className={styles.blogPostTags}>
          <h4>Tags:</h4>
          <div className={styles.tagList}>
            {tags.map((tag) => (
              <span key={tag.permalink} className={styles.tag}>
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
} 