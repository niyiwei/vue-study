var app = new Vue({
    el: '#app',
    data: {
        list: [{
            id: 1,
            name: 'iPhone 7',
            price: 6188,
            count: 1,
            checked: false
        }, {
            id: 2,
            name: 'iPad Pro',
            price: 5888,
            count: 1,
            checked: true
        }, {
            id: 3,
            name: 'MacBook Pro',
            price: 21000,
            count: 1,
            checked: false
        }]
    },
    computed: {
        totalPrice: function () {
            var total = 0;
            var item = null;
            for (var i = 0; i < this.list.length; i++) {
                item = this.list[i];
                if (item.checked) {
                    total += item.price * item.count;
                }
            }
            return total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
        },
        isAllChecked: function () {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].checked === false) {
                    return false;
                }
            }
            return true;
        }
    },
    methods: {
        handleReduce: function (index) {
            if (this.list[index].count > 1) {
                this.list[index].count--;
            }
        },
        handleAdd: function (index) {
            this.list[index].count++;
        },
        handleRemove: function (index) {
            this.list.splice(index, 1);
        },
        checkedShop: function (index) {
            this.list[index].checked = !this.list[index].checked;
        },
        checkAll: function () {
            var checked = true;
            // 判断当前是否全选,全选则把所有的取消选中
            if (this.isAllChecked) {
                checked = false;
            }
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].checked = checked;
            }
        }
    }
})