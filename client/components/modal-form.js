Vue.component('modal-form-signin', {
  template: `
      <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="signin">
              <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" v-model="username" placeholder="Enter username">
              </div>
              <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="password" placeholder="Password">
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  data: function() {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    signin: function () {
      axios({
        method: 'POST',
        url: 'http://localhost:3030/login',
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(result => {
          localStorage.setItem('token', result.data.token)
          window.location = 'http://localhost:8080/index.html'
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})  