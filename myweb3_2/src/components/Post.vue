<template>
  <div class="hello">
  <div>標題</div><br/>
    <input type="text" v-model="headLine">
    <div>內容</div><br/>
    <input type="text" v-model="ipfsAddress"><br />
    <button @click="post">發表</button>
  </div>
</template>

<script>
const ifpsapi = require('ipfs-api');
export default {
  name: 'HelloWorld',
  props: {
    constractInstance: Object,
    accounts: Array
  },
  async created() {
    //var tx = await this.constractInstance.post(headline, aclass, ipfsAddress, { from: this.accounts[0], gas: 999999 });
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      ipfsAddress: '',
      headLine: ''
    }
  },
  methods: {
    async transfer(toAddress, value) {
      var tx = await this.constractInstance.transfer(toAddress, value, { from: this.accounts[0] });
    },
    async post() {
      console.log(this.headLine);
      console.log(this.ipfsAddress);
      var tx = await this.constractInstance.post(this.headLine, 1, this.ipfsAddress, { from: this.accounts[0], gas: 999999 });
      console.log(tx);
      alert("文章已發表成功\n交易序號:"+tx.tx)
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
