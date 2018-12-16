<template>
  <div class="hello">
      <div>轉給：</div>
    <input type="text" v-model="toAddress">
    <div>數量</div>
    <input type="text" v-model="amount"><br />
    <button @click="tran">轉帳</button>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  props: {
    constractInstance: Object,
    accounts: Array
  },
  async created() {
    
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      toAddress: '',
      amount: ''
    }
  },
  methods: {
    async tran() {
      var tx = await this.constractInstance.transfer(this.toAddress, this.amount, { from: this.accounts[0] });
      console.log(tx);
      alert("轉帳成功:"+tx.tx);
    },
    async transfer(toAddress, value) {
      var tx = await this.constractInstance.transfer(toAddress, value, { from: this.accounts[0] });
    },
    async post(headline, aclass, ipfsAddress) {
      var tx = await this.constractInstance.post(headline, aclass, ipfsAddress, { from: this.accounts[0], gas: 999999 });
    },
    async getArticlebyAddr(findaddress) {
      var tx = await this.constractInstance.getOwnedArticle(findaddress);
      console.log(tx);
      var ownedArticle = []
      for (var i=0; i< tx.length; i++) {
        ownedArticle.push(bigNumberToString(tx[i]));
      }
      console.log(ownedArticle)
      for (var i=0; i< ownedArticle.length; i++) {
        var tx = await this.constractInstance.readById(parseInt(ownedArticle[i]));
        console.log(tx)
      }
      
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
