<template>
  <div id="app">
    <img src="./assets/logo.jpg"><br/>
    <router-link to="/" exact>首頁</router-link>
    <router-link to="/profile">個人資料</router-link>
    <router-link to="/post">發表文章</router-link>
    <router-link to="/tokenEx">代幣交換</router-link><br />
    <br />
    <br />
    <router-view sytle="padding-top:50px;" :constractInstance="constractInstance" :accounts="accounts"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      constractInstance: {},
      accounts: []
    }
  },

  async created() {
    const Web3 = require('web3')
    const TruffleContract = require("truffle-contract")
    const ContractJson = require("./HumanStandardToken.json")
    const bigNumberToString = require('bignumber-to-string')
    const MyContract = TruffleContract(ContractJson);
   
    const web3 = new Web3(window.dexon)
    console.log(web3.currentProvider)
    MyContract.setProvider(web3.currentProvider)
    this.accounts = await web3.eth.getAccounts()
    console.log(this.accounts)
    this.constractInstance = await MyContract.at("0xc9dbc39fd82d384909d0f5b179103bf070ab6463")
    console.log(this.constractInstance);
    var balance = await this.constractInstance.balanceOf(this.accounts[0])
    console.log("from",bigNumberToString(balance))
    var balance = await this.constractInstance.balanceOf("0xb68c2a776DF86A5B14F346138ad9Eec4341f10F3")
    console.log("to",bigNumberToString(balance))
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
