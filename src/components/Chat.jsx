/* ========== EXTERNAL MODULES ========== */
import { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";

/* ========== INTERNAL MODULES ========== */
import './Chat.css';

/* ========== EXPORTS ========== */
export default function Chat({ socket, userName, room, isLoggedIn }) {

  /* --- STATE HOOKS --- */
  const [ currentMessage, setCurrentMessage ] = useState('');
  const [ messageList, setMessageList ] = useState([]);
  const [ requestedHelp, setRequestedHelp ] = useState(false);
  const [ showRequestAlert, setShowRequestAlert ] = useState(false);

  /* --- LIFECYCLE METHODS --- */
  useEffect(() => {
    socket.on('returnMessage', data => {
      setMessageList(list => [ ...list, data ]);

      localStorage.setItem(messageList, JSON.stringify(data));
    });
  }, [socket, messageList]);

  useEffect(() => {
    socket.on('userJoined', data => {
      setMessageList(list => [ ...list, data ]);
    });
  }, [socket]);

  // replace with React Router useParams() in prod
  useEffect(() => {
    const currentURL = document.URL;
    const needsHelp = /[?&]requestedHelp=([^&]+)/i;
    const match = needsHelp.exec(currentURL);

    if (match != null)  setRequestedHelp(match[1]);
  }, []);


  /* --- EVENT HANDLERS --- */
  const handleTypeMessage = ({ target: { value } }) => setCurrentMessage(value);

  const handleSend = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time: new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      localStorage.setItem(messageList, JSON.stringify(messageData));
      await socket.emit('sendMessage', messageData);

      setMessageList(list => [ ...list, messageData ]);
      setCurrentMessage('');
    };
  };

  const handleSubmitRequest = async () => {
    setShowRequestAlert(false);

    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time: new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      // URL value will need to be updated to use the same URL created when the user saves their
      // code as a link
      const requestData = {
        message: currentMessage,
        userName: userName,
        url: `http://localhost:3000?roomID=${room}&?requestedHelp=true`,
      };

      // discord route will need to be updated to actual server address
      axios.post('http://localhost:3001/sendDiscord', requestData);

      setMessageList(list => [ ...list, messageData ]);
      setCurrentMessage('');
      setRequestedHelp(true);
    };
  };

  /* --- RENDER METHODS --- */
  const renderMessages = () => {
    return messageList.map((messageContent, index) => {
      return (
        <li
          key={index + messageContent.author + messageContent.time}
          className={`Chat_message___${userName === messageContent.author ? 'you' : 'other'}`}
        >
          <div
            className={`Chat_messageContent___${userName === messageContent.author ? 'you' : 'other'}`}
          >
            <p>{messageContent.message}</p>
          </div>
          <div
            className={`Chat_messageMeta___${userName === messageContent.author ? 'you' : 'other'}`}
          >
            <p id='time'>{messageContent.time}</p>
            <p id='author'>{messageContent.author}</p>
          </div>
        </li>
      );
    });
  };

  const renderRequestAlert = () => {
    return (
      <div className={`Chat_alert___${showRequestAlert ? 'show' : 'hide'}`}>
        <p>Using this chat feature will send a copy of your code and a notification to our team.</p>
        <p>Do you wish to proceed?</p>
        <div className='Chat_buttonContainer'>
          <button className='Chat_button___yes' onClick={handleSubmitRequest}>Yes</button>
          <button className='Chat_button___no' onClick={() => setShowRequestAlert(false)}>No</button>
        </div>
      </div>
    );
  };

  const renderChatBar = () => {
    if (!requestedHelp) {
      return (
        <div className='Chat_inputContainer'>
          <textarea
            className='Chat_input'
            placeholder='How can we help you today?'
            value={currentMessage}
            onChange={handleTypeMessage}
          />
          <button className='Chat_button___send' onClick={() => setShowRequestAlert(true)}>Submit</button>
        </div>
      );
    } else {
      return (
      <div className='Chat_inputContainer'>
        <textarea
          className='Chat_input'
          placeholder='Type a message...'
          value={currentMessage}
          onChange={handleTypeMessage}
        />
        <button className='Chat_button___send' onClick={handleSend}>Send</button>
      </div>
      );
    };
  };

  /* --- RENDERER --- */
  return (
    <div className={`Chat_container___${isLoggedIn ? 'open' : 'closed'}`}>
      <div className='Chat_header'>
        <p><strong>Chat with us</strong></p>
      </div>
      {renderRequestAlert()}
      <ScrollToBottom className='Chat_feed'>
        {renderMessages()}
      </ScrollToBottom>
      {renderChatBar()}
    </div>
  );
};