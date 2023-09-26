import re


def validate_discord_username(username):
    if '#' in username:
        parts = username.split('#')
        if len(parts) != 2:
            return False
        name, discriminator = parts[0], parts[1]

        if not re.match(r'^[A-Za-z0-9_\-\.~]+$', name):
            return False
        if name.lower() in ['everyone', 'here']:
            return False
        if len(discriminator) != 4 or not discriminator.isdigit():
            return False

        return len(username) >= 2 and len(username) <= 37

    else:
        if not re.match(r'^[a-z0-9_]+$', username):
            return False
        if '..' in username:
            return False

        return len(username) >= 2 and len(username) <= 32


def validate_linkedin_account(account):
    if not (
            account.startswith("https://www.linkedin.com/in/") or
            account.startswith("linkedin.com/in/") or
            account.startswith("www.linkedin.com/in/")
    ) or not (19 <= len(account) <= 128):
        return False
    return True

