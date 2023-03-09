module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f\ude80-\udeff]|[\u2600-\u2B55]|\w+)(?:\((.+)\))?:?\s(.*)/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    }
  },
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'update', // 更新
        'feat', // 添加新功能
        'fix', // 修复
        'refactor', // 重构
        'docs', // 添加文档或注释
        'chore', // 其他更新
        'style', // 样式调整以及代码美化
        'perf', // 代码优化
        'revert', // 撤销提交
        'test', // 测试代码
        'add', // 添加文件
        'remove', // 删除无用文件
        'merge', // 合并分支
        'create', // 创建模块/项目/其他
        'config', // 配置更新
        '🐞', // Bug 修复
        '💄', // 样式更新/less 变量更新
        '🆕', // 新增特性
        '🔥', // 极其值得关注的新增特性
        '🇺🇸🇨🇳🇬🇧', // 国际化改动，注意这里直接用对应国家/地区的旗帜。
        '📖', // 文档或网站改进
        '📝', // 文档或网站改进
        '✅', // 新增或更新测试用例
        '🛎', // 更新警告/提示信息
        '⌨️', // 可访问性增强
        '♿', // 可访问性增强
        '🗑', // 废弃或移除
        '🛠', // 重构或工具链优化
        '⚡️', // 性能提升
        '🚧', // 进行中的工作
        '🎉', // 初次提交
        '🚑', // 紧急修复
        '🔖', // 标签
        '✨', // 引入新特性
        '♻️', // 代码重构
        '📈', // 代码分析或者追踪代码
        '⬇️', // 降级依赖
        '⬆️', // 升级依赖
        '👷', // 更新CI相关
        '🔒️', // 修复安全问题
        '💩', // 优化代码
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 100],
  },
};
