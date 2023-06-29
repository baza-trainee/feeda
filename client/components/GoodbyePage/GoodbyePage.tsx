"use client"
import Image from "next/image"
import { Section, Title, Desc, Reminder, Span } from "./GoodbyePage.styles"

const GoodbyePage = () => (
  <Section>
    <Title>Дякуємо!</Title>
    <Desc>Твоя анкета буде оброблена протягом доби</Desc>
    <Reminder>
      Не забудь перевірити запрошення до{" "}
      <Span>
        <Image
          src={"/discord.svg"}
          alt="Discord icon"
          width={32}
          height={32}
          style={{ display: "inline-block", verticalAlign: "text-bottom" }}
        />
        Discord
      </Span>{" "}
    </Reminder>
  </Section>
)

export default GoodbyePage
