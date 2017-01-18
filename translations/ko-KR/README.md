# bash-handbook [![CC 4.0][cc-image]][cc-url]

이 문서는 Bash를 배우고 싶은 사람을 위해 작성되었지만 깊은 내용을 다루지는 않습니다.

> **Tip**: [**learnyoubash**](https://git.io/learnyoubash) - 이 핸드북 내용에 대해서 interactive한 워크숍을 진행할 수 있습니다.

# Node Packaged Manuscript

`npm`을 이용해서 이 핸드북을 설치할 수 있습니다. 다음 명령어를 실행하십시오:

```
$ npm install -g bash-handbook
```

설치 후 `bash-handbook` 명령을 실행합니다. `$PAGER` 선택자를 이용하여 매뉴얼 페이지를 확인할 수 있습니다. 아니면 계속 여기서 읽으셔도 됩니다.

소스 코드는 여기에 있습니다: <https://github.com/denysdovhan/bash-handbook>

# 목차

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

# Introduction

당신이 개발자라면 시간이 얼마나 가치있는 자원인지 알고 있을 것입니다. 업무 프로세스를 최적화하는 것은 일을 진행하는데 있어서 가장 중요한 측면 중 하나입니다.

다음과 같이 몇 번이고 반복해야하는 작업에서는 효율성과 생산성을 높이기 위한 방법이 필요합니다:

* 서버에서 스크린샷을 찍거나 업로딩하는 경우
* 많은 텍스트들을 보기 좋게 만들거나 서식에 맞추는 경우
* 파일을 다른 포맷으로 변경하는 경우
* 프로그램에서 나오는 출력을 구문해석하는 경우

이런 작업에서는 **Bash**가 바로 우리의 구세주입니다!

Bash는 [Bourne shell](https://en.wikipedia.org/wiki/Bourne_shell)을 대체할 GNU 프로젝트로 [Brain Fox][]의해 작성된 Unix 셸입니다. 1989년에 배포되었으며, Linux와 macOS에서 기본 셸로 오랫동안 사용되었습니다.

[Brian Fox]: https://en.wikipedia.org/wiki/Brian_Fox_(computer_programmer)
<!-- link this format, because some MD processors handle '()' in URLs poorly -->

그럼 우리는 왜 30년도 더 된 기술을 배워야 될까요? 대답은 간단합니다: 이 _something_은 오늘날 모든 Unix 기반 시스템에서 효율적인 스크립트를 작성하기 위한 가장 강력한 도구 중 하나이며, 이것이 당신이 Bash를 배워야 하는 이유입니다. 이상.

이 핸드북은 bash에서 사용하는 가장 중요한 개념을 설명하고 있습니다. 난 이 요약한 것이 당신에게 도움이 되었으면 합니다.

# Shells and modes

Bash 셸은 interactive 모드와 non-interactive 모드, 두가지 모드로 작업이 가능합니다.

## Interactive mode

당신이 Ubuntu에서 작업을 하고 있다면, 7개나 되는 가상 터미널을 사용할 수 있습니다. 데스크톱 환경에서 7번째 가상 터미널인 GUI 모드로 돌아오고 싶다면 `Ctrl-Alt-F7`을 이용하여 GUI를 사용할 수 있습니다.

`Ctrl-Alt-F1` 키를 이용하여 셸을 열 수 있습니다. 그러면 친숙한 GUI는 사라지고 1번 가상 터미널이 보입니다.

Interactive 모드에서 작업 중이라면 다음과 같이 보입니다:

    user@host:~$

여기서 여러 가지 Unix 명령어를 입력할 수 있습니다. `ls`, `grep`, `cd`, `mkdir`, `rm`과 같은 명령을 실행하고 결과값을 확인할 수 있습니다.

셸이 사용자와 직접 상호 작용을 하기에 우리는 셸과 interactive가 가능합니다.

가상 터미널 사용은 불편합니다. 예로, 한 번에 문서를 수정하고, 다른 명령어를 사용하는 경우라면 다음의 가상 터미널 에뮬레이터를 사용하는 것이 좋습니다:

- [GNOME Terminal](https://en.wikipedia.org/wiki/GNOME_Terminal)
- [Terminator](https://en.wikipedia.org/wiki/Terminator_(terminal_emulator))
- [iTerm2](https://en.wikipedia.org/wiki/ITerm2)
- [ConEmu](https://en.wikipedia.org/wiki/ConEmu)

## Non-interactive mode

Non-interactive 모드에서는 셸에서 파일이나 pipe를 통하여 명령을 읽고 실행합니다. Interpreter는 파일이 끝나게 되면 셸 프로세스는 세션을 종료하고 부모 프로세스로 돌아갑니다.

다음 명령으로 non-interactive 모드로 셸을 실행시킬 수 있습니다:

    sh /path/to/script.sh
    bash /path/to/script.sh

위 예제에서 `script.sh`는 셸 인터프리터가 알 수 있는 명령으로 구성된 일반 파일이고 `sh`, `bash`는 셸 인터프리터 프로그램입니다. 당신은 `script.sh` 파일을 편한 에디터로 작성할 수 있습니다. (예, vim, nano, Sublime Text, Atom 등)

`chmod` 명령을 통해 실행파일로 변경해야 스크립트를 쉽게 실행할 수 있습니다.

    chmod +x /path/to/script.sh

또한 스크립트 첫 줄은 파일에서 실행하는 데 사용되는 프로그램을 다음과 같이 표시해야 합니다:

```bash
#!/bin/bash
echo "Hello, world!"
```

`bash`보다 `sh`가 더 좋다면, `#!/bin/bash` 구문을 `#!/bin/sh`로 변경하면 됩니다. 이 `#!` 문자열은 [shebang](http://en.wikipedia.org/wiki/Shebang_%28Unix%29)로 알려져 있습니다. 그럼 이제 다음처럼 스크립트를 실행할 수 있습니다:

    /path/to/script.sh

위에서 작성한 간단한 trick은 `echo` 명령을 이용하여 터미널에 텍스트를 출력합니다.

Shebang 라인에 다음과 같은 방법으로 입력할 수도 있습니다:

```bash
#!/usr/bin/env bash
echo "Hello, world!"
```

이 shebang에서 좋은 점은 시스템 `PATH` 환경 변수로 지정된 것을 기반으로 프로그램을 (여기서는 `bash`) 실행한다는 것입니다. 이것은 파일 시스템에서 프로그램 path가 같지 않을 수 있기에 첫 번째 방법보다는 바람직합니다. 시스템 `PATH`가 다른 버전에 대한 프로그램으로 표기하고 있을 때 유용합니다. 예를 들어, 기존 버전인 `bash`를 유지하면서 새로운 버전으로 설치하고 `PATH` 변수에 새로운 위치를 입력하여 사용할 수 있습니다. 기존 `bash`를 사용하기 위해서는 `#!/bin/bash`를 사용하고 새로운 버전을 사용하기 위해 `#!/usr/bin/env bash`를 사용하면 됩니다.

## Exit codes

모든 명령은 **exit code**를 반환합니다 (**return status** 또는 **exit status**). 정상 작동한 명령은 항상 `0` (zero-code)를, 정상 작동이 안된 경우 0이 아닌 값(error code)을 반환합니다. 실패 코드는 1에서 255까지인 양의 정수이어야 합니다.

스크립트로 사용할 때 우리가 사용할 수 있는 유용한 명령 중 하나는 `exit`입니다. 이 명령은 실행되고 있는 명령을 종료하고 셸에 종료 코드를 전달하는 데 사용합니다. 인수 없이 `exit` 코드를 실행하면 실행 중인 스크립트가 종료된 후 `exit` 전 마지막으로 실행한 명령이 반환한 종료 코드를 반환하게 됩니다.

프로그램이 종료되면 셸은 `$?` 환경변수에 그 **exit code**가 할당됩니다. `$?` 변수는 스크립트가 실행되었는지를 확인할 수 있는 기본 테스트 방법입니다.

마찬가지로 우리는 스크립트를 종료하기 위해 `exit`를 사용할 수 있고, `return` 명령을 사용하여 함수를 종료하고 caller에게 **exit code**를 반환합니다. 함수 내부에서 `exit`를 사용할 수 있으며, 함수를 종료_하고_ 프로그램을 죽입니다.

# Comments

스크립트는 _주석_을 포함해도 됩니다. 주석은 `shell` 인터프리터에서 무시되는 특별한 문장입니다. `#`으로 시작하며 줄 바꿈이 있기 전까지 작성된 내용은 주석 처리됩니다.

예를 들어:

```bash
#!/bin/bash
# This script will print your username.
whoami
```

> **Tip**: _왜_ 스크립트를 만들었는지에 대한 내용을 주석에 넣어야 됩니다.

# Variables

다른 프로그래밍 언어처럼 변수를 생성하여 사용할 수 있습니다.

Bash는 데이터 타입을 알 수 없습니다. 그래서 변수는 오직 숫자(numbers)나 하나 이상의 문자열(string)로 할당할 수 있습니다. 변수는 3가지로 만들 수 있습니다: 지역 변수, 환경 변수, _positional arguments_ 변수입니다.

## Local variables

**지역 변수 (Local variables)**는 단일 스크립트 내에 존재하는 변수입니다. 다른 프로그램이나 스크립트에서 접근할 수 없습니다.

지역 변수는 `=` 기호를 이용하여 할당할 수 있습니다. 규칙상 `=`과 값 사이에는 공백이 **있어서는 안 됩니다**. 그리고 값을 부를 때는 `$` 기호를 이용하여 부릅니다. 예를 들어:

```bash
username="denysdovhan"  # declare variable
echo $username          # display value
unset username          # delete variable
```

또한 `local` 키워드를 사용하여 단일 함수에 지역 변수를 선언 할 수 있습니다. 이렇게 하면 함수가 종료할 때 변수가 표시되지 않습니다.

```bash
local local_var="I'm a local value"
```

## Environment variables

**환경 변수 (Environment variables)**는 현재 셸 섹션에서 실행되고 있는 프로그램이나 스크립트에서 접근할 수 있는 변수입니다. 지역 변수와 같이하여 만들지만, `export` 키워드를 사용하여 생성합니다.

```bash
export GLOBAL_VAR="I'm a global variable"
```

Bash에서는 전역 변수가 _좀_ 있습니다. 자주 이런 변수를 확인하기 위해 순람표가 있습니다:

| 변수         | 설명                                                            |
| :----------- | :-------------------------------------------------------------- |
| `$HOME`      | 현재 사용자 홈 디렉터리.                                        |
| `$PATH`      | 셸에서 사용하는 명령어를 찾기 위한 위치. 콜론으로 목록을 구분함. |
| `$PWD`       | 현재 작업 중인 디렉터리.                                         |
| `$RANDOM`    | 0 ~ 32767 사이의 렌덤 인트값.                                   |
| `$UID`       | 현자 사용자의 실재 사용자 ID, 숫자로 표기됨.                    |
| `$PS1`       | 첫번째 프롬프트 문자열.                                         |
| `$PS2`       | 두번째 프롬프트 문자열.                                         |

다음에 [링크](http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_03_02.html#sect_03_02_04)에서 bash에 있는 환경 변수 확장 목록을 확인할 수 있습니다.

## Positional parameters

**위치 매개변수 (Positional parameters)**는 함수는 값을 구하고 할당된 위치에 대한 값을 할당합니다. 함수 내부에 있는 경우, 다음 표에 나열된 위치 매개 변수와 기타 특별한 변수에 대한 의미를 보여줍니다. (역자주: Argument라고 불리는 매개변수들이다.)

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

_Expansions(확장 or 전개식)_은 _token_으로 나눠진 후 커멘드 라인에서 실행됩니다. 계산 산술 연산 메커니즘에서 다른 단어들은 명령이 실행되고 값이 저장됩니다.

여기에 흥미가 있다면 [more about shell expansions](https://www.gnu.org/software/bash/manual/bash.html#Shell-Expansions)를 보십시오.

## Brace expansion

중괄호 expansion은 임의의 문자열을 생성할 수 있습니다. _Filename expansion_과 비슷합니다. 예로:

```bash
echo beg{i,a,u}n # begin began begun
```

또한 중괄호 expansion는 루프에서 반복할 범위를 생성할 때 사용할 수 있습니다.

```bash
echo {0..5} # 0 1 2 3 4 5
echo {00..8..2} # 00 02 04 06 08
```

## Command substitution

명령 치환은 우리가 명령에 대한 값을 구하고 다른 명령이나 변수를 할당하는데 그 값을 할당할 수 있습니다. 명령은 ``` `` ``` 이나 `$()`로 묶였을 때 명령어로 치환이 됩니다. 예를 들어 다음과 같이 사용할 수 있습니다:

```bash
now=`date +%T`
# or
now=$(date +%T)

echo $now # 19:08:26
```

## Arithmetic expansion

Bash에서의 산술 연산은 자유롭게 사용할 수 있습니다. 그러나 수식인 경우엔 `$(())`로 묶어 사용합니다. 산술 expansion 형식은:

```bash
result=$(( ((10 + 5*3) - 7) / 2 ))
echo $result # 9
```

산술 expansion에서 변수는 일반적으로 `$` 접두사 없이 사용합니다:

```bash
x=4
y=7
echo $(( x + y ))     # 11
echo $(( ++x + y++ )) # 12
echo $(( x + y ))     # 13
```

## Double and single quotes

큰따옴표와 작은따옴표 사이에는 중요한 차이가 있습니다. 큰따옴표 안에서 변수나 명령 치환이 진행됩니다. 작은따옴표 안에서는 그렇지 않습니다. 예를 들면:

```bash
echo "Your home: $HOME" # Your home: /Users/<username>
echo 'Your home: $HOME' # Your home: $HOME
```

공백이 포함되어있는 경우, 따옴표 안에 지역 변수와 환경 변수 확장시 주의합니다. 지루한 예제로 `echo`를 이용하여 사용자가 입력한 값에 대하여 출력하는 것을 고려하십시오:

```bash
INPUT="A string  with   strange    whitespace."
echo $INPUT   # A string with strange whitespace.
echo "$INPUT" # A string  with   strange    whitespace.
```

첫 번째 `echo`는 $INPUT 변수에 있는 단어들을 5개인 변수로 인식하여 한 칸씩 띄워 `echo`로 출력합니다. 두 번째 `echo`는 공백을 포함한 $INPUT 변수 전체 값을 단일 인수로 받아들여 출력합니다.

이제 더 복잡한 경우를 봅시다:

```bash
FILE="Favorite Things.txt"
cat $FILE   # attempts to print 2 files: `Favorite` and `Things.txt`
cat "$FILE" # prints 1 file: `Favorite Things.txt`
```

이련 경우, `Favorite-Things.text`와 같은 이름을 파일 이름을 변경해서 해결할 수 있지만, 환경 변수, 위치 매개변수, 다른 명령 (`find`, `cat` 등)을 이용하여 출력하는 것을 확인해야 됩니다. 만약 입력값에 공백이 포함되어 *있을지도 모른다면* 따옴표로 감쌉니다.

# Arrays

다른 프로그래밍 언어들처럼 bash에서 배열(array)는 여러 값을 참조할 수 있도록 해주는 변수입니다. Bash에서 배열은 zero-based입니다. 이건 배열 첫 요소 인덱스가 0이라는 것을 의미합니다.

배열을 사용할 땐, 특별한 환경 변수인 `IFS`를 조심해야 합니다. **IFS**, **Input Field Separator** 라 불리는 이 환경 변수는 배열 요소를 구별하는 문자입니다. 기본 값은 빈 스페이스 값입니다. `IFS=' '`.

## Array declaration

Bash는 단순하게 배열 변수에 인덱스 값을 할당하여 변수를 생성합니다:

```bash
fruits[0]=Apple
fruits[1]=Pear
fruits[2]=Plum
```

또한 배열 변수는 여러 가지를 함께 할당하여 사용할 수 있습니다:

```bash
fruits=(Apple Pear Plum)
```

## Array expansion

각 배열 요소는 다른 변수와 같이 사용할 수 있습니다:

```bash
echo ${fruits[1]} # Pear
```

전체 배열에서 인덱스를 대신해서 `*`, `@`로 확장하여 사용할 수 있습니다:

```bash
echo ${fruits[*]} # Apple Pear Plum
echo ${fruits[@]} # Apple Pear Plum
```

이 두 예제에는 중요하고 미묘한 차이가 있습니다:
공백을 가지고 있는 배열 요소가 있는 경우:

```bash
fruits[0]=Apple
fruits[1]="Desert fig"
fruits[2]=Plum
```

배열 각 요소를 다른 행에 출력하고 싶기에 `printf` 내장 함수를 사용합니다:

```bash
printf "+ %s\n" ${fruits[*]}
# + Apple
# + Desert
# + fig
# + Plum
```

음... `Desert`와  `fig`가 왜 다른 행에 출력이 되는 걸까요? 따옴표를 사용해봅시다:

```bash
printf "+ %s\n" "${fruits[*]}"
# + Apple Desert fig Plum
```

이제는 전부 한 행에 출력이 되는군요! 이제 `${fruits[@]}` 차례입니다:

```bash
printf "+ %s\n" "${fruits[@]}"
# + Apple
# + Desert fig
# + Plum
```

큰따옴표 내에서 배열 안에 있는 각 요소들은 다른 인수로 `${fruits[@]}` 출력됩니다. 여기서 배열 요소에 포함된 공백은 유지됩니다.

## Array slice

또한 _slice_ 연산자를 사용하여 배열 슬라이스할 수 있습니다:

```bash
echo ${fruits[@]:0:2} # Apple Desert fig
```

이 예제는 `${fruits[@]}`는 배열 전체를 나타내고, `:0:2`는 인덱스 0에서 시작해서 2번째 값까지 슬라이스하여 출력하라는 의미입니다.

## Adding elements into an array

배열에 요소를 추가하는 방법은 매우 간단합니다. 여러 값을 같이 할당하는 경우에는 더 유용합니다. 우리는 다음처럼 사용할 수 있습니다:

```bash
fruits=(Orange "${fruits[@]}" Banana Cherry)
echo ${fruits[@]} # Orange Apple Desert fig Plum Banana Cherry
```

위 예제는 `${fruits[@]}`로 모든 배열 값들을 불러오고, 추가된 내용과 같이 새로운 배열을 생성한 다음 `fruits` 변수에 할당합니다.

## Deleting elements from an array

배열에서 요소를 제외하려면 `unset` 명령을 사용합니다:

```bash
unset fruits[0]
echo ${fruits[@]} # Apple Desert fig Plum Banana Cherry
```

# Streams, pipes and lists

Bash는 다른 프로그램들과 출력을 조작하기 위한 강력한 도구를 가지고 있습니다. Stream을 사용하여 다른 프로그램이나 파일에 프로그램 출력을 전송하여 로그를 작성하거나 원하는 어떤 작업이든 할 수 있습니다.

Pipe는 컨베이어를 만들어 명령 실행을 제어할 수 있도록 합니다.

이 강력하고 정교한 도구를 사용하는 방법을 이해하는 것이 매우 중요합니다.

## Streams

Bash는 입력을 받아 차례로 출력을 보내거나 문자 **streams** 합니다. 이런 stream은 파일이나 다른 것으로 리다이렉션 될 수 있습니다.

여기 3개 서술자가 있습니다:

| Code | Descriptor | 설명                 |
| :--: | :--------: | :------------------- |
| `0`  | `stdin`    | 표준 입력.           |
| `1`  | `stdout`   | 준 출력.           |
| `2`  | `stderr`   | 오류 출력.           |

리디렉션은 명령에를 대한 출력값이 어디로 갈 것인가, 명령에 대한 입력값이 어디서 올 것인가에 대한 제어를 가능하게 해줍니다. Stream에서 리디렉션을위해 다음과 같은 연산자를 사용하고 있습니다:

| 연산자   | 설명                                         |
| :------: | :------------------------------------------- |
| `>`      | 출력 전송                                    |
| `&>`     | 출력과 오류 출력 전송                        |
| `&>>`    | 출력과 오류 출력을 전송지에 추가             |
| `<`      | 입력 전송                                    |
| `<<`     | [요 문서](http://tldp.org/LDP/abs/html/here-docs.html) syntax |
| `<<<`    | [여기 문자열](http://www.tldp.org/LDP/abs/html/x17837.html) |

리디렉션을 사용하는 예제 조금:

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

파일뿐만 아니라 다른 프로그램에서도 표준 스트림 리디렉션을 할 수 있습니다. **Pipes**를 이용하여 프로그램 출력을 다른 곳 입력으로 사용할 수 있습니다.

다음 예시에서는 `command1` 출력을 `command2`로 보내고, 그 출력을 다시 `command3` 입력으로 보냅니다:

    command1 | command2 | command3

이런 구조를 **파이프라인** 이라고 부릅니다.

사실 몇 가지 프로그램을 통해서 데이터를 처리하는 데 사용할 수 있습니다. 예를 들어 `ls -l`로 출력한 값에서 `grep` 명령을 이용하여 `.md` 확장자를 가진 파일만 출력한 뒤 `less` 프로그램으로 출력해줍니다:

    ls -l | grep .md$ | less

파이프라인에서 종료 상태는 일반적으로 마지막 명령이 끝나는 시점입니다. 파이프라인에서 작동 중인 모든 명령이 완료될 때까지 셸 상태를 반환하지 않습니다. 파이프라인으로 연결된 명령 중 하나가 실패하였을 때, 연결된 파이프라인이 모두 실패로 설정하고 싶다면 다음과 같이 pipefail 옵션을 설정해야 합니다:

    set -o pipefail

## Lists of commands

**명령어 나열**은 `;`, `&`, `&&`, `||` 연산자를 이용하여 하나 이상 파이프라인에 대한 순서를 나타냅니다.

명령이 제어 연산자 `&`에 의해서 종료될 경우, 셸은 서브 셸에서 비동기적으로 명령을 실행합니다. 다른 말로 하자면, 명령이 백그라운드로 실행됩니다.

`;`로 구분된 명령은 차례로 실행됩니다: 차례로. 셸은 각 명령이 종료될때까지 기다립니다.

```bash
# command2 will be executed after command1
command1 ; command2

# which is the same as
command1
command2
```

`&&`와 `||`로 구분된 명령어 나열은 각각 _AND_와 _OR_ 목록이라고 합니다.

_AND_list_는 다음과 같습니다:

```bash
# command2 will be executed if, and only if, command1 finishes successfully (returns 0 exit status)
command1 && command2
```

_OR-list_는 다음과 같습니다:

```bash
# command2 will be executed if, and only if, command1 finishes unsuccessfully (returns code of error)
command1 || command2
```

_AND_ 또는 _OR_ 명령어 나열에서 반환 코드는 마지막으로 실행한 명령에 대한 종료 상태입니다.

# Conditional statements

다른 언어들과 마찬가지로 Bash 조건문은 어떤 작업을 수행할지에 대해서 결정합니다. 결과는 `[[ ]]`로 묶어야지만 표현을 평가하여 결정됩니다.

조건식은 `&&`와 `||` 연산자를 이용하여 _AND_와 _OR_로 사용할 수 있습니다. 이외 [다양한 표현](#primary-and-combining-expressions)을 이용하여 확인할 수 있습니다.

두 가지 조건문이 있습니다: `if` 문과 `case`문.

## Primary and combining expressions

`[[ ]]` (또는 `sh`에서는 `[ ]`) 안에 있는 식은 **테스트 명령**이나 **primaries**라 부릅니다. 이 수식들은 조건에 대한 결과를 보여줄 수 있도록 도와줍니다. 다음 테이블에서는 `sh`에서 사용할 수 있도록 `[ ]`를 이용하여 나타냈습니다. 여기서 [bash에서 이중 대괄호와 대괄호의 차이](http://serverfault.com/a/52050)에 대해서 이야기합니다.

**파일 시스템에서 작동:**

| Primary       | Meaning                                                      |
| :-----------: | :----------------------------------------------------------- |
| `[ -e FILE ]` | `FILE`이 존재하면(**e**xist), True                           |
| `[ -f FILE ]` | `FILE`이 존재하고 일반 파일(regular **f**ile)이면, True.     |
| `[ -d FILE ]` | `FILE`이 존재하고 디렉토리(**d**irectory)이면, True.         |
| `[ -s FILE ]` | `FILE`이 존재하고 비어있다(**s**ize more than 0)면, True.    |
| `[ -r FILE ]` | `FILE`이 존재하고 읽기가능하다(**r**eadable)면, True.        |
| `[ -w FILE ]` | `FILE`이 존재하고 쓰기가능하다(**w**ritable)면, True.        |
| `[ -x FILE ]` | `FILE`이 존재하고 실행가능하다(**x**ecutable)면, True.       |
| `[ -L FILE ]` | `FILE`이 존재하고 싱볼릭 링크(symbolic **l**ink)이면, True.  |
| `[ FILE1 -nt FILE2 ]` | FILE1이 FILE2 보다 새로운 파일입니다. (FILE1 is **n**ewer **t**han FILE2.) |
| `[ FILE1 -ot FILE2 ]` | FILE1이 FILE2 보다 오래된 파일입니다. (FILE1 is **o**lder **t**han FILE2.) |

**문자열에서 작동:**

| Primary        | Meaning                                                     |
| :------------: | :---------------------------------------------------------- |
| `[ -z STR ]`   | `STR`이 비었음 (길이가 0 (**z**ero)).                       |
| `[ -n STR ]`   | `STR`이 비어있지 않음 (길이가 0 아님 (**n**on-zero))        |
| `[ STR1 == STR2 ]` | `STR1`과 `STR2`가 같음.                                 |
| `[ STR1 != STR2 ]` | `STR1`과 `STR2`가 같지 않음.                            |

**산술 이헝 연산자:**

| Primary             | Meaning                                                |
| :-----------------: | :----------------------------------------------------- |
| `[ ARG1 -eq ARG2 ]` | `ARG1`는 `ARG2`와 같다 (**eq**ual).                    |
| `[ ARG1 -ne ARG2 ]` | `ARG1`는 `ARG2`와 같지 않다 (**n**ot **e**qual).       |
| `[ ARG1 -lt ARG2 ]` | `ARG1`는 `ARG2`보다 작다 (**l**ess **t**hen).          |
| `[ ARG1 -le ARG2 ]` | `ARG1`는 `ARG2`보다 작거나 같다 (**l**ess than or **e**qual). |
| `[ ARG1 -gt ARG2 ]` | `ARG1`는 `ARG2`보다 크다 (**g**reater **t**han).       |
| `[ ARG1 -ge ARG2 ]` | `ARG1`는 `ARG2`보다 크거나 같다 (**g**reater than or **e**qual). |

조건을 **combining expressions**를 사용하여 결합할 수 있습니다:

| Operation      | Effect                                                      |
| :------------: | :---------------------------------------------------------- |
| `[ ! EXPR ]`   | `EXPR`이 거짓이면 True.                                     |
| `[ (EXPR) ]`   | `EXPR` 값 반환.                                             |
| `[ EXPR1 -a EXPR2 ]` | 논리 _AND_. `EXPR1`와(**a**nd) `EXPR2` 조건이라면 True. |
| `[ EXPR1 -o EXPR2 ]` | 논리 _OR_. `EXPR1`또는(**o**r) `EXPR2` 조건이라면 True. |

물론 더 유용한 primaries가 존재하며 [Bash man pages](http://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html)에서 더 쉽게 찾아볼 수 있습니다.

## Using an `if` statement

`if` 문은 다른 프로그래밍 언어와 같이 작동합니다. 괄호 안에 있는 표현식이 참이면 `then`과 `fi` 사이 코드가 실행됩니다. `fi`는 조건부로 실행되는 코드 끝을 나타냅니다.

```bash
# Single-line
if [[ 1 -eq 1 ]]; then echo "true"; fi

# Multi-line
if [[ 1 -eq 1 ]]; then
  echo "true"
fi
```

마찬가지로 `if..else` 문을 사용할 수 있습니다:

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

때로는 `if..else`문이 우리가 원하는 만큼 충분한 기능을 하지 못할 수도 있습니다. 그럴 경우, `if..elif..else`문을 사용할 수 있습니다.

다음 예제를 봅시다:

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

들어온 값에 맞는 작업을 진행할 때, 중첩된 `if`문보다 유용한 `case`문을 이용할 수 있습니다. 더 복잡한 조건일 때, `case`문을 다음과 같이 사용합니다:

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

각 case는 패턴과 일치하는 식입니다. `|` 기호는 여러 패턴을 분리하는 데 사용되며, `)` 연산자는 패턴 목록 끝을 나타냅니다. 첫 번째 명령과 맞는다면 실행됩니다. `*`는 정의된 패턴에 일치하지 않는 것들을 나타내기 위한 패턴입니다. 명령에 대한 각 블록은 `;;` 연산자를 이용하여 분리합니다.

# Loops

더는 놀라지 않겠죠. 다른 프로그래밍 언어들처럼 bash에서 사용되는 반복문은 주건 제어문이 true일 때 반복 처리 코드 블록을 진행합니다.

Bash에서 반복문은 4가지 형식이 있습니다: `for`, `while`, `until`, `select`.

## `for` loop

`for` 문은 C 족과 매우 비슷합니다. 다음과 같이 사용합니다:

```bash
for arg in elem1 elem2 ... elemN
do
  # statements
done
```

각 루프를 통과할 때, `arg`에 `elem1`에서 `elemN`까지의 값이 할당됩니다. 와일드카드 또는 [중괄호 expansions](#brace-expansion)로 값이어도 됩니다.

또한, 한 줄로 `for`문을 작성해야 한다면 다음처럼 `do` 앞에 세미콜론을 붙여서 사용할 수 있습니다:

```bash
for i in {1..5}; do echo $i; done
```

`for..in..do` 형식이 이상하다면 다른 방법으로 C와 같은 스타일로 `for`문을 사용할 수 있습니다:

```bash
for (( i = 0; i < 10; i++ )); do
  echo $i
done
```

디렉터리에서 각 파일에 같은 작업을 진행하려고 할 때 `for`문을 사용하면 편합니다. 예를 들어, 모든 `.bash` 파일을 `script` 폴더로 옮기고 실행 권한을 준다면, 다음과 같이 작성할 수 있습니다:

```bash
#!/bin/bash

for FILE in $HOME/*.bash; do
  mv "$FILE" "${HOME}/scripts"
  chmod +x "${HOME}/scripts/${FILE}"
done
```

## `while` loop

`while` 반복문은 조건을 테스트하고 _true_가 될 때까지 명령을 반복합니다. 조건은 `if..then` 조건에서 [primary](#primary-and-combining-expressions) 사용되는 것과 다르지 않습니다. 그래서 `while` 반복문은 다음과 같습니다:

```bash
while [[ condition ]]
do
  # statements
done
```

`for` 반복문과 같이 같은 줄에 `do`를 사용한다면 앞에 세미콜론을 붙여서 사용해야 합니다.

예제는 다음과 같습니다:

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

`until` 반복문은 `while` 반복문과는 정반대로 작동합니다. `while`과 같이 테스트 조건을 확인하고 그 조건이 _false_ 될 때까지 작동합니다:

```bash
until [[ condition ]]; do
  #statements
done
```

## `select` loop

`select` 반복문은 사용자 매뉴얼을 구성할 수 있도록 도와줍니다. `for` 반복문과 같은 구문으로 되어있습니다:

```bash
select answer in elem1 elem2 ... elemN
do
  # statements
done
```

`select`은 사용자가 입력하면, 연속된 숫자들과 스크린에 모든 `elem1..elemN`을 출력합니다. 일반적으로 `$?` (`PS3` 값)과 같이 보입니다. 입력한 대답은 `answer`에 저장됩니다. `answer`가 `1..N` 사이 수인 경우, `statements`가 실행되고 `select`는 다음을 실행합니다. 여기서 `break` 문을 사용할 수 있습니다.

작동 예제는 다음과 같습니다:

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

이 예제에서는 사용자에게 사용할 어떤 패키지 관리자 {s,he}를 묻습니다. 그리고 패키지 관리자를 선택하고 설치할 패키지를 묻습니다.

실행하면 다음과 같은 명령을 확인할 수 있습니다:

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

반복문이 일반적으로 끝내거나 특정 단계 전에 멈출 때가 필요합니다. 이런 경우엔 셸 내장 함수인 `break`과 `continue` 문을 사용할 수 있습니다. 둘 다 모든 반복문에서 사용할 수 있습니다.

`break` 문은 끝나기 전 현재 반복문에서 나갈 때 사용합니다. 이미 사용 가능합니다.

`continue` 문은 한단계를 넘어서 진행됩니다. 다음과 같이 사용할 수 있습니다:

```bash
for (( i = 0; i < 10; i++ )); do
  if [[ $(( i % 2 )) -eq 0 ]]; then continue; fi
  echo $i
done
```

위 예제를 실행한다면, 0에서 9까지의 모든 짝수를 출력합니다.

# Functions

스크립트에서 함수를 정의하고 불러 사용 가능 합니다. 다른 프로그래밍 언어처럼 Bash에서 함수는 코드 덩어리지만 차이가 있습니다.

Bash에서 함수는 함수 _이름_으로 그룹화한 명령입니다. 함수를 호출하는 방법은 다른 프로그램과 같이 호출하며, 그냥 이름을 사용하면 함수가 _호출됩니다_.

다음과 같이 함수를 선언할 수 있습니다:

```bash
my_func () {
  # statements
}

my_func # call my_func
```

함수를 호출하기 전 선언을 하여야지 사용할 수 있습니다.

함수는 인수를 취해 결과값을 반환할 수 있습니다 -- 종료 코드. 인수는 함수내 [non-interactive](#non-interactive-mode) 모드에서 스크립트에 주어진 인수와 같이 취급됩니다. -- [positional parameters](#positional-parameters)를 사용해서. 결과 코드는 `return` 명령을 사용하여 _반환합니다_.

함수가 정상적으로 실행된 것을 나타내는 이름을 가지고 `0`을 반환합니다.

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

이미 [종료 코드](#exit-codes)에 대해서 이야기하였습니다. `return` 명령은 인수 없이 마지막으로 실행한 명령에 대한 종료 코드를 반환합니다. 그리고 `return 0`으로 구성해 두면 정상 종료 코드로 `0`을 반환합니다.

## Debugging

셸에서도 스크립트를 디버깅할 수 있는 툴을 제공합니다. 디버그 모드로 실행하려면 스크립트 shebang에 특별한 옵션을 추가해야 합니다:

```bash
#!/bin/bash options
```

이 옵션은 셸 동작을 변경하는 설정입니다. 다음 표에서 도움이 되는 것들에 관해 설명해뒀습니다:

| Short | Name        | 설명                                                   |
| :---: | :---------- | :----------------------------------------------------- |
| `-f`  | noglob      | 파일 이름 확장 (globbing)을 비활성화합니다.           |
| `-i`  | interactive | 스크립트를 _interactive_ 모드로 작동합니다.            |
| `-n`  | noexec      | 명령을 읽습니다만 실행하지는 않습니다 (문법 체크).     |
|       | pipefail    | 어떤 명령이 제대로 실행되지 못하여 마지막 명령이 실패한 것이 아니라면, 파이프라인 오류를 확인합니다. |
| `-t`  | —           | 첫 명령 후 종료합니다.                                |
| `-v`  | verbose     | 각 명령을 실행하기 전 `stderr`를 출력합니다.            |
| `-x`  | xtrace      | 각 명령을 실행하기 전 명령과 `stderr`에 확장 변수를 출력합니다. |

예를 들어 다음과 같이 `-x`옵션을 사용해 스크립트를 만듭니다:

```bash
#!/bin/bash -x

for (( i = 0; i < 3; i++ )); do
  echo $i
done
```

이 스크립트를 실행하게되면 다른 정보들과 함께 `stdout` 변숫값을 출력합니다:

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

때때로 스크립트 일부를 디버깅 해야 되는 경우가 발생합니다. 이때 `set` 명령을 사용하면 됩니다. 이 명령으로 옵션을 활성화하고 비활성화할 수 있습니다. 사용법은 `-`을 사용하여 활성화 시키고, `+`를 사용하여 비활성화합니다:

```bash
#!/bin/bash

echo "xtrace is turned off"
set -x
echo "xtrace is enabled"
set +x
echo "xtrace is turned off again"
```

# Afterword

나는 이 작은 핸드북이 재미있고 도움이 되었으면 합니다. 나 자신이 Bash에 대한 기본을 잊지 않기 위해 이 핸드북을 작성하였습니다. 간결하고 의미 있는 것을 기록하려 하였습니다만, 잘 안되었다면 이해해 주셨으면 합니다.

이 핸드북은 bash에 대한 내 경험을 이야기합니다. 이것은 그렇게 포괄적으로 서술되지 않았기에 더 많은 것을 원한다면 `man bash`를 실행해서 확인하십시오.

컨트리뷰션은 절대적으로 환영하며 어떤 질문이나 이슈에 대해 나에게 알려주십시오. [이슈](https://github.com/denysdovhan/bash-handbook/issues)를 만들어서 말이죠.

이 핸드북을 읽어 주셔서 감사합니다!

# Want to learn more?

여기는 Bash에 대해서 더 알 수 있는 문서 목록입니다:

* Bash man 페이지. Bash가 실행되는 여러 환경에서 도움말 시스템 `man`을 사용하여 Bash에 관한 내용을 확인할 수 있으며, 실행 명령어는 `man bash`입니다. `man` 명령에 대한 더 많은 내용을 확인하고 싶으면 [The Linux Information Project](http://www.linfo.org/)에서 호스팅 되고 있는 ["The man Command"](http://www.linfo.org/man.html) 웹페이지를 확인하십시오.
* ["Bourne-Again SHell manual"](https://www.gnu.org/software/bash/manual/)은 많은 형식 (HTML, Info, TeX, PDF, Texinfo)으로 되어있습니다. <https://www.gnu.org/>에서 호스팅 되고 있습니다. 2016년 1월 현재 버전 4.3이며, 마지막 업데이트는 2015년 2월 2일입니다.

# Other resources

* [awesome-bash](https://github.com/awesome-lists/awesome-bash)는 Bash 스크립트와 리소스에대한 모음
* [awesome-shell](https://github.com/alebcay/awesome-shell)는 셸 리소스에 대한 다른 모음
* [bash-it](https://github.com/Bash-it/bash-it) 일상 업무에서 사용할 셸 스크립트와 개인화된 명령을 사용하여 개발과 관리를 위한 강력한 프레임워크를 제공합니다.
* [dotfiles.github.io](http://dotfiles.github.io/)는 다양한 dotfile 컬렉션과 bash와 다른 셸에서 사용할 수 있는 셸 프레임워크를 소개하는 곳입니다.
* [learnyoubash](https://github.com/denysdovhan/learnyoubash)는 첫 bash 스크립트를 작성하는 데 도움이 되는 곳입니다.
* [shellcheck](https://github.com/koalaman/shellcheck)는 셸 스크립트에 대한 정적 분석 도구입니다. [www.shellcheck.net](http://www.shellcheck.net/) 웹페이지로 사용하거나 명령어를 사용할 수 있습니다. 설치에 대한 자세한 내용은 [koalaman/shellcheck](https://github.com/koalaman/shellcheck)에서 확인할 수 있습니다.

마지막으로, Stack Overflow에서 [tagged as bash](https://stackoverflow.com/questions/tagged/bash)는 많은 질문에 대한 답을 얻을 수 있으며, 그것을 통해서 배울 수 있는 가장 좋은 장소입니다.

# License

[![CC 4.0][cc-image]][cc-url]

&copy; [Denys Dovhan](http://denysdovhan.com)

[cc-url]: http://creativecommons.org/licenses/by/4.0/
[cc-image]: https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg?style=flat-square
