import React from 'react';
import styles from './styles.module.css';

interface AuthorWithRankProps {
  author: {
    name: string;
    title?: string;
    rank?: string;
    image_url?: string;
    url?: string;
  };
}

const getRankColor = (rank?: string): string => {
  if (!rank) return '#666';
  
  switch (rank.toLowerCase()) {
    case 'general':
      return '#FFD700'; // Gold
    case 'colonel':
      return '#FF4500'; // Orange Red
    case 'major':
      return '#FF6347'; // Tomato
    case 'captain':
      return '#FF69B4'; // Hot Pink
    case 'lieutenant':
      return '#9370DB'; // Medium Purple
    case 'sergeant':
      return '#32CD32'; // Lime Green
    case 'corporal':
      return '#00CED1'; // Dark Turquoise
    case 'private':
      return '#87CEEB'; // Sky Blue
    default:
      return '#666'; // Default gray
  }
};

export default function AuthorWithRank({author}: AuthorWithRankProps): React.JSX.Element {
  const rankColor = getRankColor(author.rank);
  
  return (
    <div className={styles.authorContainer}>
      {author.image_url && (
        <img 
          src={author.image_url} 
          alt={author.name}
          className={styles.authorImage}
        />
      )}
      <div className={styles.authorInfo}>
        <div className={styles.authorName} style={{color: rankColor}}>
          {author.name}
        </div>
        {author.rank && (
          <div className={styles.authorRank} style={{color: rankColor}}>
            {author.rank}
          </div>
        )}
        {author.title && (
          <div className={styles.authorTitle}>
            {author.title}
          </div>
        )}
      </div>
    </div>
  );
} 