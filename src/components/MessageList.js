import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 1rem;
  margin: 0;
  background-color: #fbf7ff;
`;

const ListItem = styled.li`
  margin-top: 1rem;
  padding-bottom: ${(props) => (props.role === "user" ? "1rem" : "1.5rem")};
  border: ${(props) =>
    props.role === "assistant"
      ? "0.5rem solid #563350"
      : "0.5rem solid #7974a2"};
  background-color: white;
  padding: 1rem;
  border-radius: 0.8rem;
`;

export default function MessageList({ chatHistory }) {
  return (
    <List>
      {chatHistory.map((message, index) => (
        <ListItem key={index} role={message.role}>
          {message.content}
        </ListItem>
      ))}
    </List>
  );
}
