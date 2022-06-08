import theme from './theme'
import { getThemeVariables } from 'ant-design-vue/dist/theme'
export function generateModifyVars(dark = false) {
  const modifyVars = getThemeVariables({ dark })
  return {
    ...modifyVars,
    'primary-color': theme.primaryColor,
    'info-color': theme.primaryColor,
    'processing-color': theme.primaryColor,
    'success-color': '#55D187', //  Success color
    'error-color': '#ED6F6F', //  False color
    'warning-color': '#EFBD47', //   Warning color
    'font-size-base': '14px', //  Main font size
    'border-radius-base': '2px', //  Component/float fillet
    'link-color': theme.primaryColor, //   Link color
    'app-content-background': '#fafafa', //   Link color
  }
}
