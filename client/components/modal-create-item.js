Vue.component('modal-form-create-item', {
  template: `
    <div class="modal fade" id="createItem" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createNewItem">
              <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" v-model="name" placeholder="Enter name">
              </div>
              <div class="form-group">
                <label>Price</label>
                <input type="text" class="form-control" v-model="price" placeholder="Enter price">
              </div>
              <div class="form-group">
                <label>Stock</label>
                <input type="text" class="form-control" v-model="stock" placeholder="Enter stock">
              </div>
              <div class="form-group">
                <label>Tags</label>
                <input type="text" class="form-control" v-model="tags" placeholder="Enter tags">
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
      name: '',
      price: '',
      stock: '',
      tags: ''
    }
  },

  methods: {
    createNewItem: function() {
      const token = localStorage.getItem('token')
      axios({
        method: 'POST',
        url: 'http://localhost:3000/items',
        data: {
          name: this.name,
          price: this.price,
          stock: this.stock,
          tags: this.tags
        },
        headers: {
          authorization: `Basic ${token}`
        }
      })
        .then(result => {
          window.location = 'http://localhost:8080/index.html'
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})