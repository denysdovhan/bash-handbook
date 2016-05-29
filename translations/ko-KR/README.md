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

다른 프로그래밍 언어들처럼 bash에서 배열(array)는 여러 값을 참조할 수 있도록 해주는 변수입니다. Bash에서 배열은 zero-based입니다. 이건 배열 첫 요소 인덱스가 0이라는 것을 의미합니다.

배열를 사용할땐, 특별한 환경변수인 `IFS`를 조심해야합니다. **IFS**, **Input Field Separator** 라 불리우는 이 환경 변수는 배열 요소를 구별하는 문자입니다. 기본 값은 빈 스페이스 값입니다. `IFS=' '`.

## Array declaration

Bash는 단순하게 배열 변수에 인덱스값을 할당하여 변수를 생성합니다:

```bash
fruits[0]=Apple
fruits[1]=Pear
fruits[2]=Plum
```

또한 배열 변수는 여러가지를 함께 할당하여 사용할 수 있습니다:

```bash
fruits=(Apple Pear Plum)
```

## Array expansion

각 배열 요소는 다른 변수와 같이 사용할 수 있습니다:

```bash
echo ${fruits[1]} # Pear
```

전체 배열에서 인덱스를 데신해서 `*`, `@`로 확장하여 사용할 수 있습니다:

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

음... `Desert`와  `fig`가 왜 다른 행에 출력이 되는걸까요? 따옴표를 사용해봅시다:

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

큰 따옴표 내에서 배열안에 있는 각 요소들은 다른 인수로 `${fruits[@]}` 출력됩니다. 여기서 배열 요소에 포함된 공백은 유지 됩니다.

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

위 예제는 `${fruits[@]}`로 모든 배열 값들을 불려오고, 추가된 내용들과 같이 새로운 배열을 생성한 다음 `fruits` 변수에 할당합니다.

## Deleting elements from an array

배열에서 요소를 제외하려면 `unset` 명령을 사용합니다:

```bash
unset fruits[0]
echo ${fruits[@]} # Apple Desert fig Plum Banana Cherry
```

# Streams, pipes and lists

Bash는 다른 프로그램들과 출력을 조작하기위한 강력한 도구를 가지고 있습니다. Stream을 사용하여 다른 프로그램이나 파일에 프로그램 출력을 전송하여 로그를 작성하거나 원하는 어떤 작업이든 할 수 있습니다.

Pipe는 컨베이어를 만들어 명령 실행을 제어할 수 있도록 합니다.

이 강력하고 정교한 도구를 사용하는 방법을 이해하는 것이 매우 중요합니다.

## Streams

Bash는 입력을 받아 순차적으로 출력을 보내거나 문자을 **streams** 합니다. 이런 stream은 파일이나 다른 것으로 리다이렉션 될 수 있습니다.

여기 3개 서술자가 있습니다:

| Code | Descriptor | 설명                 |
| :--: | :--------: | :------------------- |
| `0`  | `stdin`    | 표준 입력.           |
| `1`  | `stdout`   | 준 출력.           |
| `2`  | `stderr`   | 오류 출력.           |

리디렉션은 명령에대한 출력값이 어디로 갈 것인가, 명령에대한 입력값이 어디서 올 것인가에 대한 제어를 가능하게 해줍니다. Stream에서 리디렉션을위해 다음과 같은 연산자를 사용하고 있습니다:

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

사실 몇 가지 프로그램을 통해서 데이터를 처리하는데 사용할 수 있습니다. 예를 들어 `ls -l`로 출력한 값에서 `grep` 명령을 이용하여 `.md` 확장자를 가진 파일만 출력한뒤 `less` 프로그램으로 출력해줍니다:

    ls -l | grep .md$ | less

파이프라인에서 종료 상태는 일반적으로 마지막 명령이 끝나는 시점입니다. 파이프 라인에서 작동중인 모든 명령이 완료될때까지 셸 상태를 반환하지 않습니다. 파이프 라인으로 연결된 명령중 하나가 실패하였을때, 연결된 파이프라인이 모두 실패로 설정하고 싶다면 다음과 같이 pipefail 옵션을 설정해야합니다:

    set -o pipefail

## Lists of commands

**명령어 나열**은 `;`, `&`, `&&`, `||` 연산자를 이용하여 하나 이상 파이프 라인에대한 순서를 나타냅니다.

명령이 제어 연산자 `&`에 의해서 종료될 경우, 셸은 서브셸에서 비동기적으로 명령을 실행합니다. 다른 말로 하자면, 명령이 백그라운드로 실행됩니다.

`;`로 구분된 명령은 순차적으로 실행됩니다: 차례로. 셸은 각 명령이 종료될때까지 기다립니다.

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

_AND_ 또는 _OR_ 명령어 나열에서 반환 코드는 마지막으로 실행한 명령에대한 종료 상태입니다.

# Conditional statements

다른 언어들과 마찬가지로 Bash 조건문은 어떤 작업을 수행할지에 대해서 결정합니다. 결과는 `[[ ]]`로 묶어야지만 표현을 평가하여 결정됩니다.

