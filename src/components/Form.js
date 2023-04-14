import styled from "styled-components";

const Container = styled.form`
  padding: 1rem 1rem 2rem;
  display: grid;
  gap: 0.8rem;
  border-bottom: 0.8rem dotted #563350;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 0.5rem solid #563350;
  border-radius: 0.8rem;
  font-family: inherit;
`;

const Button = styled.button`
  background-color: #bcb2e4;
  border: none;
  padding: 1rem;
  border-radius: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
`;

export default function Form({ updateChatHistory, chatHistory }) {
  async function handleSubmit(event) {
    event.preventDefault();

    const query = event.target.query.value;
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatHistory,
          query,
        }),
      });
      const data = await response.json();
      updateChatHistory((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "user",
          content: query,
        },
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.content,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container onSubmit={handleSubmit}>
      <label htmlFor="text">Your question:</label>
      <Input type="text" name="query" id="text" required />
      <Button type="submit">Submit</Button>
    </Container>
  );
}
