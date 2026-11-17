window.DeleteView = {
    name: 'DeleteView',

    setup() {
        const { t } = window.useI18n();

        const reason = Vue.ref('');

        const remove = async () => {
            try {
                await ElMessageBox.confirm(
                    t('delete.confirmText'),
                    t('delete.confirmTitle'),
                    {
                        type: 'warning',
                        confirmButtonText: t('common.confirm'),
                        cancelButtonText: t('common.cancel'),
                    }
                );
                ElMessage.success(t('delete.success'));
            } catch (error) {
                ElMessage.info(t('delete.cancelMsg'));
            }
        };

        return { t, reason, remove };
    },

    template: `
        <div class="form-panel">
            <el-input
                v-model="reason"
                class="mb16"
                type="textarea"
                :rows="5"
                maxlength="200"
                :placeholder="t('delete.placeholder')"
            />

            <el-button type="danger" plain @click="remove">
                {{ t('delete.action') }}
            </el-button>
        </div>
    `,
};
