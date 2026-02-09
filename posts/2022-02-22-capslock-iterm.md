---
title: "Use Caps Lock to trigger iTerm2 terminal"
date: 2022-02-22
description: A guide to remap Caps Lock to open the iTerm2 Mac terminal from anywhere in the system.
tags:
  - tools
  - productivity
  - macos
slug: use-caps-lock-to-trigger-iterm2-terminal
---

A long time ago someone showed me that it's possible to add a hotkey to iTerm2 to open the terminal window from anywhere in the system. Till these days I was using `` ` `` key as a hotkey. But when having to input `` ` `` in markdown or JS I had to use ``Option + ` `` which has specific behavior.

I decided to try Caps Lock for a while (as Caps Lock is one of the useless keys on the keyboard).

The issue is that iTerm2 does not recognize the Caps Lock press. So I have to remap in MacOS Caps Lock to Control key.

Go to **System Preferences > Keyboard**:

1. Select Modifier Keys:

![macos keyboard mod keys](/macos-keyboard-mod-keys.png)

2. Set Caps Lock as Control key: 

![macos caps lock ctrl](/macos-caps-lock-ctrl.png)

3. Go to iTerm, **System Preferences > Profiles > Select profile > Keys > Configure Hotkey Window**:
![iterm add hotkey](/iterm-add-hotkey.png)

4. Set Double-tap key as Control

![iterm ctrl hotkey](/iterm-ctrl-hotkey.png)

Now when you double press Caps Lock (or Ctrl) the iTerm window will popup.
