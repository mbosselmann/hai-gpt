import Head from "next/head";
import styled from "styled-components";
import Form from "@/components/Form.js";
import useLocalStorageState from "use-local-storage-state";
import MessageList from "@/components/MessageList.js";

const Main = styled.main`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin: 0;
`;

const Headline = styled.h1`
  font-size: 2rem;
  margin: 1rem 0 0;
  font-family: monospace;
  text-align: center;
`;

export default function Home() {
  const [chatHistory, setChatHistory] = useLocalStorageState("chatHistory", {
    defaultValue: [],
  });

  function updateChatHistory(newChatHistory) {
    setChatHistory(newChatHistory);
  }

  return (
    <>
      <Head>
        <title>Hai GPT</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Headline>
          <span aria-hidden="true">🦈</span> Hai GPT{" "}
          <span aria-hidden="true">🦈</span>
        </Headline>
        <Form updateChatHistory={updateChatHistory} chatHistory={chatHistory} />
        <MessageList chatHistory={chatHistory} />
      </Main>
    </>
  );
}
