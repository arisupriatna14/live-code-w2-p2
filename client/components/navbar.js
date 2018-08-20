Vue.component('navbar-home', {
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">Uber Fox</a>

        <ul class="nav navbar-nav pull-sm-right">
          <li class="nav-item" v-if="!isLogin">
            <a href="#" class="nav-link" data-toggle="modal" data-target="#loginModal">Login
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li v-else>
            <a href="#" class="nav-link" data-toggle="modal" data-target="#createItem">Create Item
              <span class="sr-only">(current)</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  data: function() {
    return {
      isLogin: false
    }
  },
  methods: {
    checkLogin: function() {
      if (localStorage.getItem('token')) {
        this.isLogin = true
      }
    }
  },
  mounted() {
    this.checkLogin()
  },
})