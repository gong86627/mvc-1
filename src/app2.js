import $ from 'jquery'
import './app2.css'

//添加选择对象
const $tab_bar = $('#app2 .tab-bar')
const $tab_content = $('#app2 .tab-content')

$tab_bar.on('click', 'li', e =>{
    const $li = $(e.currentTarget)
    $li.addClass('selected')
        .siblings()
        .removeClass('selected')

    const index = $li.index();

    $tab_content
        .children()
        .eq(index)
        .addClass('active')
        .siblings()
        .removeClass('active')
})