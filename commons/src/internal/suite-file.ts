/**
 * Minimal structural shape compatible with both Mocha's `Suite` and
 * Cypress's runner `Suite`.
 */
export interface FileSuiteNode {
  file?: string;
  parent?: FileSuiteNode;
}

/**
 * Walks up `node.parent` until a node with a non-empty `file` property is
 * reached. Returns the file path, or undefined if no ancestor has one.
 */
export function getFile(node: FileSuiteNode): string | undefined {
  if (node.file) {
    return node.file;
  }
  if (node.parent) {
    return getFile(node.parent);
  }
  return undefined;
}
