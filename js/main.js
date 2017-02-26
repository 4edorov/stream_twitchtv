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
        <input class="addNewUser"
          v-model="newUser"
          v-on:keyup.enter="addNewUser()"
          placeHolder="Add a user"
        >
        <ul class="list-group" v-if="listUsersStream.length">
          <li class="list-group-item" v-for="(user, index) in listUsersStream">
            {{ user }}
            <button class="btn btn-danger btn-xs" v-on:click="listUsersStream.splice(index, 1)"><span class="glyphicon glyphicon-remove-circle"></span></button>
          </li>
        </ul>
        <p v-else>No users found</p>
      </div>
      
      <div class="well" v-if="reqStream">
        <ul class="list-group">
          <li class="list-group-item" v-for="user in allChannels">
            {{ user }}
          <!--  <div class="row">
              <div class="col-xs-4"><img v-bind:src="allChannels.user.logo"></div>            
              <div class="col-xs-4"><a target="_blank" v-bind:href="user.url">{{ user}}</a></div>
              <div class="col-xs-4"><span>{{ user.game }}: </span><span>{{ user.status }}</span></div>
            </div> -->
          </li>
        </ul>   
      </div>  
    </div>
  `,
  data: function () {
    return {
      listStream: 0,
      reqStream: 0,
      listUsersStream: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"],
      newUser: '',
      allChannels: {},
      allStreams: {}
    }
  },
  methods: {
    showListOfStream() {
      this.reqStream = 0;
      this.listStream++;
      if (this.listStream > 1) {
        this.listStream = 0;
      }
    },
    addNewUser() {
      this.listUsersStream.push(this.newUser);
      this.newUser = '';
      console.log(this.listUsersStream)
    },
    reqAllStream() {
      this.listStream = 0;
      this.reqStream++;
      if (this.reqStream > 1) {
        this.reqStream = 0;
      }
      if (this.reqStream) {
        this.listUsersStream.forEach(this.getStream);
        console.log(this.allChannels);
      }

    },
    getStream(userName) {
      /*console.log('https://wind-bow.gomix.me/twitch-api/streams/' + userName);*/
      this.$http.get('https://wind-bow.gomix.me/twitch-api/channels/' + userName)
        .then(response => {
          if (response.ok) {
            this.allChannels[userName] = response.body;
          }
        }, response => {
          window.alert("Unable to load data from channels. Error: " + response.status + " " + response.statusText);
        });
      /*this.$http.get('https://wind-bow.gomix.me/twitch-api/streams/' + userName)
        .then(response => {
          if (response.ok) {
            this.allStream.name.streams = response.body;
          }
        }, response => {
          window.alert("Unable to load data from streams. Error: " + response.status + " " + response.statusText);
        });*/
    }
  }
});
let requestPesponse = new Vue({
  el: '#requestResponse'
});