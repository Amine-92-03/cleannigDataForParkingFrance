
let test = async ()=>{
    let data = await fetch('https://static.data.gouv.fr/resources/base-nationale-des-lieux-de-stationnement/20220215-092759/bnls.csv')
    let text = await data.text()
    let header = text.split('\n')[0].split(';')

    let _data = {
        title: "foo",
        body: "bar", 
        userId:1
      }
    var fetchOptions = { method : 'GET',
    headers : {
               'Content-Type' : 'text/json'
              },
    body :JSON.stringify(_data) 
   }
    const req = await fetch(`/dataParking`,{
        method: "POST",
        body: JSON.stringify(text),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
    // const res = await data.json()
    // let nombreLignes = header.length
    // console.log(nombreLignes);
    // let json = []
    // console.log('lenght', text.split('\r').length);
    text.split('\r').forEach((elm,i)=>{
        console.log(i,elm.split(';')[1].length) 
    })
}

test()