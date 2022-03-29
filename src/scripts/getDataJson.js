export default function getFile(fileName) {
  const request = new XMLHttpRequest()

  request.open('GET', fileName)
  request.onloadend = function () {
    parse(request.responseText)
  }

  request.send()
}

function parse(obj) {
  const data = JSON.parse(obj)
  console.log(data)
}

// getFile(dataUrl) //путь к файлу

// const request = fetch(dataUrl).then((response) => {
//   if (response.ok) {
//     const dataJson = response.json().then((data) => data)

//     return dataJson
//   } else {
//     return response.json().then((err) => {
//       alert('Error', err)
//     })
//   }
// })
// fetch(dataUrl)
//   .then((response) => response.json())
//   .then((data) => (dataJson = data))
// // setTimeout(() => {
// //   console.log(dataJson)
// // }, 500)
// async function fetchDataFromJson() {
//   const responce = await fetch(dataUrl)
//   const data = await responce.json()

//   console.log(data)
//   // dataJson = data
// }
// fetchDataFromJson()
// console.log(dataJson)
