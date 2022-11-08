import 'mocha'
import { 创建字典树, 插入字典树, 查询字典树 } from '../src/Index'

function 断言相等(a: any, b: any) {
  if (JSON.stringify(a) == JSON.stringify(b)) return
  throw new Error(`${JSON.stringify(a)} 不等于 ${JSON.stringify(b)}`)
}

it('测试', function () {
  var obj = 创建字典树()
  插入字典树(obj, 'ni')
  插入字典树(obj, 'ni1')
  插入字典树(obj, 'ni2')
  插入字典树(obj, 'ni3')
  插入字典树(obj, 'ni45')
  var c = 查询字典树(obj, 'ni')
  断言相等(c, ['ni1', 'ni2', 'ni3', 'ni45'])

  var obj = 创建字典树()
  插入字典树(obj, 'n')
  插入字典树(obj, 'ni')
  插入字典树(obj, 'nih')
  插入字典树(obj, 'niha')
  插入字典树(obj, 'nihao')
  var c = 查询字典树(obj, 'ni')
  断言相等(c, ['ni', 'nih', 'niha', 'nihao'])
})
