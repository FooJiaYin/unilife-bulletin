<script>
import Banner from "../components/Banner.vue";
import { getList } from "../firebase";

export default {
	components: { Banner },
	data: function () {
		const month = new Date().getMonth();
		const year = new Date().getFullYear();
		return {
			items: [],
			masks: {
				weekdays: "WWW",
			},
			attributes: [],
		};
	},
	methods: {
		loadData: async function (page = 0) {
			this.items = [];
			const querySnapshot = await getList(
				"activity",
				this.tag,
				this.order,
				this.limit
			);
			querySnapshot.forEach((doc) => {
				let item = doc.data();
				item.id = doc.id;
				item.bulletinMeta.date = item.bulletinMeta.date.toDate();
				this.attributes.push({
					key: item.id,
					dates: item.bulletinMeta.date,
					customData: item,
				});
			});
		},
	},
	created: function () {
		this.loadData();
	},
};
</script>

<template>
  <Banner title="活動行事曆" />
  <div class="text-center section container">
    <v-calendar
      class="custom-calendar max-w-full"
      locale="zh-TW"
      :masks="masks"
      :attributes="attributes"
      disable-page-swipe
      is-expanded
    >
      <template v-slot:day-content="{ day, attributes }">
        <div class="flex flex-col h-full z-10 overflow-hidden">
          <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
          <div class="flex-grow overflow-y-auto overflow-x-hidden">
			<a v-for="attr in attributes"
				:key="attr.key" 
				:href="'/activity/' + attr.customData.id">
				<p class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1" :class="attr.class">
					{{ attr.customData.title }}
				</p>
			</a>
          </div>
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<style>
.vc-container {
	border: none !important;
}
.vc-day {
	height: 120px;
	max-width: 100%;
}
</style>

<style lang="postcss" scoped>
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
.custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;
  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    /* height: var(--day-height); */
    height: 50px;
    min-width: var(--day-width);
    background-color: white;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>
