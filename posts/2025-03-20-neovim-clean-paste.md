---
title: "Clean Paste in Neovim: Paste Text Without Newlines and Leading Whitespace"
date: 2025-03-20
description: How to paste code in Neovim without unwanted newlines and leading whitespace.
tags:
  - vim
---

When I work on a web project, I find myself copy-pasting HTML tags or Components from one place to another.

Here are some use cases:

```html
<!-- 1: Copy html tag to another parent  -->
<div id="1">
  <div class="copy-paste">
    <h2>Copy me to div#2</h2>

    <div>Here is another child element</div>
  </div>
</div>

<div id="2"></div>

<!-- 2: Copy component to another parent -->
<div id="1">
  <Component
    className="copy-paste"
    title="Copy me to div#2"
    description="Here is the description"
  />
</div>

<div id="2"></div>

<!-- 3: component as prop -->
<div id="1">
  <Component
    className="copy-paste"
    title="Move me to Container header"
    description="Here is the description"
  />
</div>

<Container header={} />

<!-- 4: Return component -->
<div id="1">
  <Component
    className="copy-paste"
    title="Move me to Container header"
    description="Here is the description"
  />
</div>

return ();
```

For the first use case, I can put the cursor inside  
`<div class="copy-paste">` and do `yat` or `vaty` (yank around tag) to copy the HTML tag, then move inside `<div id="2"></div>` and paste.

But for the other use cases, this does not work because  
`<Component />` is self-closing and Neovim can't select with `t` (tag).

So most often I just use `SHIFT+V` to enter in visual mode on the whole line, move N lines below, select the HTML tag or Component, then use `y` to copy the selection.

Now because of `SHIFT+V`, the yanked text includes newlines and leading whitespace, and when I paste I get this result:

```html
<!-- 1: Copy html tag to another parent  -->
<div id="1">
  <div class="copy-paste">
    <h2>Copy me to div#2</h2>

    <div>Here is another child element</div>
  </div>
</div>

<div id="2"></div>
  <div class="copy-paste">
    <h2>Copy me to div#2</h2>

    <div>Here is another child element</div>
  </div>
```

So I created a keymap to paste the text without newlines and leading whitespace:

```lua
-- Map yp to paste yanked line without newlines and without leading whitespace
vim.keymap.set("n", "yp", function()
  -- Get content from register 0 (most recent yank)
  local yanked_text = vim.fn.getreg("0")
  -- Remove trailing newline if present
  yanked_text = yanked_text:gsub("\n$", "")
  -- Remove leading whitespace
  yanked_text = yanked_text:gsub("^%s+", "")
  -- Store in register p
  vim.fn.setreg("p", yanked_text)
  -- Paste from register p
  return '"pp'
end, { expr = true })
```

You can change the keymap to `cp` (clean paste) or `<leader>p`.

The result when using this keymap is:

```html
<!-- 1: Copy html tag to another parent  -->
<div id="1">
  <div class="copy-paste">
    <h2>Copy me to div#2</h2>

    <div>Here is another child element</div>
  </div>
</div>

<div id="2"><div class="copy-paste">
    <h2>Copy me to div#2</h2>

    <div>Here is another child element</div>
  </div></div>
```

And next, I just let my formatter do the job:

```html
<!-- 1: Copy html tag to another parent  -->
<div id="1">
  <div class="copy-paste">
    <h2>Copy me to div#2</h2>

    <div>Here is another child element</div>
  </div>
</div>

<div id="2">
  <div class="copy-paste">
    <h2>Copy me to div#2</h2>

    <div>Here is another child element</div>
  </div>
</div>
```

This also works for other use cases:

```html
<!-- 4: Return component -->
<div id="1">
  <Component
    className="copy-paste"
    title="Move me to Container header"
    description="Here is the description"
  />
</div>

return (<Component
    className="copy-paste"
    title="Move me to Container header"
    description="Here is the description"
  />);

```

![neovim-clean-paste](neovim-clean-paste.gif#small)
