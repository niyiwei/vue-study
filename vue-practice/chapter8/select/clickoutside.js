Vue.directive('clickoutside', {
    bind: function (el, binding, vnode) {
        function documentHandler(e) {
            console.log(binding.value)
            console.log(binding.expression)
            if (el.contains(e.target)) {
                return false
            }
            if (binding.expression) {
                binding.value(e)
            }
        }
        el.__vueClickoutside__ = documentHandler
        document.addEventListener('click', documentHandler)
    },
    update: function (el, binding, vnode) {
        console.log("update----")
        console.log(el)
        // binding.expression('xxx')
        // console.log(binding.expression)
    },
    unbind: function (el, binding) {
        document.removeEventListener('click', el.__vueClickoutside__)
        delete el.__vueClickoutside__
    }
})