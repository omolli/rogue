# A Rogue game for smart speakers
This is an early prototype for creating a voice controlled rogue dungeon crawling for smart speakers using Google Assistant conversational actions.  
Alas, the turndown of Conversational Actions occurred on June 13, 2023, and thus third-party conversational actions are no longer supported.

## Implementation
The conversational action was created with Dialogflow, using Googles NLU (Natural Language Understanding) features for creating conversational applications which was integrated into an Actions Project,
in order to make it accessible for Google Assistant. The logic is handled by Google Cloud functions for Firebase webhooks using Google's Node.js library.
