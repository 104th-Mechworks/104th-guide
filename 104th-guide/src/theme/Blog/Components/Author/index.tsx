import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link, {type Props as LinkProps} from '@docusaurus/Link';
import AuthorSocials from '@theme/Blog/Components/Author/Socials';
import type {Props} from '@theme/Blog/Components/Author';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

function MaybeLink(props: LinkProps): ReactNode {
  if (props.href) {
    return <Link {...props} />;
  }
  return <>{props.children}</>;
}

function AuthorTitle({title}: {title: string}) {
  return (
    <small className={styles.authorTitle} title={title}>
      {title}
    </small>
  );
}

function AuthorRank({rank}: {rank?: string}) {
  if (!rank) return null;
  
  const getRankColor = (rank: string): string => {
    switch (rank.toLowerCase()) {
      case 'Marshal Commander':
        return '#ff0000'; // Gold
      case 'Senior Commander':
        return '#FF4500'; // Orange Red
      case 'Major':
        return '#FF6347'; // Tomato
      case 'Captain':
        return '#FF69B4'; // Hot Pink
      case 'Lieutenant':
        return '#9370DB'; // Medium Purple
      case 'Warrant Officer':
        return '#831f18'; // Dark Red
      case 'ARC Trooper':
        return '#f009c9'; // pink
      case 'Wing Commander':
        return '#0c6fac'; // light blue
      case 'Commodore':
        return '#1447f0'; // blue
      case 'Battalion Commander':
        return '#f1c40f'; // yellow
      default:
        return '#666';
    }
  };

  const rankColor = getRankColor(rank);
  
  return (
    <small className={styles.authorRank} style={{color: rankColor, fontWeight: 'bold'}}>
      {rank}
    </small>
  );
}

function AuthorName({name, as, rank}: {name: string; as: Props['as']; rank?: string}) {
  const getRankColor = (rank?: string): string => {
    if (!rank) return 'inherit';
    
    switch (rank.toLowerCase()) {
      case 'marshal commander':
        return '#ff0000'; // Gold
      case 'senior commander':
        return '#FF4500'; // Orange Red
      case 'major':
        return '#FF6347'; // Tomato
      case 'captain':
        return '#FF69B4'; // Hot Pink
      case 'lieutenant':
        return '#9370DB'; // Medium Purple
      case 'warrant officer':
        return '#831f18'; // Dark Red
      case 'arc trooper':
        return '#f009c9'; // pink
      case 'wing commander':
        return '#0c6fac'; // light blue
      case 'commodore':
        return '#1447f0'; // blue
      case 'battalion commander':
        return '#f1c40f'; // yellow
      case 'commander':
        return '#e67e22'; // orange
      default:
        return '#666';
    }
  };

  const rankColor = getRankColor(rank);
  
  if (!as) {
    return <span className={styles.authorName} style={{color: rankColor}}>{name}</span>;
  } else {
    return (
      <Heading as={as} className={styles.authorName} style={{color: rankColor}}>
        {name}
      </Heading>
    );
  }
}

function AuthorBlogPostCount({count}: {count: number}) {
  return <span className={clsx(styles.authorBlogPostCount)}>{count}</span>;
}

// Note: in the future we might want to have multiple "BlogAuthor" components
// Creating different display modes with the "as" prop may not be the best idea
// Explainer: https://kyleshevlin.com/prefer-multiple-compositions/
// For now, we almost use the same design for all cases, so it's good enough
export default function BlogAuthor({
  as,
  author,
  className,
  count,
}: Props): ReactNode {
  const {name, title, url, imageURL, email, page} = author;
  // Extract rank from author data (it might be in the author object or we need to get it from authors.yml)
  const rank = (author as any).rank;
  const link =
    page?.permalink || url || (email && `mailto:${email}`) || undefined;

  return (
    <div
      className={clsx(
        'avatar margin-bottom--sm',
        className,
        styles[`author-as-${as}`],
      )}>
      {imageURL && (
        <MaybeLink href={link} className="avatar__photo-link">
          <img
            className={clsx('avatar__photo', styles.authorImage)}
            src={imageURL}
            alt={name}
          />
        </MaybeLink>
      )}

      {(name || title) && (
        <div className={clsx('avatar__intro', styles.authorDetails)}>
          <div className="avatar__name">
            {name && (
              <MaybeLink href={link}>
                <AuthorName name={name} as={as} rank={rank} />
              </MaybeLink>
            )}
            {count !== undefined && <AuthorBlogPostCount count={count} />}
          </div>
          {!!rank && <AuthorRank rank={rank} />}
          {!!title && <AuthorTitle title={title} />}

          {/*
            We always render AuthorSocials even if there's none
            This keeps other things aligned with flexbox layout
          */}
          <AuthorSocials author={author} />
        </div>
      )}
    </div>
  );
}
