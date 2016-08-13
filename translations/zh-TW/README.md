# bash-handbook [![CC 4.0][cc-image]][cc-url]

這份文件是為想要學習 Bash 但是又不想要專研太深的人。

> **Tip**：不妨嘗試 [**learnyoubash**](https://git.io/learnyoubash) — 一個基於本文件的互動教學平台！

# Node 套件手稿

你可以使用 `npm` 來安裝這份手冊。只要執行：

```
$ npm install -g bash-handbook
```

你現在可以在命令執行 `bash-handbook`。它會開啟你所選的 `$PAGER`。反之，你也可以繼續在這裡閱讀。

來源是這裡：<https://github.com/denysdovhan/bash-handbook>

# 翻譯

目前翻譯這個 **bash-handbook** 的版本有：

- [Português (Brasil)](/translations/pt-BR/README.md)
- [简体中文 (中国)](/translations/zh-CN/README.md)
- [繁體中文（台灣）](/translations/zh-TW/README.md)

[**徵求其他語言版本翻譯**][tr-request]

[tr-request]: https://github.com/denysdovhan/bash-handbook/issues/new?title=Translation%20Request:%20%5BPlease%20enter%20language%20here%5D&body=I%20am%20able%20to%20translate%20this%20language%20%5Byes/no%5D

# 目錄

- [簡介](#簡介)
- [關於 Shell 以及 Shell 的模式](#關於-shell-以及-shell-的模式)
  - [互動模式](#互動模式)
  - [非互動模式](#非互動模式)
  - [Exit codes](#exit-codes)
- [註解](#註解)
- [變數](#變數)
  - [區域變數](#區域變數)
  - [環境變數](#環境變數)
  - [命令列引數](#命令列引數)
- [Shell expansion](#shell-expansion)
  - [括號展開](#括號展開)
  - [命令替代](#命令替代)
  - [算術代入展開](#算術代入展開)
  - [單引號和雙引號](#單引號和雙引號)
- [陣列](#陣列)
  - [陣列宣告](#陣列宣告)
  - [陣列展開](#陣列展開)
  - [切割陣列](#切割陣列)
  - [把一個物件加入到陣列中](#把一個物件加入到陣列中)
  - [把一個物件從陣列中移除](#把一個物件從陣列中移除)
- [Streams、pipes 和命令序列](#streamspipes-和-lists)
  - [Streams](#streams)
  - [Pipes](#pipes)
  - [命令序列](#命令序列)
- [條件陳述式](#條件陳述式)
  - [Primary 和組合表達式](#primary-和組合表達式)
  - [使用 `if` 陳述](#使用-if-陳述)
  - [使用 `case` 陳述](#使用-case-陳述)
- [迴圈](#迴圈)
  - [`for` 迴圈](#for-迴圈)
  - [`while` 迴圈](#while-迴圈)
  - [`until` 迴圈](#until-迴圈)
  - [`select` 迴圈](#select-迴圈)
  - [迴圈控制](#迴圈控制)
- [函式](#函式)
- [Debug](#debug)
- [後記](#後記)
- [其他資源](#其他資源)
- [License](#license)

# 簡介

如果你是一個開發者，你一定知道時間的寶貴，那麼使工作流程更快速簡單便是一件很重要的事情。

為了讓工作更有效率及更高的產能，常常會有些重複繁瑣的事情，像是：

* 截圖並把圖片上傳到伺服器。
* 需要處理各式各樣有著不同格式的文件。
* 在不同檔案格式間進行轉換。
* 解析程式的輸出。

進入 **Bash** 的世界，coder 們的救星！

Bash 是一個由 [Brain Fox](https://en.wikipedia.org/wiki/Brian_Fox_(computer_programmer)) 為 GNU 專案開發的 Unix Shell，這是一個為取代 [Bourne shell](https://en.wikipedia.org/wiki/Bourne_shell) 而開發的自由軟體，最初在 1989 年被發布，並且 Bash 也作為 Linux 和 macOS 的 default shell 很長一段時間了。

那麼我們為什麼需要學習有著 30 年歷史的東西呢？答案很簡單：這個東西是當今最強大的且易於攜帶的工具，在所有 Unix-based 的作業系統撰寫有效率的的腳本程式。而這就是你需要學習 bash 的原因。

在這個手冊中，我會透過範例去說明 bash 最重要的概念。而我也希望這篇概略性的文章對你會有幫助。

# 關於 Shell 以及 Shell 的模式

使用者 bash shell 可以工作在兩種模式 - 互動模式及非互動模式。

## 互動模式

如果你是在 Ubuntu 上工作，你有七個虛擬終端機可以讓你使用。
桌面環境是被放在第七個終端機中，
所以你可以使用 `Ctrl-Alt-F7` 快捷鍵來回到友善的 GUI 介面。

你可以使用 `Ctrl-Alt-F1` 來開始使用 shell。在那之後，熟悉的 GUI 介面將會消失，取而代之的則是虛擬終端機。

如果你看到以下的東西，代表你處在互動模式：

    user@host:~$

你可以輸入各種 Unix 的命令，像是 `ls`、`grep`、`cd`、`mkdir`、`rm`，然後看看他們執行後的結果。

我們稱這個為互動模式，因為 shell 是直接與使用者作互動。

但使用虛擬終端機實在是不怎麼方便。例如，假設你想要同時編輯文件和執行其他命令，在這樣的情況下，使用虛擬終端機模擬器（virtual terminal emulators）會比較好，像是：

- [GNOME Terminal](https://en.wikipedia.org/wiki/GNOME_Terminal)
- [Terminator](https://en.wikipedia.org/wiki/Terminator_(terminal_emulator))
- [iTerm2](https://en.wikipedia.org/wiki/ITerm2)
- [ConEmu](https://en.wikipedia.org/wiki/ConEmu)

## 非互動模式

在非互動模式中，shell 從檔案或是 pipe 讀取到命令然後執行他們。當直譯器到達檔案的末端（EOF, End Of Line）時，shell 程式終止 session 並返回到父程式。

使用以下的命令來執行，使 shell 在非互動模式中執行：

    sh /path/to/script.sh
    bash /path/to/script.sh

在上面的例子中，`script.sh` 其實只是一個普通的檔案，而 shell 直譯器可以解析檔案中的命令；`sh` 和 `bash` 是 shell 的直譯程式。你可以使用你喜歡的編輯器來建立 `script.sh`（例如：vim、nano、Sublime Text、Atom 等等）。

除此之外，你還可以透過 `chmod` 命令給予檔案執行權限，使檔案可以執行：


    chmod +x /path/to/script.sh

另外，在這個 script 第一行必須指定應該使用哪個程式來執行這個檔案，像是：

```bash
#!/bin/bash
echo "Hello, world!"
```

或者，如果你偏好使用 `sh` 而不是 `bash`，將 `#!/bin/bash` 改成 `#!/bin/sh`。這個 `#!` 字元序列被稱為 [shebang](http://en.wikipedia.org/wiki/Shebang_%28Unix%29)。現在你可以這樣執行這個 script：

    /path/to/script.sh

我們使用上面簡單方便的技巧使用 `echo` 將文字印到螢幕終端。

另一個使用 sheban 的方式：

```bash
#!/usr/bin/env bash
echo "Hello, world!"
```

使用 shebang 的好處是可以基於環境變數 `PATH` 來尋找程式（這個例子是 `bash`）。相較於上面的第一種方法，應該使用這個方法比較好，因為我們不知道程式被放在系統的什麼地方。這樣好處是，如果 `PATH` 變數在系統上可能被設定到其他不同版本的程式上。例如，安裝一個新版本的 `bash` 同時保留原來版本的 `bash`，然後把新版本的路徑加入環境變數 `PATH` 中。使用 `#!/bin/bash` 會導致使用到原來的 `bash`，而使用 `#!/usr/bin/env bash` 會使用到新的版本。


## Exit codes

每個命令都會回傳一個 **exit code**（**回傳狀態**或**結束狀態**）。一個成功的命令始終回傳 `0`（零代碼），而失敗總是回傳非零值（錯誤代碼）。錯誤代碼必須介於 1 到 255 的正整數。

撰寫 script 時，我們可以使用另一個方便的 `exit` 命令。使用這個命令來終止目前的執行，並向 shell 提供一個 exit code。執行一個不帶有任何參數的 `exit` code，會終止執行目前的 script 並回傳在 `exit` 之前的最後一個命令的 exit code。

當程式終止時，shell 會把 **exit code** 指派給環境變數 `$?`。`$?` 變數是我們測試一個 script 是否成功執行。

用同樣的方式，我們可以使用 `exit` 來停止一個 script，我們能在函式中使用 `return` 來退出函式並回傳 **exit code** 給呼叫者，又或者你可以在函式中使用 `exit`，這會退出函式 _並_結束程式。

# 註解

Script 中可以包含_註解_。註解是一個特殊的語句，會被 `shell` 直譯器忽略。它們以一個 `#` 符號為開頭。

例如：

```bash
#!/bin/bash
# 這個 script 將會列印你的使用者名稱。
whoami
```

> **Tip**: 使用註解可以解釋你的 script 做了什麼，以及_為什麼_這麼做。

# 變數


與大部分的程式語言一樣，你可以在 bash 內建立變數。
Bash 中沒有資料類型的概念。變數只能是純數字或是一或多個字元所組成的字串。你可以建立三種類型的變數：區域變數、環境變數、以及作為_命令列引數_的變數。

## 區域變數

**區域變數**是只存在於單一 script 的變數，它們是無法讓其他程式或 script 存取的。
一個變數可以使用 `=` 來宣告（根據規則，在變數名稱、 `=` 、變數的值之間**不應有**空格的存在），你可以透過 `$` 來取得這個變數的值。例如：

```bash
username="denysdovhan"  # 宣告變數
echo $username          # 顯示變數
unset username          # 刪除變數
```

我們也可以使用 `local` keyword 在一個 function 中宣告一個區域變數。當 function 結束時，這個區域變數就會消失。

```bash
local local_var="I'm a local value"
```

## 環境變數

**環境變數**執行在目前 shell session 可以讓任何程式或 script 存取的變數。建立它們與區域變數類似，但使用 `export` 作為前綴

```bash
export GLOBAL_VAR="I'm a global variable"
```

bash 中有_許多_全域變數。你會經常遇到這些全域變數，以下是最常使用到的變數查閱表︰

| 變數         | 描述                                                          |
| :----------- | :------------------------------------------------------------ |
| `$HOME`      | 目前使用者的家目錄                                            |
| `$PATH`      | shell 以這些冒號分隔的目錄清單尋找命令                        |
| `$PWD`       | 目前的工作目錄                                                |
| `$RANDOM`    | 0 到 32767 之間的隨機整數                                     |
| `$UID`       | 數字類型，使用者的 ID                                         |
| `$PS1`       | 主要的提示字串                                                |
| `$PS2`       | 次要的提示字串                                                |

根據這個[連結](http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_03_02.html#sect_03_02_04)，可以查看更多在 Bash 內的環境變數列表。

## 命令列引數

**命令列引數**是當程式執行時，變數根據執行程式時，程式名稱後所跟隨的參數而得。下面表格列出了當你在程式執行時，命令列引數和其他特殊變數它們所代表的意義。


| 參數           | 描述                                                          |
| :------------- | :------------------------------------------------------------ |
| `$0`           | Script 的名稱                                                 |
| `$1 … $9`      | 從第 1 個到第 9 個參數                                        |
| `${10} … ${N}` | 從第 10 個到第 N 個參數                                       |
| `$*` 或 `$@`   | 除了 `$0` 以外的所有參數                                      |
| `$#`           | 不包含 `$0`的參數數量                                         |
| `$FUNCNAME`    | function 名稱（只有一個變數在 function 內部）                 |

在下面的範例，命令列引數會是：`$0='./script.sh'`、`$1='foo'` 和 `$2='bar'`：

    ./script.sh foo bar

變數也可以有_預設值_。我們可以使用以下的語法來定義預設值：

```bash
 # 如果變數是空值，分配一個預設值。
: ${VAR:='default'}
: ${$1:='first'}
# 或
FOO=${FOO:-'default'}
```

# Shell expansion

_Expansion_ 被劃分為 _token_ 後，會在命令列上執行。換句話說，這些 expansion（展開） 是一種機制來計算算術運算，以儲存命令的執行結果等等。

如果你有興趣的話，你可以閱讀[更多關於 shell expansions](https://www.gnu.org/software/bash/manual/bash.html#Shell-Expansions)。

## 括號展開

括號展開讓我們可以產生任意字串。它類似於_檔案名稱展開_。例如：

```bash
echo beg{i,a,u}n # begin began begun
```

括號展開也可以用在建立一個 loop iterated 的範圍。

```bash
echo {0..5} # 0 1 2 3 4 5
echo {00..8..2} # 00 02 04 06 08
```

## 命令替代

命令替代允許我們對執行指令，並將指令的回傳值作為參數放進其他命令中，或是將回傳值指派到變數當中，當命令被 ``` `` ``` 或 `$()` 包住時，命令替代將會執行。例如，我們可以使用它如下所示：

```bash
now=`date +%T`
# 或
now=$(date +%T)

echo $now # 19:08:26
```

## 算術代入展開

在 bash 裡我們可以很輕鬆的做到任何算術運算。但是表達式必須放在 `$(( ))` 裡面，算術代入展開的格式為：

```bash
result=$(( ((10 + 5*3) - 7) / 2 ))
echo $result # 9
```

在算術代入展開內，變數不需要 `$` 前綴：

```bash
x=4
y=7
echo $(( x + y ))     # 11
echo $(( ++x + y++ )) # 12
echo $(( x + y ))     # 13
```

## 單引號和雙引號

單引號和雙引號有很重要的區別。在雙引號內的變數或是命令替代會被代入展開。在單引號內則不會。例如：

```bash
echo "Your home: $HOME" # Your home: /Users/<username>
echo 'Your home: $HOME' # Your home: $HOME
```

區域變數和環境變數包含空格時，它們在引號內的展開要格外小心。隨便舉個例子，使用 `echo` 來印出一些使用者的輸入：

```bash
INPUT="A string  with   strange    whitespace."
echo $INPUT   # A string with strange whitespace.
echo "$INPUT" # A string  with   strange    whitespace.
```

第一個 `echo` 調用了 5 個獨立的參數 — $INPUT 被拆成獨立的單字，`echo` 在每個單字之間列印一個空白字元。在第二種情況中，`echo` 調用了一個參數（整個 $INPUT，包含空白）。

現在來看看一個更嚴重的例子吧：

```bash
FILE="Favorite Things.txt"
cat $FILE   # 嘗試印出兩個檔案的內容：`Favorite` 和 `Things.txt`。
cat "$FILE" # 列印一個檔案的內容： `Favorite Things.txt`。
```

在這個範例的問題可以透過把 FILE 重新命名成 `Favorite-Things.txt` 來解決，考慮輸入進來的環境變數、位置參數，或是命令的輸出（`find`、`cat` 等等）。如果輸入*可能*包含空格，請記得使用引號包起來。

# 陣列

與大部分的程式語言一樣，在 bash 一個陣列是一個變數，讓你可以指向多個數值。在 Bash 中，陣列是從 0 開始，意思是陣列第一個元素的索引值是 0 。

當處理陣列時，我們應該要知道一個特殊的環境變數 `IFS`。**IFS** 或 **Input Field Separator**，是陣列中的元素之間的分隔符號。預設的 `IFS` 是一個空格 `IFS=' '`。

## 陣列宣告

在 Bash 你可以通過簡單地賦值給陣列變數的索引來建立陣列。

```bash
fruits[0]=Apple
fruits[1]=Pear
fruits[2]=Plum
```

也可以使用複合賦值建立陣列變數，像是：

```bash
fruits=(Apple Pear Plum)
```

## 陣列展開

個別陣列元素可以像其他變數一樣展開：

```bash
echo ${fruits[1]} # Pear
```

可以把 `*` 或 `@` 放在陣列索引值的地方將陣列展開：

```bash
echo ${fruits[*]} # Apple Pear Plum
echo ${fruits[@]} # Apple Pear Plum
```

以上兩行有**很重要且微妙**的差別，假設陣列的元素值中包含空白：

```bash
fruits[0]=Apple
fruits[1]="Desert fig"
fruits[2]=Plum
```

我們想要將陣列中的元素隔行印出，所以我們試著用看看內建函數 `printf` ：

```bash
printf "+ %s\n" ${fruits[*]}
# + Apple
# + Desert
# + fig
# + Plum
```

為什麼 `Desert` 和 `fig` 被分開了？讓我們嘗試使用雙引號括起來：

```bash
printf "+ %s\n" "${fruits[*]}"
# + Apple Desert fig Plum
```

現在所有元素都被放在同一行了 - 這不是我們想要的！為了解決這個問題，接著試試 `${fruits[@]}` 吧：

```bash
printf "+ %s\n" "${fruits[@]}"
# + Apple
# + Desert fig
# + Plum
```

在雙引號中，`${fruits[@]}` 將陣列每個元素視為成獨立的參數；保留了陣列元素中的空白。

## 切割陣列

除此之外，我們可以使用 _slice_ 運算符來取出陣列中某個部份：

```bash
echo ${fruits[@]:0:2} # Apple Desert fig
```

在上面的範例，`${fruits[@]}` expands 整個陣列的內容，而 `:0:2` 取出從索引為 0，長度為 2 的元素。
_（譯者註：因此會從陣列位置 0 開始取 2 個元素）_

## 把一個物件加入到陣列中

在一個陣列中新增元素也是相單簡單的。在這種情況下複合賦值特別有用。我們可以像這樣使用︰
_（譯者註：複合賦值－例如在 `a = a + 1` 中，就是將 a 的值帶入運算式中，再將值指派回原本的變數）_

```bash
fruits=(Orange "${fruits[@]}" Banana Cherry)
echo ${fruits[@]} # Orange Apple Desert fig Plum Banana Cherry
```

上面的範例中，`${fruits[@]}` 展開整個陣列的內容，並替換 fruits 然後帶入複合賦值，分配新的值到 `fruits` 陣列，修改原始的值。

## 把一個物件從陣列中移除

如果要從一個陣列中刪除一個元素，使用 `unset` 命令：

```bash
unset fruits[0]
echo ${fruits[@]} # Apple Desert fig Plum Banana Cherry
```

# Streams、pipes 和 lists

Bash 在處理程式及輸出有非常強大的功能可以用。使用 streams 可以把程式的輸出導向到另一個程式的 input 或是一個檔案中，這讓我們可以方便的寫入任何我們想要的東西，或者是程式的紀錄檔。

Pipes 給我們建立 conveyor 的機會和控制命令的執行。_（譯者註：converyor 為輸送的概念）_

最重要的是我們瞭解如何使用這個強大和複雜的工具。

## Streams

Bash 接收輸入並將輸出作為序列或字元的 **streams** 。這些 streams 可能會被重導向到檔案或其他 streams。

這裡有三個描述：

| 代碼 | 描述符     | 描述                 |
| :--: | :--------: | :------------------- |
| `0`  | `stdin`    | 標準輸入             |
| `1`  | `stdout`   | 標準輸出             |
| `2`  | `stderr`   | 錯誤輸出             |

重導讓我們可以控制命令的輸入來自哪裡，和輸出到哪去。在重導向 streams 時會用到以下運算子：

| 運算子   | 描述                                         |
| :------: | :------------------------------------------- |
| `>`      | 重新導向輸出                                 |
| `&>`     | 重新導向輸出和錯誤輸出                       |
| `&>>`    | 以附加形式重新導向輸出和錯誤輸出             |
| `<`      | 重新導向輸入                                 |
| `<<`     | [Here 文件](http://tldp.org/LDP/abs/html/here-docs.html)語法 |
| `<<<`    | [Here 字串](http://www.tldp.org/LDP/abs/html/x17837.html) |

這裡有一些重導向的範例：

```bash
# 將 ls 的輸出寫入到 list.txt。
ls -l > list.txt

# 將輸出附加到 list.txt。
ls -a >> list.txt

# 所有錯誤將會被寫入到 error.txt。
grep da * 2> errors.txt

# 從 errors.txt 讀取。
less < errors.txt
```

## Pipes

我們不只可以在檔案可以重導 streams，也可以在其他的程式中。**Pipes** 也能將輸出作為其他程式的輸入。

在下方的範例，`command1` 把輸出導向到 `command2`，然後 `command2` 再將輸出作為 `command3` 的輸入：

    command1 | command2 | command3

這樣的結構稱為 **pipelines**。

實際上，這可以用來在多個程式中依序處理資料。例如，`ls -l` 的輸出傳送到 `grep`，只列印出附檔名為 `.md` 的檔案，然後這個輸出最終傳到 `less`：

    ls -l | grep .md$ | less

pipeline 的 exit status 通常是 pipeline 中最後一個命令的 exit status。shell 不會回傳狀態，直到所有在 pipeline 的命令都完成。如果任何在 pipeline 內的命令失敗，你應該設定 pipefail 選項：

    set -o pipefail

## 命令序列

**命令序列**是由 `;`、`&`、`&&` 或 `||` 運算符分隔一個或多個 pipeline 序列。

如果一個命令是以 `&` 作為結尾，shell 會在 subshell 中非同步執行命令。換句話說，這個命令會在背景執行。

命令透過 `;` 隔開依序執行：一個接著一個指令執行直到所有命令完成。

```bash
# command2 會在 command1 執行完後被執行。
command1 ; command2

# 等同於這個方式。
command1
command2
```

`&&` 和 `||` 分別稱為 _AND_ 和 _OR_ 序列。

_AND 序列_ 看起來像是：

```bash
# 只有在 command1 結束成功時（回傳 exit status 為 0 ），command2 才會被執行。
command1 && command2
```

_OR 序列_ 的形式：

```bash
# 只有在 command1 未成功完成時（回傳錯誤代碼 ），command2 才會被執行。
command1 || command2
```

一個 _AND_ 或 _OR_ 序列回傳的狀態碼，是最後一個執行命令的狀態碼。

# 條件陳述式

與大部分的程式語言一樣，Bash 中的條件陳述讓我們決定是否執行某些程式。結果取決於在 `[[ ]]` 內的運算式。

條件表達式可以包含 `&&` 和 `||` 運算符，就是 _AND_ 和 _OR_。除此之外，這裡還有許多[其他方便的表達式](#primary-和組合表達式)。

有兩種不同條件陳述：`if` 和 `case`。

## Primary 和組合表達式

在 `[[ ]]`（或 `sh` 中的 `[ ]`）中的表達式稱為 **測試命令** 或 **primaries**。這些表達式幫助我們表明條件的結果。在下表中，我們使用 `[ ]`，因為它也可以在 `sh` 執行。這裡有關於在 bash 中，[雙引號和單引號的差別](http://serverfault.com/a/52050)的一些回答。

**檢查檔案系統中的檔案或目錄的狀態：**

| Primary       | 涵義                                                         |
| :-----------: | :----------------------------------------------------------- |
| `[ -e FILE ]` | 如果 `FILE` 存在（**e**xists），為 Ture                      |
| `[ -f FILE ]` | 如果 `FILE` 存在且為一個普通的文件（**f**ile），為 True      |
| `[ -d FILE ]` | 如果 `FILE` 存在且為一個目錄（**d**irectory），為 True       |
| `[ -s FILE ]` | 如果 `FILE` 存在且不為空（**s**ize 大於 0），為 True         |
| `[ -r FILE ]` | 如果 `FILE` 存在且有讀取權限（**r**eadable），為　True       |
| `[ -w FILE ]` | 如果 `FILE` 存在且有寫入權限（**w**ritable），為 True        |
| `[ -x FILE ]` | 如果 `FILE` 存在且有執行權限（e**x**ecutable），為 True      |
| `[ -L FILE ]` | 如果 `FILE` 存在且為符號連結（**l**ink），為 True            |
| `[ FILE1 -nt FILE2 ]` | FILE1 比 FILE2 新（**n**ewer **t**han）              |
| `[ FILE1 -ot FILE2 ]` | FILE1 比 FILE2 舊（**o**lder **t**han）              |

**檢查字串狀態：**

| Primary        | 涵義                                                        |
| :------------: | :---------------------------------------------------------- |
| `[ -z STR ]`   | `STR` 為空（長度為 0，**z**ero）                            |
| `[ -n STR ]`   | `STR` 不為空 (長度不為 0，**n**on-zero）                    |
| `[ STR1 == STR2 ]` | `STR1` 和 `STR2` 相等                                   |
| `[ STR1 != STR2 ]` | `STR1` 和 `STR2` 不相等                                 |

**二進制的算術運算符：**

| Primary             | 涵義                                                     |
| :-----------------: | :------------------------------------------------------- |
| `[ ARG1 -eq ARG2 ]` | `ARG1` 和 `ARG2` 相等（**eq**ual）                       |
| `[ ARG1 -ne ARG2 ]` | `ARG1` 和 `ARG2` 不相等（**n**ot **e**qual）             |
| `[ ARG1 -lt ARG2 ]` | `ARG1` 小於 `ARG2`（**l**ess **t**han）                  |
| `[ ARG1 -le ARG2 ]` | `ARG1` 小於等於 `ARG2`（**l**ess than or **e**qual）     |
| `[ ARG1 -gt ARG2 ]` | `ARG1` 大於 `ARG2`（**g**reater **t**han）               |
| `[ ARG1 -ge ARG2 ]` | `ARG1` 大於等於 `ARG2`（**g**reater than or **e**qual）  |

條件式也可以 **組合** 在一起使用：

| 運算符         | 效果                                                               |
| :------------: | :----------------------------------------------------------------- |
| `[ ! EXPR ]`   | 如果 `EXPR` 為 false，則為 True                                    |
| `[ (EXPR) ]`   | 回傳 `EXPR` 的值                                                   |
| `[ EXPR1 -a EXPR2 ]` | _AND_ 邏輯。如果 `EXPR1` **a**nd `EXPR2` 為 Ture，則為 True  |
| `[ EXPR1 -o EXPR2 ]` | _OR_ 邏輯。如果 `EXPR1` **o**r `EXPR2` 為 Ture，則為 True    |

還有許多有用的 primariy 你可以在 [Bash man 網頁](http://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html)輕鬆的找到它們。

## 使用 `if` 陳述

`if` 使用方式就像其他程式語言一樣。如果表達式括號內為 true，在 `then` 和 `fi` 之間的程式碼會被執行。`fi` 說明根據條件所執行的程式碼已經結束。

```bash
# 單行
if [[ 1 -eq 1 ]]; then echo "true"; fi

# 多行
if [[ 1 -eq 1 ]]; then
  echo "true"
fi
```

同樣的，我們可以使用 `if..else`，像是：

```bash
# 單行
if [[ 2 -ne 1 ]]; then echo "true"; else echo "false"; fi

# 多行
if [[ 2 -ne 1 ]]; then
  echo "true"
else
  echo "false"
fi
```

有時候 `if..else` 不能滿足我們的需要。在這個情況下，別忘了 `if..elif..else`，使用起來也是很方便。

看看下面的例子︰

```bash
if [[ `uname` == "Adam" ]]; then
  echo "Do not eat an apple!"
elif [[ `uname` == "Eva" ]]; then
  echo "Do not take an apple!"
else
  echo "Apples are delicious!"
fi
```

## 使用一個 `case` 陳述

如果你面對的是好幾個不同情況，需要採取不同的行動，那麼使用 `case` 陳述或許會比巢狀化的 `if` 陳述來的有用。下方是使用 `case` 來處理更多複雜的條件：

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

每個 case 都會對應到一個條件。`|` 符號是被用來分離多個條件，而 `)` 運算符是條件的結尾。第一個符合的命令會被執行。`*` 代表不對應以上所給的任一條件。每個命令區塊之間需要透過 `;;` 隔開。

# 迴圈

這裡我們不必感到驚訝。與任何程式語言一樣，在 bash 之中，如果判斷式結果為 true，就會迭代迴圈。

在 Bash 有四種類型的迴圈：`for`、`while`、`until` 和 `select`。

## `for` 迴圈

`for` 非常相似於 C 的 `for` 迴圈。它看起來像是：

```bash
for arg in elem1 elem2 ... elemN
do
  # statements
done
```

在每個迴圈中，`arg` 會依序被賦予 `elem1` 到 `elemN` 的值。值可能是萬用字元或[括號展開](#括號展開)。

當然，我們也可以將 `for` 迴圈寫成一行，但在這個情況我們需要在 `do` 之前放一個分號，像是這樣：

```bash
for i in {1..5}; do echo $i; done
```

順便一提，如果你覺得 `for..in..do` 看起來很奇怪，你也可以撰寫 C 語言風格的 `for` 迴圈，像是：

```bash
for (( i = 0; i < 10; i++ )); do
  echo $i
done
```

當我們想要將目錄下每個文件做相同的操作時，`for` 是相當方便的。例如，如果我們需要移動所有的 `*.bash` 檔到 `script` 資料夾，並給予它們可執行的權限，我們的 script 可以像是這樣：

```bash
#!/bin/bash

for FILE in $HOME/*.bash; do
  mv "$FILE" "${HOME}/scripts"
  chmod +x "${HOME}/scripts/${FILE}"
done
```

## `while` 迴圈

只要該條件為 _true_，`while` 迴圈測試一個條件，並遍歷序列的命令。被檢測的條件跟 `if.. then` 中使用的 [primary](#primary-和組合表達式) 並沒有差別。所以 `while` 迴圈看起來會像是：

```bash
while [[ condition ]]
do
  # statements
done
```

就像 `for` 迴圈一樣，如果我們想要將 `do` 和條件寫成一行的話，我們必須在 `do` 之前加上分號。

一個處理範例如下所示：

```bash
#!/bin/bash

# 0 到 9 每個數字的平方。
x=0
while [[ $x -lt 10 ]]; do # x 小於 10。
  echo $(( x * x ))
  x=$(( x + 1 )) # x 加 1。
done
```

## `until` 迴圈

`until` 迴圈和 `while` 迴圈完全相反的。它會像 `while` 一樣檢查條件，迴圈持續到表達式為 False 停止：

```bash
until [[ condition ]]; do
  #statements
done
```

## `select` 迴圈

`select` 迴圈幫助我們組織一個使用者功能表。它和 `for` 迴圈語法幾乎相同：

```bash
select answer in elem1 elem2 ... elemN
do
  # statements
done
```

`select` 會將 `elem1..elemN` 跟隨著序號列印出來提示使用者。然後將選單的提示文字設定在 `PS3` 當中。在上面的例子當中，使用者的輸入會存於 `answer` 中。如果 `answer` 是介於 `1..N` 的數字，那敘述句就會被執行且 `select` 會因為 do-loop 的關係而循環，因此我們應該使用 `break` 來避免無窮迴圈。

一個處理範例如下所示：

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
  break # 避免無窮迴圈。
done
```

在這個範例中，詢問使用者想要使用哪套 package manager 安裝套件，並詢問我們需要安裝什麼套件，最後會執行安裝：

如果我們執行，我們可以得到：

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

## 迴圈控制

在某些情況下，我們需要在正常結束前或跳過某次迭代來結束迴圈。在這個情況下，我們可以使用 shell 內建的 `break` 和 `continue` 語句。這兩個語法都可以在前述的每一種迴圈執行。

`break` 語句被用於在迴圈結束之前，退出目前迴圈。我們之前已經看過了。

`continue` 語句跳過一個迭代。我們可以像這樣使用它：

```bash
for (( i = 0; i < 10; i++ )); do
  if [[ $(( i % 2 )) -eq 0 ]]; then continue; fi
  echo $i
done
```

如果我們執行上方的範例，我們可以列印出 0 到 9 間的奇數。

# 函式

在 script 中，就像任何其他程式語言一樣，我們有能力定義 function 和呼叫 function。在 Bash 中的 function 是一個程式碼區塊，但是有些不同。

在 Bash 中的 function 就是將一堆指令包裝成一個 name，而這個 name 就是 function name，呼叫一個 function 就像在其他程式語言一樣，你只要執行 function 的名稱，function 就會被 _調用_。

我們可以用這種方式宣告我們的 function：

```bash
my_func () {
  # statements
}

my_func # 呼叫 my_func。
```

我們在調用 function 前，必須要先宣告。

Function 可以接受參數並回傳一個結果 — exit code。在 function 內，與[非互動模式](#非互動模式)下的 script 參數處理方式相同 — 使用[位置參數](#位置參數)。結果代碼可以使用 `return` 命令來 _回傳_。

以下的 function 需要一個名稱並回傳 `0`，表示成功執行。

```bash
# 帶參數的 function。
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

我們已經討論過 [exit codes](#exit-codes)。`return` 命令不帶任何最後一個執行命令 exit code 的回傳參數。上面的範例，`return 0` 會回傳一個成功的 exit code `0`。

## Debug

shell 提供了 debug script 的工具。如果我們想要在 debug 模式執行 script，我們在 script 的 shebang 使用一個特別的選項：

```bash
#!/bin/bash options
```

這個選項是改變 shell 行為的設定。下面是一些可能對你有幫助的選項清單：

| 簡寫  | 名稱        | 描述                                                      |
| :---: | :---------- | :-------------------------------------------------------- |
| `-f`  | noglob      | 禁止檔案名 expansion（globbing）　　　　　                |
| `-i`  | interactive | Script 執行在_互動_模式                                   |
| `-n`  | noexec      | 讀取命令，但不執行它們（確認語法是否正確）                |
|       | pipefail    | 如果任何命令失敗使 pipeline 失敗，不只是最後一個命令失敗  |
| `-t`  | —           | 在第一個命令完成後退出                                    |
| `-v`  | verbose     | 在執行前，列印每個命令到 `stderr`                         |
| `-x`  | xtrace      | 在執行前，列印每個命令和他的參數到 `stderr`               |

例如，我們有個 script 有 `-x` 選項像是：

```bash
#!/bin/bash -x

for (( i = 0; i < 3; i++ )); do
  echo $i
done
```

這將會列印變數的值到 `stdout` 以及其他有用的資訊：

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

有時候我們需要 debug script 某個部份。在這種情況下使用 `set` 命令是很方便的，使用 `-` 啟用選項，`+` 停用選項。

```bash
#!/bin/bash

echo "xtrace is turned off"
set -x
echo "xtrace is enabled"
set +x
echo "xtrace is turned off again"
```

# 後記

我希望這麼小手冊會是有趣並有幫助的。老實說，我撰寫這個手冊是為了幫助自己不忘記這些基本的 bash。我嘗試透過簡單但有意義的方式，希望你們會喜歡。

這本手冊講述我自己與 Bash 的經驗。它並不全面，所以如果你還需要更多資訊的話，請執行 `man bash` 並從那裡開始。

非常歡迎你的貢獻，任何指正或問題我都非常感激。這些都可以透過建立一個新 [issue](https://github.com/denysdovhan/bash-handbook/issues) 來進行。

感謝你閱讀這本手冊！

# 想要了解更多嗎？

這裡有一些涵蓋 Bash 的相關資料：

* 在許多環境中，你可以執行 Bash 中的 `man bash`，藉由系統並顯示 Bash 相關的幫助資訊。有關更多 `man` 命令的相關資訊，請拜訪在 [The Linux Information Project](http://www.linfo.org/) 的 ["The man Command"](http://www.linfo.org/man.html) 網頁查看。
* ["Bourne-Again SHell manual"](https://www.gnu.org/software/bash/manual/) 有許多格式，包含 HTML、Info、TeX、PDF、和 Texinfo。在 <https://www.gnu.org/>。在 2016/01，包括 4.3 版本，最後更新時間 2015/02/02。

# 其他資源

* [awesome-bash](https://github.com/awesome-lists/awesome-bash) 是一個 Bash script 和其他資源的列表。
* [awesome-shell](https://github.com/alebcay/awesome-shell) 是另一個 Shell 及其他資源的列表。
* [bash-it](https://github.com/Bash-it/bash-it) 為你日常工作使用、 開發和維護 shell script 和自訂命令提供了可靠的框架。
* [dotfiles.github.io](http://dotfiles.github.io/) 是一個很棒的指南，蒐集了多個 dotfiles 及可用在 bash 及其他 shell 的開發框架。
* [learnyoubash](https://github.com/denysdovhan/learnyoubash) 幫助你撰寫你的第一個 bash script。
* [shellcheck](https://github.com/koalaman/shellcheck) 是一個 shell script 的靜態分析工具。你可以從在 [www.shellcheck.net](http://www.shellcheck.net/) 網頁上或從指令來執行。安裝說明在 [koalaman/shellcheck](https://github.com/koalaman/shellcheck) 的 Github repo 頁面。

最後，Stack Overflow 有許多[標記為 bash](https://stackoverflow.com/questions/tagged/bash) 的問題，當你在卡住時，你可以從那些地方學習或是提問。

# License

[![CC 4.0][cc-image]][cc-url] © [Denys Dovhan](http://denysdovhan.com)

[cc-url]: http://creativecommons.org/licenses/by/4.0/
[cc-image]: https://i.creativecommons.org/l/by/4.0/80x15.png
