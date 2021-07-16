//ALL THE LOGIC OF THE project HAS BEEN WRITEEN IN THIS FILE AND THE LOGIC WILL BE SPREAD IN EACH COMPONENT FORM HERE LIKE LOGICS OF SOCKET.IO VIDEO AND AUDIO TRASMISSION REACT FUNCTIONALITY ETC 

import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext(); 
const socket = io('http://localhost:5000/');//deployment server link  heroku but for now localhost untill deployment 

//transfer the data from big component in wrapping provider
const ContextProvider = ({ children }) =>{
//for callUser
const [stream,setStream] =  useState(null);
const [me,setMe]         =  useState('');
const [call,setCall]     =  useState({}); 

//for answercall
const [callAccepted,setCallAccepted] = useState(false);
const [callEnded,setCallEnded] = useState(false); 
const [name,setName] = useState('');



//but currentstream se mai dikhunga par i want k jaise hee yes kare screen automatically populate ho uske liye will use 
const myVideo    = useRef(); //populate the another person screen 
const userVideo  = useRef(); //populate our own screen 
const connectionRef = useRef();//to setu a connection between both the peoples


//jaise hee user call pick karenga usko notification ayenga k audio and video on karn ahai kuy aaur voh jaise hee yes karenga mai usko dikhunga creentstream se 
useEffect(()=>{//now will use useEffect to get the user audio and video 
 navigator.mediaDevices.getUserMedia({ video:true, audio:true })
 .then((currentStream)=>{//set the stream to currentstream 
     setStream(currentStream);

     myVideo.current.srcObject = currentStream; //jaise hee allow karenga audio video screen populate hongi uski with src object 
   })
   socket.on('me' , (id) => setMe(id));//in backend we make the id ('me') we will emit the id me for the backednd and get iton the frontend side 

   socket.on('callUser' , ({from, name:callerName, signal}) =>{//on --> listen to the id which is been emitted from the backend side i want to display name of the user and the signal 
 
   setCall({ isReceivingCall:true,from,name:callerName , signal })
});
// {/*call uthate sahi notification ayenga k audio video on karna hai ky --> UseEffect
// for the currentstream i use useState but notsufficent to immediate popup screen i used --> useRef*/}
} , []);//otherwise it will run infinitely 


//usne meko call kia miane uska call uthya --> answercall
  const  answerCall = () =>{
    setCallAccepted(true);
    //peer.js is used to set a connection between both the parties  
    const peer = new Peer({ initiator:false,trickle:false,stream});//initiatior & tickle is false because we are reciving a call and stream is used beacuse in callUser we use the usestate to provide the stream which is the currentstream
    
    peer.on('signal',(data)=>{
      socket.emit('answerCall' , {signal:data , to:call.from}); //emit the information from whom the call is coming what is the strength of the signal.
    });
    peer.on('stream' , (currentStream) =>{
     userVideo.current.srcObject = currentStream; //jaise hee allow karenga audio video screen populate hongi meri usko  with src object 
    });

    peer.signal(call.signal)//what is the bandwith of the signal
    connectionRef.current = peer;//this is the third ref use to set up a coonection between both the screens  
  }
//maine usko call kia usne mera call uthaya --> calluser 
  const callUser = (id) =>{
    const peer = new Peer({ initiator:true,trickle:false,stream});//initiatior true because we are making a call and stream is used beacuse in callUser we use the usestate to provide the stream which is the currentstream
   
    peer.on('signal',(data)=>{
      socket.emit('callUser' , {userToCall:id,signalData:data, from:me , name});//emit the information that i am calling fromfrom here and  strength of the signal.
    });
    peer.on('stream' , (currentStream) =>{
     userVideo.current.srcObject = currentStream; //jaise hee allow karenga audio video screen populate hongi meri usko  with src object 
    });

    socket.on('callAccepted',(signal)=>{
      setCallAccepted(true);
      peer.signal(signal);
    })
    connectionRef.current = peer;//this is the third ref use to set up a coonection between both the screens 
  }
//dono ne ek dusre ka kata   --> leaveCall
  const leaveCall = () =>{
setCallEnded(true);//because we ended the call
connectionRef.current.destroy();//this means destroy the audio and the video connection PARMANENTLY BETWEEN BOTH THE PARTIES
window.location.reload();//reload the page and provide the user with new id for the new connection after clicking in copy to clipboard

  }


  //returning the logic to use it in the components 
return(
  <SocketContext.Provider value={{
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall
  }}
  >
    {children}
  </SocketContext.Provider>
);

};

export {ContextProvider , SocketContext};//exporting the logics in context provider and socket context tooo


