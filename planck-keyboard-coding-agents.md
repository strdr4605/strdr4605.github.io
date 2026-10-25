---
title: "My Keyboard as a Status Board for Coding Agents"
date: 2026-10-25T00:00:00.000Z
tags: ["tools", "automation", "agents"]
description: "How I built a custom Stream Deck for coding agents with a 47-key Planck EZ Glow: RGB status lights, QMK macro keys and herdr."
---
Over time, my hardware setup changed many times: a single laptop, then a laptop with a big monitor, then a second monitor, then a third monitor. Then I went back to just the laptop, added a mechanical keyboard, and later bought a better one.

And somehow, in April of 2022, I ended up buying the Planck EZ Glow: ![Planck EZ](/planck-ez.png)

My first 40% programmable keyboard, with multiple layers, macros, RGB LEDs, and even a built-in buzzer for playing music.

For the past three years, I used it with a single 32-inch monitor and a closed laptop. It was a nice setup, and I got used to switching layers and typing with ease.

Then, in the process of switching jobs, I moved the Planck EZ keyboard into a box and kind of forgot about it. I went back to my roots: working from one spot to another with a 14-inch MacBook Pro. The move to fully prompting coding agents in the terminal helped too, because I no longer needed to see chunks of code on a big screen.

Keyboard stayed in the box for almost a year. I missed it from time to time, but carrying it in my backpack only to use it as an external keyboard for my 14-inch machine was not worth it.

## The idea

Not long ago, I switched my terminal multiplexer from [tmux](https://tmux.app/) to [herdr](https://herdr.dev/). I made the change because I got lost with several coding agents running in multiple sessions and tabs in tmux. Herdr, with its panel for running agents and a 90% similarity with my tmux setup, made me switch.

One day I saw the video [Herdr + Creator Micro 2: Codex Micro for Nerds](https://www.youtube.com/watch?v=o7X7qOwYBzE) and thought to myself🤔: nice idea. I have a programmable keyboard in my closet. Why create a similar setup with Planck EZ and herdr?

## Implementation

The first step was to create a separate layer on the keyboard. Switching to that "agentic" layer makes each key fire a custom keyboard event, which I map to my needs.  
I use the Hyper chord[^1] plus a letter, a symbol, or a number.  
This way, I am sure that my keyboard events do not conflict with the events of other apps on my macOS.

[^1]: Hyper = Ctrl + Alt + Shift + Cmd, all at once.  
Example: `Hyper+A` = Ctrl + Alt + Shift + Cmd + A.

Next, I created a script called `planck-agent` that does several things, based on the arguments it receives. To trigger this script, I tested [skhd](https://github.com/asmvik/skhd) and [Raycast](https://www.raycast.com/), which are hotkey daemons for macOS.

Now `planck-agent` does the following, based on my config:

- focus my terminal and make herdr focus the specific agent
- run scripts
- write macros
- submit prompts
- control herdr panes

## Agent statuses and feedback

This is where this setup shines. Using the [Keymapp API](https://www.zsa.io/keymapp) and the [Kontroll CLI](https://github.com/zsa/kontroll), I can give instructions to the Planck EZ Glow keyboard to color any key based on my needs.

I divided the keyboard layout into two sections. The first row is dedicated to coding agents (12 maximum), and the next two rows are for custom instructions and scripts.

`planck-agent` listens to the statuses of the herdr agents and changes the keyboard colors accordingly:

- Orange working
- Blue done (unseen)
- Green idle
- Red blocked
- Purple stale (idle for 10 minutes since it was last focused)
- Dark empty.

Here is how the architecture looks in the end:

![planck-agent-architecture](/planck-agent-architecture.png#wide)

Because I have two rows (24 keys) free to use for myself, I mapped some of them to macros, often used prompts, and scripts that I may need when working with this new setup.

My top instructions at the time of writing this blog post:

-----

> when finishing work on something

`N` (Next) - `"prompt": "Is something missing, or are we done with this task? What's next?"`

-----

> after entering a long prompt, but I do not want the agents to change anything yet

`;` (Pause) - `"macro": "Plan first. Do not make changes yet — list 2-3 options and trade-offs."`

-----

`S` - `"prompt": "Summarize the current state in one line."`


-----

`/` - `"prompt": "/compact"` (too lazy to type😅)

Here is my initial config (I have probably already changed it):

![planck-agent-legend](/planck-agent-legend.png#wide)

## Demo time

To truly understand how this all works, you need to see it in action.

> After I finished v1 of `planck-agent`, I wanted to show some workflow demos. I planned to film the keyboard interaction and record the screen.  
> My first idea was to build a demo herdr workspace with agents and custom prompts. Then I would press start, screen recording and iPhone video, and later I would edit the footage into several demos.  

> While I asked my coding agent to create this demo setup and described my plan, the agent did something that completely surprised me🤯🤩.  
> The agent took the recording part as a task for itself and started to explore how to get a raw video stream and screen frames.  
> The agent found the iPhone camera stream (the phone is connected to the same iCloud) as a source, tested it, and inspected frames to locate the keyboard and scale the view to focus on it.  

> Then, after some trials and errors (with frame rates and the timing between the two sources), the agent aligned everything and combined it all into MOV and GIF files.  
> It even mapped keys on my keyboard to start and stop the recording.

![michael-shocked-happy](/michael-shocked-happy.gif)

> Here is a document that the coding agent created while it explored how it did it: [/RECORDING.md](https://github.com/strdr4605/.dotfiles/blob/master/planck-agent/demo/RECORDING.md)


Sorry for the low quality. My agent did it😅.

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

Now, with this setup (a laptop and the agentic keyboard on the side), I feel as if I am in a main control room, using a colored panel.

![nuclear-power-plant-control-room](/nuclear-power-plant-control-room.jpg)

If you have a programmable RGB keyboard, I highly suggest that you play with it. Maybe you can create a similar setup.

The full setup is available at [strdr4605/.dotfiles/planck-agent/](https://github.com/strdr4605/.dotfiles/tree/master/planck-agent). You can point your coding agent at it and let it create something similar for your case.