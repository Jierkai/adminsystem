export default {
  data() {
    const _this = this
    const checkRule = (prorety, text) => {
      let treeNodeID
      return (rules, val, callback) => {
        if (_this.formData.id) {
          treeNodeID = _this.formData.pid
        } else {
          treeNodeID = _this.treeNode.id ? _this.treeNode.id : ''
        }
        const isHave = _this.departs
          .filter(i => i.pid === treeNodeID && i.id !== _this.formData.id)
          .some(i => i[prorety] === val)
        if (isHave) {
          callback(new Error(text))
        } else {
          callback()
        }
      }
    }
    return {
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: ['blur', 'change'] },
          { validator: checkRule('name', '部门名称不可重复'), trigger: ['blur'] }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: ['blur', 'change'] },
          { validator: checkRule('code', '部门编码不可重复'), trigger: ['blur'] }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: ['blur', 'change'] }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: ['blur', 'change'] }
        ]
      }
    }
  }
}
