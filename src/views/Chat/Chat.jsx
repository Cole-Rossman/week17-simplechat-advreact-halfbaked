import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserProvider';
import {
  getMessages,
  sendMessage,
  subscribe,
  unsubscribe,
} from '../../services/messages';
import {
  emojis,
  statusToEmoji,
  emojiToStatus,
} from '../../utils/formatMessage';
import { stringToColor } from '../../utils/stringToColor';
import styles from './Chat.css';

export default function Chat() {
  const user = useUser();
  const [messages, setMessages] = useState([]);
  const [showTimestamps, setShowTimestamps] = useState(true);

  const handleMessageReceived = (message) => {
    setMessages((prevMessages) => [message, ...prevMessages]);
  };

  useEffect(() => {
    getMessages().then(setMessages);
    // TODO: Subscribe to message changes, using handleMessageReceived
    // as the callback function
    // Don't forget to return a cleanup method (`unsubscribe`)
    // from this useEffect!
  }, []);

  return (
    <main className={styles.container}>
      <h2>Messages</h2>

      <form
        onSubmit={(event) => event.preventDefault()}
        className={styles.messageForm}
      >
        <p>Send a message!</p>
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => sendMessage(user.email, emojiToStatus(emoji))}
          >
            {emoji}
          </button>
        ))}
      </form>

      <label>
        <input
          type="checkbox"
          checked={showTimestamps}
          value={showTimestamps}
          onChange={({ target }) => setShowTimestamps(target.checked)}
        />{' '}
        Show Timestamps
      </label>

      <ul className={styles.messageList}>
        {messages.slice(0, 10).map((message) => (
          <li
            key={message.id}
            style={{ backgroundColor: stringToColor(message.email) }}
          >
            <h3 className={styles.message}>{statusToEmoji(message.status)}</h3>
            <sub>
              by {message.email}
              {showTimestamps && (
                <p>{`on ${new Date(message.created_at).toLocaleString()}`}</p>
              )}
            </sub>
          </li>
        ))}
      </ul>
    </main>
  );
}
