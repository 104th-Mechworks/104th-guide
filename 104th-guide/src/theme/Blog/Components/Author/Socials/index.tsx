import type {ComponentType, ReactNode} from 'react';
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import type {Props} from '@theme/Blog/Components/Author/Socials';

import Twitter from '@theme/Icon/Socials/Twitter';
import GitHub from '@theme/Icon/Socials/GitHub';
import X from '@theme/Icon/Socials/X';
import StackOverflow from '@theme/Icon/Socials/StackOverflow';
import LinkedIn from '@theme/Icon/Socials/LinkedIn';
import DefaultSocialIcon from '@theme/Icon/Socials/Default';
import Bluesky from '@theme/Icon/Socials/Bluesky';
import Instagram from '@theme/Icon/Socials/Instagram';
import Threads from '@theme/Icon/Socials/Threads';
import Youtube from '@theme/Icon/Socials/YouTube';
import Mastodon from '@theme/Icon/Socials/Mastodon';
import Twitch from '@theme/Icon/Socials/Twitch';
import Discord from '../../../../Icon/Socials/Discord';

import styles from './styles.module.css';

type SocialIcon = ComponentType<{className: string}>;

type SocialPlatformConfig = {Icon: SocialIcon; label: string};

const SocialPlatformConfigs: Record<string, SocialPlatformConfig> = {
  twitter: {Icon: Twitter, label: 'Twitter'},
  github: {Icon: GitHub, label: 'GitHub'},
  stackoverflow: {Icon: StackOverflow, label: 'Stack Overflow'},
  linkedin: {Icon: LinkedIn, label: 'LinkedIn'},
  x: {Icon: X, label: 'X'},
  bluesky: {Icon: Bluesky, label: 'Bluesky'},
  instagram: {Icon: Instagram, label: 'Instagram'},
  threads: {Icon: Threads, label: 'Threads'},
  mastodon: {Icon: Mastodon, label: 'Mastodon'},
  youtube: {Icon: Youtube, label: 'YouTube'},
  twitch: {Icon: Twitch, label: 'Twitch'},
  discord: {Icon: Discord, label: 'Discord'},
};

function getSocialPlatformConfig(platformKey: string): SocialPlatformConfig {
  return (
    SocialPlatformConfigs[platformKey] ?? {
      Icon: DefaultSocialIcon,
      label: platformKey,
    }
  );
}

// Helper function to convert Discord user ID to full URL
function getDiscordUrl(value: string): string {
  // If it's already a full URL, return as is
  if (value.startsWith('http')) {
    return value;
  }
  // If it's just a user ID, construct the Discord profile URL
  return `https://discord.com/users/${value}`;
}

function SocialLink({platform, link}: {platform: string; link: string}) {
  const {Icon, label} = getSocialPlatformConfig(platform);
  
  // Handle Discord URLs specially
  const finalLink = platform === 'discord' ? getDiscordUrl(link) : link;
  
  return (
    <Link className={styles.authorSocialLink} href={finalLink} title={label}>
      <Icon className={clsx(styles.authorSocialLink)} />
    </Link>
  );
}

export default function BlogAuthorSocials({
  author,
}: {
  author: Props['author'];
}): ReactNode {
  const {socials} = author;
  if (!socials) {
    return null;
  }
  const entries = Object.entries(socials);
  if (entries.length === 0) {
    return null;
  }

  return (
    <div className={styles.authorSocials}>
      {entries.map(([platform, linkUrl]) => {
        return <SocialLink key={platform} platform={platform} link={linkUrl} />;
      })}
    </div>
  );
}
