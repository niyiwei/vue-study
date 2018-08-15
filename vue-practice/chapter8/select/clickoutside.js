Vue.directive('clickoutside', {
    bind: function (el, binding, vnode) {
        function documentHandler(e) {
            console.info(e)
            if (el.contains(e.target)) {
                if(e.type === 'keyup' && e.key === 'Escape'){
                    console.log('Escape 事件')
                }else{
                    return
                }
            }
            if (binding.expression) {
                binding.value(e)
            }
        }
        el.__vueClickoutside__ = documentHandler
        document.addEventListener('click', documentHandler)
        if(binding.modifiers.esc){
            el.onkeyup = documentHandler
        }
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