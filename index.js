const fetch = require('node-fetch');
const cheerio = require('cheerio');
const express = require('express');
const translatte = require('translatte');
const app = express()
app.listen(3000)

app.get('/api/ranime', (req, response) => {
let limitid = Math.floor(Math.random() * 700)

  fetch(`https://myanimelist.net/topanime.php?limit=${limitid}`)
  .then(res => res.text())
  .then(body => {
     $link = cheerio.load(body)
    var l = $link('td[class="title al va-t word-break"] > a')[0].attribs.href

      fetch(l)
  .then(res => res.text())
  .then(body => {
         $url = cheerio.load(body)
var description = $url('p[itemprop="description"]')[0].children[0].data.replaceAll('\"', "'")
translatte(description, {to: 'tr'}).then(tr => {
     $url = cheerio.load(body)
    var name = $url('div[class="h1-title"] > div ')[0].children[0].children[0].children[0].data
    var description = tr.text
    var score = $url('div[class="fl-l score"] > div')[0].children[0].data
    var image = $url('div[class="leftside"] > div > a > img')[0].attribs['data-src']
    const anime = {
        "name":name,
        "description":description,
        "score":score,
        "image":image
    }
    response.json(anime)
})
  })

  })

})