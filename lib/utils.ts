/**
 * Merge class names together.
 * @param classes
 */
export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
