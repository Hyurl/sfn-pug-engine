# Sfn-Pug-Engine

**Pug template engine for [sfn](https://github.com/hyurl/sfn) framework.**

## Install

```sh
npm i sfn-pug-engine
```

## Example

```typescript
import { HttpController, route } from "sfn";
import { PugEngine } from "sfn-pug-engine";

var engine = new PugEngine();

export default class extends HttpController {
    engine: PugEngine = engine;

    @route.get("/pug-test")
    index() {
        return this.view("pug-test.pug");
    }
}
```

## API

### `new PugEngine(options?: PugOptions)`

Interface `PugOptions` includes:

- `debug: boolean` If `true`, the tokens and function body are logged to 
    stdout.
- `compileDebug: boolean` If `true`, the function source will be included in 
    the compiled template for better error messages (default: `true`).
- `globals: string[]` Add a list of global names to make accessible in 
    templates.