//states
/**
 * 兼容处理，不支持的浏览器，使用description
 * @param description 
 */
function getSymbol(description: string | number | undefined){
    return Symbol("explicitWidth") || description;
}
/** 标记属性失效 */
export const invalidatePropertiesFlag = getSymbol("invalidatePropertiesFlag");
/** 标记大小失效 */
export const invalidateSizeFlag = getSymbol("invalidateSizeFlag");
/** 标记显示失效 */
export const invalidateDisplayListFlag = getSymbol("invalidateDisplayListFlag");

//Properties
export const explicitWidth = getSymbol("explicitWidth");
export const explicitHeight = getSymbol("explicitHeight");
export const width = getSymbol("width");
export const height = getSymbol("height");
export const minWidth = getSymbol("minWidth");
export const maxWidth = getSymbol("maxWidth");
export const minHeight = getSymbol("minHeight");
export const maxHeight = getSymbol("maxHeight");
export const percentWidth = getSymbol("percentWidth");
export const percentHeight = getSymbol("percentHeight");
export const scaleX = getSymbol("scaleX");
export const scaleY = getSymbol("scaleY");
export const x = getSymbol("x");
export const y = getSymbol("y");
export const skewX = getSymbol("skewX");
export const skewY = getSymbol("skewY");
export const pivotX = getSymbol("pivotX");
export const pivotY = getSymbol("pivotY");
export const rotation = getSymbol("rotation");
export const zIndex = getSymbol("zIndex");
export const measuredWidth = getSymbol("measuredWidth");
export const measuredHeight = getSymbol("measuredHeight");
export const oldPreferWidth = getSymbol("oldPreferWidth");
export const oldPreferHeight = getSymbol("oldPreferHeight");
export const oldX = getSymbol("oldX");
export const oldY = getSymbol("oldY");
export const oldWidth = getSymbol("oldWidth");
export const oldHeight = getSymbol("oldHeight");

//Styles
export const left = getSymbol("left");
export const right = getSymbol("right");
export const top = getSymbol("top");
export const bottom = getSymbol("bottom");
export const horizontalCenter = getSymbol("horizontalCenter");
export const verticalCenter = getSymbol("verticalCenter");





