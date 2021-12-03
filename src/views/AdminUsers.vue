<template>
  <AppBar :status="'使用者列表'" />
  <div class="container">
    <AdminUserCard />
  </div>
</template>

<script>
import AdminUserCard from "./../components/AdminUserCard.vue";
import AppBar from "./../components/AppBar.vue";

export default {
  name: "AdminUsers",
  components: {
    AdminUserCard,
    AppBar,
  },
};
</script>
