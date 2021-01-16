# pool-samples

## Monorepo

Samples from the [Pool Messenger](https://poolmessenger.com) monorepo. Please keep in mind that my goal was to go as fast as possible -- iterating and experimenting quickly. The code is not as clean as it could be. I removed a lot of stuff to keep only the most interesting code and the architecture of the monorepo.

I chose React (+ Next.js hosted on Vercel) and React Native (+ Expo in bare workflow) for the front-end.

Node.js (+ NestJS), GraphQL (+ Hasura) and PostgreSQL for the back-end. I also have some serverless functions.

And everything is in TypeScript! What I love about this stack is that I share code and types between React and React Native and between front- and back-end -- thanks to React Native Web, GraphQL Code Generator, and more.

I talk a little bit more about this approach here: https://axeldelafosse.com/blog/web-first-app

I highlighted the files that might be the most interesting here.

The `messages` component used for the chat and comments is shared between the web (mobile + desktop) and mobile (iOS + Android) app.

### packages/app

- `src/components/messages/add-message.tsx`
- `src/components/messages/messages-list.tsx`
- `src/components/messages/messages.tsx`

and

- `src/graphql/*`
- `src/graphql.tsx`

### packages/pool-nativeapp

- `src/screens/messages-modal.tsx`

### packages/pool-webapp

- `src/components/messages/messages-modal.tsx`

--

Other interesting packages:

### packages/pool-api

- `src/modules/*`

### packages/web-extension

- `popus.js`

--

Packages removed:

### packages/pool-hasura

- Migrations, metadata...

### packages/pool-serverless

- Notifications, meta scraping...

### packages/share-extension

- ObjC and Java share menu extension...
