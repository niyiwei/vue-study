var app = new Vue({
    el: '#app',
    data: {
        timeNow: (new Date()).getTime(),
        timeBefore: 1534342381355-(1000*60*60*3)
    }
})