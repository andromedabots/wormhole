require("dotenv").config()
const { ApiClient } = require('twitch');
const { AccessToken, RefreshableAuthProvider, StaticAuthProvider } = require('twitch-auth');

const clientId = process.env.TWITCH_CLIENTID;
const accessToken = process.env.TWITCH_ACCESS_TOKEN;
const authProvider = new StaticAuthProvider(clientId, accessToken);
const apiClient = new ApiClient({ authProvider });

const { ChatClient } = require('twitch-chat-client');
const chatClient = new ChatClient(authProvider, { channels: ['theshadowdev'] });
// listen to more events...
chatClient.connect();