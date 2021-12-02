<template>
  <section class="popular-list">
    <div class="popular-list__wrapper">
      <div class="popular-list__header">
        <div class="popular-list__title">Popular</div>
      </div>
      <div class="popular-list__body">
        <RelationCard />
      </div>
    </div>
  </section>
</template>

<script>
import RelationCard from "@/components/RelationCard.vue";
export default {
  components: {
    RelationCard,
  },
};
</script>

<style lang="scss" scoped>
.popular-list {
  margin-left: 30px;
  margin-top: 15px;
  margin-right: 82px;

  &__wrapper {
    min-width: 350px;
    background-color: $clr-form-bg;
    border-radius: 14px;
  }
  &__header {
    padding: 10px 0 10px 15px;
  }
  &__title {
    font-size: $fs-h3;
    font-weight: bold;
  }
}
</style>
