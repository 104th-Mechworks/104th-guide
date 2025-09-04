# Contributing to the guide

We welcome contributions to the 104th Guide! Whether you're fixing a typo, adding new content, or improving existing sections, your help is appreciated. Here's how you can contribute:

## Docs
found in the [docs](./docs) directory.
each folder in the docs folder needs a `_category_.json` file to define the sidebar structure.

### `_category_.json` example:
```json
{
  "label": "Ranks",
  "position": 2,
  "link": {
    "type": "generated-index",
    "description": "All 104th Ranks explained."
  }
}
```

### Adding a new doc
each 'page' is a md or mdx file
they require a header in the following format:
```
---
sidebar_position: number
title: title
sidebar_custom_props:
  icon: /img/path_to_image
tags: [tags here]
---
```

### Doc structure
- each doc should be in a folder that matches the sidebar structure
- each folder should have a `_category_.json` file to define the sidebar structure
- each doc should have a unique `sidebar_position` to define its order in the sidebar
- each doc should have a `title` that will be displayed in the sidebar and at the top of the page
- each doc should have a `sidebar_custom_props` with an `icon` that will be displayed in the sidebar next to the title
- each doc should have `tags` that will be used for searching and filtering
- each doc should have a `slug` that will be used in the URL


## Blog
there are 2 folders for blog posts:
- [updates](./update): for unit updates and announcements
- [army updates](./army-updates): for army updates and announcements

### adding a new update post
each 'post' is a md or mdx file
at the top of the post, you need a header in the following format:
```
---
slug: 5.1.0-update
title: Update 5.1.0
authors: [dark]
tags: [rules]
date: 2024-01-21T01:00:00.000Z
---
```
- `slug`: should match the file name (without the .mdx extension)
- `title`: the title of the post
- `authors`: an array of authors (must be in the [authors.yml](./authors.yml) file)
- `tags`: an array of tags for the post
- `date`: the date of the post in format YYYY-MM-DD
    - T01:00:00.000Z can be added for multiple posts on the same day adjusting the time to properly order the posts
- the post content goes below the header
- you can use `<!-- truncate -->` to define where the post should be truncated on the main updates page
    - this is the summary that will be shown on the main updates page

#### Unit updates
file name format: `year.update number.part-update.mdx`
example: `5.12.2-update.mdx`
- 5 is the 5th year of the 104th
- 12 is the 12th major update of the year
- 2 is the 2nd part of that update

#### Army updates
file name format: `title.mdx`