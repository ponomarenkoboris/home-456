// import './styles/Chat.css'
// import {useEffect, useRef, useState} from "react";
// import { Avatar, IconButton } from "@material-ui/core";
// import { AttachFile, SearchOutlined, MoreVert, InsertEmoticon, Mic } from "@material-ui/icons";
// import { useParams } from 'react-router-dom';
// import db from '../firebase'
// import firebase from "firebase";
// import {useAuthContext} from "../context/AuthContext";

// export function Chat() {
//     const message = useRef()
//     const { roomId } = useParams()
//     const [roomName, setRoomName] = useState('')
//     const [messages, setMessages] = useState([])
//     const [{ user }] = useAuthContext();

//     useEffect(() => {
//         if (roomId) {
//             db.collection('rooms')
//                 .doc(roomId)
//                 .onSnapshot(snapshot => setRoomName(snapshot.data().name))

//             db.collection('rooms')
//                 .doc(roomId)
//                 .collection('messages')
//                 .orderBy('timestamp', 'asc')
//                 .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())))
//         }

//     }, [roomId])

//     const sendMessage = e => {
//         e.preventDefault()
//         db.collection('rooms')
//             .doc(roomId)
//             .collection('messages')
//             .add({
//                 message: message?.current.value,
//                 name: user.displayName,
//                 timestamp: firebase.firestore.FieldValue.serverTimestamp()
//             })
//         message.current.value = ''
//     }

//     return roomId ? (
//         <div className="chat">
//             <div className="chat__header">
//                 <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`}/>
//                 <div className="chat__headerInfo">
//                     <h3>{roomName}</h3>
//                     <p>last seen at {new Date(messages[messages.length - 1].timestamp?.toDate()).toLocaleTimeString()}</p>
//                 </div>

//                 <div className="chat__headerRight">
//                     <IconButton>
//                         <SearchOutlined />
//                     </IconButton>
//                     <IconButton>
//                         <AttachFile />
//                     </IconButton>
//                     <IconButton>
//                         <MoreVert />
//                     </IconButton>
//                 </div>
//             </div>
//             <div className="chat__body">
//                 {messages.map(message =>
//                     <p key={message.timestamp} className={`chat__message ${message.name === user.displayName && 'chat__reciever'}`}>
//                         <span className="chat__name">{message.name}</span>
//                         {message.message}
//                         <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toLocaleTimeString()}</span>
//                     </p>
//                 )}
//             </div>
//             <div className="chat__footer">
//                 <IconButton>
//                     <InsertEmoticon />
//                 </IconButton>
//                 <form>
//                     <input type="text" ref={message} placeholder="Type a message"/>
//                     <button onClick={sendMessage} type="submit">Send message</button>
//                 </form>
//                 <IconButton>
//                     <Mic />
//                 </IconButton>
//             </div>
//         </div>
//     ) : ''
// }