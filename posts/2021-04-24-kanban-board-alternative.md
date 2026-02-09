---
title: Kanban/Sprint board isn't working for you? Try this!
slug: kanban-board-alternative
date: 2021-04-24
description: An alternative to kanban board. Using Google Docs as a planning tool.
tags:
  - management
  - tools
  - productivity
---

For most of the projects where I was involved we mostly used Kanban.
As an Engineer, I like Kanban because tasks are not bound to a specific sprint/deadline.
Another benefit for Kanban is that there aren't so many meetings as in Scrum.
As I know from some friends all these Scrum meetings can take up to 4 hours in a sprint.

I was happily using Kanban but one day a friend of mine told me about an alternative of Kanban/Scrum boards.

## The problem

His team was using a ticketing tool that was built mostly for Scrum.
But the team didn't want to waste time on all these Scrum meetings.
At the same time, there was a need to report to stakeholders the status of the project and what was done in the last n weeks.
So his team was using sprints as a week period. Every week, unfinished tasks were moved to a new sprint.
They also tried using a Kanban board, which solved the problem with task moving.
But with the accumulation of tasks in backlog, it was hard to navigate and also track what was done for each week.

The report to stakeholders had to be a document with tasks and maybe some comments, more like [minutes of meeting](https://en.wikipedia.org/wiki/Minutes).
This means that regardless of Scrum or Kanban after each weekly planning meeting, someone had to write this report.
I know that using Jira you have JQL that may print such reports in Confluence pages.
But as I understand from my friend this was not possible with this tool.

They started using an approach of planning and writing in a document file.

He called it **CHANGELOG planning**. But maybe this approach exits for a long time and has another name?! Let me know!

## The CHANGELOG planning approach

You can use any document writing tool, like Microsoft Word, Apple Pages.
But the best is to use an online collaborative writing tool like Google Docs, Confluence, Quip, or Notion.

As a demo I will write the structure here:

---

> ### Project weekly planning
>
> >Some description about the project, maybe some useful links
>
> #### Candidates
>
>  > Here are tasks that you will consider for the future
>
> #### Week n (date)
>
> > task for this week or sprint
>
> - Task name @`<assignee>` (`<status>`)
>   - Sub task
>
> #### Week n-1 (date)
>
> - Task name @`<assignee>` (`<status>`)

---

## Example

---

> ### Project weekly planning
>
> #### Candidates
>
> - Refactor that legacy part
> - Investigate the solution for mobile platforms
> - Response Caching
>
> #### Week 2 (22MAR)
>
> - Add support for IE **@Alice** (DONE)
> - Fix responsiveness of web **@Bob** (WIP)
> - High-level overview of project goals **@Charlie** (REVIEW)
>
> #### Week 1 (15MAR)
>
> - Add support for IE **@Alice** (WIP)
> - Fix responsiveness of web **@Bob**
> - High-level overview of project goals **@Charlie**

---

At the next meeting, each member tells the status of their tasks, and _Planning master_ makes appropriate changes in section **Week 2**.
Next, the _Planning master_ will copy section **Week 2** above and rename it to **Week 3**.
And then start editing new section and plan next week. Like, removing DONE tasks, updating the status, adding comments, resigning...<br/>
After all current tasks were reviewed the team discusses what new tasks should be taken for this week.
Tasks can be taken from the **Candidates** section, or new tasks are directly added to this week.

---

> ### Project weekly planning
>
> #### Candidates
>
> - Refactor that legacy part
> - Investigate the solution for mobile platforms
>
> #### Week 3 (29MAR)
>
> - Fix responsiveness of web **@Bob** (REVIEW)
> - High-level overview of project goals **@Charlie** (DONE)
> - Response Caching **@Alice**
>
> #### Week 2 (22MAR)
>
> - Add support for IE **@Alice** (DONE)
> - Fix responsiveness of web **@Bob** (WIP)
> - High-level overview of project goals **@Charlie** (REVIEW)
>
> #### Week 1 (15MAR)
>
> ...

---

Only having this document is not enough. Anyway, there is a need for a ticketing tool that will describe each task in depth.
The _Planning master_ or assignee should create a ticket and update the doc with the link.
So while planning or reviewing this doc, you can click on the link and see the context and discussion in the ticketing tool.

---

> ### Project weekly planning
>
> #### Candidates
>
> - [Refactor that legacy part](https://example.com/issues/4605-my-task)
> - Investigate the solution for mobile platforms
>   - https://example.com/another-link
>
> #### Week 3 (29MAR)
>
> - [Fix responsiveness of web](https://www.youtube.com/watch?v=dQw4w9WgXcQ) **@Bob** (REVIEW)
> - [High-level overview of project goals](https://www.youtube.com/watch?v=dQw4w9WgXcQ) **@Charlie** (DONE)
> - [Response Caching](https://www.youtube.com/watch?v=dQw4w9WgXcQ) **@Alice**
>
> #### Week 2 (22MAR)
>
> ...

---

## Advantages

1. Minimalistic and clear view of the tasks
2. There is no need to look into the Kanban/Sprint board anymore
3. Stakeholders report is ready
4. Flexible structure
    - Add more sections/subsections if needed
    - You may do it reverse order
    - Add estimations `(WIP 2 days)`
    - Add task or notes that are not strictly related to the ticketing tool
5. Tagging and notifications in collaborative writing tools
6. It's a doc, you can write anything, change fonts, colors, layout...

## Disadvantages

1. **No sync with ticketing tool**😢
    - maybe ok for solutions like Jira + Confluence
2. Requires some manual work (usually while at the meeting)
2. A lot of copy-pasting
3. Too much freedom?

## Conclusion

Although it's not an ideal solution, it worked pretty for my friend's team.
So for sure, I will consider it for my next projects.

If you also have issues with big Kanban boards, or tired of long Scrum meetings.
Try this approach for a month and see if it feats for your case.

After trying, I would appreciate any feedback on using this approach.
Maybe you will tell me new tips or why you will never use this approach, so I can also rethink my opinion.
