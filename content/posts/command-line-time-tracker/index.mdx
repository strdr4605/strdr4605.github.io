---
title: Building a command-line time tracker
date: 2021-03-21
description: This is my attempt to create a simple time tracker from the command line
tags:
  - tools
  - learning
---

I started working on a project and I wanted to track the time that I spend.
I searched and found desktop apps, websites, browser extensions, for time tracking.
But some of them were part of a big product with dashboards.
I even downloaded and tested tracking extensions for VSCode but some of them also required accounts on some platform for reporting.

I wanted something simple, start a task, stop a task, display the time.
Something that I can use for any project, task, activity, personal or work.
Knowing that most of the time I have my terminal open, I thought that it's the best place for me to use a tracker.
For example, before creating a new branch for the task,
I could start the timer, and when I need a pause, stop it.
All this in one terminal tab.

I started looking for command-line time tracker solutions.
I didn't find a lot. Most of them were written in Python, but for me, the features were too much.
I also found NodeJS packages, and one written in C that was way too simple as I need time in hours and minutes (not only seconds).

Don't know why but my initial thought was that a command-line time tracker should be implemented in shell script.
I found [Time tracker in Bash](https://labs.tomasino.org/time-tracker-in-bash/) and I liked the features but there was no instruction on how to install,
and while trying the script was throwing some error (maybe was not compatible with macOS).

I decided to write one myself in shell script, as an idea that it can be used on any unix system, without the need to have Python, C or NodeJS installed.
I thought that it may take 4-5 hours to finish the first version.
I decided to call the command `tt` (from time tracker), as it's short to type and start working.

## Implementation

First I started with a hello world script, and then I noticed something I use but I am not 100% sure why.
I am talking about the first line of most command-line scripts `#!/usr/bin/env bash`. Why it's needed?
After a search, I found that it's called [Shebang](https://en.wikipedia.org/wiki/Shebang_%28Unix%29).
I decided that I will put the link and explanation at the beginning of the file,
so people who may want to contribute or just see the implementation, will also know why this line is really needed.

```bash
#!/usr/bin/env sh
# First 2 chars in the file are called Shebang https://en.wikipedia.org/wiki/Shebang_%28Unix%29
# In this case:
#   Execute this file with a "sh" interpreter, using the "env" program search path to find it.
# Now you know!

tt() {
```

Requirements are simple:

1. Start an activity
2. Stop an activity
3. Log an activity and time spent (in hours and minutes)
4. Clean history

As a first idea, we need two files:

1. `~/.tt_logs` - will store all the logs.
2. `~/.tt_session` - will instore info about current activity started time.

The session file will have `start_time` and `activity_name`. <br/>
Time will be stored in sec using `date +%s` which will return [Unix time](https://en.wikipedia.org/wiki/Unix_time).

Basic writing to a file with shell script is simple.

```bash
echo "start_time=" > ~/.tt_session
echo "activity_name=" >> ~/.tt_session
```

- The `>` redirection operator writes `"start_time="` to a given file. If the file exists, it is truncated to zero length. Otherwise, the file is created. Be extra careful when using this operator as you may overwrite an important file.
- The `>>` redirection operator appends the output to a given file. The file is created if it does not exist.

When finishing an activity the script should read the data from the session file and write it into the logs file.
There are multiple options to read from a file. After a lot of testing, I found a way that works for my case.

```bash
start_time=$(grep 'start_time=' "$TT_SESSION" | sed -E "s/.*start_time=([0-9]+).*/\\1/")
```

To be honest, I don't like the solution, and I am sure you too, but I didn't want to spend more time on this.
You are welcome to contribute with a better one.

After 3 or 4 hours I understood that it will take more time to create this script as new use cases appeared.
What if I want to pause the activity, or maybe abort without logs?

While thinking about how to solve new use cases I also asked myself: Isn't it too much time spent on this script?
Why just don't use Python solutions with richer features (like starting an activity in past).
But I decided to push it to the end as while spending time on this I learned something new, and also if I will need more features I will just add them later.

Current functionality
```text
tt - time tracker

Tracks activity time with a simple start/stop syntax. Logs to CSV.
Allows one activity active at a time, per session.

usage: tt                                       # show this help
usage: tt (--help or -h)                        # show this help
usage: tt (--start or -s) [activity name]       # start a new activity
usage: tt (--pause or -p)                       # pauses current activity
usage: tt (--done or -d or --finish or -f)      # stop and log activity
usage: tt (--abort or -a)                       # stop activity, no log
usage: tt --clear-logs                          # delete log of previous activities
usage: tt --activity-name                       # show activity for current session
usage: tt (--logs or -l)                        # show logs of previous activities
```

## Installation

When searching on how to make my script function `tt` available globally on the system I hadn't found a 100% right solution, so I decided to go with `source`.

> The `source` command reads and executes commands from the file specified as its argument in the current shell environment. It is useful to load functions, variables, and configuration files into shell scripts.
>> https://linuxize.com/post/bash-source-command/

This means that to use this time tracker you need to download the source and put it wherever you want.

For example, using `curl` to download and write in the file located in the home directory:

```bash
curl https://raw.githubusercontent.com/strdr4605/tt/master/tt.sh > $HOME/tt.sh
```

Now you just need to add `source $HOME/tt.sh` into your shell config file.

Besides that, as a person that cares about code quality
I made sure to have a good code structure with separate functions for each use case and not a big `if else switch case` as some other shell scripts are.

In the end, I spent a day working on it (with some breaks and other tasks).
I would say it took 10-12 hours (with README, formating, and linting).
I don't know the exact time as I I haven't used a time tracker for this project 😅.

If want to contribute or just see the implementation, the project is on https://github.com/strdr4605/tt.

```bash
tt -f

Sun Mar 21 20:39:04 UTC 2021 | Writing this post | 1h 43m
```
