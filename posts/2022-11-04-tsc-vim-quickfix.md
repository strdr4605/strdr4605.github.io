---
title: "Typescript errors into vim quickfix"
date: 2022-11-04
slug: typescript-errors-into-vim-quickfix
description: How to populate errors from running tsc in vim/neovim quickfix. Get typescript compiler errors inside vim.
tags:
  - vim
---

You may use LSP and `lua vim.diagnostic.setloclist()` to show Typescript errors for a specific buffer. But sometimes you could have errors across the whole project.
You can run `tsc` in the terminal and manually search for files with errors. But we can do better.

Vim has the `:make` command which executes the program that is set into `makeprg`. By default, it's `make` but we can change it to any terminal program/command.
The output of `makeprg` is then populated into quickfix.


## Update 🖊️

After discussion on reddit someone suggested a better approach.
The error is already parced in [`compiler tsc`](https://github.com/neovim/neovim/blob/master/runtime/compiler/tsc.vim).
I just change `makeprg=npx\ tsc` instead of `makeprg=tsc`.

```vim
vim.cmd [[
  augroup strdr4605
    autocmd FileType typescript,typescriptreact compiler tsc | setlocal makeprg=npx\ tsc
  augroup END
]]
```

## Initial post

Let's create an auto command that will set makeprg to `tsc` if we are in a typescript project:

```vim
vim.cmd [[
  augroup strdr4605
    autocmd FileType typescript,typescriptreact set makeprg=./node_modules/.bin/tsc
  augroup END
]]
```

or with lua API:

```vim
local augroup = vim.api.nvim_create_augroup("strdr4605", { clear = true })
vim.api.nvim_create_autocmd("FileType", {
  pattern = "typescript,typescriptreact",
  group = augroup,
  command = "compiler tsc | setlocal makeprg=npx\\ tsc",
})
```

Run `:make` and see the output:

```bash
:!./node_modules/.bin/tsc  2>&1| tee /var/folders/3w/m_v388s15pq9rpgswbt131w00000gn/T/nvim.strdr4605/708JAY/2
components/Date.tsx(6,28): error TS2339: Property 'toISOString' does not exist on type 'number'.

(1 of 1): components/Date.tsx(6,28): error TS2339: Property 'toISOString' does not exist on type 'number'.
Press ENTER or type command to continue
```

and open the quickfix, `:copen`:

```bash
components/Date.tsx(6,28): error TS2339: Property 'toISOString' does not exist on type 'number'.
```

When trying to navigate to any file from quickfix, I see this error: `Buffer not found`. 
Why? Because the `tsc` compiler outputs in a format that is not clear for vim quickfix.

The problem is in parenthesis around the file line and column: `components/Date.tsx(6,28):`

But we can change this by piping the `tsc` output to `sed` command and replacing `(6,28)` with `:6:28:`.

This is the output if we run it in the terminal:

```bash
 ./node_modules/.bin/tsc | sed 's/(\(.*\),\(.*\)):/:\1:\2:/'                                                                                 130 ↵

components/Date.tsx:6:28: error TS2339: Property 'toISOString' does not exist on type 'number'.
```

But to make it work in vim, we need to escape some chars.
The final result is:

```vim
vim.cmd [[
  augroup strdr4605
    autocmd FileType typescript,typescriptreact set makeprg=./node_modules/.bin/tsc\ \\\|\ sed\ 's/(\\(.*\\),\\(.*\\)):/:\\1:\\2:/'
  augroup END
]]
```

Now when running `:make` the quickfix list is populated correctly and vim navigates to the first file in the list.
I can fix Typescript errors one by one, by navigating with `:cnext` or using [vim-unimpaired](https://github.com/tpope/vim-unimpaired).
