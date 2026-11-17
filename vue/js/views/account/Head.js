window.AvatarView = {
    name: 'AvatarView',

    setup() {
        const { t } = window.useI18n();
        const store = window.userStore;

        const preview = Vue.ref(store.avatar);

        const onChange = (uploadFile) => {
            const raw = uploadFile.raw;
            if (!raw) return;

            if (!raw.type || raw.type.indexOf('image/') !== 0) {
                ElMessage.warning(t('avatar.notImage'));
                return;
            }
            if (raw.size > 2 * 1024 * 1024) {
                ElMessage.warning(t('avatar.tooLarge'));
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                preview.value = event.target.result;
            };
            reader.readAsDataURL(raw);
        };

        const save = () => {
            store.avatar = preview.value;
            ElMessage.success(t('avatar.success'));
        };

        return { t, store, preview, onChange, save };
    },

    template: `
        <div class="form-panel">
            <div class="avatar-row">
                <div class="avatar-box">
                    <span class="avatar-box__label">{{ t('avatar.preview') }}</span>
                    <el-avatar :size="96" :src="preview" />
                </div>

                <div class="avatar-actions">
                    <el-upload
                        :auto-upload="false"
                        :show-file-list="false"
                        accept="image/*"
                        :on-change="onChange"
                    >
                        <el-button type="primary" plain>{{ t('avatar.choose') }}</el-button>
                    </el-upload>

                    <el-button type="primary" @click="save">{{ t('avatar.save') }}</el-button>
                </div>
            </div>
        </div>
    `,
};
