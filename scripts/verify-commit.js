/**项目commit格式校验 */
const msgPath = process.env.HUSKY_GIT_PARAMS
const commitMsg = require('fs').readFileSync(msgPath, 'utf-8').trim()
const commitREG = /^(feat|fix|docs|style|refactor|perf|test|workflow)(\(.+\))?:.{1,50}/
// feat: 新功能、新特性
// fix: 修改 bug
// perf: 更改代码，以提高性能
// refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
// docs: 文档修改
// style: 代码格式修改, 注意不是 css 修改（例如分号修改）
// test: 测试用例新增、修改
// revert: 恢复上一次提交
// ci: 持续集成相关文件修改
// chore: 其他修改（不在上述类型中的修改）
// release: 发布新版本
// workflow: 工作流相关文件修改
if (!commitREG.test(commitMsg)) {
  console.error(`
        commit 消息格式错误，请到根目录script/verify-commit 下查看具体提交格式。
    `)
  process.exit(1)
}
