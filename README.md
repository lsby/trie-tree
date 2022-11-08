# trie-tree

一个 ts 实现的字典树.

## 使用

```
npm i @lsby/trie-tree
```

```typescript
import { 创建字典树, 插入字典树, 查询字典树 } from '@lsby/trie-tree'

var obj = 创建字典树()
插入字典树(obj, 'ni')
插入字典树(obj, 'ni1')
插入字典树(obj, 'ni2')
插入字典树(obj, 'ni3')
插入字典树(obj, 'ni45')
var c = 查询字典树(obj, 'ni') // ['ni1', 'ni2', 'ni3', 'ni45']
```

```typescript
import { 创建字典树, 插入字典树, 查询字典树 } from '@lsby/trie-tree'

var obj = 创建字典树()
插入字典树(obj, 'n')
插入字典树(obj, 'ni')
插入字典树(obj, 'nih')
插入字典树(obj, 'niha')
插入字典树(obj, 'nihao')
var c = 查询字典树(obj, 'ni') // ['ni', 'nih', 'niha', 'nihao']
```
