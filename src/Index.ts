const 值: unique symbol = Symbol()
const 类型: unique symbol = Symbol()
const 当前值: unique symbol = Symbol()
const 子节点: unique symbol = Symbol()
const 终结子: unique symbol = Symbol()
type 终结子 = typeof 终结子
const 起始子: unique symbol = Symbol()
type 起始子 = typeof 起始子
const 节点: unique symbol = Symbol()
type 节点 = typeof 节点
type 非空数组<T> = [T, ...T[]]

export type 字典树 = {
  [值]: 起始节点 | 终结节点 | 普通节点
}

type 起始节点 = {
  [类型]: 起始子
}
type 终结节点 = {
  [类型]: 终结子
}
type 普通节点 = {
  [类型]: 节点
  [当前值]: string
  [子节点]: 非空数组<普通节点 | 终结节点>
}

export function 创建字典树(): 字典树 {
  return { [值]: { [类型]: 起始子 } }
}
function 创建字典树节点(字符: string, 子节点对象: 非空数组<普通节点 | 终结节点>): 普通节点 {
  return {
    [类型]: 节点,
    [当前值]: 字符,
    [子节点]: 子节点对象,
  }
}
function 创建终结子(): 终结节点 {
  return {
    [类型]: 终结子,
  }
}

function 取值(a: 普通节点): string {
  return a[当前值]
}

function 查询字符(a: 普通节点, 字符: string): 普通节点 | null {
  var c = a[子节点].filter((a) => a[类型] != 终结子 && 取值(a) == 字符)
  if (c.length == 0) return null
  if (c[0][类型] == 终结子) throw new Error('意外的终结子')
  return c[0]
}

function 构造链(s: string): 普通节点 {
  if (s.length == 0) throw new Error('不能构造空链')
  var arr = s.split('').reverse()

  var r: 普通节点 | 终结节点 = 创建终结子()
  for (var a of arr) {
    r = 创建字典树节点(a, [r])
  }

  if (r[类型] == 终结子) throw new Error('意外的空链')

  return r
}

export function 插入字典树(a: 字典树, s: string): void {
  if (a[值][类型] == 终结子) throw new Error('不能对终结子插入字符')
  if (a[值][类型] == 起始子) {
    if (s.length == 0) throw new Error('不能对起始子插入空字符串')
    a[值] = 构造链(s)
    return
  }

  _插入字典树(a[值], s)
}

function _插入字典树(a: 普通节点, s: string): void {
  if (s.length == 0) return

  var 第一个字符 = s.substring(0, 1)
  var 剩下的字符串 = s.substring(1)

  var 新子节点 = 查询字符(a, 第一个字符)
  if (新子节点 == null) {
    新子节点 = 构造链(s)
    a[子节点].push(新子节点)
    return
  }

  _插入字典树(新子节点, 剩下的字符串)
}

function 直接含有终止子和普通节点(a: 普通节点): boolean {
  var c = a[子节点].filter((a) => a[类型] == 终结子)
  if (c.length != 0 && a[子节点].length != 1) return true
  return false
}
function 只含有终止子(a: 普通节点): boolean {
  if (a[子节点].length == 1 && a[子节点][0][类型] == 终结子) return true
  return false
}

function 枚举到终结子(a: 普通节点 | 终结节点): string[] {
  if (a[类型] == 终结子) return []
  if (只含有终止子(a)) return [a[当前值]]
  if (直接含有终止子和普通节点(a)) {
    return [
      a[当前值],
      ...a[子节点]
        .map(枚举到终结子)
        .flat()
        .map((x) => a[当前值] + x),
    ]
  }
  return a[子节点]
    .map(枚举到终结子)
    .flat()
    .map((x) => a[当前值] + x)
}

function _查询字典树(a: 普通节点, s: string, 累计字符串: string = ''): string[] {
  if (s.length == 0) return 枚举到终结子(a).map((x) => 累计字符串.substring(0, 累计字符串.length - 1) + x)

  var 第一个字符 = s.substring(0, 1)
  var 剩下的字符串 = s.substring(1)

  var 命中节点 = 查询字符(a, 第一个字符)
  if (命中节点 == null) return []
  return _查询字典树(命中节点, 剩下的字符串, 累计字符串 + 第一个字符)
}

export function 查询字典树(a: 字典树, s: string): string[] {
  if (s == '') throw new Error('不能查询空字符串')
  if (a[值][类型] == 终结子) throw new Error('不能对终结子查询')
  if (a[值][类型] == 起始子) return []
  return _查询字典树(a[值], s)
}
