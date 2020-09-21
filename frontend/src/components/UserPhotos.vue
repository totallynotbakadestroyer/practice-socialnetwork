<template>
  <v-card class="photos">
      <p>User's photos 312</p>
    <v-row>
      <v-col
        v-for="n in 4"
        :key="n"
        class="d-flex child-flex"
        cols="6"
      >
        <v-card flat tile class="d-flex">
          <v-img
            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss">

.photos {
  padding: 16px;
}

</style>

<script>
export default {
  name: 'UserPhotos',
};

</script>
