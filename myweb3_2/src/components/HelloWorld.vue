<template>
  <div class="hello">
    <div>
    <table align="center" cellpadding="10" border='1'>
      <tr ><td >Head</td><td>Author</td><td>content</td><td>給讚</td><td>不喜歡</td></tr>
      <tr v-for="(article,index) in allArticle"><td >{{article[0]}}</td><td>{{article[1]}}</td><td>{{article[3]}}</td><td>{{article[4]}}<button @click="like(index+1)">讚</button></td><td>{{article[5]}}<button @click="unlike(index+1)">不喜歡</button></td></tr>
    </table>
    </div>
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

  async created() {
    const _this = this;
    setTimeout(async () => {
      var tx = await _this.constractInstance.totalNum();
      var Num = bigNumberToString(tx)
      console.log(parseInt(Num));
      _this.allNum = parseInt(Num);
      for(var i=1; i<=_this.allNum; i++) {
        var tx = await _this.constractInstance.readById(i);
        tx[4] = bigNumberToString(tx[4])
        tx[5] = bigNumberToString(tx[5])
        _this.allArticle.push(tx)
      }
      console.log(_this.allArticle)
    },2000)
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      allNum: 0,
      allArticle: []
    }
  },
  methods: {
    async like(index) {
      console.log(index);
      var tx = await this.constractInstance.like(index, { from: this.accounts[0] });
      console.log(tx);
    },
    async unlike(index) {
      console.log(index);
      var tx = await this.constractInstance.unlike(index, { from: this.accounts[0] });
      console.log(tx);
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
