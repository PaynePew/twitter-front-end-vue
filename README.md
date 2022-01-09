# Simple Twitter
A simple social platform allows users to post, like, comment tweets and modify personal information, building relations with others through real-time chat and following system.  Administrator can also manage tweets and users in CMS.
> [Simple Twitter](https://paynepew.github.io/twitter-front-end-vue/)

![](https://github.com/PaynePew/twitter-front-end-vue/blob/master/public/Home.jpg)
![](https://github.com/PaynePew/twitter-front-end-vue/blob/master/public/root.jpg)

## Front-End Tech 
- VueJS - Vue-Router, Vuex.
- Vue3-socket.io.
- SCSS with BEM methodology.
- Axios.
- Travis CI.
## Features
- Tweet:
  - restricted in 140 words with front-end verify.
  - Users can view all the tweets in homepage.
    - All tweets ordered by created time.
  - Click to see specify tweet with replies.
  - Users can reply and like other people's tweet.
- SignIn/ Register
  - Restricted in 50 words with front-end verify.
  - Root account can only view in CMS.
- User Information
  - Users can modify own information in personal page.
  - View all tweet related to specify user.
- Real-time Chat
  - Public Chat Room with online users status.
  - Private Chat with all users in real-time.
### Testing Account
Admin account can only view in CMS. 
```
account: root
password: 12345678
```
Clients accounts user1 ~ user5 all with same password.
```
account: user1 
password: 12345678
```
### Project download
`
git clone https://github.com/PaynePew/twitter-front-end-vue.git
`

### Project setup
`
npm install
`

### Compiles and hot-reloads for development
`
npm run serve
`

### Compiles and minifies for production
`
npm run build
`

### Back-End Repository Link
See [smilingfroggy/AC3-Twitter-API](https://github.com/smilingfroggy/AC3-Twitter-API).
