# Pressfire RSS bot for Matrix

Posts the latest news from Pressfire to a given Matrix room.

## Setup

Create a user on your instance of choice that'll be used as the bot. Fill out the `.env` with these values

```env
MATRIX_USERNAME=""
MATRIX_PASSWORD=""
MATRIX_HOMESERVER_URL="https://matrix.org"
MATRIX_ACCESS_TOKEN="" # not needed when I add automatic login
MATRIX_ROOM_ID="!xxxxxxxxxxxx:matrix.org"
```
