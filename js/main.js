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
          <button type="button" class="btn btn-default" v-on:click="reqChannelsAll()">
            <span class="glyphicon glyphicon-globe" aria-hidden="true"></span>
            <div class="hidden-xs">all</div>
          </button>
        </div>
        <div class="btn-group" role="group">
          <button type="button" id="online" class="btn btn-default" v-on:click="reqChannelsOn()">
            <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
            <div class="hidden-xs">on-line</div>
          </button>
        </div>
        <div class="btn-group" role="group">
          <button type="button" id="offline" class="btn btn-default" v-on:click="reqChannelsOff()">
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
          <li class="list-group-item" v-for="(user, index) in listUsersStream">
            <button class="btn btn-danger btn-xs" v-on:click="listUsersStream.splice(index, 1)"><span class="glyphicon glyphicon-remove-circle"></span></button>
            {{ user }}
          </li>
        </ul>
        <p v-else>No users found</p>
      </div>
      
      <div class="well" v-if="listChannels">
        <ul class="list-group">
          <li class="list-group-item text-center" v-for="(user, key) in allChannels">
            <div class="row">
              <div class="col-sm-4 col-xs-3">
                <img v-if="user.channels.error" class="img-responsive img-circle logo-user" src="http://img.androiduu.com/1339/983339_screen0.jpg">
                <img v-else class="img-responsive img-circle logo-user" v-bind:src="user.channels.logo">
              </div>            
              <div class="col-sm-4 col-xs-4">
                <a v-if="user.streams.stream" target="_blank" v-bind:href="user.channels.url" class="btn btn-success btn-xs" role="button">{{ key }}</a>
                <a v-else-if="user.channels.error" target="_blank" v-bind:href="user.channels.url" class="btn btn-default disabled btn-xs" role="button">{{ key }}</a>
                <a v-else target="_blank" v-bind:href="user.channels.url" class="btn btn-danger btn-xs" role="button">{{ key }}</a>
              </div>
              <div class="col-sm-4 col-xs-5">
                <span v-if="user.streams.stream">{{ user.channels.game }}: <span>{{ user.channels.status }}</span></span>
                <span v-else-if="user.channels.error">Not found</span>
                <span v-else>Offline</span>
              </div>
            </div>
          </li>
        </ul>   
      </div>
        
      <div class="well" v-if="listChannelsOn">
        <ul class="list-group">
          <li class="list-group-item text-center" v-for="(user, key) in allChannels" v-if="user.streams.stream">
            <div class="row">
              <div class="col-sm-4 col-xs-3"><img class="img-responsive img-circle logo-user" v-bind:src="user.channels.logo"></div>            
              <div class="col-sm-4 col-xs-4">
                <a target="_blank" v-bind:href="user.channels.url" class="btn btn-success btn-xs" role="button">{{ key }}</a>
              </div>
              <div class="col-sm-4 col-xs-5">
                <span>{{ user.channels.game }}: <span>{{ user.channels.status }}</span></span>
              </div>
            </div>
          </li>
        </ul>   
      </div>
      
      <div class="well" v-if="listChannelsOff">
        <ul class="list-group">
          <li class="list-group-item text-center" v-for="(user, key) in allChannels" v-if="!user.streams.stream & !user.channels.error">
            <div class="row">
              <div class="col-sm-4 col-xs-3"><img class="img-responsive img-circle logo-user" v-bind:src="user.channels.logo"></div>            
              <div class="col-sm-4 col-xs-4">
                <a target="_blank" v-bind:href="user.channels.url" class="btn btn-danger btn-xs" role="button">{{ key }}</a>
              </div>
              <div class="col-sm-4 col-xs-5">
                <span>Offline</span>
              </div>
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
      listChannelsOn: 0,
      listChannelsOff: 0,
      listUsersStream: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"],
      newUser: '',
      allChannels: {}
    }
  },
  methods: {
    showListOfStream() {
      this.listChannels = 0;
      this.listChannelsOn = 0;
      this.listChannelsOff = 0;
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

    reqChannelsAll() {
      if (this.listChannels === 0) {
        this.loopUser();
      }
      this.listUsers = 0;
      this.listChannelsOn = 0;
      this.listChannelsOff = 0;
      this.listChannels++;
      if (this.listChannels > 1) {
        this.listChannels = 0;
      }
      console.log(this.allChannels);
    },
    reqChannelsOn() {
      if (this.listChannelsOn === 0) {
        this.loopUser();
      }
      this.listUsers = 0;
      this.listChannels = 0;
      this.listChannelsOff = 0;
      this.listChannelsOn++;
      if (this.listChannelsOn > 1) {
        this.listChannelsOn = 0;
      }
    },
    reqChannelsOff() {
      if (this.listChannelsOff === 0) {
        this.loopUser();
      }
      this.listUsers = 0;
      this.listChannels = 0;
      this.listChannelsOn = 0;
      this.listChannelsOff++;
      if (this.listChannelsOff > 1) {
        this.listChannelsOff = 0;
      }
    },
    loopUser() {
      this.allChannels = {};
      this.listUsersStream.map(this.getStream);
    },
    getStream(userName) {
      this.$http.get('https://wind-bow.glitch.me/twitch-api/channels/' + userName)
        .then(response => {
          if (response.ok) {
            this.allChannels = Object.assign({}, this.allChannels, {
              [userName]: Object.assign({}, this.allChannels[userName], {channels: response.body})
            })
          }
        }, response => {
          window.alert("Unable to load data from channels. Error: " + response.status + " " + response.statusText);
        });
      this.$http.get('https://wind-bow.glitch.me/twitch-api/streams/' + userName)
        .then(response => {
          if (response.ok) {
            this.allChannels = Object.assign({}, this.allChannels, {
              [userName]: Object.assign({}, this.allChannels[userName], {streams: response.body})
            })
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