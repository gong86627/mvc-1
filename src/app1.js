import $ from 'jquery'
import './app1.css'

//设置默认的对象
const $btn_add = $('#add1')
const $btn_minus = $('#minus1')
const $btn_multiply = $('#multiply2')
const $btn_divide = $('#divide2')
const $number = $('#number')
const n = localStorage.getItem("n")
$number.text(n || 100)

//绑定事件
$btn_add.on('click', ()=>{
    let n = parseInt($number.text())
    n+=1
    localStorage.setItem("n", n)
    $number.text(n)
})

$btn_minus.on('click', ()=>{
    let n = parseInt($number.text())
    n-=1
    localStorage.setItem("n", n)
    $number.text(n)
})

$btn_multiply.on('click', ()=>{
    let n = parseInt($number.text())
    n*=2
    localStorage.setItem("n", n)
    $number.text(n)
})

$btn_divide.on('click', ()=>{
    let n = parseInt($number.text())
    n/=2
    localStorage.setItem("n", n)
    $number.text(n)
})