조건식은 `&&`와 `||` 연산자를 이용하여 _AND_와 _OR_로 사용할 수 있습니다. 이외 [다양한 표현](#primary-and-combining-expressions)을 이용하여 확인할 수 있습니다.

두가지 조건문이 있습니다: `if` 문과 `case`문.

## Primary and combining expressions

`[[ ]]` (또는 `sh`에서는 `[ ]`) 안에 있는 식은 **테스트 명령**이나 **primaries**라 부릅니다. 이 수식들은 조건에대한 결과를 보여줄 수 있도록 도와줍니다. 다음 테이블에서는 `sh`에서 사용할 수 있도록 `[ ]`를 이용하여 나타냈습니다. 여기서 [bash에서 이중 대괄호와 대괄호의 차이](http://serverfault.com/a/52050)에대해서 이야기합니다.

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

`if` 문은 다른 프로그래밍 언어와 동일하게 작동합니다. 괄호 안에 있는 표현식이 참이면 `then`과 `fi` 사이 코드가 실행됩니다. `fi`는 조건부로 실행되는 코드 끝을 나타냅니다.

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

때로는 `if..else`문이 우리가 원하는 만큼 충분한 기능을 하지 못할 수 도 있습니다. 그럴 경우, `if..elif..else`문을 사용할 수 있습니다.

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

들어온 값에 맞는 작업을 진행할때, 중첩된 `if`문보다 유용한 `case`문을 이용할 수 있습니다. 더 복잡한 조건일때, `case`문을 다음과 같이 사용합니다:

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

각 case는 패턴과 일치하는 식입니다. `|` 기호는 여러 패턴을 분리하는데 사용되며, `)` 연산자는 패턴 목록 끝을 타나냅니다. 첫번째 명령과 맞다면 실행됩니다. `*`는 정의된 패턴에 일치하지 않는 것들을 나타내기 위한 패턴입니다. 명령에대한 각 블록은 `;;` 연산자를 이용하여 분리합니다.

# Loops

더이상 놀라지 않겠죠. 다른 프로그래밍 언어들처럼 bash에서 사용되는 반복문은 주건 제어문이 true일때 반복 처리 코드 블록을 진행합니다. 

Bash에서 반복문은 4가지 형식이 있습니다: `for`, `while`, `until`, `select`.

## `for` loop

`for` 문은 C족과 매우 비슷합니다. 다음과 같이 사용합니다:

```bash
for arg in elem1 elem2 ... elemN
do
  # statements
done
```

각 루프를 통과할때, `arg`에 `elem1`에서 `elemN`까지의 값이 할당됩니다. 와일드 카드 또는 [중괄호 expansions](#brace-expansion)로 값이어도 됩니다.

또한 한 줄로 `for`문을 작성해야 한다면 다음처럼 `do` 앞에 세미콜론을 붙여서 사용할 수 있습니다:

```bash
for i in {1..5}; do echo $i; done
```

`for..in..do` 형식이 이상하다면 다른 방법으로 C와 같은 스타일로 `for`문을 사용할 수 있습니다:

```bash
for (( i = 0; i < 10; i++ )); do
  echo $i
done
```

디렉토리에서 각 파일에 동일한 작업을 진행하려고 할때 `for`문을 사용하면 편합니다. 예를 들어, 모든 `.bash` 파일을 `script` 폴더로 옯기고 실행 권한을 준다면, 다음과 같이 작성할 수 있습니다:

```bash
#!/bin/bash

for FILE in $HOME/*.bash; do
  mv "$FILE" "${HOME}/scripts"
  chmod +x "${HOME}/scripts/${FILE}"
done
```

## `while` loop

`while` 반복문은 조건을 테스트하고 _true_가 될때까지 명령을 반복합니다. 조건은 `if..then` 조건에서 [primary](#primary-and-combining-expressions) 사용되는 것과 다르지 않습니다. 그래서 `while` 반복문은 다음과 같습니다:

```bash
while [[ condition ]]
do
  # statements
done
```

`for` 반복문과 동일하게 같은 줄에 `do`를 사용한다면 앞에 세미콜론을 붙여서 사용해야 합니다.

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

`until` 반복문은 `while` 반복문과는 정반대로 작동합니다. `while`과 같이 테스트 조건을 확인하고 그 조건이 _false_ 될때까지 작동합니다:

```bash
until [[ condition ]]; do
  #statements
done
```

## `select` loop

`select` 반복문은 사용자 메뉴얼을 구성할 수 있도록 도와줍니다. `for` 반복문과 동일한 구문으로 되어있습니다:

```bash
select answer in elem1 elem2 ... elemN
do
  # statements
done
```

`select`은 사용자가 입력하면, 연속된 숫자들과 스크린에 모든 `elem1..elemN`을 출력합니다. 일반적으로 `$?` (`PS3` 값) 과 같이 보입니다. 입력한 대답은 `answer`에 저장됩니다. `answer`가 `1..N` 사이 수인경우, `statements`가 실행되고 `select`는 다음을 실행합니다. 여기서 `break` 문을 사용할 수 있습니다.

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

이런 일이 발생한다면 반복문을 멈출때가 필요하면 일반적으로 끝나거나 특정 단계 전 에

반복문이 일반적으로 끝내거나 특정 단계 전에 멈출때가 필요합니다. 이런 경우엔 셸 내장 함수인 `break`와 `continue` 문을 사용 할 수 있습니다. 둘다 모든 반복문에서 사용할 수 있습니다.

`break` 문은 끝나기전 현제 반복문에서 나갈때 사용합니다. 이미 사용 가능합니다.

`continue` 문은 한단계를 넘어서 진행됩니다. 다음과 같이 사용할 수 있습니다:

```bash
for (( i = 0; i < 10; i++ )); do
  if [[ $(( i % 2 )) -eq 0 ]]; then continue; fi
  echo $i
done
```

위 예제를 실행한다면, 0에서 9까지의 모든 짝수를 출력합니다.

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
