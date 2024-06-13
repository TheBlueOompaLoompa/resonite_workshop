# Endpoints
## `/tags`
### `GET`
List all available tags. **May include breaking changes later!**

## `/assets?tag=string&offset=number`
### `GET`
List assets by tag. By default limited to a window of 10 rows (may change later). Offset is multiplied by the window size on server, so it should still work if the window changes size.
