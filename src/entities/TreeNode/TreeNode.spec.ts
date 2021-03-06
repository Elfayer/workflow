import TreeNode, { NoSuchElementException } from './TreeNode'
import TreeTransformer from '../../TreeTransformer'

describe('TreeNode', () => {
  describe('hasParents()', () => {
    it('should return false if node has no parents', () => {
      const node = new TreeNode()

      expect(node.hasParents()).toBe(false)
    })

    it('should return true if node has parents', () => {
      const node = new TreeNode({
        parents: [new TreeNode()],
      })

      expect(node.hasParents()).toBe(true)
    })
  })

  describe('hasChildren()', () => {
    it('should return false if node has no children', () => {
      const node = new TreeNode()

      expect(node.hasChildren()).toBe(false)
    })

    it('should return true if node has children', () => {
      const node = new TreeNode({
        children: [new TreeNode()],
      })

      expect(node.hasChildren()).toBe(true)
    })
  })

  describe('firstChild()', () => {
    it('should throw NoSuchElementException if it has 0 children', () => {
      const node = new TreeNode()

      expect(() => {
        node.firstChild()
      }).toThrowError(NoSuchElementException)
    })

    it('should return the first TreeNode reference if it has 2 children', () => {
      const root = new TreeNode()
      const firstChild = new TreeNode()
      const lastChild = new TreeNode()

      root.children = [firstChild, lastChild]

      expect(root.firstChild()).toBe(firstChild)
    })
  })

  describe('lastChild()', () => {
    it('should throw NoSuchElementException if it has 0 children', () => {
      const node = new TreeNode()

      expect(() => {
        node.lastChild()
      }).toThrowError(NoSuchElementException)
    })

    it('should return the last TreeNode reference if it has 2 children', () => {
      const root = new TreeNode()
      const firstChild = new TreeNode()
      const lastChild = new TreeNode()

      root.children = [firstChild, lastChild]

      expect(root.lastChild()).toBe(lastChild)
    })
  })

  describe('firstParent()', () => {
    it('should throw NoSuchElementException if it has 0 parent', () => {
      const node = new TreeNode()

      expect(() => {
        node.firstParent()
      }).toThrowError(NoSuchElementException)
    })

    it('should return the first TreeNode reference if it has 2 parents', () => {
      const root = new TreeNode()
      const firstParent = new TreeNode()
      const lastParent = new TreeNode()

      root.parents = [firstParent, lastParent]

      expect(root.firstParent()).toBe(firstParent)
    })
  })

  describe('lastParent()', () => {
    it('should throw NoSuchElementException if it has 0 parent', () => {
      const node = new TreeNode()

      expect(() => {
        node.lastParent()
      }).toThrowError(NoSuchElementException)
    })

    it('should return the last TreeNode reference if it has 2 parents', () => {
      const root = new TreeNode()
      const firstParent = new TreeNode()
      const lastParent = new TreeNode()

      root.parents = [firstParent, lastParent]

      expect(root.lastParent()).toBe(lastParent)
    })
  })

  describe('siblings()', () => {
    it('should return itself if it has 0 parent', () => {
      const node = new TreeNode()

      expect(node.siblings()[0]).toBe(node)
    })

    it('should return 2 siblings if node has 1 parent with 2 children', () => {
      const root = TreeTransformer.mapToTree({
        0: [1, 2],
      })

      expect(root.firstChild().siblings().length).toBe(2)
    })

    it('should return 3 siblings if node has 2 parent with 2 children each', () => {
      const root = TreeTransformer.mapToTree({
        0: [1, 2],
        1: [3, 4],
        2: [4, 5],
      })

      expect(root.lastChild().firstChild().siblings().length).toBe(3)
    })
  })

  describe('siblingsIndex()', () => {
    it('should return 0 if node is the only sibling', () => {
      const node = new TreeNode()

      expect(node.siblingsIndex()).toBe(0)
    })

    it('should return 0 if node is the first sibling', () => {
      const root = TreeTransformer.mapToTree({
        0: [1, 2],
      })

      expect(root.firstChild().siblingsIndex()).toBe(0)
    })

    it('should return 1 if node is the second sibling', () => {
      const root = TreeTransformer.mapToTree({
        0: [1, 2],
      })

      expect(root.lastChild().siblingsIndex()).toBe(1)
    })
  })

  describe('siblingsWeight()', () => {
    it('should return 2 if total children weight is 2 while having a total of 2 siblings', () => {
      const root = TreeTransformer.mapToTree({
        0: [1, 2],
        1: [4, 5],
        2: [4, 5],
      })
      expect(root.firstChild().siblingsWeight()).toBe(2)
    })

    it('should return 2 if total parents weight is 2 while having a total of 2 siblings', () => {
      const root = TreeTransformer.mapToTree({
        0: [1, 2],
        1: [4, 5],
        2: [4, 5],
      })
      expect(root.firstChild().firstChild().siblingsWeight()).toBe(2)
    })
  })
})
