<script>
export default {
    props: ['type', 'data', "class"],
    data: function() {
        return {
            _class: "",
            shareUrl: {
                'line': "",
                'facebook': "",
            },
        }
    },
    methods: {
        share: function() {
            navigator.share({
                title: this.data.title,
                text: this.data.meta.abstract,
                url: this.data.url,
            })
        },
        copy: function() {
            navigator.clipboard.writeText(this.data.url)
            alert("已複製連結")
        }
    },
    created: function() {
        this._class = this.class
        this.shareUrl.line = `https://lineit.line.me/share/ui?url=` + encodeURI(this.data.url) + `&text=` + encodeURI(`${this.data.title} | ${this.data.community}活動公佈欄`)
        this.shareUrl.facebook = `https://www.facebook.com/sharer/sharer.php?u=` + encodeURI(this.data.url) + `&amp;src=sdkpreparse`
        // this.shareUrl.facebook = `https://www.facebook.com/sharer/sharer.php?u=` + encodeURI(`https://bulletin.unilife.cc/${data.community}/activity/${data.id}`) + `&amp;src=sdkpreparse`
    }
}

</script>

<template>
    <div :class="`${_class} social-icon`">
        <a v-if="type==`line`" :href="shareUrl.line" target="_blank">
            <i class="fab fa-line"></i>
        </a>
        
        <a v-if="type==`facebook`" :href="shareUrl.facebook" target="_blank" class="fb-xfbml-parse-ignore">
            <i class="fab fa-facebook"></i>
        </a>

        <a v-if="type==`copy`" class @click="copy">
            <i class="fas fa-link"></i>
        </a>

        <a v-if="type==`share`" class @click="share">
            <i class="fas fa-share-alt"></i>
        </a>
    </div>
</template>