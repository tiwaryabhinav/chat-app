const socket=io()

const messages=document.getElementById('messages');
const location_template=document.getElementById('location-template').innerHTML;

const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true})

const autoscroll=()=>{
    const newMsg=messages.lastElementChild;
    const newMsgStyles=getComputedStyle(newMsg);
    const newMsgMargin=parseInt(newMsgStyles.marginBottom)
    const newMsgHeight=newMsg.offsetHeight+newMsgMargin;

    //visible height
    const visibleHeight=messages.offsetHeight;

    //container height
    const containerHeight=messages.scrollHeight;

    const scrollOffset=messages.scrollTop+visibleHeight;
    if(containerHeight-newMsgHeight<=scrollOffset){
        messages.scrollTop=messages.scrollHeight
    }

}


socket.on('locationMessage',(url)=>{
    console.log(url);
    const html=Mustache.render(location_template,{
        username:url.username,
        url:url.url,
        createdAt:moment(url.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend',html)
})


const msg_template=document.getElementById('message-template').innerHTML;


socket.on('message',(msg)=>{
    //console.log(msg);
    const html=Mustache.render(msg_template,{
        username:msg.username,
        msg:msg.text,
        createdAt:moment(msg.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend',html);
    autoscroll();
})


const sidebar_template=document.getElementById('sidebar-template').innerHTML;

socket.on('roomData',({room,users})=>{
    const html=Mustache.render(sidebar_template,{
        room,
        users
    })
    document.getElementById('sidebar').innerHTML=html;
})


const form_btn=document.getElementById('form-btn');
const send=document.getElementById('msg_send');
send.addEventListener('submit',(e)=>{
    e.preventDefault();

    form_btn.setAttribute('disabled','disabled');
    
    const msg=e.target.elements.message_typed.value;
    console.log(msg);
    socket.emit('sendMessage',msg,(error)=>{

        form_btn.removeAttribute('disabled');
        e.target.elements.message_typed.value='';
        e.target.elements.message_typed.focus();

        if(error)
        {
            return console.log(error);
        }
        console.log('delivered');
    })
})


document.getElementById('send-location').addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser');
    }

    
    const location_btn=document.getElementById('send-location');
    location_btn.setAttribute('disabled','disabled');
    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('sendLocation',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        },()=>{
            location_btn.removeAttribute('disabled');
            console.log('Location Shared!!!')
        })
    })
    autoscroll();
})


socket.emit('join',{username,room},(error)=>{
    if(error)
    {
        alert(error)
        location.href='/'
    }
})