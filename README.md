# bash-handbook [![CC 4.0][cc-image]][cc-url]

This document was written for those who want to learn Bash without diving in too deeply.

# Node Packaged Manuscript

You can install this handbook using `npm`. Just run:

```
$ npm install -g bash-handbook
```

You should be able to run `bash-handbook` at the command line now. This will open the manual in your selected `$PAGER`. Otherwise, you may continue reading on here.

The source is available here: <https://github.com/denysdovhan/bash-handbook>

# Table of Contents

- [Introduction](#introduction)
- [Shells and modes](#shells-and-modes)
  - [Interactive](#interactive-mode)
  - [Non-interactive](#non-interactive-mode)
  - [Exit codes](#exit-codes)
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
- [Streams, pipes and lists](#streams-pipes-and-lists)
  - [Streams](#streams)
  - [Pipes](#pipes)
  - [Lists of commands](#lists-of-commands)
- [Conditional statements](#conditional-statements)
  - [Primary and combining expressions](#primary-and-combining-expressions)
  - [Using of `if` statement](#using-of-if-statement)
  - [Using of `case` statement](#using-of-case-statement)
- [Loops](#loops)
  - [`for` loop](#for-loop)
  - [`while` loop](#while-loop)
  - [`until` loop](#until-loop)
  - [`select` loop](#select-loop)
  - [Loop control](#loop-control)
- [Functions](#functions)
- [Debugging](#debugging)
- [Afterwords](#afterwords)
- [License](#license)

# Introduction

If you are a developer, then you know the value of time. Optimizing your work process is one of the most important aspects of the job.

In that path towards efficiency and productivity, we are often posed with actions that must be repeated over and over again, like:

* taking a screenshot and uploading it to a server
* processing text that may come in many shapes and forms
* converting files between different formats
* parsing a program's output

Enter **Bash**, our savior.

Bash is a Unix shell written by [Brian Fox][] for the GNU Project as a free software replacement for the [Bourne shell](https://en.wikipedia.org/wiki/Bourne_shell). It was released in 1989 and has been distributed as the Linux and OS X default shell for a long time.

[Brian Fox]: https://en.wikipedia.org/wiki/Brian_Fox_(computer_programmer)
<!-- link this format, because some MD processors handle '()' in URLs poorly -->

So why do we need to learn something that was written more than 30 years ago? The answer is simple: this _something_ is today one of the most powerful and portable tools for writing efficient scripts for all Unix-based systems. And that's why you should learn bash. Period.

In this handbook, I'm going to describe the most important concepts in bash with examples. I hope this compendium will be helpful to you.

# Shells and modes

The user bash shell can work in two modes - interactive and non-interactive.

## Interactive mode

If you are working on Ubuntu, you can open the shell using the `Ctrl-Alt-F1` keybinding. After that, the familiar GUI will disappear and one of the seven virtual terminals available in Ubuntu will be shown.

If you see something like this, then you are working in interactive mode:

    user@host:~$

Here you can enter a variety of Unix commands, such as `ls`, `grep`, `cd`, `mkdir`, `rm` and see the result of their execution.

We call this shell interactive because it interacts directly with the user.

The desktop environment takes place in the seventh virtual terminal, so you can return to a friendly GUI using the `Ctrl-Alt-F7` keybinding.

Using a virtual terminal is not really convenient. For example, if you want to edit a document and execute another command at the same time, you are better off using virtual terminal emulators like:

- [GNOME Terminal](https://en.wikipedia.org/wiki/GNOME_Terminal)
- [Terminator](https://en.wikipedia.org/wiki/Terminator_(terminal_emulator))
- [iTerm2](https://en.wikipedia.org/wiki/ITerm2)
- [ConEmu](https://en.wikipedia.org/wiki/ConEmu)

## Non-interactive mode

In non-interactive mode, the shell reads commands from a file or a pipe and executes them. When the interpreter reaches the end of the file, the shell process terminates the session and returns to the parent process.

Use the following commands for running the shell in non-interactive mode:

    sh /path/to/script.sh
    bash /path/to/script.sh

In the example above, `script.sh` is just a regular text file that consists of commands the shell interpreter can evaluate and `sh` or `bash` is the shell's interpreter program. You can create `script.sh` using your preferred text editor (e.g. vim, nano, Sublime Text, Atom, etc).

You can also simplify invoking the script by making it an executable file using the `chmod` command:


    chmod +x /path/to/script.sh

Additionally, the first line in the script must indicate which program it should use to run the file, like so:

```bash
#!/bin/bash
echo "Hello, world!"
```

Or if you prefer to use `sh` instead of `bash`, change `#!/bin/bash` to `#!/bin/sh`. This `#!` character sequence is known as the [shebang](http://en.wikipedia.org/wiki/Shebang_%28Unix%29). Now you can run script like this:

    /path/to/script.sh

Another handy thing we learned above is using the `echo` to print something to the terminal screen.


## Exit codes

Every command returns an **exit code** (**return status** or **exit status**). A successful command always returns `0` (zero-code), and a command that has failed returns a non-zero value (error code). Failure codes must be positive integers between 1 and 255.

Another handy command we can use when writing a script is `exit`. This command is used to terminate the current execution and deliver an exit code to the shell. Running an `exit` code without any arguments, will terminate the running script and return the exit code of the last command executed before `exit`.

When a program terminates, the shell assigns its **exit code** to the `$?` environment variable. The `$?` variable is how we usually test whether a script has succeeded or not in its execution.

In the same way we can use `exit` to terminate a script, we can use the `return` command to exit a function and return an **exit code** to the caller. You can use `exit` inside a function too and this will exit the function _and_ terminate the program.

# Comments

Scripts may contain _comments_. Comments are special statements ignored by the `shell` interpreter. They begin with a `#` symbol and continue on to the end of the line.

For example:

```bash
#!/bin/bash
# This script will print your username.
whoami
```

> **Tip**: Use comments to explain what your script does and _why_.

# Variables

Like in most programming languages, you can also create variables in bash.

Bash knows no data types. Variables can contain only numbers or a string of one or more characters. There are three kinds of variables you can create: local variables, environment variables and variables as _positional arguments_.

## Local variables

**Local variables** are variables that exist only within a single script. They are inaccessible to other programs and scripts.

A local variable can be declared using `=` sign (as a rule, there **should not** be any spaces between a variable's name, `=` and its value) and its value can be retrieved using the `$` sign. For example:

```bash
username="denysdovhan"  # declare variable
echo $username          # display value
unset username          # delete variable
```

We can also declare a variable local to a single function using the `local` keyword. Doing so causes the variable to disappear when the function exits.

```bash
local local_var="I'm a local value"
```

## Environment variables

**Environment variables** are variables accessible to any program or script running in current shell session. They are created just like local variables, but using the keyword `export` instead.

```bash
export GLOBAL_VAR="I'm a global variable"
```

There are _a lot_ of global variables in bash. You will meet these variables fairly often, so here is a quick lookup table with the most practical ones:

| Variable     | Description                                                   |
| :----------- | :------------------------------------------------------------ |
| `$HOME`      | The current user's home directory.                            |
| `$PATH`      | A colon-separated list of directories in which the shell looks for commands. |
| `$PWD`       | The current working directory.                                |
| `$RANDOM`    | Random integer between 0 and 32767.                           |
| `$UID`       | The numeric, real user ID of the current user.                |
| `$PS1`       | The primary prompt string.                                    |
| `$PS2`       | The secondary prompt string.                                  |

Follow [this link](http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_03_02.html#sect_03_02_04) to see an extended list of environment variables in Bash.

## Positional arguments

**Positional arguments** are variables allocated when a function is evaluated and are given positionally. The following table lists positional argument variables and other special variables and their meanings when you are inside a function.

| Parameter      | Description                                                 |
| :------------- | :---------------------------------------------------------- |
| `$0`           | Script's name.                                              |
| `$1 … $9`      | The argument list elements from 1 to 9.                     |
| `${10} … ${N}` | The argument list elements from 10 to N.                    |
| `$*` or `$@`   | All positional parameters except `$0`.                      |
| `$#`           | The number of arguments, not counting `$0`.                 |
| `$FUNCNAME`    | The function name (has a value only inside a function).     |

In the example below, the positional arguments will be `$0='./script.sh'`,  `$1='foo'` and `$2='bar'`:

    ./script.sh foo bar

Variables may also have _default_ values. We can define as such using the following syntax:

```bash
 # if variables are empty, assign then default values
: ${VAR:='default'}
: ${$1:='first'}
```

# Arrays

Like in other programming languages, an array in bash is a variable that allows you to refer to multiple values. In bash, arrays are also zero-based, this is, the first element in an array has index 0.

When dealing with arrays, we should be aware of the special environment variable `IFS`. **IFS** or **Input Field Separator** — is the character that separates elements in an array. The default value is an empty space `IFS=' '`.

## Array declaration

In bash you create an array by simply assigning a value to an index in the array variable:

```bash
fruits[0]=Apple
fruits[1]=Pear
fruits[2]=Plum
echo ${fruits[*]} # echo ${fruits[@]} may be used as well
```

Array variables can also be created using compound assignments such as:

```bash
fruits=(Apple Pear Plum)
```

## Array slice

Besides, we can extract a slice of array using the _slice_ operators:

```bash
echo ${fruits[*]:0:2} # Apple Pear
```

In the example above, `fruits[*]` returns the entire contents of the array, and `:0:2` extracts the slice of length 2, that starts at index 0.

## Adding elements into an array

Adding elements into an array is quite simple too. Compound assignments are specially useful in this case. We can use them like this:

```bash
fruits=(Orange ${fruits[*]} Banana Cherry)
echo ${fruits[*]} # Orange Apple Pear Plum Banana Cherry
```

The example above, `fruits[*]` the entire contents of the array and substitutes it into the compound assignment, then assigns the new value into the `fruits` array mutating its original value.

## Deleting elements from an array

To delete an element from an array, use the `unset` command:

```bash
unset fruits[0]
echo ${fruits[*]} # Apple Pear Plum Banana Cherry
```

# Shell expansions

_Expansions_ are performed on the command line after it has been split into _tokens_. In other words, these expansions are mechanism to calculate arithmetical operations, to save results of command's executions and so on.

If you are interested, you can read [more about shell expansions](https://www.gnu.org/software/bash/manual/bash.html#Shell-Expansions).

## Brace expansion

Brace expansion allow us to generate arbitrary strings. It's similar to _filename expansion_. For example:

```bash
echo beg{i,a,u}n # begin began begun
```

Also brace expansions may be used for creating ranges, which are iterated over in loops.

```bash
echo {0..5} # 0 1 2 3 4 5
echo {00..8..2} # 00 02 04 06 08
```

## Command substitution

Command substitution allow us to evaluate a command and substitute its value into another command or variable assignment. Command substitution is performed when a command is enclosed by `` `​` `` or `$()`.  For example, we can use it as follows:

```bash
now=`date +%T`
# or
now=$(date +%T)

echo $now # 19:08:26
```

## Arithmetic expansion

In bash we are free to do any arithmetical operations. But the expression must enclosed by `$(( ))` The format for arithmetic expansions is:

```bash
result=$(( ((10 + 5*3) - 7) / 2 ))
echo $result # 9
```

## Double and single quotes

There is an important difference between double and single quotes. Inside double quotes variables or command substitutions are expanded. Inside single quotes they are not. For example:

```bash
echo "Your home: $HOME" # Your home: /Users/<username>
echo 'Your home: $HOME' # Your home: $HOME
```

# Streams, pipes and lists

Bash has powerful tools for working with other programs and their outputs. Using streams we can send the output of a program into another program or file and thereby write logs or whatever we want.

Pipes give us opportunity to create conveyors and control the execution of commands.

It is paramount we understand how to use this powerful and sophisticated tool.

## Streams

Bash receives input and sends output as sequences or **streams** of characters. These streams may be redirected into files or one into another.

There are three descriptors:

| Code | Descriptor | Description          |
| :--: | :--------: | :------------------- |
| `0`  | `stdin`    | The standard input.  |
| `1`  | `stdout`   | The standard output. |
| `2`  | `stderr`   | The errors output.   |

Redirection makes it possible to control where the output of a command goes to, and where the input of a command comes from. For redirecting streams these operators are used:

| Operator | Description                                  |
| :------: | :------------------------------------------- |
| `>`      | Redirecting output                           |
| `&>`     | Redirecting output and error output          |
| `&>>`    | Appending redirected output and error output |
| `<`      | Redirecting input                            |
| `<<`     | [Here documents](http://tldp.org/LDP/abs/html/here-docs.html) syntax |
| `<<<`    | [Here strings](http://www.tldp.org/LDP/abs/html/x17837.html) |

Here are few examples of using redirections:

```bash
# output of ls will be written to list.txt
ls -l > list.txt

# append output to list.txt
ls -a >> list.txt

# all errors will be written to errors.txt
grep da * 2> errors.txt

# read from errors.txt
less < errors.txt
```

## Pipes

We could redirect standard streams not only in files, but also to other programs. **Pipes** let us use the output of a program as the input of another.

In the example below, `command1` sends its output to `command2`, which then passes it on to the input of `command3`:

    command1 | command2 | command3

Constructions like this are called **pipelines**.

In practice, this can be used to process data through several programs. For example, here the output of `ls -l` is sent to the `grep` program, which  prints only files with a `.md` extension, and this output is finally sent to the `less` program:

    ls -l | grep .md$ | less

# Lists of commands

A **list of commands** is a sequence of one or more pipelines separated by `;`, `&`, `&&` or `||` operator.

If a command is terminated by the control operator `&`, the shell executes the command asynchronously in a subshell. In other words, this command will be executing in the background.

Commands separated by a `;` are executed sequentially: one after another. The shell waits for the finish of each command.

```bash
# command2 will be executed after command1
command1 ; command2

# which is the same as
command1
command2
```

Lists separated by `&&` and `||` are called _AND_ and _OR_ lists, respectively.

The _AND-list_ looks like this:

```bash
# command2 will be executed if, and only if, command1 finishes successfully (returns 0 exit status)
command1 && command2
```

The _OR-list_ has the form:

```bash
# command2 will be executed if, and only if, command finishes unsuccessfully (returns code of error)
command1 || command2
```

The return code of _AND_ and _OR_ lists the exit status of the last executed command.

# Conditional statements

Like in other languages, Bash conditionals let us decide to perform an action or not.  The result is determined by evaluating an expression, which should be enclosed in `[[ ]]`.

Conditional expression may contain `&&` and `||` operator, which are _AND_ and _OR_ accordingly. Beside this, there many [other handy expression](#primary-and-combining-expressions).

There are two different conditional statements: `if` statement and `case` statement.

## Primary and combining expressions

Expressions enclosed inside `[[ ]]` (or `[ ]` for `sh`) are called **test commands** or **primaries**. These expressions help us to indicate results of a conditional. In tables bellow, we are using `[ ]`, because it works for `sh` too. Here is an answer about [the difference between double and single square brackets in bash](http://serverfault.com/a/52050).

**Working with file system:**

| Primary       | Meaning                                                      |
| :-----------: | :----------------------------------------------------------- |
| `[ -e FILE ]` | True if `FILE` **e**xists and is a directory or regular file.|
| `[ -f FILE ]` | True if `FILE` exists and is a regular **f**ile.             |
| `[ -d FILE ]` | True if `FILE` exists and is a **d**irectory.                |
| `[ -s FILE ]` | True if `FILE` exists and not empty (**s**ize more than 0).  |
| `[ -r FILE ]` | True if `FILE` exists and is **r**eadable.                   |
| `[ -w FILE ]` | True if `FILE` exists and is **w**ritable.                   |
| `[ -x FILE ]` | True if `FILE` exists and is e**x**ecutable.                 |
| `[ -L FILE ]` | True if `FILE` exists and is symbolic **l**ink.              |
| `[ FILE1 -nt FILE2 ]` | FILE1 is **n**ewer **t**han FILE2.                   |
| `[ FILE1 -ot FILE2 ]` | FILE1 is **o**lder **t**han FILE2.                   |

**Working with strings:**

| Primary        | Meaning                                                     |
| :------------: | :---------------------------------------------------------- |
| `[ -z STR ]`   | `STR` is empty (the length is **z**ero).                    |
| `[ -n STR ]`   |`STR` is not empty (the length is **n**on-zero).             |
| `[ STR1 == STR2 ]` | `STR1` and `STR2` are equal.                            |
| `[ STR1 != STR2 ]` | `STR1` and `STR2` are not equal.                        |

**Arithmetic binary operators:**

| Primary             | Meaning                                                |
| :-----------------: | :----------------------------------------------------- |
| `[ ARG1 -eq ARG2 ]` | `ARG1` is **eq**ual to `ARG2`.                         |
| `[ ARG1 -ne ARG2 ]` | `ARG1` is **n**ot **e**qual to `ARG2`.                 |
| `[ ARG1 -lt ARG2 ]` | `ARG1` is **l**ess **t**han `ARG2`.                    |
| `[ ARG1 -le ARG2 ]` | `ARG1` is **l**ess than or **e**qual to `ARG2`.        |
| `[ ARG1 -gt ARG2 ]` | `ARG1` is **g**reater **t**han `ARG2`.                 |
| `[ ARG1 -ge ARG2 ]` | `ARG1` is **g**reater or **e**qual to `ARG2`.          |

Conditions may be combined using these **combining expressions:**

| Operation      | Effect                                                      |
| :------------: | :---------------------------------------------------------- |
| `[ ! EXPR ]`   | True if `EXPR` is false.                                    |
| `[ (EXPR) ]`   | Returns the value of `EXPR`.                                |
| `[ EXPR1 -a EXPR2 ]` | Logical _AND_. True if `EXPR1` **a**nd `EXPR2` are true. |
| `[ EXPR1 -o EXPR2 ]` | Logical _OR_. True if `EXPR1` **o**r `EXPR2` are true.|

Sure, there is more useful primaries and you can easily find it in [Bash man pages](http://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html).

## Using an `if` statement

`if` statements work the same as in other programming languages. If the expression within the braces is true, the code between `then` and `fi` is executed.  `fi` indicates the end of the conditionally executed code.

```bash
# Single-line
if [[ 1 -eq 1 ]]; then echo "true"; fi;

# Multi-line
if [[ 1 -eq 1 ]]; then
  echo "true"
fi
```

Likewise, we could use `if..else` statement such as:

```bash
# Single-line
if [[ 2 -ne 1 ]]; then echo "true"; else echo "false"; fi;

# Multi-line
if [[ 2 -ne 1 ]]; then
  echo "true"
else
  echo "false"
fi
```

Sometimes `if..else` statements are not enough to do what we want to do. In this case we shouldn't forget about the existence of `if..elif..else` statements, which always come in handy.

Look at the example below:

```bash
if [[ `uname` == "Adam" ]]; then
  echo "Do not eat an apple!"
elif [[ `uname` == "Eva" ]]; then
  echo "Do not take an apple!"
else
  echo "Apples are delicious!"
fi
```

## Using a `case` statement

If you are confronted with a couple of different possible actions to take, then using a `case` statement may more useful than nested `if` statements. For more complex conditions use `case` like below:

```bash
case "$extension" in
  "jpg"|"jpeg")
    echo "It's image with jpeg extension."
  ;;
  "png")
    echo "It's image with png extension."
  ;;
  "gif")
    echo "Oh, it's a giphy!"
  ;;
  *)
    echo "Woops! It's not image!"
  ;;
esac
```

Each case is an expression matching a pattern. The `|` sign is used for separating multiple patterns, and the `)` operator terminates a pattern list. The commands for the first match are executed. `*` is the pattern for anything else that doesn't match the defined patterns. Each block of commands should be divided with `;;` operator.

# Loops

Here we won't be surprised. As in any programming language, a loop in bash is a block of code that iterates as long as the control conditional is true.

There are three types of loops in Bash: `for`, `while`, `until` and `select`.

## `for` loop

The `for` is very similar to its sibling in C. It looks like this:

```bash
for arg in elem1 elem2 ... elemN
do
  # statements
done
```

During each pass through the loop, `arg` takes on the value from `elem1` to `elemN`. Values may also be wildcards or [brace expansion](#bracelexpansion).

Also, we can write `for` loop in one line, but in this case there needs to be a semicolon before `do`, like below:

```bash
for i in {1..5}; do echo $i; done
```

By the way, if `for..in..do` seems a little bit weird to you, you can also write `for` in C-like style such as:

```bash
for (( i = 0; i < 10; i++ )); do
  echo $i
done
```

`for` is handy when we want to do the same operation over each file in a directory. For example, if we need to move all `.bash` files into `script` folder and then give them execute permissions, our script would look like this:

```bash
#!/bin/bash

for FILE in $HOME/*.bash; do
  mv $FILE ${HOME}/scripts
  chmod +x ${HOME}/scripts/${FILE}
done
```

## `while` loop

The `while` loop tests a condition and loops a sequence of commands until that condition is _true_. A condition is nothing more than [primary](#primary-and-combining-expressions) is used in `if..then` conditions. So `while` loop looks like this:

```bash
while [[ condition ]]
do
  # statements
done
```

Just like in the case of the `for` loop, if we want to write `do` and condition in the same line, then we must use a semicolon before `do`.

A working example might look like this:

```bash
#!/bin/bash

# Squares of numbers from 1 to 10
x=0
while [[ $x -lt 10 ]]; do # value of x is less than 10
  echo $(($x*$x))
  x=`expr $x + 1` # increase x
done
```

## `until` loop

The `until` loop is the exact opposite of the `while` loop. Like a `while` it checks a test condition, but it keeps looping as long as this condition is _false_:

```bash
until [[ conditions ]]; do
  #statements
done
```

## `select` loop

The `select` loop helps us to organize a user menu. It has almost the same syntax as `for` loop:

```bash
select answer in elem1 elem2 ... elemN
do
  # statements
done
```

The `select` prints all `elem1..elemN` on the screen with their sequence numbers, after that it prompts the user. Usually it looks like `$?` (`PS3` variable). The answer will save in `answer`. If `answer` is the number between `1..N`, then `statements` will execute and `select` will go to the next iteration — that's because we should use `break` statement.

A working example might look like this:

```bash
#!/bin/bash

PS3="Choose the package manager: "
select ITEM in bower npm gem pip
do
  echo -n "Enter the package name: " && read PACKAGE
  case $ITEM in
    bower) bower install $PACKAGE ;;
    npm)   npm   install $PACKAGE ;;
    gem)   gem   install $PACKAGE ;;
    pip)   pip   install $PACKAGE ;;
  esac;
  break # avoid infinite loop
done
```

This example, asks the user what package manager {s,he} would like to use. Then, it will ask what package we want to install and finally proceed to install it.

If we run this, we will get:

```
$ ./my_script
1) bower
2) npm
3) gem
4) pip
Choose the package manager: 2
Enter the package name: bash-handbook
<installing bash-handbook>
```

## Loop control

There are situations when we need to stop a loop before its normal ending or step over an iteration. In these cases, we can use the shell built-in **break** and **continue** statements. Both of these work with every kind of loop.

The **break** statement is used to exit the current loop before its ending. We have already met with it.

The **continue** statement steps over one iteration. We can use it as such:

```bash
for (( i = 0; i < 10; i++ )); do
  if [[ $(($i % 2)) == 0 ]]; then continue; fi;
  echo $i
done
```

If we run the example above, it will print all odd numbers from 0 to 10.

# Functions

In scripts we have the ability to define and call functions. As in any programming language, functions in bash are chunks of code, but there are other differences.

In bash, functions are a sequence of commands grouped under a single name, that is the _name_ of the function. Calling a function is the same as calling any other program, you just write the name and the function will be _invoked_.

We can declare our own function this way:

```bash
my_func () {
  # statements
}

my_func # call my_func
```

We must declare functions before we can execute them.

Functions can take on arguments and return a result — exit code. Arguments, within functions, are treated in the same manner as arguments given to the script in [non-interactive](#non-interactive-mode) mode — using [positional parameters](#positional-parameters). A result code can be _returned_ using the `return` command.

Below is a function that takes a name and returns `0`, indicating successful execution.

```bash
# function with params
greeting () {
  if [[ -n $1 ]]; then
    echo "Hello, $1!"
  else
    echo "Hello, unknown!"
  fi
  return 0
}

greeting Denys  # Hello, Denys!
greeting        # Hello, unknown!
```

We already discussed [exit codes](#exit-codes). The `return` command returns the exit code of the last executed command. Above, `return 0` will return a successful exit code. `0`.

## Debugging

The shell give us tools for debugging scripts. If we want to run a script in debug mode, we use a special option in our script's shebang:

```bash
#!/bin/bash options
```

These options are settings that change shell behavior. The following table is a list of options which might be useful to you:

| Short | Name        | Description                                            |
| :---: | :---------- | :----------------------------------------------------- |
| `-f`  | noglob      | Disable filename expansion (globbing).                 |
| `-i`  | interactive | Script runs in _interactive_ mode.                     |
| `-n`  | noexec      | Read command, but don't execute them (syntax check).   |
| `-t`  | —           | Exit after first command.                              |
| `-v`  | verbose     | Print each command to `stdout` before executing it.    |
| `-x`  | xtrace      | Print each command to `stdout` before executing it and expands commands. |

For example, we have script with `-x` option such as:

```bash
#!/bin/bash -x

for (( i = 0; i < 3; i++ )); do
  echo $i
done
```

This will print the value of the variables to `stdout` along with other useful information:

```
$ ./my_script
+ (( i = 0 ))
+ (( i < 3 ))
+ echo 0
0
+ (( i++  ))
+ (( i < 3 ))
+ echo 1
1
+ (( i++  ))
+ (( i < 3 ))
+ echo 2
2
+ (( i++  ))
+ (( i < 3 ))
```

Sometimes we need to debug a part of a script. In this case using the `set` is convenient. This command can enable and disable options. Options are turned on using `-` and turned off using `+`:

```bash
#!/bin/bash

echo "xtrace is turned off"
set -x
echo "xtrace is enabled"
set +x
echo "xtrace is turned off again"
```

# Afterwords

I hope this small handbook was interesting and helpful. To be honest, I wrote this handbook for myself so as to not forget the bash basics. I tried to write concisely but meaningfully, and I hope you will appreciate that.

This handbook narrates my own experience with Bash. It does not purport to be comprehensive, so if you still want more, please run `man bash` and start there.

Contributions are absolutely welcome and I will be grateful for any corrections or questions you can send my way. For all of that create a new [issue](https://github.com/denysdovhan/bash-handbook/issues).

Thanks for reading this handbook!

# Want to learn more?

Here's a list of other literature covering Bash:

* Bash man page.  In many environments that you can run Bash, the help system `man` can display information about Bash, by running the command `man bash`.  For more information on the `man` command, see the web page ["The man Command"](http://www.linfo.org/man.html) hosted at [The Linux Information Project](http://www.linfo.org/).

* ["Bourne-Again SHell manual"](https://www.gnu.org/software/bash/manual/) in many formats, including HTML, Info, TeX, PDF, and Texinfo.  Hosted at <https://www.gnu.org/>.  As of 2016/01, this covers version 4.3, last updated 2015/02/02.

* [Bash 3.2 Man page](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/bash.1.html) hosted at Apple's Mac Developer Library site.  As of 2016/01, this covers version 3.2, last updated 2006/09/28.


# License

[![CC 4.0][cc-image]][cc-url] © [Denys Dovhan](http://denysdovhan.com)

[cc-url]: http://creativecommons.org/licenses/by/4.0/
[cc-image]: https://i.creativecommons.org/l/by/4.0/80x15.png
