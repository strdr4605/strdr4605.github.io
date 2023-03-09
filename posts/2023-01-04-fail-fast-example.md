---
title: "Fail fast example"
date: 2023-01-04
description: Example of using fail fast approach
tags:
  - development
---

Let's say that our software can have 3 types of pages:  
`"instagram" | "facebook" | "twitter"`

```js
export const hasPagePushNotifications = (page) => {
  if (page.type !== "instagram" || page.demo || isCustomPage(page.publicPageId)) {
    return false;
  }

  // Verify if instagram page has push notifications
};
```

```js
export const hasPagePushNotifications = (page) => {
  if (!isIgComposePage(page)) {
    throw new Error('This function should be called only for Instagram pages.');
  }
  const { publicPageId, demo } = page;

  if (demo || isCustomPage(publicPageId)) {
    return false;
  }

  // Verify if instagram page has push notifications
};
```
https://github.com/Planable/planable-app/pull/2484

### Resources

- https://martinfowler.com/ieeeSoftware/failFast.pdf
- https://dzone.com/articles/fail-fast-principle-in-software-development
- https://www.fastcompany.com/90136012/fail-fast-in-software-design-is-a-myth
- https://stackoverflow.com/questions/36195626/fail-fast-design-pattern
