Vue.component('request-response', {
  template: `
    <div>
      <div class="btn-pref btn-group btn-group-justified btn-group-lg" role="group" aria-label="...">
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default" v-on:click="showListOfStream()">
            <span class="glyphicon glyphicon-list" aria-hidden="true"></span>
            <div class="hidden-xs">list of streamers</div>
          </button>  
        </div>
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default" v-on:click="reqAllStream()">
            <span class="glyphicon glyphicon-globe" aria-hidden="true"></span>
            <div class="hidden-xs">all</div>
          </button>
        </div>
        <div class="btn-group" role="group">
          <button type="button" id="online" class="btn btn-default">
            <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
            <div class="hidden-xs">on-line</div>
          </button>
        </div>
        <div class="btn-group" role="group">
          <button type="button" id="offline" class="btn btn-default">
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
            <div class="hidden-xs">off-line</div>
          </button>
        </div>
      </div>
  
      <div class="well" v-if="listStream">
        <input
          v-model="newUser"
          v-on:leyup.enter="addNewUser"
          placeHolder="Add a user"
        >
        <ul class="list-group" v-if="listUsersStream.length">
          <li v-for="user in listUsersStream">{{ user }}</li>
        </ul>
        <p v-else>No users found</p>
      </div>
        
    </div>
  `,
  data: function () {
    return {
      listStream: 0,
      listUsersStream: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
      allStream: null
    }
  },
  methods: {
    showListOfStream() {
      this.listStream++;
      if (this.listStream > 1) {
        this.listStream = 0;
      }
    },
    reqAllStream() {
      this.$http.get('https://wind-bow.gomix.me/twitch-api/streams/freecodecamp/')
        .then(response => {
          this.allStream = response.body;
          console.log(this.allStream);
        }, response => {
          console.log(response);
      });
    }
  }
});
let requestPesponse = new Vue({
  el: '#requestResponse'
});