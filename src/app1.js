import $ from 'jquery'
import './app1.css'

const eventBus = $(window)

//model 数据层
const m = {
    data: {
        n: parseInt(localStorage.getItem('n')) || 100
    },
    create() {
    },
    delete() {
    },
    update: function (data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:update')
        localStorage.setItem('n', m.data.n)
    },
    get() {
    }
}

//view 视图层
const v = {
    el: null,
    html: `
    <div>
        <div class="output">
            <span id="number">{{n}}</span>
        </div>
        <div class="actions">
            <button id="add1">+1</button>
            <button id="minus1">-1</button>
            <button id="multiply2">*2</button>
            <button id="divide2">÷2</button>
        </div>
    </div>    
    `,
    init(container) {
        v.el = $(container)
    },
    render(n) {
        if (v.el.children.length !== 0) v.el.empty()
        $(v.html.replace('{{n}}', n))
            .appendTo(v.el)
    }
}

//controller 控制层
const c = {
    init(container) {
        v.init(container)
        v.render(m.data.n)
        c.autoBindEvents()
        eventBus.on('m:update', ()=>{
            v.render(m.data.n)
        })
    },
    events: {
        'click #add1': 'add',
        'click #minus1': 'minus',
        'click #multiply2': 'mul',
        'click #divide2': 'div',
    },
    add() {
        m.update({'n': m.data.n + 1})
    },
    minus() {
        m.update({'n': m.data.n - 1})
    },
    mul() {
        m.update({'n': m.data.n * 2})
    },
    div() {
        m.update({'n': m.data.n / 2})
    },
    autoBindEvents() {
        for (let key in c.events) {
            const value = c[c.events[key]]
            const spaceIndex = key.indexOf(' ')
            const event_opt = key.slice(0, spaceIndex)
            const event_med = key.slice(spaceIndex + 1)
            v.el.on(event_opt, event_med, value)
        }
    }
}

export default c