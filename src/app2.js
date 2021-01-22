import $ from 'jquery'
import './app2.css'

const eventBus = $(window)
const localKey = 'app2.index'

const m = {
    data: {
        index: parseInt(localStorage.getItem(localKey)) || 0
    },
    create() {
    },
    delete() {
    },
    update: function (data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:update')
        localStorage.setItem(localKey, m.data.index)
    },
    get() {
    }
}

const v = {
    el: null,
    html:(index)=>{
        return `
        <div>
            <ol class="tab-bar">
                <li data-index="0" class="${index === 0 ? 'selected' : ''}"><span>标题1</span></li>
                <li data-index="1" class="${index === 1 ? 'selected' : ''}"><span>标题2</span></li>
            </ol>
            <ol class="tab-content">
                <li class="${index === 0 ? 'active' : ''}">内容1</li>
                <li class="${index === 1 ? 'active' : ''}">内容2</li>
            </ol>
        </div>
        `
    } ,
    init (container) {
        v.el = $(container)
    },
    render(index){
        if(v.el.children.length !== 0) v.el.empty()
        $(v.html(index)).appendTo(v.el)
    }
}

const c = {
    init(container){
        v.init(container)
        v.render(m.data.index)
        c.autoBindEvents()
        eventBus.on('m:update', ()=>{
            v.render(m.data.index)
        })
    },
    events:{
        'click .tab-bar li' : 'x'
    },
    x(e){
        const index = parseInt(e.currentTarget.dataset.index)
        m.update({index: index})
    },
    autoBindEvents(){
        for(let key in c.events){
            const value = c[c.events[key]]
            const spaceIndex = key.indexOf(' ')
            const event_opt = key.slice(0, spaceIndex)
            const event_med = key.slice(spaceIndex + 1)
            v.el.on(event_opt, event_med, value)
        }
    }
}

export default c