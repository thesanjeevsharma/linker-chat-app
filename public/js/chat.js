const socket = io.connect('http://localhost:4000');

const btn = document.getElementById('send');
const thread = document.getElementById('thread');
const name = document.getElementById('name');
const message = document.getElementById('message');
const feedback = document.getElementById('feedback');

message.addEventListener('keypress', (e) => {
    if(e.keyCode === 13){
        btn.click();
    }
    if(name.value){
        socket.emit('typing', name.value);        
    }
});

btn.addEventListener('click', (e) => {
    if(name.value && message.value){
        socket.emit('chat', {
            name : name.value,
            message : message.value
        });
        setTimeout(function(){thread.scrollTop = thread.scrollHeight;}, 100);
        message.value = "";
    } 
})

socket.on('chat', (data) => {
    // Timeout used because I'm listening for 'enter' key press event.
    setTimeout(function(){feedback.innerHTML = '';}, 100);
    thread.innerHTML += '<p><strong>' + data.name + '</strong> ' + data.message + '</p>';
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<em>' + data + ' is typing...</em>';
});