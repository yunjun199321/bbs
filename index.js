const submit = document.getElementById("submit");
const pl = document.getElementById("pl");

// 很重要 必须写，判断浏览器是否支持websocket
const createwebsocket = (() => {
 return (urlvalue) => {
  if (window.websocket) return new websocket(urlvalue);
  if (window.mozwebsocket) return new mozwebsocket(urlvalue);
  return false;
 }
})()

// // 实例化websoscket websocket有两种协议ws(不加密)和wss(加密)
// let websocket = createwebsocket(`ws://127.0.0.1:3000`);
// websocket.onopen = evt => {
//  addmsg(1, '你好，欢迎进入实时聊天室！')
// }
// websocket.onmessage = evt => {
//  // 这是服务端返回的数据
//  addmsg(1, evt.data);
//  submit.innerhtml = '发送';
// }
// input事件发送数据
// submit.onclick = (e) => {
//  if (e.target.innerhtml == '回复中...') {
//   return false
//  }
//  e.target.innerhtml = '回复中...';
//  const str = document.getelementbyid("pl").value;
//  websocket.send(str);
//  addmsg(2, str);
// }

// 添加消息
function addmsg(type, msg) {
 const li = document.createElement('li');
 // 1: Chatbot, 2: User
 if (type == 1) {
  li.classList.add('computer-say');
  li.innerHTML = `<span class="sayman">HKGPT</span><span class="computer say">${msg}</span>`;
 } else {
  li.classList.add('my-say');
  li.innerHTML = `<span class="computer say">${msg}</span><span class="sayman">Me</span>`;
  pl.value = '';
 }
 document.getElementById('view').appendChild(li);
 document.getElementById('ulview').scrollTo(0, document.getElementById('view').clientHeight);
}

// Create websocket connection.
const socket = new WebSocket('ws://localhost:3000');
// socket.onopen = evt => {
//  addmsg(1, '你好，欢迎进入实时聊天室！')
// }

socket.onmessage = evt => {
    // 这是服务端返回的数据
    addmsg(1, evt.data);
    submit.innerHTML = '发送';
   }
   // input事件发送数据
   submit.onclick = (e) => {
    if (e.target.innerHTML == '回复中...') {
     return false
    }
    e.target.innerHTML = '回复中...';
    const str = document.getElementById("pl").value;
    socket.send(str);
    addmsg(2, str);
   }

// Connection opened
socket.addEventListener('open', function (event) {
    console.log('Connected to WS server');
});

// Listen for message
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

// Send message to server
const sendMessage = () => {
    socket.send('Hello from Client!');
}

// Listen to Enter key press event
function keyenter() {
    if (event.key === "Enter") {
        event.preventDefault();
        submit.click();
        pl.value = '';
    }
}