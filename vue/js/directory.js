window.ElMessage = ElementPlus.ElMessage;
window.ElMessageBox = ElementPlus.ElMessageBox;

window.I18N = {
    zh: {
        /* 通用 */
        'common.cancel': '取消',
        'common.confirm': '确定',
        'common.saved': '保存成功',

        /* 顶栏 */
        'top.school': '重庆理工大学（学生）',
        'top.invite': '输入邀请码',
        'top.logout': '退出登录',
        'top.switch': '切换账号',

        /* 左侧导航 */
        'nav.home': '首页',
        'nav.common': '常用',
        'nav.app': '应用中心',
        'nav.course': '课程',
        'nav.major': '微专业报名',
        'nav.note': '笔记',
        'nav.message': '消息',
        'nav.group': '小组',
        'nav.cloud': '云盘',
        'nav.contact': '通讯录',

        /* 账号管理 */
        'account.title': '账号管理',
        'account.profile': '基本资料',
        'account.avatar': '修改头像',
        'account.password': '密码管理',
        'account.delete': '注销账号',
        'account.language': '语言',


        /* 基本资料 */
        'profile.name': '姓名',
        'profile.id': 'ID',
        'profile.gender': '性别',
        'profile.male': '男',
        'profile.female': '女',
        'profile.phone': '手机号',
        'profile.company': '单位',
        'profile.addCompany': '+ 添加单位',
        'profile.studentId': '学号/工号',
        'profile.required': '这一项不能为空',

        /* 修改头像 */
        'avatar.choose': '选择本地图片',
        'avatar.save': '保存头像',
        'avatar.preview': '预览',
        'avatar.success': '头像已同步到顶部和左侧',
        'avatar.notImage': '请选择图片文件',
        'avatar.tooLarge': '图片不要超过 2MB',

        /* 密码管理 */
        'password.old': '旧密码',
        'password.new': '新密码',
        'password.confirm': '确认新密码',
        'password.forget': '忘记密码？',
        'password.required': '请输入密码',
        'password.tooShort': '密码至少 6 位',
        'password.sameAsOld': '新旧密码不能一致',
        'password.notMatch': '两次输入的新密码不一致',
        'password.success': '密码修改成功（演示环境，未接后端）',
        'password.input': '请输入',

        /* 忘记密码 */
        'forget.phone': '手机号',
        'forget.code': '验证码',
        'forget.getCode': '获取验证码',
        'forget.newPwd': '新密码',
        'forget.success': '密码已重置（演示环境）',
        'forget.phoneRule': '请输入 11 位手机号',

        /* 注销账号 */
        'delete.action': '注销 / 解绑',
        'delete.placeholder': '请叙述注销 / 解绑账号的原因…',
        'delete.confirmTitle': '二次确认',
        'delete.confirmText': '确定要解绑账号吗？解绑之后，操作不可恢复！',
        'delete.success': '账号解绑成功',
        'delete.cancelMsg': '已取消解绑操作',

        /* 语言 */
        'language.cn': '中文',
        'language.en': 'English',
    },

    en: {
        'common.cancel': 'Cancel',
        'common.confirm': 'Confirm',
        'common.saved': 'Saved',

        'top.school': 'Chongqing University of Technology (Student)',
        'top.invite': 'Enter invite code',
        'top.logout': 'Sign out',
        'top.switch': 'Switch account',

        'nav.home': 'Home',
        'nav.common': 'Favorites',
        'nav.app': 'App Center',
        'nav.course': 'Courses',
        'nav.major': 'Micro Major',
        'nav.note': 'Notes',
        'nav.message': 'Messages',
        'nav.group': 'Groups',
        'nav.cloud': 'Cloud Drive',
        'nav.contact': 'Contacts',

        'account.title': 'Account Settings',
        'account.profile': 'Profile',
        'account.avatar': 'Avatar',
        'account.password': 'Password',
        'account.delete': 'Delete Account',
        'account.language': 'Language',

        'profile.name': 'Name',
        'profile.id': 'ID',
        'profile.gender': 'Gender',
        'profile.male': 'Male',
        'profile.female': 'Female',
        'profile.phone': 'Phone',
        'profile.company': 'Company',
        'profile.addCompany': '+ Add company',
        'profile.studentId': 'Student/Staff No.',
        'profile.required': 'This field is required',

        'avatar.choose': 'Choose local image',
        'avatar.save': 'Save avatar',
        'avatar.preview': 'Preview',
        'avatar.success': 'Avatar synced to top bar and sidebar',
        'avatar.notImage': 'Please choose an image file',
        'avatar.tooLarge': 'Image must be smaller than 2MB',

        'password.old': 'Old password',
        'password.new': 'New password',
        'password.confirm': 'Confirm password',
        'password.forget': 'Forgot password?',
        'password.required': 'Password is required',
        'password.tooShort': 'At least 6 characters',
        'password.sameAsOld': 'New password must differ from the old one',
        'password.notMatch': 'The two passwords do not match',
        'password.success': 'Password updated (demo only, no backend)',
        'password.input': 'Please enter',

        'forget.phone': 'Phone',
        'forget.code': 'Code',
        'forget.getCode': 'Send code',
        'forget.newPwd': 'New password',
        'forget.tip': 'No SMS provider in this demo — any 4 digits will do.',
        'forget.success': 'Password reset (demo only)',
        'forget.phoneRule': 'Please enter an 11-digit phone number',

        'delete.action': 'Delete / Unbind',
        'delete.placeholder': 'Tell us why you want to delete / unbind this account…',
        'delete.confirmTitle': 'Please confirm',
        'delete.confirmText': 'Delete this account? This action cannot be undone!',
        'delete.success': 'Account deleted',
        'delete.cancelMsg': 'Deletion cancelled',

        'language.cn': 'Chinese',
        'language.en': 'English',
    },
};


window.useI18n = function () {
    const appStore = window.appStore;

    const t = (key) => {
        const table = window.I18N[appStore.locale] || window.I18N.zh;
        if (table[key] !== undefined) return table[key];
        if (window.I18N.zh[key] !== undefined) return window.I18N.zh[key];
        return key;
    };

    return { t };
};
