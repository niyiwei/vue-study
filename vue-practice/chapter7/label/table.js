Vue.component("tabs", {
    template: '\
    <div class="tabs"> \
        <div class="tabs-bar"> \
            <div \
                :class="tabCls(item)" \
                v-for="(item,index) in navList" \
                @click="handleChange(index)" > \
                {{ item.label }} \
            </div> \
        </div> \
        <div class="tabs-content"> \
            <slot></slot> \
        </div> \
    </div>'
    , props: {
        value: [String, Number]
    }
    , data: function () {
        console.log(this.value)
        return {
            // 用于渲染tabs标题
            currentValue: this.value,
            navList: []
        }
    }, methods: {
        tabCls: function (item) {
            console.log("asdfs")
            return [
                'tabs-tab', {
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        handleChange: function (index) {
            var nav = this.navList[index]
            var name = nav.name
            // 改变当前选择的tab,并触发下面的 watch
            this.currentValue = name
            // 更新 value
            this.$emit('input', name)
            this.$emit('on-click', name)
        }
        , getTabs() {
            console.log("gettabs")
            // 通过遍历子组件，得到所有的pane组件
            return this.$children.filter(function (item) {
                return item.$options.name === 'pane'
            })
        }
        , updateNav() {
            console.log("updateNav")
            this.navList = []

            var _this = this
            this.getTabs().forEach(function (pane, index) {
                _this.navList.push({
                    label: pane.label
                    , name: pane.name || index
                })
                // 如果pane没有设置name,默认设置它的索引
                if (!pane.name) {
                    pane.name = index
                }
                // 设置当前选中的tab的索引
                if (index === 0) {
                    if (!_this.currentValue) {
                        _this.currentValue = pane.name || index
                    }
                }
            })
            this.updateStatus()
        }, updateStatus() {
            var tabs = this.getTabs()
            var _this = this
            tabs.forEach(function (tab) {
                return tab.show = tab.name === _this.currentValue
            })
        }
    }, watch: {
        value: function (val) {
            this.currentValue = val
        }
        , currentValue: function () {
            // 在当前选中的tab发生变化时， 更新pane的显示状态
            this.updateStatus()
        }
    }
})