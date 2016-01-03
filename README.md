# bash-handbook [![CC 4.0][cc-image]][cc-url]

This document was written for those who want to learn Bash without diving up too deeply.

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
- [Comments](#comments)
- [Variables](#variables)
  - [Local variables](#local-variables)
  - [Environment variables](#environment-variables)
  - [Positional parameters](#positional-parameters)
- [Arrays](#arrays)
  - [Array declaration](#array-declaration)
  - [Array slice](#array-slice)
  - [Adding elements into array](#adding-elements-into-array)
  - [Deleting elements from array](#deleting-elements-from-array)
- [Shell expansions](#shell-expansions)
  - [Brace expansion](#brace-Expansion)
  - [Command substitution](#command-substitution)
  - [Arithmetic expansion](#arithmetic-expansion)
  - [Double and single quotes](#double-and-single-quotes)
- [License](#licenses)

# Introduction

If you are a developer, then you know about the value of time. Optimization of working process — one of the most important aspects of IT.

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

```bash
#!/bin/bash
echo "Hello, world!"
```

Or if you wanna use `sh` instead of `bash`, just replace `#!/bin/bash` to `#!/bin/sh`.  That is called a [shebang](http://en.wikipedia.org/wiki/Shebang_%28Unix%29). After that, you can run script like this:

    /path/to/script.sh

Besides, we should do yet another important conclusion: if we wanna output something, we need to use `echo` command.

# Comments

Scripts may contain _comments_. Comments are special statements that do absolutely nothing and just ignore while the script is executing. They begin with `#` symbol and continue to the line ending.

For example:

```bash
#!/bin/bash
# This script will print your username.
whoami
```

Use comments to explain what your script does and how.

# Variables

Of course, you are free to use variables as in any programming language.

There aren't data types, but variables in bash can contain only a number, a character or string of characters. The variable can be declared in three scopes: local variables, environment variables and positional parameters.

## Local variables

**Local variables** are variables within a single script. They are inaccessible for other programs and scripts.

The local variable can be declared using `=` sign (shouldn't be any space between variable's name and value) and accessed using `$` sign. For example:

```bash
username="denysdovhan"  # declare variable
echo $username          # display value
unset username          # delete variable
```

Getting ahead of ourselves, we can declare local variable inside the function by applying `local` keyword. After that variable will be accessible only inside this function.

```bash
local local_var="I'm local value"
```

## Environment variables

**Environment variables** are variables, accessible for any program or script running in current shell. They might be declared in such way as local variables, but adding keyword `export`.

```bash
export GLOBAL_VAR="I'm global variable"
```

There are a lot of global variables in bash. Entirely possible you might meet them in scripts, so here is a table with most used ones:

| Variable     | Description                                                   |
| :----------- | :------------------------------------------------------------ |
| `$HOME`      | The current user's home directory.                            |
| `$PATH`      | A colon-separated list of directories in which the shell looks for commands. |
| `$PWD`       | The current working directory.                                |
| `$RANDOM`    | Random integer between 0 and 32767.                           |
| `$UID`       | The numeric, real user ID of the current user.                |
| `$PS1`       | The primary prompt string.                                    |
| `$PS2`       | The secondary prompt string.                                  |

Look at extended table of available environment variables [here](http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_03_02.html#sect_03_02_04).

## Positional parameters

**Positional parameters** comes when you want to give arguments to your scripts. Few parameters are described below:

| Parameter      | Description                                                 |
| :------------- | :---------------------------------------------------------- |
| `$0`           | Script's name.                                              |
| `$1 … $9`      | The argument list elements from 1 to 9.                     |
| `${10} … ${N}` | The argument list elements from 10 to N.                    |
| `$*` or `$@`   | All positional parameters except `$0`.                      |
| `$#`           | The number of arguments, not counting $0.                   |
| `$FUNCNAME`    | The function name (has value only inside the function).     |

Below inside the script example we will get `$0='./script.sh'`,  `$1='foo'` and `$2='bar'`:

    ./script.sh foo bar

Also, variables may have default values. We can easily define them using this expression:

```bash
 # if variables are empty, assign then default values
: ${VAR:='default'}
: ${$1:='first'}
```

# Arrays

As in other programming languages, an array is a variable containing multiple values. In bash arrays are zero-based: that means the first element in arrays is indexed with the number 0.

Dealing with arrays, we should know about special environment variable `IFS`. **IFS** or **Input Field Separator** — it's value that contains the character which separates elements in array. As default `IFS=' '`.

## Array declaration

Easy to declare arrays using these indirect declaration:

```bash
fruits[0]=Apple
fruits[1]=Pear
fruits[2]=Plum
echo ${fruits[*]} # echo ${fruits[@]} may be used as well
```

Array variables may also be created using compound assignments such as:

```bash
fruits=(Apple Pear Plum)
```

## Array slice

Besides, we can take part of array using _slice_:

```bash
echo ${fruits[*]:0:2} # Apple Pear
```

In example above, `fruits[*]` returns the content of array, `:0:2` takes a slice length of 2, starting at index 0.

## Adding elements into array

If we wanna add new elements into array, we are happy, because it quite simple. Compound assignments come to help us here. We can use them such as:

```bash
fruits=(Orange ${fruits[*]} Banana Cherry)
echo ${fruits[*]} # Orange Apple Pear Plum Banana Charry
```

## Deleting elements from array

The `unset` command, which we are already familiar, is used to destroy arrays or element of array:

```bash
unset fruits[0]
echo ${fruits[*]} # Apple Pear Plum Banana Charry
```

# Shell expansions

Expansion is performed on the command line after it has been split into _tokens_. In other words, these expansions are mechanism to calculate arithmetical operations, to save results of command's executions and so on.

If you are interested, you can read [more about shell expasions](https://www.gnu.org/software/bash/manual/bash.html#Shell-Expansions).

## Brace expansion

Brace expansion give us opportunity to generate arbitrary strings. It's similar to _filename expansion_. For example:

```bash
echo beg{i,a,u}n # begin began begun
```

Also brace expansions may be used for creating ranges, which are iterated over in loops.

```bash
echo {0..5} # 0 1 2 3 4 5
echo {00..8..2} # 00 02 04 06 08
```

## Command substitution

Command substitution allows the output of a command to replace the command itself. Command substitution works when a command is enclosed in ` `` ` or `$()`.  For example, we can use it as follow:

```bash
now=`data +%T`
# or
now=$(data +%T)

echo now # 19:08:26
```

## Arithmetic expansion

In bash we can feel free to perform arithmetical operations. But expression that we need to perform should be enclosed in `$(( ))` The format for arithmetic expansion is:

```bash
result=$(( ((10 + 5*3) - 7) / 2 ))
echo $result # 9
```

## Double and single quotes

There is an important difference between double and single quotes. The expression is treated as if it were within double quotes, but a double quote inside the parentheses is not treated specially. Just look at this:

```bash
echo "Your home: $HOME" # Your home: /Users/<username>
echo 'Your home: $HOME' # Your home: $HOME
```

# License

[![CC 4.0][cc-image]][cc-url] © [Denys Dovhan](http://denysdovhan.com)

[cc-url]: http://creativecommons.org/licenses/by/4.0/
[cc-image]: https://i.creativecommons.org/l/by/4.0/80x15.png
