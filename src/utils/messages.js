const generatedData=(username,text)=>{
    return {
        username,
        text,
        createdAt:new Date().getTime()
    }
}

const generatedLocation=(username,url)=>{
    return {
        username,
        url,
        createdAt:new Date().getTime()
    }
}

module.exports={
    generatedData,
    generatedLocation
}