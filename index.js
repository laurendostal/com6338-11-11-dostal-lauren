const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = (poemJSON) => {

  const title = makeTitle(poemJSON[0].title) 
  const author = makeAuthor("by " + poemJSON[0].author)
  const lines = makeLines(poemJSON[0].lines)

  return title + author + lines
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}

const makeH2 = makeTag('h2')
const makeH3 = makeTag('h3')
const makeEM = makeTag('em')

const makeAuthor = pipe(makeEM, makeH3)
const makeTitle = pipe(makeH2)

function makeLines (lines) {
  return lines.join("<br>").split("<br><br>").map((str) => "<p>" + str + "</p>" ).join("")
}
