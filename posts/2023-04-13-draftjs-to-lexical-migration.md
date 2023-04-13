---
title: "DraftJS to Lexical migration"
date: 2023-04-13
description: A story on how we migrated our editor from DraftJS to Lexical
tags:
  - javascript
---

## Preface

The project that I am working on was using DraftJS as main editor.
When we decided to work on a new feature with rich text editor the DraftJS editor was sunsetting, and we explored other options.

At that time Lexical was announced but not released to the public. So we investigated all popular options:

![editors table](/editors-table.png)

Top picks for us were Tiptap and Remirror, and in the end with decided to go with Remirror.
But while we were working on MVP with Remirror, Lexical was released and we gave it a chance.
Although it was still fresh and with bugs and missing features, we had a successful POC and decided to use Lexical as our new editor.

We build our new feature with rich text + collaborative editing and were happy with Lexical, so we decided move all editors from DraftJS to Lexical.

## Preparation

We use DraftJS editor for posts and comments. Both editors are plain text with emoji and mention entities. Hashtag and links are highlighted with plugins.  
We decided to start with a **"DraftJS-Lexical feature parity"** project. Basically replicating our DraftJS features in Lexical.

Under a internal feature flag we replaced all editors with Lexical.  
For our use case we use `HashtagPlugin` and  `AutoLinkPlugin` from Lexical, and 2 custom plugins for Emoji and Mention inspired from Lexical playground.

After the feature parity and user experience were acceptable. 
We decided first to migrate comments as they were fewer and not the critical feature for the platform.


