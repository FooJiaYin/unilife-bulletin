<script>
export default {
    props: ['data', "class"],
}
</script>

<template>
    <div class="meta-list">
        <router-link v-for="tag in data.tags" :to="`/${data.community}/activities/tag/${tag}`" :key="tag">{{ tag }}</router-link>
    </div>
</template>

<style> 
.meta-list {
  margin-bottom: 15px;
}
.meta-list a,
.meta-list router-link {
  background: #00AEBB;
  display: inline-block;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 600;
  padding: 0px 10px;
  color: #FFFFFF !important;
  text-transform: capitalize;
}
.meta-list a:hover,
.meta-list router-link:hover {
  color: #FFFFFF;
}
.meta-list a:nth-child(odd),
.meta-list router-link:nth-child(odd) {
  background-color: #0f355c;
}
.meta-list a:nth-child(3),
.meta-list router-link:nth-child(3) {
  background: #0f355c;
}
.single-course-wrap .meta-list a {
  margin-right: 5px;
}
</style>