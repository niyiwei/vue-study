function isValueNumber(value) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '')
}
Vue.component('input-number', {
    template: '\
    <div class="input-number"> \
        <input \
            type="text" \
            :value="currentValue" \
            @change="handleChange"> \
        <button \
            @click="handleDown" \
            :disable="currentValue <= min">-</button> \
        <button \
            @click="handleUp" \
            @disable="currentValue >= max">+</button>\
    </div>',
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data: function () {
        return {
            // Vue 组件时单向数据流，所以无法从组件内部直接修改 prop value的值
            // 解决办法就是给组件声明一个data，默认引用value的值，然后在组件内部维护这个值
            currentValue: this.value
            // 只解决了初始化时引用父组件value的问题，如果父组件修改了value， input-number组件 currentValue也要一起更新。
            // 使用监听（watch）。watch选项用来监听某个prop或data的改变，当它们发生变化时，就会触发 watch配置的函数，从而完成我们的业务逻辑
        }
    },
    watch: {
        currentValue: function (val) {
            this.$emit('input', val)
            this.$emit('on-change', val)
        },
        value: function (val) {
            this.updateValue(val)
        }
    },
    methods: {
        updateValue: function (val) {
            console.log(arguments.length, arguments)
            // 过滤正确的 currentValue
            if (val > this.max) {
                val = this.max
            }
            if (val < this.min) {
                val = this.min
            }
            this.currentValue = val
        },
        handleDown: function () {
            if (this.currentValue <= this.min) {
                return
            }
            this.currentValue -= 1
        },
        handleUp: function () {
            if (this.currentValue >= this.max) {
                return;
            }
            this.currentValue += 1
        },
        handleChange: function (event) {
            var val = event.target.value.trim()
            var max = this.max
            var min = this.min
            if (isValueNumber(val)) {
                val = Number(val)
                this.currentValue = val

                if (val > max) {
                    this.currentValue = max
                } else if (val < min) {
                    this.currentValue = min
                }
            } else {
                event.target.value = this.currentValue
            }
        }
    },
    mounted: function () {
        // 初始化时过滤一遍 currentValue的值
        this.updateValue(this.value)
    }
})