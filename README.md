# service-bus-inspector

An application to manage Azure's service bus. This application allows you to read and delete Azure service bus active messages and dead letter queues.

# Getting Started

> You can access the application here: https://service-bus-inspector.development.infinicloud.app/ (You must be connected to the Infinitas VPN)

If you can't connect to the VPN, you might want to run it locally:

- Clone the repo
- At root level, run `npm i`
- Inside the react-app folder, run `npm i`
- At root level, run `npm run start`
- Inside the `react-app` folder, run `npm run start`
- You can now access the app in http://localhost:3000

You need an app registration in the Azure Active Directory with granted permissions to read and manage the buses you want to access with the application. You will need the following credentials:

- Client ID: Azure portal -> Azure Active Directory -> App Registrations -> Select your app -> Overview
- Client Secret: Azure portal -> Azure Active Directory -> App Registrations -> Select your app -> Certificates & secrets
- Tenant ID: Azure portal -> Azure Active Directory -> App Registrations -> Select your app -> Overview
- Subscription ID: Azure portal -> Subscriptions -> Subscription ID

### Note

> Both actions **Read Active** and **Read DLQ** does **not** acknowledge (_complete_ in Azure Bus jargon) the message, so you can be confident in peeking both type of messages.
