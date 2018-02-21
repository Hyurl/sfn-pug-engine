"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const pug = require("pug");
const sfn_1 = require("sfn");
class PugEngine extends sfn_1.TemplateEngine {
    renderFile(filename, vars = {}) {
        return new Promise((resolve, reject) => {
            let Class = this.constructor;
            if (Class._caches[filename] instanceof Function) {
                try {
                    resolve(Class._caches[filename](vars));
                }
                catch (err) {
                    reject(err);
                }
            }
            else {
                let options = Object.assign({ filename }, this.options);
                delete options.cache;
                delete options.encoding;
                fs.readFile(filename, this.options.encoding, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        try {
                            let compile = pug.compile(data, options);
                            Class._caches[filename] = compile;
                            resolve(compile(vars));
                        }
                        catch (err) {
                            reject(err);
                        }
                    }
                });
            }
        });
    }
}
PugEngine._caches = {};
exports.PugEngine = PugEngine;
//# sourceMappingURL=index.js.map