import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { GiftedChat, IMessage, Send } from "react-native-gifted-chat";
import { FIRESTORE_DB } from "../firebase/FirebaseConfig";
import useAuthStore from "../zustand/AuthStore";
import { getChatReply } from "../OpenAI";
import useFetchUserData from "../CurrentUser";

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const user = useAuthStore((state) => state.user);
  const currentUser = useFetchUserData();
  const chatCollectionRef = collection(FIRESTORE_DB, `chats/${user}/messages`);

  useLayoutEffect(() => {
    const userQuery = query(chatCollectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
      const userMessages: IMessage[] = querySnapshot.docs.map(
        (doc) =>
          ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          } as IMessage)
      );
      setMessages(userMessages);
    });

    return unsubscribe;
  }, []);

  const onSend = useCallback(async (messages: IMessage[] = []) => {
    try {
      // Add user's message to the chat
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );

      const userMessage = messages[0].text;

      // Set loading state to true while fetching AI reply
      setLoading(true);

      // Fetch AI reply based on user's message
      const aiReply = await getChatReply(userMessage);

      // Add AI's reply to the chat
      const aiMessage: IMessage = {
        _id: messages[0]._id + "1", // Use a unique ID for the AI message
        text: aiReply,
        createdAt: new Date(),
        user: {
          _id: "ai-bot",
          name: "AI Bot",
          avatar: "https://placeimg.com/140/140/any", // Add the AI Bot avatar URL
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [aiMessage])
      );

      // Add AI's reply to Firestore
      await addDoc(chatCollectionRef, aiMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      // Set loading state back to false after AI reply is received
      setLoading(false);
    }
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      placeholder={
        loading ? "Please wait for AI's reply.." : "Type your message here..."
      }
      user={{
        _id: currentUser?.email || "",
        name: currentUser?.fullName || "",
        avatar: currentUser?.imageUrl || "",
      }}
      renderSend={(props) => (
        <Send {...props} disabled={loading || !props?.text?.trim()} />
      )}
    />
  );
};

export default Chat;
