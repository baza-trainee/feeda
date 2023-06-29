import Container from "components/Container/Container"
import GoodbyePage from "components/GoodbyePage/GoodbyePage"
import Styling from "components/Styling/Styling"

export const metadata = {
  title: "Feeda",
  description: "Candidate's application",
}

export default function Home() {
  return (
    <main>
      <Container>
        {/* <Styling /> */}
        <GoodbyePage />
      </Container>
    </main>
  )
}
