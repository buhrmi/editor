<template lang="pug">
  .browser_facade
    .favicon
    input.title(v-model='page.data.title')
</template>

<script lang="coffee">
module.exports =
  props: ['page']
  
</script>

<style media="screen" lang="less" scoped>

.browser_facade {
position:  relative;
// margin:  24px 0 0;
padding:  72px 16px 0px 16px;
box-shadow:  0px 5px 10px rgba(0,0,0,0.1);
font-family: sans-serif;
color:#454545;
border-radius:3px;
overflow:hidden;
opacity: 1;
transition: all 0.3s;
}

.favicon {
  position: absolute;
  top: 10px;
  left: 12px;
  width: 16px;
  height: 16px;
  background-color: #809892;
}

.title {
  position: absolute;
  top: 8px;
  left: 32px;
  border: none;
  background: none;
  // padding: 4px 12px;
  font-size: 15px;
  color: #666;
}

.browser_facade:before
{
	content:  "";
	position:  absolute;
	display:  block;
	top:  -1px;
	left:  -1px;
	right:  -1px;
	height:  72px;
	border-bottom:  1px solid rgba(0,0,0,0.05);
	border-radius:  3px 3px 0px 0px;	background:
      url('data:image/svg+xml;charset=utf-8,<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="minimal-browser-button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="Ellipse_1"><g><circle fill-rule="evenodd" clip-rule="evenodd" fill="%23B3B3B3" cx="8" cy="8" r="5"/></g></g></svg>') right 16px top 12px no-repeat,
			url('data:image/svg+xml;charset=utf-8,<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="minimal-browser-button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="Ellipse_1"><g><circle fill-rule="evenodd" clip-rule="evenodd" fill="%23B3B3B3" cx="8" cy="8" r="5"/></g></g></svg>') right 32px top 12px no-repeat,  
			url('data:image/svg+xml;charset=utf-8,<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="minimal-browser-button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="Ellipse_1"><g><circle fill-rule="evenodd" clip-rule="evenodd" fill="%23B3B3B3" cx="8" cy="8" r="5"/></g></g></svg>') right 48px top 12px no-repeat,  
			url('data:image/svg+xml;charset=utf-8,<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="minimal-browser-settings" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="Menu_icon"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="%23B3B3B3" d="M1,1v3h14V1H1z M1,10h14V7H1V10z M1,16h14v-3H1V16z"/></g></g></svg>')  right 16px top 42px no-repeat,
			#e8e8e8;
}

.browser_facade:after
{
	content:  attr(data-url);
	position:  absolute;
	padding:  2px 16px 0px 32px;
	top:  36px;
	height:  24px;
	left:  12px;
	right:  48px;
	border-radius:  3px;
	box-shadow:  inset 0 1px 1px -1px rgba(0,0,0,0.1);
	font-size:  12px;
	line-height:  24px;
	white-space:  nowrap;
	overflow:  hidden;
	text-overflow:  ellipsis;
	direction:  rtl;
	text-align:  left;
	background: url('data:image/svg+xml;charset=utf-8,<svg version="1.1" id="Refresh_icon_1_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="minimal-browser-refresh"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="%23B3B3B3" d="M12.5,10.9l2.5-3h-1.7C13.2,4.6,10.7,2,7.7,2C4.5,2,2,4.7,2,8c0,3.3,2.5,6,5.7,6c1.3,0,2.5-0.5,3.5-1.3l-1-1.1c-0.7,0.5-1.6,0.9-2.5,0.9c-2.3,0-4.2-2-4.2-4.5s1.9-4.5,4.2-4.5c2.3,0,4.2,1.9,4.2,4.4h-2L12.5,10.9z"/></g></g></svg>') 8px 6px no-repeat,
				#FFFFFF;
}
</style>
