
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react';
import axios from './axios';
function App() {
  const [messages,setMessages] = useState([]);

  useEffect(()=>{
    axios.get('/messages/sync')
      .then(response=>{
        setMessages(response.data);
      })
  },[]);

  useEffect(()=>{
    //when the app loads 
    const pusher = new Pusher('2e3afc761ec73465655d', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessages) => {
      setMessages([...messages,newMessages]) 
    });
    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
    
  }, [messages]);
  //Message is a dependency

  console.log(messages)
  return (
    <div className="app">
      <div className="app__body">
          <Sidebar/>
          <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
