# To start the project, create a `.env.local` file and copy the contents of `.env.example` there

# THE BASE CORE TEMPLATE AND THE GUIDE FOR THE ALL NEW PROJECTS

## Base:

<br>

### Develop

```zsh
yarn
yarn dev
```

### Build:

```zsh
yarn
yarn build
yarn start
```

### Production build:

You can read the instruction in the ci folder

<br>
<br>
<br>

## VS Code extensions

-   uppercod.vscode-jsx-style
    uppercod
-   jpoissonnier.vscode-styled-components
-   esbenp.prettier-vscode
-   waderyan.nodejs-extension-pack
-   foxundermoon.next-js
-   wix.vscode-import-cost
-   dbaeumer.vscode-eslint
-   dsznajder.es7-react-js-snippets
-   steoates.autoimport

<br>

## Code rules configs:

We use Airbnb prettier and linter

<br>

For using typescript with css modules, create .vscode folder with a next settings.json file:

```json
{
	"typescript.tsdk": "node_modules/typescript/lib",
	"typescript.enablePromptUseWorkspaceTsdk": true
}
```

Code rules hints:

```ts
const SOME_STATIC_CONST = 5; // "5" and etc.
const anotherConst = arr.filter((el) => ek.ok);
let value = someValue;

//Don't forget to specify variables and names should reveal content

type UserType = {};
interface SomeData {}

const { data } = { ...data_from_back_end };

useSomething(() => {}, []); //all hooks starts with use
```

```css
:root {
	--colors-ProjectName-ColorName: #000000;
}
.some-class {
}
```

```html
<!-- Try to use next tags where you can, or use <Image /> from the next/image -->
<img loading="lazy" width="n" height="n" />
<picture></picture>
```

isAdverb... - move to /lib/utils. isNeedToBeBlocked and etc.
formatTo... - move to lib/formatters

<br>
<br>

## Project structure:

src - main projects folder
./ - configs and etc.
public - images, fonts, external html

## src/

─ app/ # Инициализирующая логика приложения

─ processes/ # (Опц.) Процессы приложения, протекающие над страницами

─ pages/ # Страницы приложения

─ features/ # Ключевая функциональность приложения

─ entities/ # Бизнес-сущности

─ shared/ # Переиспользуемые модули

<br>
<br>

## Modules and guide about them you can find inside the modules folder
