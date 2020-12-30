const users=[];

const addUser=({id,username,room})=>{
    username=username.trim().toLowerCase();
    room=room.trim().toLowerCase();

    if(!username|| !room)
    {
        return {
            error:"Username and room are required"
        }
    }

    const existing_user=users.find((user)=>{
        return user.room===room&&user.username===username
    })

    if(existing_user)
    {
        return {
            error:"User already in the room!!!"
        }
    }

const user={
    id,
    username,
    room
}
users.push(user);
return {user}
}

const removeUser=(id)=>{
    const index=users.findIndex((user)=>{
        return user.id===id
    })

    if(index!=-1){
        return users.splice(index,1)[0]
    }
}

addUser({id:23,
username:"Abhinav",
room:"BIT"})

addUser({id:32,
    username:"Tiwary",
    room:"BIT"})

const getUser=(id)=>{
    for(let i=0;i<users.length;i++)
    {
        if(users[i].id===id)
        {
            return users[i];
        }
    }
}

const getUsersInRoom=(room)=>{
    return users.filter((user)=>user.room===room)
}



module.exports={
    addUser,
    getUser,
    removeUser,
    getUsersInRoom
}



