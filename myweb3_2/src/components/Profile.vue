<template>
  <div class="hello">
    <div>Your Address on Dexon: {{accounts[0]}}</div>
    <div>Your Token: {{userOwnedToken}}</div>
  </div>
</template>

<script>
const bigNumberToString = require('bignumber-to-string')
export default {
  name: 'HelloWorld',
  props: {
    constractInstance: Object,
    accounts: Array
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userOwnedToken: 0
    }
  },
  async created() {
     const _this = this;
    setTimeout(async ()=> {
      console.log(_this.constractInstance)
      _this.userOwnedToken = await _this.constractInstance.balanceOf(this.accounts[0])
      console.log("to",bigNumberToString(_this.userOwnedToken))
    },2000)
    
  },
  
  methods: {
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
