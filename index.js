module.exports = function bufferIndexOf(buf,search,offset){
  offset = offset||0
  
  var m = 0;
  var s = -1;
  for(var i=offset;i<buf.length;++i){
    if(buf[i] != search[m]){
      s = -1;
      // <-- go back
      // match abc to aabc
      // 'aabc'
      // 'aab'
      //    ^ no match
      // a'abc'
      //   ^ set index here now and look at these again.
      //   'abc' yay!
      i -= m-1
      m = 0;
    }

    if(buf[i] == search[m]) {
      if(s == -1) s = i;
      ++m;
      if(m == search.length) break;
    }
  }

  if (s > -1 && buf.length - s < search.length) return -1;
  return s;
}



module.exports.bm = function bm(buf,search,offset){
  var m  = 0, j = 0
  var table = []

  var ret = -1;
  for(var i=offset||0;i<buf.length;++i){
    console.log('i',i)

    table[i] = [[i,0]]
    if(buf[i] === search[0]) {
      for(j = search.length-1;j>0;--j){
        table[i].push([i+j,j])
        console.log('j',j)
        if(buf[i+j] !== search[j]) {

          //i += j
          j = -1
          break
        }
      }
      if(j === 0) {
        ret = i
        break
      }
    }
  }

  console.log(table)
  renderTable(table,buf,search)
  return ret
}


var chalk = require('chalk')
function renderTable(table,buf,search){
  var s = ''

  console.log('-----')
  console.log('search:',search)
  console.log('-----')
  console.log(buf+'')

  table.forEach(function(a){
    if(!a) return;// console.log('')
    a.forEach(function(v){
      if(!v) return;
      var pad = ''
      while(pad.length < v[0]){
        pad += ' '
      }
      if(search[v[1]] === buf[v[0]]) console.log(pad+chalk.green(search[v[1]]))
      else console.log(pad+chalk.red(search[v[1]]))

    })
  })
  console.log('-----')
}
