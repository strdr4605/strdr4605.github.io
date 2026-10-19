---
title: "My Keyboard as a Status Board for Coding Agents"
date: 2026-10-19
slug: planck-keyboard-coding-agents
description: How a 47 key Planck EZ Glow becomes a control deck for herdr coding agents, with live status lights and a row of macro keys.
tags:
  - tools
  - automation
  - agents
---

Over time in my career I used to have different hardware setup, from single laptop, to laptop with big monitor, then second montitor, and third monitor, then going back to just the laptop, then adding a mechanical keyboard, then buying a better keyboard. 

And somehow in April of 2022 I ended up buying Planck Ez Glow: ![Planck-ez](/planck-ez.png)

My first 40% programable keyboard with multiple layers, macros, RGB led and even a built-in buzzer for playing music.

And over the past 3 years I was using it with a single 32 inch monitor (laptop closed) as my daily working station. It was a nice setup; over years I got used to switching layers and typing with ease.

Then in the process of switching jobs I moved the Planck Ez keyboard into a box, and kind of forgot about it because I went back to origins, being mobile with a 14 inch Macbook Pro, and expecially after moving to fully prompting with coding agents in terminal without need to see chunks of code on a big screen. 

It stayed in the box for almost a year now, and altough I missed it from time to time, carrying it in my backpack just to use it as a external keyboard for my 14 inch machine was not worth it.

## The idea

Not long ago I switch my terminal multiplex from [tmux](https://tmux.app/) to [herdr](https://herdr.dev/), mostly because I was getting lost with several coding agents running in multiple sessions and tabs in tmux. Herdr with his panel for running agents (and 90% similarity with my tmux setup) made me do the switch.

One day I saw this video [Herdr + Creator Micro 2: Codex Micro for Nerds](https://www.youtube.com/watch?v=o7X7qOwYBzE) and thought to myself🤔, nice idea, I have a programable keyboard in my closet, why create a similar setup with Planck Ez + herdr.

## Implementation

First step was to create a separate layer on the keyboard and switching to that "agentic" layer will make each key fire a custom keyboard event that a I will use to map to my needs.  
I ended up using the Hyper chord[^1] + <letter/symbol/number>.  
This way I was sure that my keyboard events will not conflict with other apps events running on my MacOS.

[^1]:Hyper = ctrl + alt + shift + cmd, all at once.  
Example: `Hyper+A` = ctrl + alt + shift + cmd + A.

Next I created a script `planck-agent` that based on the args passed will do siveral things. To fire this script I tested [skhd](https://github.com/asmvik/skhd) and [Raycast](https://www.raycast.com/) (basically hotkeys daemons for MacOS).

Now `planck-agent` based on my config:

- focus my terminal and herdr focus on the specific agent
- run scripts
- write macros
- submit prompts
- controls herdr panes

## Agents statuses and feedback

This is there this setup shines. Using [Keymapp API](https://www.zsa.io/keymapp) and [Kontroll CLI](https://github.com/zsa/kontroll) we can give intructions to the Planck Ez Glow Keyboard to color any key based on our needs.

I devided keyboard layout into 2 sections; First row is dedicated to coding agents (12 maximum) and next 2 rows are for custom intructions and scripts.

`planck-agent` listens to herdr agents statuses and change the colors on keyboard acordigly:

- Orange working
- Blue done (unseen)
- Green idle
- Red blocked
- Purple stale (idle for 10 minutes since last focused it)
- Dark empty.

Here is how architecture looks in the end:

![planck-agent-architecture](/planck-agent-architecture.png#wide)

And because I have 2 rows (24 keys) free to used for myself I mapped some of them to run some macros, often used prompts and scripts that I may need to run when working with this new setup. 

My top intructions at the time of writing this blog post:

-----

> when finishing working on something

`N` (Next) - `"prompt": "Are we done with this task, or there is something missing? What's next?"`

-----

> After entering a long prompt but I don't want agents to change something yet

`;` (Pause) - `"macro": "Plan first. Do not make changes yet — list 2-3 options and trade-offs."`

-----

`S` - `"prompt": "Summarise the current state in one line."`


-----

`/` - `"prompt": "/compact"` (too lazy to type😅)

Here is my initial config (probably I already changed it):

![planck-agent-legend](/planck-agent-legend.png#wide)

## Demo time

To truly understand how this all works I think you need to see it in action.

> After I finished with v1 of `planck-agent`, I wanted to show some workflow demos by filming the keyboard interaction and screen recording results.  
> My initial thought was creating a demo herdr workspace with agents and custom prompts then I would press start screen recording and iphone video and later I would edit all the footage into several demos.  

> While asking my conding agent to create this demo setup and telling about my plan the agent did something that completly surprised me🤯🤩.  
> The agent took the recording part as a task for himself and started exploring how to get raw video stream and screen frames.  
> The agent found the iPhone (connected to same iCloud) camera stream as a source, tested it and ispected frames to locate the keyboard and scale the view to focus it.  

> Then after some trials and errors (with frame rates, and timing between 2 sources) the agent aligned everything and combined all into mov and gif files.  
> He even mapped keys on my keyboard to start and stop the recording.

![michael-shocked-happy](/michael-shocked-happy.gif)

> Here is a document created by conding agent exploring how he did it: [/RECORDING.md](https://github.com/strdr4605/.dotfiles/blob/master/planck-agent/demo/RECORDING.md)


Sorry for low quality, my agent did it😅.

![planck-agent-1](/planck-agent-1.gif#wide)

The focus keys jump between the agents. The jj key opens the log and the status panes beside the focused agent. The macro key types a prompt into the input box without sending it, and the approve key sends it. The nLED row shows the state of every agent, and the spacebar shows the worst state of all of them.

<!-- <video controls poster="/planck-agent-1.gif#wide" width="800"> -->
<!--   <source src="/planck-agent-1.mov" type="video/quicktime" /> -->
<!-- </video> -->

![planck-agent-2](/planck-agent-2.gif#wide)

A new agent appears when herdr detects it, and its key lights up. The flag key paints a finished agent blue, so a seen agent is not forgotten. A stale agent turns purple after ten minutes of silence.

<!-- <video controls poster="/planck-agent-2.gif#wide" width="800"> -->
<!--   <source src="/planck-agent-2.mov" type="video/quicktime" /> -->
<!-- </video> -->

Now using this setup (laptop + agentic keyboard on the side), I have a feeling of being in a main control room and using a colored panel.

![nuclear-power-plant-control-room](/nuclear-power-plant-control-room.jpg)

If you have a programable RGB keyboard I highly suggest playing with it and maybe you could create a similar setup.

Full setup is available at [strdr4605/.dotfiles/planck-agent/](https://github.com/strdr4605/.dotfiles/tree/master/planck-agent), you may point your coding agent to it and let him create something similar for your case.
