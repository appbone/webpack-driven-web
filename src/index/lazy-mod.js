import $ from 'jquery';

// 懒加载模块的样式可以作为一个 style 元素动态的添加到页面中
import './lazy-mod.css';

$('.container--sticky-footer').append('<div class="lazy-mod">lazy-mod.js 中的样式</div>');

// 通过 Code Splitting 赖加载的模块
export default 'lazy-mod.js';