<template>
  <div class="admin-article-list__container">
    <div
      v-for="article in articles"
      :key="article.tweet.id"
      class="admin-article-list__card"
    >
      <img
        class="admin-article-list__side"
        :src="article.tweet.User.avatar"
        alt=""
      />
      <div class="admin-article-list__main">
        <div class="admin-article-list__header">
          <div class="admin-article-list__name">
            {{ article.tweet.User.name }}
          </div>
          <div class="admin-article-list__account">@testAccount</div>
          <span>·</span>
          <div class="admin-article-list__time">
            {{ fromNow(article.tweet.createdAt) }}
          </div>
        </div>
        <div class="admin-article-list__body">
          {{ article.tweet.description }}
        </div>

        <img
          class="admin-article-list__close"
          src="@/assets/img/icon_close_black@2x.png"
          alt=""
          @click="deleteArticle(article.tweet.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowMixin } from "@/utils/mixins";

const articleDummy = [
  {
    tweet: {
      id: 9,
      description: "Quos aut maiores ut doloribus inventore repudiandae.",
      UserId: 1,
      createdAt: "2021-11-02T22:54:49.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 1,
        email: "user0@example.com",
        password:
          "$2a$10$4pZqm3tw3z6OI7qWG0s1J.xVpfG6ckJftI.xU6NdJNZFyyfbYONx6",
        name: "Daren Morar",
        introduction: "voluptates",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Domenico",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 5,
          email: "user4@example.com",
          password:
            "$2a$10$IRqbaT/2hvcHRY.uLsJpcuggCG7s.DYZeIKBVfadzwT.OWrPrJ//G",
          name: "Jerry Hegmann",
          introduction: "Maxime consequatur rem nostrum doloremque.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Adan",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "dignissimos",
            UserId: 5,
            TweetId: 9,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 1,
          email: "user0@example.com",
          password:
            "$2a$10$4pZqm3tw3z6OI7qWG0s1J.xVpfG6ckJftI.xU6NdJNZFyyfbYONx6",
          name: "Daren Morar",
          introduction: "voluptates",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Domenico",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Rerum incidunt neque.\nFugiat nobis corporis ut beatae nostrum sit.",
            UserId: 1,
            TweetId: 9,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 2,
          email: "user1@example.com",
          password:
            "$2a$10$ZodbhBu6VEIwKEd9imYBJuCr.Fl7jw.zYo/vUi2vCSy4sX8rlRj5W",
          name: "Steve Gusikowski",
          introduction:
            "Id saepe dolores soluta veritatis. Sequi in at dolorem non et cum corporis. Sed rerum qui quia atque distinctio molestiae nemo. Minus ullam quasi. Aut in non fugiat expedita officia facere aut pariatur molestiae.\n \rLabore rerum ut soluta. Rem natus rerum odio. Nulla est voluptatibus.\n \rVel eveniet debitis molestiae ut illo dolores. Non sint quas earum vero eum voluptatem quas quaerat. Aperiam cupiditate qui. Consequatur possimus nobis expedita sed. Voluptatem non quis dolore aut.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Tom",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Assumenda consequuntur aut molestiae nobis in laudantium voluptates. Dolorum fuga reiciendis nesciunt. Sed fuga consequatur temporibus dolorem.\n \rEius sit quia. Ut amet harum quae quia quaerat nesciunt. Hic incidunt temporibus consectetur laborum fugit. Optio qui consequatur et n",
            UserId: 2,
            TweetId: 9,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
  {
    tweet: {
      id: 39,
      description: "Iure veritatis consequatur.",
      UserId: 4,
      createdAt: "2021-11-03T02:30:09.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 4,
        email: "user3@example.com",
        password:
          "$2a$10$sGJ.BWMYl07OEFZxAW1b3.KGjo5Chs3zxjEwykwhQR0jQO97I4vCK",
        name: "Adelbert Kuhlman",
        introduction:
          "Molestias et ut numquam quia atque. Et vitae labore autem modi et ut asperiores. Veniam quisquam harum nulla consequuntur expedita quidem est minima temporibus. Et atque voluptatem. Quia in aut. Quo enim magnam sed.",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Alize",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 5,
          email: "user4@example.com",
          password:
            "$2a$10$IRqbaT/2hvcHRY.uLsJpcuggCG7s.DYZeIKBVfadzwT.OWrPrJ//G",
          name: "Jerry Hegmann",
          introduction: "Maxime consequatur rem nostrum doloremque.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Adan",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Inventore eum expedita molestias est magni veritatis tempora.\nTemporibus aut doloremque molestiae sunt illo aliquam ut enim.",
            UserId: 5,
            TweetId: 39,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 1,
          email: "user0@example.com",
          password:
            "$2a$10$4pZqm3tw3z6OI7qWG0s1J.xVpfG6ckJftI.xU6NdJNZFyyfbYONx6",
          name: "Daren Morar",
          introduction: "voluptates",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Domenico",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Eos quibusdam veniam perferendis sit provident possimus vero aliquam.\nCorrupti soluta natus impedit eligendi ut fugit.",
            UserId: 1,
            TweetId: 39,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 2,
          email: "user1@example.com",
          password:
            "$2a$10$ZodbhBu6VEIwKEd9imYBJuCr.Fl7jw.zYo/vUi2vCSy4sX8rlRj5W",
          name: "Steve Gusikowski",
          introduction:
            "Id saepe dolores soluta veritatis. Sequi in at dolorem non et cum corporis. Sed rerum qui quia atque distinctio molestiae nemo. Minus ullam quasi. Aut in non fugiat expedita officia facere aut pariatur molestiae.\n \rLabore rerum ut soluta. Rem natus rerum odio. Nulla est voluptatibus.\n \rVel eveniet debitis molestiae ut illo dolores. Non sint quas earum vero eum voluptatem quas quaerat. Aperiam cupiditate qui. Consequatur possimus nobis expedita sed. Voluptatem non quis dolore aut.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Tom",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "labore",
            UserId: 2,
            TweetId: 39,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
  {
    tweet: {
      id: 28,
      description: "Dolores nulla magni aut qui dolorum.",
      UserId: 3,
      createdAt: "2021-11-03T10:54:10.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$HTUk3ix/GfHZJHpNqf8Bq.hZG/d.SEVFR01lMNJZiCIKtxHWsjqhq",
        name: "Kamille Kling",
        introduction: "Corporis officia quibusdam sequi delectus.",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Jamarcus",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 2,
          email: "user1@example.com",
          password:
            "$2a$10$ZodbhBu6VEIwKEd9imYBJuCr.Fl7jw.zYo/vUi2vCSy4sX8rlRj5W",
          name: "Steve Gusikowski",
          introduction:
            "Id saepe dolores soluta veritatis. Sequi in at dolorem non et cum corporis. Sed rerum qui quia atque distinctio molestiae nemo. Minus ullam quasi. Aut in non fugiat expedita officia facere aut pariatur molestiae.\n \rLabore rerum ut soluta. Rem natus rerum odio. Nulla est voluptatibus.\n \rVel eveniet debitis molestiae ut illo dolores. Non sint quas earum vero eum voluptatem quas quaerat. Aperiam cupiditate qui. Consequatur possimus nobis expedita sed. Voluptatem non quis dolore aut.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Tom",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "iusto incidunt aut",
            UserId: 2,
            TweetId: 28,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 3,
          email: "user2@example.com",
          password:
            "$2a$10$HTUk3ix/GfHZJHpNqf8Bq.hZG/d.SEVFR01lMNJZiCIKtxHWsjqhq",
          name: "Kamille Kling",
          introduction: "Corporis officia quibusdam sequi delectus.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Jamarcus",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Dolore nostrum officiis quibusdam. Sequi quidem quasi aspernatur voluptas laboriosam non totam. Ratione quidem sed consequatur molestias eum velit. Sint laudantium nobis ipsum et reiciendis voluptas.\n \rEt aut consequatur nesciunt reprehenderit expedita porro vel cupiditate est. A",
            UserId: 3,
            TweetId: 28,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 4,
          email: "user3@example.com",
          password:
            "$2a$10$sGJ.BWMYl07OEFZxAW1b3.KGjo5Chs3zxjEwykwhQR0jQO97I4vCK",
          name: "Adelbert Kuhlman",
          introduction:
            "Molestias et ut numquam quia atque. Et vitae labore autem modi et ut asperiores. Veniam quisquam harum nulla consequuntur expedita quidem est minima temporibus. Et atque voluptatem. Quia in aut. Quo enim magnam sed.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Alize",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Vel et saepe. Ullam distinctio et aperiam ut harum aut qui dolore. Facere consequatur rerum aperiam consectetur voluptas expedita ratione dignissimos. Aut atque rerum ex harum et culpa possimus quia.",
            UserId: 4,
            TweetId: 28,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
  {
    tweet: {
      id: 37,
      description:
        "Dolorem fugiat veritatis deserunt culpa doloribus et explicabo ratione culpa.",
      UserId: 4,
      createdAt: "2021-11-04T07:13:08.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 4,
        email: "user3@example.com",
        password:
          "$2a$10$sGJ.BWMYl07OEFZxAW1b3.KGjo5Chs3zxjEwykwhQR0jQO97I4vCK",
        name: "Adelbert Kuhlman",
        introduction:
          "Molestias et ut numquam quia atque. Et vitae labore autem modi et ut asperiores. Veniam quisquam harum nulla consequuntur expedita quidem est minima temporibus. Et atque voluptatem. Quia in aut. Quo enim magnam sed.",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Alize",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 4,
          email: "user3@example.com",
          password:
            "$2a$10$sGJ.BWMYl07OEFZxAW1b3.KGjo5Chs3zxjEwykwhQR0jQO97I4vCK",
          name: "Adelbert Kuhlman",
          introduction:
            "Molestias et ut numquam quia atque. Et vitae labore autem modi et ut asperiores. Veniam quisquam harum nulla consequuntur expedita quidem est minima temporibus. Et atque voluptatem. Quia in aut. Quo enim magnam sed.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Alize",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "aperiam",
            UserId: 4,
            TweetId: 37,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 5,
          email: "user4@example.com",
          password:
            "$2a$10$IRqbaT/2hvcHRY.uLsJpcuggCG7s.DYZeIKBVfadzwT.OWrPrJ//G",
          name: "Jerry Hegmann",
          introduction: "Maxime consequatur rem nostrum doloremque.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Adan",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Rerum laborum velit voluptatem reiciendis quis voluptas autem. Qui tenetur nisi magnam nisi ab velit. Quia debitis rem. Aut velit est numquam autem molestiae dolorum modi tenetur. Perspiciatis deserunt aut et optio fugiat voluptatem veniam perferendis dignissimos.",
            UserId: 5,
            TweetId: 37,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 1,
          email: "user0@example.com",
          password:
            "$2a$10$4pZqm3tw3z6OI7qWG0s1J.xVpfG6ckJftI.xU6NdJNZFyyfbYONx6",
          name: "Daren Morar",
          introduction: "voluptates",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Domenico",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "blanditiis",
            UserId: 1,
            TweetId: 37,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
  {
    tweet: {
      id: 8,
      description: "Id sit similique omnis dolores.",
      UserId: 1,
      createdAt: "2021-11-04T20:10:39.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 1,
        email: "user0@example.com",
        password:
          "$2a$10$4pZqm3tw3z6OI7qWG0s1J.xVpfG6ckJftI.xU6NdJNZFyyfbYONx6",
        name: "Daren Morar",
        introduction: "voluptates",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Domenico",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 4,
          email: "user3@example.com",
          password:
            "$2a$10$sGJ.BWMYl07OEFZxAW1b3.KGjo5Chs3zxjEwykwhQR0jQO97I4vCK",
          name: "Adelbert Kuhlman",
          introduction:
            "Molestias et ut numquam quia atque. Et vitae labore autem modi et ut asperiores. Veniam quisquam harum nulla consequuntur expedita quidem est minima temporibus. Et atque voluptatem. Quia in aut. Quo enim magnam sed.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Alize",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Eius ut voluptas ut et voluptas fugit dolores fuga. Ullam provident deleniti et qui totam. Aut non itaque autem quas qui qui iusto soluta voluptas. Cupiditate unde est aliquid accusantium eos. Expedita assumenda cumque.",
            UserId: 4,
            TweetId: 8,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 2,
          email: "user1@example.com",
          password:
            "$2a$10$ZodbhBu6VEIwKEd9imYBJuCr.Fl7jw.zYo/vUi2vCSy4sX8rlRj5W",
          name: "Steve Gusikowski",
          introduction:
            "Id saepe dolores soluta veritatis. Sequi in at dolorem non et cum corporis. Sed rerum qui quia atque distinctio molestiae nemo. Minus ullam quasi. Aut in non fugiat expedita officia facere aut pariatur molestiae.\n \rLabore rerum ut soluta. Rem natus rerum odio. Nulla est voluptatibus.\n \rVel eveniet debitis molestiae ut illo dolores. Non sint quas earum vero eum voluptatem quas quaerat. Aperiam cupiditate qui. Consequatur possimus nobis expedita sed. Voluptatem non quis dolore aut.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Tom",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Voluptatem odio minus harum perspiciatis repellendus vero. Dolorem aut labore qui enim libero dolor. Minima sequi odit ea illum quia est sint unde dicta. Iure similique aut voluptate sed sapiente beatae. Voluptates itaque quas. Omnis dolores et dolorem quis dolores beatae est qui",
            UserId: 2,
            TweetId: 8,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 3,
          email: "user2@example.com",
          password:
            "$2a$10$HTUk3ix/GfHZJHpNqf8Bq.hZG/d.SEVFR01lMNJZiCIKtxHWsjqhq",
          name: "Kamille Kling",
          introduction: "Corporis officia quibusdam sequi delectus.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Jamarcus",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Cumque laudantium et nihil veritatis consequuntur culpa illum harum porro. Assumenda inventore vel inventore dolorum dolorem. Accusamus hic qui. Optio impedit beatae mollitia harum voluptas ut delectus non. Doloribus soluta ipsa recusandae tempore aperiam laborum qui. Vel vitae s",
            UserId: 3,
            TweetId: 8,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
  {
    tweet: {
      id: 19,
      description: "Porro eos repellendus odit rem debitis ea nisi.",
      UserId: 2,
      createdAt: "2021-11-06T04:43:52.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$ZodbhBu6VEIwKEd9imYBJuCr.Fl7jw.zYo/vUi2vCSy4sX8rlRj5W",
        name: "Steve Gusikowski",
        introduction:
          "Id saepe dolores soluta veritatis. Sequi in at dolorem non et cum corporis. Sed rerum qui quia atque distinctio molestiae nemo. Minus ullam quasi. Aut in non fugiat expedita officia facere aut pariatur molestiae.\n \rLabore rerum ut soluta. Rem natus rerum odio. Nulla est voluptatibus.\n \rVel eveniet debitis molestiae ut illo dolores. Non sint quas earum vero eum voluptatem quas quaerat. Aperiam cupiditate qui. Consequatur possimus nobis expedita sed. Voluptatem non quis dolore aut.",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Tom",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 1,
          email: "user0@example.com",
          password:
            "$2a$10$4pZqm3tw3z6OI7qWG0s1J.xVpfG6ckJftI.xU6NdJNZFyyfbYONx6",
          name: "Daren Morar",
          introduction: "voluptates",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Domenico",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Ut et dolores natus et rerum officiis. Corporis reiciendis nesciunt eum numquam id. Nisi id praesentium repellat expedita atque. Molestias dignissimos minima dolorem quod minus aut qui amet optio. Quis inventore unde ut vero aut sit. Dignissimos qui placeat consequatur aut sunt n",
            UserId: 1,
            TweetId: 19,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 2,
          email: "user1@example.com",
          password:
            "$2a$10$ZodbhBu6VEIwKEd9imYBJuCr.Fl7jw.zYo/vUi2vCSy4sX8rlRj5W",
          name: "Steve Gusikowski",
          introduction:
            "Id saepe dolores soluta veritatis. Sequi in at dolorem non et cum corporis. Sed rerum qui quia atque distinctio molestiae nemo. Minus ullam quasi. Aut in non fugiat expedita officia facere aut pariatur molestiae.\n \rLabore rerum ut soluta. Rem natus rerum odio. Nulla est voluptatibus.\n \rVel eveniet debitis molestiae ut illo dolores. Non sint quas earum vero eum voluptatem quas quaerat. Aperiam cupiditate qui. Consequatur possimus nobis expedita sed. Voluptatem non quis dolore aut.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Tom",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "Aliquid accusantium reiciendis veritatis.",
            UserId: 2,
            TweetId: 19,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 5,
          email: "user4@example.com",
          password:
            "$2a$10$IRqbaT/2hvcHRY.uLsJpcuggCG7s.DYZeIKBVfadzwT.OWrPrJ//G",
          name: "Jerry Hegmann",
          introduction: "Maxime consequatur rem nostrum doloremque.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Adan",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Veniam a et.\nEt repellat est.\nOfficia qui aperiam explicabo harum autem fuga deserunt non.\nEt asperiores odit ullam nemo recusandae laboriosam et distinctio ducimus.\nEt voluptas iusto ducimus hic error eius nulla similique quo.",
            UserId: 5,
            TweetId: 19,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
  {
    tweet: {
      id: 27,
      description: "Corporis totam dolorum.",
      UserId: 3,
      createdAt: "2021-11-06T07:29:01.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$HTUk3ix/GfHZJHpNqf8Bq.hZG/d.SEVFR01lMNJZiCIKtxHWsjqhq",
        name: "Kamille Kling",
        introduction: "Corporis officia quibusdam sequi delectus.",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Jamarcus",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 5,
          email: "user4@example.com",
          password:
            "$2a$10$IRqbaT/2hvcHRY.uLsJpcuggCG7s.DYZeIKBVfadzwT.OWrPrJ//G",
          name: "Jerry Hegmann",
          introduction: "Maxime consequatur rem nostrum doloremque.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Adan",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Laborum modi laboriosam veritatis nesciunt culpa. Itaque et nam ex blanditiis unde harum iure est ea. Maxime adipisci officia. Ratione ullam minus porro qui. Sed alias sed necessitatibus dolores error deleniti. Tempore sunt consectetur exercitationem velit.\n \rQuo dolor sed id cor",
            UserId: 5,
            TweetId: 27,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 1,
          email: "user0@example.com",
          password:
            "$2a$10$4pZqm3tw3z6OI7qWG0s1J.xVpfG6ckJftI.xU6NdJNZFyyfbYONx6",
          name: "Daren Morar",
          introduction: "voluptates",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Domenico",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Numquam placeat consequuntur dicta. Et fugit aspernatur ut. Omnis velit perspiciatis quo adipisci quasi provident ut autem.",
            UserId: 1,
            TweetId: 27,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 4,
          email: "user3@example.com",
          password:
            "$2a$10$sGJ.BWMYl07OEFZxAW1b3.KGjo5Chs3zxjEwykwhQR0jQO97I4vCK",
          name: "Adelbert Kuhlman",
          introduction:
            "Molestias et ut numquam quia atque. Et vitae labore autem modi et ut asperiores. Veniam quisquam harum nulla consequuntur expedita quidem est minima temporibus. Et atque voluptatem. Quia in aut. Quo enim magnam sed.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Alize",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Repudiandae fugit autem consequatur ex reprehenderit perferendis qui inventore est. Ipsam ratione corporis molestias exercitationem. Ut dolores odio unde consequatur nihil rem et id.\n \rQuo mollitia ea et. Molestias quaerat voluptas similique fugiat pariatur. Aspernatur non assume",
            UserId: 4,
            TweetId: 27,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
  {
    tweet: {
      id: 35,
      description: "Praesentium illum explicabo et et quis aliquam.",
      UserId: 4,
      createdAt: "2021-11-06T15:16:55.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 4,
        email: "user3@example.com",
        password:
          "$2a$10$sGJ.BWMYl07OEFZxAW1b3.KGjo5Chs3zxjEwykwhQR0jQO97I4vCK",
        name: "Adelbert Kuhlman",
        introduction:
          "Molestias et ut numquam quia atque. Et vitae labore autem modi et ut asperiores. Veniam quisquam harum nulla consequuntur expedita quidem est minima temporibus. Et atque voluptatem. Quia in aut. Quo enim magnam sed.",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Alize",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 4,
          email: "user3@example.com",
          password:
            "$2a$10$sGJ.BWMYl07OEFZxAW1b3.KGjo5Chs3zxjEwykwhQR0jQO97I4vCK",
          name: "Adelbert Kuhlman",
          introduction:
            "Molestias et ut numquam quia atque. Et vitae labore autem modi et ut asperiores. Veniam quisquam harum nulla consequuntur expedita quidem est minima temporibus. Et atque voluptatem. Quia in aut. Quo enim magnam sed.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Alize",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "facere",
            UserId: 4,
            TweetId: 35,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 5,
          email: "user4@example.com",
          password:
            "$2a$10$IRqbaT/2hvcHRY.uLsJpcuggCG7s.DYZeIKBVfadzwT.OWrPrJ//G",
          name: "Jerry Hegmann",
          introduction: "Maxime consequatur rem nostrum doloremque.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Adan",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Maiores consequatur nostrum sequi ex. Et et nihil saepe sed dolorum ut aspernatur ex minus. Nihil sit consectetur voluptatem. Natus qui doloribus omnis ut iure doloremque omnis enim. Ut eaque id eum et voluptatem deserunt. Corrupti autem sapiente mollitia ut delectus.\n \rDolorum b",
            UserId: 5,
            TweetId: 35,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 3,
          email: "user2@example.com",
          password:
            "$2a$10$HTUk3ix/GfHZJHpNqf8Bq.hZG/d.SEVFR01lMNJZiCIKtxHWsjqhq",
          name: "Kamille Kling",
          introduction: "Corporis officia quibusdam sequi delectus.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Jamarcus",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "illum id enim",
            UserId: 3,
            TweetId: 35,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
  {
    tweet: {
      id: 16,
      description: "Nihil illo fugiat nemo in.",
      UserId: 2,
      createdAt: "2021-11-06T19:06:53.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$ZodbhBu6VEIwKEd9imYBJuCr.Fl7jw.zYo/vUi2vCSy4sX8rlRj5W",
        name: "Steve Gusikowski",
        introduction:
          "Id saepe dolores soluta veritatis. Sequi in at dolorem non et cum corporis. Sed rerum qui quia atque distinctio molestiae nemo. Minus ullam quasi. Aut in non fugiat expedita officia facere aut pariatur molestiae.\n \rLabore rerum ut soluta. Rem natus rerum odio. Nulla est voluptatibus.\n \rVel eveniet debitis molestiae ut illo dolores. Non sint quas earum vero eum voluptatem quas quaerat. Aperiam cupiditate qui. Consequatur possimus nobis expedita sed. Voluptatem non quis dolore aut.",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Tom",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 3,
          email: "user2@example.com",
          password:
            "$2a$10$HTUk3ix/GfHZJHpNqf8Bq.hZG/d.SEVFR01lMNJZiCIKtxHWsjqhq",
          name: "Kamille Kling",
          introduction: "Corporis officia quibusdam sequi delectus.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Jamarcus",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "sapiente iure dolor",
            UserId: 3,
            TweetId: 16,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 1,
          email: "user0@example.com",
          password:
            "$2a$10$4pZqm3tw3z6OI7qWG0s1J.xVpfG6ckJftI.xU6NdJNZFyyfbYONx6",
          name: "Daren Morar",
          introduction: "voluptates",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Domenico",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "est omnis dicta",
            UserId: 1,
            TweetId: 16,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 2,
          email: "user1@example.com",
          password:
            "$2a$10$ZodbhBu6VEIwKEd9imYBJuCr.Fl7jw.zYo/vUi2vCSy4sX8rlRj5W",
          name: "Steve Gusikowski",
          introduction:
            "Id saepe dolores soluta veritatis. Sequi in at dolorem non et cum corporis. Sed rerum qui quia atque distinctio molestiae nemo. Minus ullam quasi. Aut in non fugiat expedita officia facere aut pariatur molestiae.\n \rLabore rerum ut soluta. Rem natus rerum odio. Nulla est voluptatibus.\n \rVel eveniet debitis molestiae ut illo dolores. Non sint quas earum vero eum voluptatem quas quaerat. Aperiam cupiditate qui. Consequatur possimus nobis expedita sed. Voluptatem non quis dolore aut.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Tom",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Excepturi nihil omnis officiis laudantium consequatur dicta quis voluptatem. Numquam enim totam. Minus delectus accusantium magnam qui nisi rerum.",
            UserId: 2,
            TweetId: 16,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
  {
    tweet: {
      id: 36,
      description:
        "Porro voluptatem eum ab impedit itaque consequuntur eaque earum reiciendis.",
      UserId: 4,
      createdAt: "2021-11-07T09:35:46.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 4,
        email: "user3@example.com",
        password:
          "$2a$10$sGJ.BWMYl07OEFZxAW1b3.KGjo5Chs3zxjEwykwhQR0jQO97I4vCK",
        name: "Adelbert Kuhlman",
        introduction:
          "Molestias et ut numquam quia atque. Et vitae labore autem modi et ut asperiores. Veniam quisquam harum nulla consequuntur expedita quidem est minima temporibus. Et atque voluptatem. Quia in aut. Quo enim magnam sed.",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Alize",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 1,
          email: "user0@example.com",
          password:
            "$2a$10$4pZqm3tw3z6OI7qWG0s1J.xVpfG6ckJftI.xU6NdJNZFyyfbYONx6",
          name: "Daren Morar",
          introduction: "voluptates",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Domenico",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Laborum sit fugit est nisi quas non hic animi velit. Vel labore incidunt quis. Dolorem ipsum nam et nulla voluptatem voluptatem beatae. Voluptas nesciunt et non recusandae earum ex.\n \rUt quaerat nulla aliquid quisquam iure aut odit culpa. Culpa deserunt vel nostrum excepturi et. ",
            UserId: 1,
            TweetId: 36,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 2,
          email: "user1@example.com",
          password:
            "$2a$10$ZodbhBu6VEIwKEd9imYBJuCr.Fl7jw.zYo/vUi2vCSy4sX8rlRj5W",
          name: "Steve Gusikowski",
          introduction:
            "Id saepe dolores soluta veritatis. Sequi in at dolorem non et cum corporis. Sed rerum qui quia atque distinctio molestiae nemo. Minus ullam quasi. Aut in non fugiat expedita officia facere aut pariatur molestiae.\n \rLabore rerum ut soluta. Rem natus rerum odio. Nulla est voluptatibus.\n \rVel eveniet debitis molestiae ut illo dolores. Non sint quas earum vero eum voluptatem quas quaerat. Aperiam cupiditate qui. Consequatur possimus nobis expedita sed. Voluptatem non quis dolore aut.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Tom",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Eius accusantium sunt harum at eos. Reiciendis libero non quisquam aliquam sit doloremque itaque quia sed.",
            UserId: 2,
            TweetId: 36,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 3,
          email: "user2@example.com",
          password:
            "$2a$10$HTUk3ix/GfHZJHpNqf8Bq.hZG/d.SEVFR01lMNJZiCIKtxHWsjqhq",
          name: "Kamille Kling",
          introduction: "Corporis officia quibusdam sequi delectus.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Jamarcus",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Aut dolore voluptates earum quis omnis facere.\nQuisquam quo distinctio neque ex.\nNihil repudiandae laborum dolorem tenetur accusantium ea dolor.",
            UserId: 3,
            TweetId: 36,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
  {
    tweet: {
      id: 20,
      description: "Quos et magnam excepturi rem vero magnam eveniet.",
      UserId: 2,
      createdAt: "2021-11-07T16:28:42.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$ZodbhBu6VEIwKEd9imYBJuCr.Fl7jw.zYo/vUi2vCSy4sX8rlRj5W",
        name: "Steve Gusikowski",
        introduction:
          "Id saepe dolores soluta veritatis. Sequi in at dolorem non et cum corporis. Sed rerum qui quia atque distinctio molestiae nemo. Minus ullam quasi. Aut in non fugiat expedita officia facere aut pariatur molestiae.\n \rLabore rerum ut soluta. Rem natus rerum odio. Nulla est voluptatibus.\n \rVel eveniet debitis molestiae ut illo dolores. Non sint quas earum vero eum voluptatem quas quaerat. Aperiam cupiditate qui. Consequatur possimus nobis expedita sed. Voluptatem non quis dolore aut.",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Tom",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 3,
          email: "user2@example.com",
          password:
            "$2a$10$HTUk3ix/GfHZJHpNqf8Bq.hZG/d.SEVFR01lMNJZiCIKtxHWsjqhq",
          name: "Kamille Kling",
          introduction: "Corporis officia quibusdam sequi delectus.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Jamarcus",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "voluptate iste est",
            UserId: 3,
            TweetId: 20,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 4,
          email: "user3@example.com",
          password:
            "$2a$10$sGJ.BWMYl07OEFZxAW1b3.KGjo5Chs3zxjEwykwhQR0jQO97I4vCK",
          name: "Adelbert Kuhlman",
          introduction:
            "Molestias et ut numquam quia atque. Et vitae labore autem modi et ut asperiores. Veniam quisquam harum nulla consequuntur expedita quidem est minima temporibus. Et atque voluptatem. Quia in aut. Quo enim magnam sed.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Alize",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Consequuntur vitae similique sit cum aperiam nulla blanditiis aliquam.",
            UserId: 4,
            TweetId: 20,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 5,
          email: "user4@example.com",
          password:
            "$2a$10$IRqbaT/2hvcHRY.uLsJpcuggCG7s.DYZeIKBVfadzwT.OWrPrJ//G",
          name: "Jerry Hegmann",
          introduction: "Maxime consequatur rem nostrum doloremque.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Adan",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "odio",
            UserId: 5,
            TweetId: 20,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
  {
    tweet: {
      id: 41,
      description:
        "Et pariatur fuga eius consequatur blanditiis voluptas delectus quia nesciunt.",
      UserId: 5,
      createdAt: "2021-11-08T00:52:05.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 5,
        email: "user4@example.com",
        password:
          "$2a$10$IRqbaT/2hvcHRY.uLsJpcuggCG7s.DYZeIKBVfadzwT.OWrPrJ//G",
        name: "Jerry Hegmann",
        introduction: "Maxime consequatur rem nostrum doloremque.",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Adan",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 1,
          email: "user0@example.com",
          password:
            "$2a$10$4pZqm3tw3z6OI7qWG0s1J.xVpfG6ckJftI.xU6NdJNZFyyfbYONx6",
          name: "Daren Morar",
          introduction: "voluptates",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Domenico",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Quis consequatur voluptas quia sed voluptas dolor. Dicta similique deserunt iure. Ut placeat suscipit ut quas aut facere ab error. Doloribus earum molestiae at. Dolore reiciendis at ex qui aut ipsa rerum culpa. Ut perferendis reprehenderit commodi sed assumenda.",
            UserId: 1,
            TweetId: 41,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 2,
          email: "user1@example.com",
          password:
            "$2a$10$ZodbhBu6VEIwKEd9imYBJuCr.Fl7jw.zYo/vUi2vCSy4sX8rlRj5W",
          name: "Steve Gusikowski",
          introduction:
            "Id saepe dolores soluta veritatis. Sequi in at dolorem non et cum corporis. Sed rerum qui quia atque distinctio molestiae nemo. Minus ullam quasi. Aut in non fugiat expedita officia facere aut pariatur molestiae.\n \rLabore rerum ut soluta. Rem natus rerum odio. Nulla est voluptatibus.\n \rVel eveniet debitis molestiae ut illo dolores. Non sint quas earum vero eum voluptatem quas quaerat. Aperiam cupiditate qui. Consequatur possimus nobis expedita sed. Voluptatem non quis dolore aut.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Tom",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Ut temporibus facilis eaque unde quos. Quisquam odit recusandae ut ut nesciunt earum qui. Ipsam aspernatur quia amet debitis. Exercitationem expedita fugit qui.\n \rCommodi enim vitae ut aut aut aut. Rerum natus nemo in. Rerum dignissimos sint quia et nihil a sit ad libero. Nostrum",
            UserId: 2,
            TweetId: 41,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 3,
          email: "user2@example.com",
          password:
            "$2a$10$HTUk3ix/GfHZJHpNqf8Bq.hZG/d.SEVFR01lMNJZiCIKtxHWsjqhq",
          name: "Kamille Kling",
          introduction: "Corporis officia quibusdam sequi delectus.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Jamarcus",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "Autem voluptas et nihil.",
            UserId: 3,
            TweetId: 41,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
  {
    tweet: {
      id: 25,
      description: "Non et sint voluptas est non atque eum ad voluptatem.",
      UserId: 3,
      createdAt: "2021-11-08T04:17:03.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$HTUk3ix/GfHZJHpNqf8Bq.hZG/d.SEVFR01lMNJZiCIKtxHWsjqhq",
        name: "Kamille Kling",
        introduction: "Corporis officia quibusdam sequi delectus.",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Jamarcus",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 3,
          email: "user2@example.com",
          password:
            "$2a$10$HTUk3ix/GfHZJHpNqf8Bq.hZG/d.SEVFR01lMNJZiCIKtxHWsjqhq",
          name: "Kamille Kling",
          introduction: "Corporis officia quibusdam sequi delectus.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Jamarcus",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "Voluptates deleniti natus fugit debitis.",
            UserId: 3,
            TweetId: 25,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 4,
          email: "user3@example.com",
          password:
            "$2a$10$sGJ.BWMYl07OEFZxAW1b3.KGjo5Chs3zxjEwykwhQR0jQO97I4vCK",
          name: "Adelbert Kuhlman",
          introduction:
            "Molestias et ut numquam quia atque. Et vitae labore autem modi et ut asperiores. Veniam quisquam harum nulla consequuntur expedita quidem est minima temporibus. Et atque voluptatem. Quia in aut. Quo enim magnam sed.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Alize",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Optio vitae possimus voluptas ab praesentium eveniet itaque alias.",
            UserId: 4,
            TweetId: 25,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 5,
          email: "user4@example.com",
          password:
            "$2a$10$IRqbaT/2hvcHRY.uLsJpcuggCG7s.DYZeIKBVfadzwT.OWrPrJ//G",
          name: "Jerry Hegmann",
          introduction: "Maxime consequatur rem nostrum doloremque.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Adan",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "Consequatur autem voluptatem maxime dolores et est.",
            UserId: 5,
            TweetId: 25,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
  {
    tweet: {
      id: 1,
      description: "Et veritatis reiciendis numquam et et.",
      UserId: 1,
      createdAt: "2021-11-08T11:08:57.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 1,
        email: "user0@example.com",
        password:
          "$2a$10$4pZqm3tw3z6OI7qWG0s1J.xVpfG6ckJftI.xU6NdJNZFyyfbYONx6",
        name: "Daren Morar",
        introduction: "voluptates",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Domenico",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 1,
          email: "user0@example.com",
          password:
            "$2a$10$4pZqm3tw3z6OI7qWG0s1J.xVpfG6ckJftI.xU6NdJNZFyyfbYONx6",
          name: "Daren Morar",
          introduction: "voluptates",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Domenico",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Eum sit quia cumque sint vitae dolore autem aspernatur.\nNihil necessitatibus saepe et ut sed repellat laboriosam praesentium.",
            UserId: 1,
            TweetId: 1,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 2,
          email: "user1@example.com",
          password:
            "$2a$10$ZodbhBu6VEIwKEd9imYBJuCr.Fl7jw.zYo/vUi2vCSy4sX8rlRj5W",
          name: "Steve Gusikowski",
          introduction:
            "Id saepe dolores soluta veritatis. Sequi in at dolorem non et cum corporis. Sed rerum qui quia atque distinctio molestiae nemo. Minus ullam quasi. Aut in non fugiat expedita officia facere aut pariatur molestiae.\n \rLabore rerum ut soluta. Rem natus rerum odio. Nulla est voluptatibus.\n \rVel eveniet debitis molestiae ut illo dolores. Non sint quas earum vero eum voluptatem quas quaerat. Aperiam cupiditate qui. Consequatur possimus nobis expedita sed. Voluptatem non quis dolore aut.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Tom",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "dolores voluptatem sit",
            UserId: 2,
            TweetId: 1,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 3,
          email: "user2@example.com",
          password:
            "$2a$10$HTUk3ix/GfHZJHpNqf8Bq.hZG/d.SEVFR01lMNJZiCIKtxHWsjqhq",
          name: "Kamille Kling",
          introduction: "Corporis officia quibusdam sequi delectus.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Jamarcus",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Nulla excepturi consectetur perferendis nihil doloremque numquam. Consequatur asperiores aut pariatur similique. Sed quidem tempore nostrum laboriosam vel provident delectus accusamus. Molestiae ad omnis voluptates nemo et fugit.\n \rQuia alias sint qui in. Rerum maiores et fugit t",
            UserId: 3,
            TweetId: 1,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
  {
    tweet: {
      id: 33,
      description:
        "Similique occaecati deleniti magni expedita consequuntur aliquid voluptas velit est.",
      UserId: 4,
      createdAt: "2021-11-08T21:46:17.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 4,
        email: "user3@example.com",
        password:
          "$2a$10$sGJ.BWMYl07OEFZxAW1b3.KGjo5Chs3zxjEwykwhQR0jQO97I4vCK",
        name: "Adelbert Kuhlman",
        introduction:
          "Molestias et ut numquam quia atque. Et vitae labore autem modi et ut asperiores. Veniam quisquam harum nulla consequuntur expedita quidem est minima temporibus. Et atque voluptatem. Quia in aut. Quo enim magnam sed.",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Alize",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 2,
          email: "user1@example.com",
          password:
            "$2a$10$ZodbhBu6VEIwKEd9imYBJuCr.Fl7jw.zYo/vUi2vCSy4sX8rlRj5W",
          name: "Steve Gusikowski",
          introduction:
            "Id saepe dolores soluta veritatis. Sequi in at dolorem non et cum corporis. Sed rerum qui quia atque distinctio molestiae nemo. Minus ullam quasi. Aut in non fugiat expedita officia facere aut pariatur molestiae.\n \rLabore rerum ut soluta. Rem natus rerum odio. Nulla est voluptatibus.\n \rVel eveniet debitis molestiae ut illo dolores. Non sint quas earum vero eum voluptatem quas quaerat. Aperiam cupiditate qui. Consequatur possimus nobis expedita sed. Voluptatem non quis dolore aut.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Tom",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "Rerum necessitatibus atque quo magnam iusto.",
            UserId: 2,
            TweetId: 33,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 3,
          email: "user2@example.com",
          password:
            "$2a$10$HTUk3ix/GfHZJHpNqf8Bq.hZG/d.SEVFR01lMNJZiCIKtxHWsjqhq",
          name: "Kamille Kling",
          introduction: "Corporis officia quibusdam sequi delectus.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Jamarcus",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "Debitis doloremque rerum mollitia.",
            UserId: 3,
            TweetId: 33,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 4,
          email: "user3@example.com",
          password:
            "$2a$10$sGJ.BWMYl07OEFZxAW1b3.KGjo5Chs3zxjEwykwhQR0jQO97I4vCK",
          name: "Adelbert Kuhlman",
          introduction:
            "Molestias et ut numquam quia atque. Et vitae labore autem modi et ut asperiores. Veniam quisquam harum nulla consequuntur expedita quidem est minima temporibus. Et atque voluptatem. Quia in aut. Quo enim magnam sed.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Alize",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "quidem",
            UserId: 4,
            TweetId: 33,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
  {
    tweet: {
      id: 12,
      description:
        "Quis commodi sapiente explicabo alias molestiae accusamus delectus.",
      UserId: 2,
      createdAt: "2021-11-09T08:00:33.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$ZodbhBu6VEIwKEd9imYBJuCr.Fl7jw.zYo/vUi2vCSy4sX8rlRj5W",
        name: "Steve Gusikowski",
        introduction:
          "Id saepe dolores soluta veritatis. Sequi in at dolorem non et cum corporis. Sed rerum qui quia atque distinctio molestiae nemo. Minus ullam quasi. Aut in non fugiat expedita officia facere aut pariatur molestiae.\n \rLabore rerum ut soluta. Rem natus rerum odio. Nulla est voluptatibus.\n \rVel eveniet debitis molestiae ut illo dolores. Non sint quas earum vero eum voluptatem quas quaerat. Aperiam cupiditate qui. Consequatur possimus nobis expedita sed. Voluptatem non quis dolore aut.",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Tom",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 4,
          email: "user3@example.com",
          password:
            "$2a$10$sGJ.BWMYl07OEFZxAW1b3.KGjo5Chs3zxjEwykwhQR0jQO97I4vCK",
          name: "Adelbert Kuhlman",
          introduction:
            "Molestias et ut numquam quia atque. Et vitae labore autem modi et ut asperiores. Veniam quisquam harum nulla consequuntur expedita quidem est minima temporibus. Et atque voluptatem. Quia in aut. Quo enim magnam sed.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Alize",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "velit at et",
            UserId: 4,
            TweetId: 12,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 5,
          email: "user4@example.com",
          password:
            "$2a$10$IRqbaT/2hvcHRY.uLsJpcuggCG7s.DYZeIKBVfadzwT.OWrPrJ//G",
          name: "Jerry Hegmann",
          introduction: "Maxime consequatur rem nostrum doloremque.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Adan",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Ex sit reprehenderit nam beatae quae perferendis et commodi occaecati. Facere nostrum quasi qui doloribus velit atque at maxime. Sequi dicta velit voluptatum aut dolor iure beatae esse cum. Quo et rem reiciendis omnis est occaecati recusandae laborum animi. Id voluptatem quia sap",
            UserId: 5,
            TweetId: 12,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 1,
          email: "user0@example.com",
          password:
            "$2a$10$4pZqm3tw3z6OI7qWG0s1J.xVpfG6ckJftI.xU6NdJNZFyyfbYONx6",
          name: "Daren Morar",
          introduction: "voluptates",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Domenico",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "ipsa maxime harum",
            UserId: 1,
            TweetId: 12,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
  {
    tweet: {
      id: 23,
      description: "Repellat maxime minus ea omnis ducimus esse fugit.",
      UserId: 3,
      createdAt: "2021-11-10T18:37:33.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$HTUk3ix/GfHZJHpNqf8Bq.hZG/d.SEVFR01lMNJZiCIKtxHWsjqhq",
        name: "Kamille Kling",
        introduction: "Corporis officia quibusdam sequi delectus.",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Jamarcus",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 2,
          email: "user1@example.com",
          password:
            "$2a$10$ZodbhBu6VEIwKEd9imYBJuCr.Fl7jw.zYo/vUi2vCSy4sX8rlRj5W",
          name: "Steve Gusikowski",
          introduction:
            "Id saepe dolores soluta veritatis. Sequi in at dolorem non et cum corporis. Sed rerum qui quia atque distinctio molestiae nemo. Minus ullam quasi. Aut in non fugiat expedita officia facere aut pariatur molestiae.\n \rLabore rerum ut soluta. Rem natus rerum odio. Nulla est voluptatibus.\n \rVel eveniet debitis molestiae ut illo dolores. Non sint quas earum vero eum voluptatem quas quaerat. Aperiam cupiditate qui. Consequatur possimus nobis expedita sed. Voluptatem non quis dolore aut.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Tom",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "At molestiae veniam molestias ut ratione sed soluta. Aut quasi voluptates et soluta ut sed rerum. Ea cumque corporis qui harum fugiat atque rerum incidunt. Reprehenderit facere consequuntur qui ea deleniti eos.\n \rDeserunt voluptatem sunt. Dolor exercitationem recusandae labore mo",
            UserId: 2,
            TweetId: 23,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 3,
          email: "user2@example.com",
          password:
            "$2a$10$HTUk3ix/GfHZJHpNqf8Bq.hZG/d.SEVFR01lMNJZiCIKtxHWsjqhq",
          name: "Kamille Kling",
          introduction: "Corporis officia quibusdam sequi delectus.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Jamarcus",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "voluptatem fuga est",
            UserId: 3,
            TweetId: 23,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 4,
          email: "user3@example.com",
          password:
            "$2a$10$sGJ.BWMYl07OEFZxAW1b3.KGjo5Chs3zxjEwykwhQR0jQO97I4vCK",
          name: "Adelbert Kuhlman",
          introduction:
            "Molestias et ut numquam quia atque. Et vitae labore autem modi et ut asperiores. Veniam quisquam harum nulla consequuntur expedita quidem est minima temporibus. Et atque voluptatem. Quia in aut. Quo enim magnam sed.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Alize",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Magnam maxime maiores et animi est nihil eligendi facere tempora.\nMolestiae doloribus cumque iusto omnis est veniam quod consequatur.\nOfficia tenetur qui voluptas dolorem voluptatibus omnis.\nBlanditiis error eos perspiciatis delectus.\nOdit tenetur eum distinctio.",
            UserId: 4,
            TweetId: 23,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
  {
    tweet: {
      id: 47,
      description: "Repudiandae est illum consequuntur qui et aliquid.",
      UserId: 5,
      createdAt: "2021-11-12T07:00:07.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 5,
        email: "user4@example.com",
        password:
          "$2a$10$IRqbaT/2hvcHRY.uLsJpcuggCG7s.DYZeIKBVfadzwT.OWrPrJ//G",
        name: "Jerry Hegmann",
        introduction: "Maxime consequatur rem nostrum doloremque.",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Adan",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 4,
          email: "user3@example.com",
          password:
            "$2a$10$sGJ.BWMYl07OEFZxAW1b3.KGjo5Chs3zxjEwykwhQR0jQO97I4vCK",
          name: "Adelbert Kuhlman",
          introduction:
            "Molestias et ut numquam quia atque. Et vitae labore autem modi et ut asperiores. Veniam quisquam harum nulla consequuntur expedita quidem est minima temporibus. Et atque voluptatem. Quia in aut. Quo enim magnam sed.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Alize",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Molestiae aliquam mollitia nisi culpa. Et qui eum. Ut ea quasi aliquid occaecati excepturi.",
            UserId: 4,
            TweetId: 47,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 5,
          email: "user4@example.com",
          password:
            "$2a$10$IRqbaT/2hvcHRY.uLsJpcuggCG7s.DYZeIKBVfadzwT.OWrPrJ//G",
          name: "Jerry Hegmann",
          introduction: "Maxime consequatur rem nostrum doloremque.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Adan",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "Dolor vero at magni nesciunt.",
            UserId: 5,
            TweetId: 47,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 1,
          email: "user0@example.com",
          password:
            "$2a$10$4pZqm3tw3z6OI7qWG0s1J.xVpfG6ckJftI.xU6NdJNZFyyfbYONx6",
          name: "Daren Morar",
          introduction: "voluptates",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Domenico",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "Debitis non asperiores.",
            UserId: 1,
            TweetId: 47,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
  {
    tweet: {
      id: 2,
      description: "Ab atque aliquid exercitationem rerum.",
      UserId: 1,
      createdAt: "2021-11-12T17:59:42.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 1,
        email: "user0@example.com",
        password:
          "$2a$10$4pZqm3tw3z6OI7qWG0s1J.xVpfG6ckJftI.xU6NdJNZFyyfbYONx6",
        name: "Daren Morar",
        introduction: "voluptates",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Domenico",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 4,
          email: "user3@example.com",
          password:
            "$2a$10$sGJ.BWMYl07OEFZxAW1b3.KGjo5Chs3zxjEwykwhQR0jQO97I4vCK",
          name: "Adelbert Kuhlman",
          introduction:
            "Molestias et ut numquam quia atque. Et vitae labore autem modi et ut asperiores. Veniam quisquam harum nulla consequuntur expedita quidem est minima temporibus. Et atque voluptatem. Quia in aut. Quo enim magnam sed.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Alize",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "modi excepturi nihil",
            UserId: 4,
            TweetId: 2,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 5,
          email: "user4@example.com",
          password:
            "$2a$10$IRqbaT/2hvcHRY.uLsJpcuggCG7s.DYZeIKBVfadzwT.OWrPrJ//G",
          name: "Jerry Hegmann",
          introduction: "Maxime consequatur rem nostrum doloremque.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Adan",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Reiciendis assumenda voluptatibus recusandae aliquid sapiente id earum. Rerum a voluptates fuga nemo sunt eaque vitae nemo. Ad porro et. At cupiditate ipsa consequatur sint. Placeat ut vitae assumenda.\n \rEt suscipit quod rerum consequuntur aliquam. Quo veniam molestiae. Similique",
            UserId: 5,
            TweetId: 2,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 1,
          email: "user0@example.com",
          password:
            "$2a$10$4pZqm3tw3z6OI7qWG0s1J.xVpfG6ckJftI.xU6NdJNZFyyfbYONx6",
          name: "Daren Morar",
          introduction: "voluptates",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Domenico",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment: "cum illo voluptatum",
            UserId: 1,
            TweetId: 2,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
  {
    tweet: {
      id: 26,
      description: "Adipisci et nulla et corrupti voluptatem.",
      UserId: 3,
      createdAt: "2021-11-12T19:34:27.000Z",
      updatedAt: "2021-12-01T10:47:29.000Z",
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$HTUk3ix/GfHZJHpNqf8Bq.hZG/d.SEVFR01lMNJZiCIKtxHWsjqhq",
        name: "Kamille Kling",
        introduction: "Corporis officia quibusdam sequi delectus.",
        avatar: "https://loremflickr.com/320/240/face",
        account: "Jamarcus",
        cover: "https://loremflickr.com/1200/400/landscape",
        role: null,
        createdAt: "2021-12-01T10:47:28.000Z",
        updatedAt: "2021-12-01T10:47:28.000Z",
      },
      LikedUsers: [],
      RepliedUsers: [
        {
          id: 1,
          email: "user0@example.com",
          password:
            "$2a$10$4pZqm3tw3z6OI7qWG0s1J.xVpfG6ckJftI.xU6NdJNZFyyfbYONx6",
          name: "Daren Morar",
          introduction: "voluptates",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Domenico",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Enim atque eligendi dolores velit accusantium aut voluptates.",
            UserId: 1,
            TweetId: 26,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 2,
          email: "user1@example.com",
          password:
            "$2a$10$ZodbhBu6VEIwKEd9imYBJuCr.Fl7jw.zYo/vUi2vCSy4sX8rlRj5W",
          name: "Steve Gusikowski",
          introduction:
            "Id saepe dolores soluta veritatis. Sequi in at dolorem non et cum corporis. Sed rerum qui quia atque distinctio molestiae nemo. Minus ullam quasi. Aut in non fugiat expedita officia facere aut pariatur molestiae.\n \rLabore rerum ut soluta. Rem natus rerum odio. Nulla est voluptatibus.\n \rVel eveniet debitis molestiae ut illo dolores. Non sint quas earum vero eum voluptatem quas quaerat. Aperiam cupiditate qui. Consequatur possimus nobis expedita sed. Voluptatem non quis dolore aut.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Tom",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Nam consectetur vero doloribus aliquam sit nesciunt voluptatem.\nAlias rerum voluptatem qui est voluptatem nesciunt dicta.",
            UserId: 2,
            TweetId: 26,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
        {
          id: 3,
          email: "user2@example.com",
          password:
            "$2a$10$HTUk3ix/GfHZJHpNqf8Bq.hZG/d.SEVFR01lMNJZiCIKtxHWsjqhq",
          name: "Kamille Kling",
          introduction: "Corporis officia quibusdam sequi delectus.",
          avatar: "https://loremflickr.com/320/240/face",
          account: "Jamarcus",
          cover: "https://loremflickr.com/1200/400/landscape",
          role: null,
          createdAt: "2021-12-01T10:47:28.000Z",
          updatedAt: "2021-12-01T10:47:28.000Z",
          Reply: {
            comment:
              "Eaque perferendis non impedit fugit excepturi quam.\nFacilis libero repellendus sit ipsum aliquam et est dolorum.\nEt nihil sit nesciunt atque totam.\nOmnis cum quia incidunt consequatur est.\nNam illo perferendis nobis pariatur dolor repudiandae quia corporis.",
            UserId: 3,
            TweetId: 26,
            createdAt: "2021-12-01T10:47:29.000Z",
            updatedAt: "2021-12-01T10:47:29.000Z",
          },
        },
      ],
    },
    repliedCount: 3,
    likedCount: 0,
  },
];

export default {
  data() {
    return {
      articles: [],
    };
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      this.articles = articleDummy;
    },
    deleteArticle(articleId) {
      this.articles = this.articles.filter(
        (article) => article.tweet.id !== articleId
      );
    },
  },
  mixins: [fromNowMixin],
};
</script>

<style lang="scss" scoped>
.admin-article-list {
  &__container {
    width: 1060px;
  }

  &__card {
    position: relative;
    display: flex;
    height: 75px;
    border: 1px solid $clr-border;
  }
  &__side {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    object-fit: cover;
    margin: 15px;
    margin-top: 13px;
  }

  &__main {
    display: flex;
    flex-direction: column;
    // justify-content: center;
  }

  &__header {
    display: flex;
    color: $clr-secondary;
    margin-top: 10px;
    margin-bottom: 6px;
  }

  &__name {
    font-weight: bold;
    color: $clr-primary;
    margin-right: 5px;
  }

  &__account {
    color: $clr-secondary;
  }

  &__close {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 15px;
    right: 15px;
  }
}
</style>