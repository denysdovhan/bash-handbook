# bash-handbook [![CC 4.0][cc-image]][cc-url]

이 문서는 Bash를 알기위해서 작성되었습니다 깊게 들어가지는 않습니다.

> **Tip**: [**learnyoubash**](https://git.io/learnyoubash) - 이 핸드북 내용에 대해서 interactive한 워크샵을 진행할 수 있습니다.

# Node Packaged Manuscript

`npm`을 이용해서 이 핸드북을 설치할 수 있습니다. 다음 명령어를 실행하십시오:

```
$ npm install -g bash-handbook
```

설치 후 `bash-handbook` 이라고 명령을 실행합니다. `$PAGER` 선택자를 이용하여 메뉴얼의 페이지를 확인할 수 있습니다. 그렇지 계속 여기서 읽으셔도 됩니다.

소스 코드는 여기에 있습니다: <https://github.com/denysdovhan/bash-handbook>

# 목차

- [소개](#소개)
- [Shells and modes](#shells-and-modes)
  - [Interactive](#interactive-mode)
  - [Non-interactive](#non-interactive-mode)
  - [Exit codes](#exit-codes)
- [Comments](#comments)
- [Variables](#variables)
  - [Local variables](#local-variables)
  - [Environment variables](#environment-variables)
  - [Positional parameters](#positional-parameters)
- [Shell expansions](#shell-expansions)
  - [Brace expansion](#brace-expansion)
  - [Command substitution](#command-substitution)
  - [Arithmetic expansion](#arithmetic-expansion)
  - [Double and single quotes](#double-and-single-quotes)
- [Arrays](#arrays)
  - [Array declaration](#array-declaration)
  - [Array expansion](#array-expansion)
  - [Array slice](#array-slice)
  - [Adding elements into an array](#adding-elements-into-an-array)
  - [Deleting elements from an array](#deleting-elements-from-an-array)
- [Streams, pipes and lists](#streams-pipes-and-lists)
  - [Streams](#streams)
  - [Pipes](#pipes)
  - [Lists of commands](#lists-of-commands)
- [Conditional statements](#conditional-statements)
  - [Primary and combining expressions](#primary-and-combining-expressions)
  - [Using an `if` statement](#using-an-if-statement)
  - [Using a `case` statement](#using-a-case-statement)
- [Loops](#loops)
  - [`for` loop](#for-loop)
  - [`while` loop](#while-loop)
  - [`until` loop](#until-loop)
  - [`select` loop](#select-loop)
  - [Loop control](#loop-control)
- [Functions](#functions)
- [Debugging](#debugging)
- [Afterword](#afterword)
- [Other resources](#other-resources)
- [License](#license)

# 소개

당신이 개발자라면, 값진 시간이 될 것이다. 업무 프로세스를 최적화하는 것은 일을 진행하는데 있어서 가장 중요한 측면 중 하나입니다.

몇번이고 반복해야하는 작업에대한 효율성과 생산성을 높이기위한 조치가 제기됩니다. 다음과 같이:

* 서버에서 스크린샷을 찍거나 업로딩하는 경우
* 많은 텍스트들을 보기 좋게하거나 폼에 맞추는 경우
* 파일을 다른 포맷으로 변경하는 경우
* 프로그램에서 나오는 출력을 파싱하는 경우

**Bash**는 우리의 구세주입니다!

Bash [Bourne shell](https://en.wikipedia.org/wiki/Bourne_shell)을 대체할 GNU 프로젝트로 [Brain Fox][]의해 작성된Unix 셸입니다. 1989년에 릴리즈되었으며, Linux와 OS X에서 기본 셸로 오랫동안 사용되었습니다.

[Brian Fox]: https://en.wikipedia.org/wiki/Brian_Fox_(computer_programmer)
<!-- link this format, because some MD processors handle '()' in URLs poorly -->

그럼 우리는 왜 30년도 더된 기술을 배워야될까? 대답은 간단하다: 이 _something_은 오늘날 모든 Unix 기반 시스템에서 효율적인 스크립트를 작성하기 위한 가장 강력한 도구중 하나입니다. 그리고 이것이 당신이 Bash를 배워야되는 이유입니다. 이상.

이 핸드북은 bash에서 사용하는 가장 중요한 개념을 설명하고 있습니다. 난 이 요약한것이 당신에게 도움이 되었으면 합니다.

# Shells and modes

Bash 셸은 두가지모드로 작업이 가능합니다 - interactive mode와 non-interactive 모드.

## Interactive mode

당신이 Ubuntu에서 작업을하고 있다면, 7개나되는 가상 터미널을 사용할 수 있습니다.
데스크탑 환경은 7번째 가상 터미널로 GUI모드로 돌아오고 싶다면 `Ctrl-Alt-F7`을 이용하여 GUI를 사용할 수 있습니다.

`Ctrl-Alt-F1`키를 이용하여 shell을 열 수 있습니다. 그런 다음, 친숙한 GUI는 사라지고 1번 가상 터미널이 보여집니다.

Interactive 모드에서 작업중이라면 다음과 같이 보여집니다:

    user@host:~$

여기서 여러가지 Unix 명령어를 입력할 수 있습니다. `ls`, `grep`, `cd`, `mkdir`, `rm`과 같은 명령과 그것을 실결과 값을 확인할 수 있습니다.

셸이 사용자와 직접 상호 작용을 하기에 우리는 셸과 interactive가 가능합니다.

가상 터미널 사용은 불편합니다. 예를 들어, 한번에 문서를 수정하고, 다른 명령어를 사용하는 경우라면 다음의 가상 터미널 에뮬레이터를 사용하는 것이 좋습니다:

- [GNOME Terminal](https://en.wikipedia.org/wiki/GNOME_Terminal)
- [Terminator](https://en.wikipedia.org/wiki/Terminator_(terminal_emulator))
- [iTerm2](https://en.wikipedia.org/wiki/ITerm2)
- [ConEmu](https://en.wikipedia.org/wiki/ConEmu)

## Non-interactive mode

Non-interactive 모드에서는 셸에서 파일이나 pipe를 통하여 명령을 읽고 실행합니다. Interpreter는 파일이 끝나게되면 셸 프로세스는 세션을 종료하고 부모 프로세스로 돌아갑니다.

다음 명령으로 non-interactive 모드로 셸을 실행시킬수 있습니다:

    sh /path/to/script.sh
    bash /path/to/script.sh

위 예제에서 `script.sh`는 셸 인터프리터가 알 수 있는 명령으로 구성된 일판 파일이고 `sh`, `bash`는 셸 인터프리터 프로그램입니다. 당신은 `script.sh` 파일을 편한 에디터로 작성할 수 있습니다. (예, vim, nano, Sublime Text, Atom 등)

`chmod` 명령을 통해 실행파일로 변경하야 스크립트를 쉽게 실행할 수 있습니다.

    chmod +x /path/to/script.sh

또한 스크립트 첫줄은 파일에서 실행하는데 사용되는 프로그램을 다음과 같이 표시해야합니다:

```bash
#!/bin/bash
echo "Hello, world!"
```

`bash`보다 `sh`가 더 좋다면, `#!/bin/bash` 구문을 `#!/bin/sh`로 변경하면된다. 이 `#!` 문자열은 [shebang](http://en.wikipedia.org/wiki/Shebang_%28Unix%29)로 알려져있다. 그럼 이제 다음처럼 스크립트를 실행할 수 있습니다:

    /path/to/script.sh

위에서 작성한 간단한 trick은 `echo` 명령을 이용하여 터미널에 텍스트를 출력합니다.

Shebang 라인에 다음과 같은 방법으로 입력할 수도 있습니다:

```bash
#!/usr/bin/env bash
echo "Hello, world!"
```

이 shebang에서 좋은점은 시스템 `PATH` 환경 변수로 지정된 것을 기반으로 프로그램을 (여기서는 `bash`) 실행한다는 것입니다. 이것은 파일 시스템에서 프로그램 path가 동일하지 않을 수 있기에 첫번째 방법보다는 바람직합니다. 시스템 `PATH`가 다른 버전에대한 프로그램으로 표기하고 있을때 유용합니다. 예를 들어, 기존 버전인 `bash`를 유지하면서 새로운 버전으로 설치하고 `PATH` 변수에 새로운 위치를 입력하여 사용할 수 있습니다. 기존 `bash`를 사용하기위해서는 `#!/bin/bash`를 사용하고 새로운 버전을 사용하기위해 `#!/usr/bin/env bash`를 사용하면 됩니다.


## Exit codes

모든 명령은 **exit code**를 반환합니다 (**return status** 또는 **exit status**). 정상 작동한 명령은 항상 `0` (zero-code)를, 정상 작동이 안된경우 0이 아닌 값(error code)을 반환합니다. 실패 코드는 1에서 255까지인 양의 정수이어야 합니다.

스크립트로 사용할때 우리가 사용할 수 있는 유용한 명령 중 하나는 `exit`입니다. 이 명령은 실행되고 있는 명령을 종료하고 셸에 종료 코드를 전달하는데 사용합니다. 인수없이 `exit` 코드를 실행하면 실행중인 스크립트가 종료되고나면 `exit` 전 마지막으로 실행한 명령이 반한환 종료 코드를 반환하게 됩니다.

프로그램이 종료되면 셸은 `$?` 환경변수에 그 **exit code**가 할당됩니다. `$?` 변수는 스크립트가 실행되었는지 여부를 확인할 수 있는 기본 테스트 방법입니다.

마찬가지로 우리는 스크립트를 종료하기위해 `exit`를 사용할 수 있고, `return` 명령을 사용하여 함수를 종료하고 caller에게 **exit code**를 반환합니다. 함수 내부에서 `exit`를 사용할 수 있으며, 함수를 종료_하고_ 프로그램을 프로그램을 죽입니다.

# Comments

스크립트는 _주석_을 포함해도됩니다. 주석은 `shell` 인터프리터에서 무시되는 특별한 문장입니다. `#`으로 시작해며 줄바꿈이 있기전까지 작성된 내용은 주석처리됩니다.

예를 들어:

```bash
#!/bin/bash
# This script will print your username.
whoami
```

> **Tip**: _왜_ 스크립트를 만들었는지에 대한 내용을 주석에 넣어야됩니다.

# Variables

다른 프로그래밍 언어처럼 변수를 생성하여 사용할수 있습니다.

Bash는 데이터 타입을 알 수 없습니다. 그래서 변수는 오직 숫자(numbers)나 하나 이상의 문자열(string)로 할당이 가능합니다. 변수는 3가지로 만들 수 있습니다: 지역 변수, 환경 변수, _positional arguments_ 변수입니다.

## Local variables

**지역 변수 (Local variables)**는 단일 스크립트 내에 존재하는 변수입니다. 다른 프로그램이나 스크립트에서 접근할 수 없습니다.

지역 변수는 `=` 기호를 이용하여 할당할 수 있습니다. 규칙상 `=`과 값사이에는 공백이 **있어서는 안됩니다**. 그리고 값을 부를때는 `$` 기호를 이용하여 부릅니다. 예를 들어:

```bash
username="denysdovhan"  # declare variable
echo $username          # display value
unset username          # delete variable
```

또한 `local` 키워드를 사용하여 단일 함수에 지역 변수를 선언 할 수 있습니다. 이렇게하면 함수가 종료할때 변수가 표시되지 않습니다.

```bash
local local_var="I'm a local value"
```

## Environment variables

**환경 변수 (Environment variables)**는 현재 셸 섹션에서 실행되고 있는 프로그램이나 스크립트에서 접근할 수 있는 변수 입니다. 지역 변수와 같이하여 만들지만, `export` 키워드를 사용하여 생성합니다.

```bash
export GLOBAL_VAR="I'm a global variable"
```

Bash에서는 전역 변수가 _좀_ 있습니다. 자주 이런 변수를 확인하기 위해 순람표가 있습니다:

| 변수         | 설명                                                            |
| :----------- | :-------------------------------------------------------------- |
| `$HOME`      | 현재 사용자 홈 디렉토리.                                        |
| `$PATH`      | 셸에서 사용하는 명령어를 찾기위한 위치. 콜론으로 목록을 구분함. |
| `$PWD`       | 현재 작업중인 디렉토리.                                         |
| `$RANDOM`    | 0 ~ 32767 사이의 렌덤 인트값.                                   |
| `$UID`       | 현자 사용자의 실재 사용자 ID, 숫자로 표기됨.                    |
| `$PS1`       | 첫번째 프롬프트 문자열.                                         |
| `$PS2`       | 두번째 프롬프트 문자열.                                         |

다음에 [링크](http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_03_02.html#sect_03_02_04)에서 bash에 있는 환경 변수 확장 목록을 확인할 수 있습니다.

## Positional parameters

**위치 매개변수 (Positional parameters)**는 함수는 값을 구하고 할당된 위치에 대한 값을 할당합니다. 함수 내부에 있는 경우, 다음 표에 나열된 위치 매개 변수와 기타 특별한 변수에 대한 의미를 보여줍니다. (역자주: Argument라고 불리우는 매개변수들이다.)

| 매개변수       | 설명                                                        |
| :------------- | :---------------------------------------------------------- |
| `$0`           | 스크립트 이름.                                              |
| `$1 … $9`      | 1 ~ 9까지 매개변수 목록 요소.                              |
| `${10} … ${N}` | 10 ~ N까지 매개변수 목록 요소.                             |
| `$*` or `$@`   | `$0`을 제외한 모든 위치 매개변수.                           |
| `$#`           | 매개변수에 대한 숫자, `$0`를 제외하고.                      |
| `$FUNCNAME`    | 함수 이름 (함수 내에서만 값을 가집니다)                     |

다음 예제를 위치 매개변수로 나타내면 `$0='./script.sh'`, `$1='foo'`, `$2='bar'`:

    ./script.sh foo bar

변수에 _기본_ 값이 존재할 수 있습니다. 다음 구문으로 해당 값을 정의하면 가능합니다:

```bash
 # if variables are empty, assign them default values
: ${VAR:='default'}
: ${$1:='first'}
# or
FOO=${FOO:-'default'}
```

# Shell expansions

_Expansions(확장 or 전개식)_은 _token_으로 나눠진후 커멘드라인에서 실행됩니다. 계산 산술 연산 매커니즘에서 다른 단어들은 명령이 실행되고 값이 저장됩니다.

여기에 흥미가 있다면 [more about shell expansions](https://www.gnu.org/software/bash/manual/bash.html#Shell-Expansions)를 볼 것.

## Brace expansion

중괄호 expansion은 임의의 문자열을 생성할 수 있습니다. _Filename expansion_과 비슷합니다. 예로:

```bash
echo beg{i,a,u}n # begin began begun
```

또한 중괄호 expansion는 루프에서 반복할 범위를 생성할때 사용할 수 있습니다.

```bash
echo {0..5} # 0 1 2 3 4 5
echo {00..8..2} # 00 02 04 06 08
```

## Command substitution

명령 치환은 우리가 명령에대한 값을 구하고 다른 명령이나 변수를 할당하는데 그 값을 할당할 수 있습니다. 명령은 ``` `` ``` 이나 `$()`로 묶였을때 명령어로 치환이됩니다. 예를 들어 다음과 같이 사용할 수 있습니다:

```bash
now=`date +%T`
# or
now=$(date +%T)

echo $now # 19:08:26
```

## Arithmetic expansion

Bash에서의 산술 연산은 자유롭게 사용할 수 있습니다. 그러나 수식의 경우엔 `$(())`로 묶어 사용합니다. 산술 expansion 형식은:

```bash
result=$(( ((10 + 5*3) - 7) / 2 ))
echo $result # 9
```

산술 expansion에서 변수는 일반적으로  `$` 접두사 없이 사용합니다:

```bash
x=4
y=7
echo $(( x + y ))     # 11
echo $(( ++x + y++ )) # 12
echo $(( x + y ))     # 13
```

## Double and single quotes

큰 따옴표와 작은 따옴표 사이에는 중요한 차이가 있습니다. 큰 따옴표 안에서 변수나 명령 치환이 진행됩니다. 작은 따옴표 안에서는 그렇지 않습니다. 예를 들면:

```bash
echo "Your home: $HOME" # Your home: /Users/<username>
echo 'Your home: $HOME' # Your home: $HOME
```

공백이 포함되어있는 경우, 따옴표 안에 지역 변수와 환경 변수 확장시 주의합니다. 지루한 예제로 `echo`를 이용하여 사용자가 입력한 값에 대하서 출력하는 것을 고려하십시오:

```bash
INPUT="A string  with   strange    whitespace."
echo $INPUT   # A string with strange whitespace.
echo "$INPUT" # A string  with   strange    whitespace.
```

첫번째 `echo`는 $INPUT 변수에 있는 단어들을 5개인 변수로 인식하여 한칸씩 띄워 `echo`로 출력합니다. 두번째 `echo`는 공백을 포함한 $INPUT 변수 전체 값을 단일 인수로 받아 들여 출력합니다.

이제 더 복잡한 경우를 봅시다:

```bash
FILE="Favorite Things.txt"
cat $FILE   # attempts to print 2 files: `Favorite` and `Things.txt`
cat "$FILE" # prints 1 file: `Favorite Things.txt`
```

이련 경우, `Favorite-Things.text`와 같은 이름을 파일 이름을 변경해서 해결 할 수 있지만, 환경 변수, 위치 매개변수, 다른 명령 (`find`, `cat` 등)을 이용하여 출력하는 것을 확인해야됩니다. 만약 입력값에 공백이 포함되어 *있을지도 모른다면* 따옴표로 감쌉니다.

# Arrays

Like in other programming languages, an array in bash is a variable that allows you to refer to multiple values. In bash, arrays are also zero-based, that is, the first element in an array has index 0.

When dealing with arrays, we should be aware of the special environment variable `IFS`. **IFS**, or **Input Field Separator**, is the character that separates elements in an array. The default value is an empty space `IFS=' '`.

## Array declaration

In bash you create an array by simply assigning a value to an index in the array variable:

```bash
fruits[0]=Apple
fruits[1]=Pear
fruits[2]=Plum
```

Array variables can also be created using compound assignments such as:

```bash
fruits=(Apple Pear Plum)
```

## Array expansion

Individual array elements are expanded similar to other variables:

```bash
echo ${fruits[1]} # Pear
```

The entire array can be expanded by using `*` or `@` in place of the numeric index:

```bash
echo ${fruits[*]} # Apple Pear Plum
echo ${fruits[@]} # Apple Pear Plum
```

There is an important (and subtle) difference between the two lines above: consider an array element containing whitespace:

```bash
fruits[0]=Apple
fruits[1]="Desert fig"
fruits[2]=Plum
```

We want to print each element of the array on a separate line, so we try to use the `printf` builtin:

```bash
printf "+ %s\n" ${fruits[*]}
# + Apple
# + Desert
# + fig
# + Plum
```

Why were `Desert` and `fig` printed on separate lines? Let's try to use quoting:

```bash
printf "+ %s\n" "${fruits[*]}"
# + Apple Desert fig Plum
```

Now everything is on one line — that's not what we wanted! Here's where `${fruits[@]}` comes into play:

```bash
printf "+ %s\n" "${fruits[@]}"
# + Apple
# + Desert fig
# + Plum
```

Within double quotes, `${fruits[@]}` expands to a separate argument for each element in the array; whitespace in the array elements is preserved.

## Array slice

Besides, we can extract a slice of array using the _slice_ operators:

```bash
echo ${fruits[@]:0:2} # Apple Desert fig
```

In the example above, `${fruits[@]}` expands to the entire contents of the array, and `:0:2` extracts the slice of length 2, that starts at index 0.

## Adding elements into an array

Adding elements into an array is quite simple too. Compound assignments are specially useful in this case. We can use them like this:

```bash
fruits=(Orange "${fruits[@]}" Banana Cherry)
echo ${fruits[@]} # Orange Apple Desert fig Plum Banana Cherry
```

The example above, `${fruits[@]}` expands to the entire contents of the array and substitutes it into the compound assignment, then assigns the new value into the `fruits` array mutating its original value.

## Deleting elements from an array

To delete an element from an array, use the `unset` command:

```bash
unset fruits[0]
echo ${fruits[@]} # Apple Desert fig Plum Banana Cherry
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

The exit status of a pipeline is normally the exit status of the last command in the pipeline. The shell will not return a status until all the commands in the pipeline have completed. If you want your pipelines to be considered a failure if any of the commands in the pipeline fail, you should set the pipefail option with:

    set -o pipefail

## Lists of commands

A **list of commands** is a sequence of one or more pipelines separated by `;`, `&`, `&&` or `||` operator.

If a command is terminated by the control operator `&`, the shell executes the command asynchronously in a subshell. In other words, this command will be executed in the background.

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
# command2 will be executed if, and only if, command1 finishes unsuccessfully (returns code of error)
command1 || command2
```

The return code of an _AND_ or _OR_ list is the exit status of the last executed command.

# Conditional statements

Like in other languages, Bash conditionals let us decide to perform an action or not.  The result is determined by evaluating an expression, which should be enclosed in `[[ ]]`.

Conditional expression may contain `&&` and `||` operators, which are _AND_ and _OR_ accordingly. Besides this, there many [other handy expressions](#primary-and-combining-expressions).

There are two different conditional statements: `if` statement and `case` statement.

## Primary and combining expressions

Expressions enclosed inside `[[ ]]` (or `[ ]` for `sh`) are called **test commands** or **primaries**. These expressions help us to indicate results of a conditional. In the tables below, we are using `[ ]`, because it works for `sh` too. Here is an answer about [the difference between double and single square brackets in bash](http://serverfault.com/a/52050).

**Working with the file system:**

| Primary       | Meaning                                                      |
| :-----------: | :----------------------------------------------------------- |
| `[ -e FILE ]` | True if `FILE` **e**xists.                                   |
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
| `[ ARG1 -ge ARG2 ]` | `ARG1` is **g**reater than or **e**qual to `ARG2`.     |

Conditions may be combined using these **combining expressions:**

| Operation      | Effect                                                      |
| :------------: | :---------------------------------------------------------- |
| `[ ! EXPR ]`   | True if `EXPR` is false.                                    |
| `[ (EXPR) ]`   | Returns the value of `EXPR`.                                |
| `[ EXPR1 -a EXPR2 ]` | Logical _AND_. True if `EXPR1` **a**nd `EXPR2` are true. |
| `[ EXPR1 -o EXPR2 ]` | Logical _OR_. True if `EXPR1` **o**r `EXPR2` are true.|

Sure, there are more useful primaries and you can easily find them in the [Bash man pages](http://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html).

## Using an `if` statement

`if` statements work the same as in other programming languages. If the expression within the braces is true, the code between `then` and `fi` is executed.  `fi` indicates the end of the conditionally executed code.

```bash
# Single-line
if [[ 1 -eq 1 ]]; then echo "true"; fi

# Multi-line
if [[ 1 -eq 1 ]]; then
  echo "true"
fi
```

Likewise, we could use an `if..else` statement such as:

```bash
# Single-line
if [[ 2 -ne 1 ]]; then echo "true"; else echo "false"; fi

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

If you are confronted with a couple of different possible actions to take, then using a `case` statement may be more useful than nested `if` statements. For more complex conditions use `case` like below:

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

Each case is an expression matching a pattern. The `|` sign is used for separating multiple patterns, and the `)` operator terminates a pattern list. The commands for the first match are executed. `*` is the pattern for anything else that doesn't match the defined patterns. Each block of commands should be divided with the `;;` operator.

# Loops

Here we won't be surprised. As in any programming language, a loop in bash is a block of code that iterates as long as the control conditional is true.

There are four types of loops in Bash: `for`, `while`, `until` and `select`.

## `for` loop

The `for` is very similar to its sibling in C. It looks like this:

```bash
for arg in elem1 elem2 ... elemN
do
  # statements
done
```

During each pass through the loop, `arg` takes on the value from `elem1` to `elemN`. Values may also be wildcards or [brace expansions](#brace-expansion).

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

`for` is handy when we want to do the same operation over each file in a directory. For example, if we need to move all `.bash` files into the `script` folder and then give them execute permissions, our script would look like this:

```bash
#!/bin/bash

for FILE in $HOME/*.bash; do
  mv "$FILE" "${HOME}/scripts"
  chmod +x "${HOME}/scripts/${FILE}"
done
```

## `while` loop

The `while` loop tests a condition and loops over a sequence of commands so long as that condition is _true_. A condition is nothing more than a [primary](#primary-and-combining-expressions) as used in `if..then` conditions. So a `while` loop looks like this:

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

# Squares of numbers from 0 through 9
x=0
while [[ $x -lt 10 ]]; do # value of x is less than 10
  echo $(( x * x ))
  x=$(( x + 1 )) # increase x
done
```

## `until` loop

The `until` loop is the exact opposite of the `while` loop. Like a `while` it checks a test condition, but it keeps looping as long as this condition is _false_:

```bash
until [[ condition ]]; do
  #statements
done
```

## `select` loop

The `select` loop helps us to organize a user menu. It has almost the same syntax as the `for` loop:

```bash
select answer in elem1 elem2 ... elemN
do
  # statements
done
```

The `select` prints all `elem1..elemN` on the screen with their sequence numbers, after that it prompts the user. Usually it looks like `$?` (`PS3` variable). The answer will be saved in `answer`. If `answer` is the number between `1..N`, then `statements` will execute and `select` will go to the next iteration — that's because we should use the `break` statement.

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
  esac
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

There are situations when we need to stop a loop before its normal ending or step over an iteration. In these cases, we can use the shell built-in `break` and `continue` statements. Both of these work with every kind of loop.

The `break` statement is used to exit the current loop before its ending. We have already met with it.

The `continue` statement steps over one iteration. We can use it as such:

```bash
for (( i = 0; i < 10; i++ )); do
  if [[ $(( i % 2 )) -eq 0 ]]; then continue; fi
  echo $i
done
```

If we run the example above, it will print all odd numbers from 0 through 9.

# Functions

In scripts we have the ability to define and call functions. As in any programming language, functions in bash are chunks of code, but there are differences.

In bash, functions are a sequence of commands grouped under a single name, that is the _name_ of the function. Calling a function is the same as calling any other program, you just write the name and the function will be _invoked_.

We can declare our own function this way:

```bash
my_func () {
  # statements
}

my_func # call my_func
```

We must declare functions before we can invoke them.

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

We already discussed [exit codes](#exit-codes). The `return` command without any arguments returns the exit code of the last executed command. Above, `return 0` will return a successful exit code. `0`.

## Debugging

The shell gives us tools for debugging scripts. If we want to run a script in debug mode, we use a special option in our script's shebang:

```bash
#!/bin/bash options
```

These options are settings that change shell behavior. The following table is a list of options which might be useful to you:

| Short | Name        | Description                                            |
| :---: | :---------- | :----------------------------------------------------- |
| `-f`  | noglob      | Disable filename expansion (globbing).                 |
| `-i`  | interactive | Script runs in _interactive_ mode.                     |
| `-n`  | noexec      | Read commands, but don't execute them (syntax check).  |
|       | pipefail    | Make pipelines fail if any commands fail, not just if the final command fail. |
| `-t`  | —           | Exit after first command.                              |
| `-v`  | verbose     | Print each command to `stderr` before executing it.    |
| `-x`  | xtrace      | Print each command and its expanded arguments to `stderr` before executing it. |

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

Sometimes we need to debug a part of a script. In this case using the `set` command is convenient. This command can enable and disable options. Options are turned on using `-` and turned off using `+`:

```bash
#!/bin/bash

echo "xtrace is turned off"
set -x
echo "xtrace is enabled"
set +x
echo "xtrace is turned off again"
```

# Afterword

I hope this small handbook was interesting and helpful. To be honest, I wrote this handbook for myself so as to not forget the bash basics. I tried to write concisely but meaningfully, and I hope you will appreciate that.

This handbook narrates my own experience with Bash. It does not purport to be comprehensive, so if you still want more, please run `man bash` and start there.

Contributions are absolutely welcome and I will be grateful for any corrections or questions you can send my way. For all of that create a new [issue](https://github.com/denysdovhan/bash-handbook/issues).

Thanks for reading this handbook!

# Want to learn more?

Here's a list of other literature covering Bash:

* Bash man page.  In many environments that you can run Bash, the help system `man` can display information about Bash, by running the command `man bash`.  For more information on the `man` command, see the web page ["The man Command"](http://www.linfo.org/man.html) hosted at [The Linux Information Project](http://www.linfo.org/).
* ["Bourne-Again SHell manual"](https://www.gnu.org/software/bash/manual/) in many formats, including HTML, Info, TeX, PDF, and Texinfo.  Hosted at <https://www.gnu.org/>.  As of 2016/01, this covers version 4.3, last updated 2015/02/02.

# Other resources

* [awesome-bash](https://github.com/awesome-lists/awesome-bash) is a curated list of Bash scripts and resources
* [awesome-shell](https://github.com/alebcay/awesome-shell) is another curated list of shell resources
* [bash-it](https://github.com/Bash-it/bash-it) provides a solid framework for using, developing and maintaining shell scripts and custom commands for your daily work.
* [dotfiles.github.io](http://dotfiles.github.io/) is a good source of pointers to the various dotfiles collections and shell frameworks available for bash and other shells.
* [learnyoubash](https://github.com/denysdovhan/learnyoubash) helps you write your first bash script
* [shellcheck](https://github.com/koalaman/shellcheck) is a static analysis tool for shell scripts. You can either use it from a web page at [www.shellcheck.net](http://www.shellcheck.net/) or run it from the command line. Installation instructions are on the [koalaman/shellcheck](https://github.com/koalaman/shellcheck) github repository page.

Finally, Stack Overflow has many questions that are [tagged as bash](https://stackoverflow.com/questions/tagged/bash) that you can learn from and is a good place to ask if you're stuck.

# License

[![CC 4.0][cc-image]][cc-url] © [Denys Dovhan](http://denysdovhan.com)

[cc-url]: http://creativecommons.org/licenses/by/4.0/
[cc-image]: https://i.creativecommons.org/l/by/4.0/80x15.png
