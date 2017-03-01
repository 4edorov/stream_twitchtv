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
          <button type="button" class="btn btn-default" v-on:click="reqChannels()">
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
  
      <div class="well" v-if="listUsers">
        <input class="addNewUser"
          v-model="newUser"
          v-on:keyup.enter="addNewUser()"
          placeHolder="Add a user"
        >
        <ul class="list-group" v-if="listUsersStream.length">
          <li class="list-group-item" v-for="user in listUsersStream">
            {{ user }}
            <button class="btn btn-danger btn-xs" v-on:click="listUsersStream.splice(index, 1)"><span class="glyphicon glyphicon-remove-circle"></span></button>
          </li>
        </ul>
        <p v-else>No users found</p>
      </div>
      
      <div class="well" v-if="listChannels">
        <ul class="list-group" v-if="Object.keys(allChannels).length">
          <li class="list-group-item" v-for="(user, key) in allChannels">
          <div class="row">
            <div class="col-sm-4"><img class="img-responsive img-thumbnail" v-bind:src="user.logo"></div>            
            <div class="col-sm-4">
              <a target="_blank" v-bind:href="user.url">{{ key }}</a>
              <span v-if="allStreams">{{ allStreams }}</span> 
            </div>
            <div class="col-sm-4"><span>{{ user.game }}: </span><span>{{ user.status }}</span></div>
          </div>
          </li>
        </ul>   
      </div>  
    </div>
  `,
  data: function () {
    return {
      listUsers: 0,
      listChannels: 0,
      listUsersStream: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"],
      newUser: '',
      allChannels: {},
      allStreams: {}
    }
  },
  methods: {
    showListOfStream() {
      this.listChannels = 0;
      this.listUsers++;
      if (this.listUsers > 1) {
        this.listUsers = 0;
      }
    },
    addNewUser() {
      this.listUsersStream.push(this.newUser);
      this.newUser = '';
      console.log(this.listUsersStream)
    },

    reqChannels() {
      if (this.listChannels === 0) {
        this.loopUser();
      }
      setTimeout(this.showChannels, 1000);
      console.log(this.allChannels, Object.keys(this.allChannels).length);
    },
    showChannels() {
      this.listUsers = 0;
      this.listChannels++;
      if (this.listChannels > 1) {
        this.listChannels = 0;
      }
    },
    loopUser() {
      this.allChannels = {};
      this.allStreams = {};
      this.listUsersStream.map(this.getStream);
    },
    getStream(userName) {
      this.$http.get('https://wind-bow.gomix.me/twitch-api/channels/' + userName)
        .then(response => {
          if (response.ok) {
            this.allChannels[userName] = response.body;
            console.log(this.allChannels, Object.keys(this.allChannels).length);
          }
        }, response => {
          window.alert("Unable to load data from channels. Error: " + response.status + " " + response.statusText);
        });
      this.$http.get('https://wind-bow.gomix.me/twitch-api/streams/' + userName)
        .then(response => {
          if (response.ok) {
          this.allStreams[userName] = response.body;
        }
      }, response => {
        window.alert("Unable to load data from streams. Error: " + response.status + " " + response.statusText);
        });
    }
  }
});
let requestPesponse = new Vue({
  el: '#requestResponse'
});