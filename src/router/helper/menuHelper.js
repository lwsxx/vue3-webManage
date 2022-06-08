import { findPath } from '../../utils/helper/routeHelper'

export function getAllParentPath(treeData, path) {
  const menuList = findPath(treeData, (n) => n.name === path)
  return (menuList || []).map((item) => item.name)
}
