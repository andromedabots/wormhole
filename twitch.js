import { ApiClient } from 'twitch';
import { AccessToken, RefreshableAuthProvider, StaticAuthProvider } from 'twitch-auth';

const clientId = process.env.TWITCH_CLIENTID;
const accessToken = process.env.TWITCH_ACCESS_TOKEN;
const authProvider = new StaticAuthProvider(clientId, accessToken);
const apiClient = new ApiClient({ authProvider });

const { ChatClient } = require('twitch-chat-client');
const chatClient = new ChatClient(authProvider, { channels: ['vrchurch'] });
// listen to more events...
await chatClient.connect();