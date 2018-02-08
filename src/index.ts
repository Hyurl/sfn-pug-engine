import * as fs from "fs";
import * as pug from "pug";
import { TemplateEngine, TemplateOptions } from "sfn";

export interface PugOptions extends TemplateOptions {
    /** If `true`, the tokens and function body are logged to stdout. */
    debug?: boolean;
    /**
     * If `true`, the function source will be included in the compiled 
     * template for better error messages (default: `true`).
     */
    compileDebug?: boolean;
    /** Add a list of global names to make accessible in templates. */
    globals?: string[];
}

export class PugEngine extends TemplateEngine {
    options: PugOptions;
    private static _caches: { [filename: string]: Function } = {};

    renderFile(filename: string, vars: { [name: string]: any } = {}): Promise<string> {
        return new Promise((resolve, reject) => {
            let Class = <typeof PugEngine>this.constructor;
            if (Class._caches[filename] instanceof Function) {
                try {
                    resolve(Class._caches[filename](vars));
                } catch (err) {
                    reject(err);
                }
            } else {
                let options = Object.assign({}, this.options);
                delete options.cache;
                delete options.encoding;

                fs.readFile(filename, this.options.encoding, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        Class._caches[filename] = pug.compile(data, options);
                        try {
                            resolve(Class._caches[filename](vars));
                        } catch (err) {
                            reject(err);
                        }
                    }
                });
            }
        });
    }
}