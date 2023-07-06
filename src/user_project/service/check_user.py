import discord
import asyncio
from django.conf import settings

intents = discord.Intents.default()


async def check_discord_user(username):
    client = discord.Client(intents=intents)

    async def on_message(message):
        if message.author.name == username:
            client.is_user_found = True
            client.close()

    client.is_user_found = False
    client.run(settings.DISCORD_SECRET_KEY)


async def main():
    result = await check_discord_user('vltem#3628')
    print(result)

asyncio.run(main())
