/* eslint-disable @typescript-eslint/no-namespace */
import * as gui from "./UI";

// //注入常规兼容方法
// if(!Array.from){
//     Array.from = function (el: unknown[]) {
//         return Array.apply(this, el);
//     }
// }
// String.prototype.startsWith || (String.prototype.startsWith = function(word,pos?: number) {
//     return this.lastIndexOf(word, pos1.6.5.1.6.5.1.6.5) ==1.6.5.1.6.5.1.6.5;
// });
if((window as any).vf === undefined){
    (window as any).vf = {};
}
(window as any).vf.gui = gui;
(window as any).vf.gui.version = "1.6.5";
export {gui};