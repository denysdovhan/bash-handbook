# bash-handbook [![CC 4.0][cc-image]][cc-url]

This document was written for for those who want to learn Bash without diving up too deeply.

# Node Packaged Manuscript

You can install this handbook with npm. Just do:

    $ npm install -g bash-handbook

Now you will have a `bash-handbook` command that will open this readme file in your `$PAGER`. Otherwise, you may continue reading this document as you
are presently doing.

# Table of Contents

- [Introduction](#introduction)
- [Shells and modes](#shells-and-modes)
  - [Interactive](#interactive-mode)
  - [Non-interactive](#non-interactive-mode)
- [License](#licenses)

# Introduction

If you are a developer, then you know about the value of time. Optimization of working process - one of the most important aspects of IT.

Either way, our work requires repetition of the same actions: quick screenshots and uploading them to server, processing selected text, converting files, parsing data and so on. And here bash comes to help us.

**Bash** is a Unix shell written by [Brian Fox](https://en.wikipedia.org/wiki/Brian_Fox_(computer_programmer)) for the GNU Project as a free software replacement for the [Bourne shell](https://en.wikipedia.org/wiki/Bourne_shell). It was released in 1989 and has been distributed as default shell in Linux and OS X.

So why should we start to learn something written about 30 years ago? The answer is quite simple: this _something_ still stay one of the most powerful tools for writing efficient scripts on all Unix-based systems. That's why you should learn bash.

In this handbook, I'm going to describe the most important concepts in bash with examples. I'm sure this compendium will be helpful for you.

# Shells and modes

The user bash shell can work in two modes - interactive and accordingly non-interactive.

## Interactive mode

If you are working on Ubuntu, you can open the shell using `Ctrl-Alt-F1` keybinding. After that, familiar GUI will disappear and one of seven virtual terminals available in the Ubuntu will show.

If you see something like this, then you are working in interactive mode:

    user@host:~$

Here you can enter a variety of Unix commands, such as `ls`, `grep`, `cd`, `mkdir`, `rm` and see the result of their execution.

We call this shell interactive because it interacts directly with the user.

The desktop environment takes place in the seventh virtual terminal, so you can return to friendly GUI using `Ctrl-Alt-F7` keybinding.

Of course, using virtual terminal it's not so easy. Especially if you want to edit a document and at the same time execute any command. For this case, better to use virtual terminal emulators, for example:

- [GNOME Terminal](https://ru.wikipedia.org/wiki/GNOME_Terminal)
- [Terminator](https://en.wikipedia.org/wiki/Terminator_(terminal_emulator))
- [iTerm2](https://en.wikipedia.org/wiki/ITerm2)
- [ConEmu](https://en.wikipedia.org/wiki/ConEmu)

## Non-interactive mode

In non-interactive mode, the shell reads commands from a file and executes them. When interpreter comes to the end of the file, work with the shell will automatically complete.

Use these command for running the shell in non-interactive mode:

    sh /path/to/script.sh
    bash /path/to/script.sh

Above, `sctipt.sh` it's a just simple text file that contains commands to execute. You can easyly create that file using any text editor (e.g Vim, nano, Sublime Text, Atom, etc).
However, you can simplify the script calling, just make it executable using `chmod` command:


    chmod +x /path/to/script.sh

In addition, the first line of the script must indicate the system which program to use to run the file, like so:

    #!/bin/bash
    echo "Hello, world!"

Or if you wanna use `sh` instead of `bash`, just replace `#!/bin/bash` to `#!/bin/sh`.  That is called a [shebang](http://en.wikipedia.org/wiki/Shebang_%28Unix%29). After that, you can run script like this:

    /path/to/script.sh

## License

[![CC 4.0][cc-image]][cc-url] © [Denys Dovhan](http://denysdovhan.com)

[cc-url]: http://creativecommons.org/licenses/by/4.0/
[cc-image]: https://i.creativecommons.org/l/by/4.0/80x15.png
