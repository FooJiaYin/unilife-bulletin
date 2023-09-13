<script>
export default {
    props: ['middle', 'data', "class"],
}
</script>

<template>
    <div class="course-breadcumb">
        <ol class="breadcrumb" data-wow-duration="2s">
            <li><router-link :to="`/${data.community}`">首頁</router-link></li> 
            <i class="fas fa-chevron-right"></i>
            <li v-for="(value, name) in middle" :key="name">
                <router-link :to="value">{{ name }}</router-link>
            </li> 
            <i class='fas fa-chevron-right'></i>
            <li class="ellipsis">{{ data.title }}</li>
        </ol>
    </div>
</template>
