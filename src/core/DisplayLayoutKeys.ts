//states
/**
 * 兼容处理，不支持的浏览器，使用description
 * @param description 
 */
function getSymbol(description: string | number | undefined){
    return Symbol(description) || description;
}
/** 标记属性失效 */
export const invalidatePropertiesFlag = getSymbol("invalidatePropertiesFlag");
/** 标记大小失效 */
export const invalidateSizeFlag = getSymbol("invalidateSizeFlag");
/** 标记显示失效 */
export const invalidateDisplayListFlag = getSymbol("invalidateDisplayListFlag");

//Properties
export const width = getSymbol("width");
export const height = getSymbol("height");
export const explicitWidth = getSymbol("explicitWidth");
export const explicitHeight = getSymbol("explicitHeight");
export const minWidth = getSymbol("minWidth");
export const maxWidth = getSymbol("maxWidth");
export const minHeight = getSymbol("minHeight");
export const maxHeight = getSymbol("maxHeight");
export const percentWidth = getSymbol("percentWidth");
export const percentHeight = getSymbol("percentHeight");
export const scaleX = getSymbol("scaleX");
export const scaleY = getSymbol("scaleY");
export const measuredWidth = getSymbol("measuredWidth");
export const measuredHeight = getSymbol("measuredHeight");
export const oldPreferWidth = getSymbol("oldPreferWidth");
export const oldPreferHeight = getSymbol("oldPreferHeight");
export const backgroundColor = getSymbol("backgroundColor");
export const oldBackgroundColor = getSymbol("oldBackgroundColor");

//Styles
export const left = getSymbol("left");
export const right = getSymbol("right");
export const top = getSymbol("top");
export const bottom = getSymbol("bottom");
export const horizontalCenter = getSymbol("horizontalCenter");
export const verticalCenter = getSymbol("verticalCenter");





