<template>
    <div>
        <i-search-p :config="config"></i-search-p>
    </div>
</template>

<script>
    export default {
        name: "App",
        data() {
            return {
                config: [{
                    label: '标题',
                    type: 'input',
                    name: 'name',
                    defaultValue: '内容'
                }, {
                    label: "选项",
                    type: 'select',
                    name: "select",
                    defaultValue:'content',
                    options: [{
                        label: '内容',
                        value: 'content'
                    }]
                }],
            }
        }
    }
</script>

<style scoped>

</style>