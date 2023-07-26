document.addEventListener('DOMContentLoaded', async () => {

    let dogData;
//get the element that we want to add in the table row 
//with the data make a function for each item in the array make td dog name, td dog breed , td dog sex
// then append in table row elment 
    await fetch('http://localhost:3000/dogs')
    .then(res =>  res.json())
    .then(data => {

        dogData = data
        let dogForm;
        let dogId;

       dogData.forEach(item=>{

            const bodyId = document.getElementById("table-body")
            const tr = document.createElement('tr')
            dogForm = document.getElementById('dog-form')
            bodyId.append(tr) 

            //console.log(bodyId)

            const nameE = document.createElement('td')
            const breedE = document.createElement('td')
            const sexE = document.createElement('td')
            const tdsbutton = document.createElement('td')
            const buttons = document.createElement("button")

            nameE.innerText = item.name
            breedE.innerText = item.breed
            sexE.innerText = item.sex
            tdsbutton.append(buttons)

            buttons.innerText = 'Edit'
            buttons.setAttribute('class', 'button')

            tr.append(nameE, breedE, sexE, tdsbutton)

            buttons.addEventListener('click',(e)=> {
                dogForm[0].value=item.name
                dogForm[1].value=item.breed
                dogForm[2].value=item.sex
               dogId = item.id
               console.log(dogData.id)
               
               dogForm.addEventListener('submit', (e)=>{
                e.preventDefault()
                
                const name = item.name
                const breed = item.breed
                const sex = item.sex
                
                const nameValue =  dogForm[0].value = dogForm[0].value
                const breedValue = dogForm[1].value=dogForm[1].value
                const sexValue =  dogForm[2].value=dogForm[2].value

                fetch(`http://localhost:3000/dogs/${dogId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: nameValue,
                        breed:  breedValue,
                        sex: sexValue,
                    }),
                })
                .then((res)=> res.json())
                .then(newData=> {
                    dogForm[0].value = ''
                    dogForm[1].value = ''
                    dogForm[2].value = ''

                    nameE.innerText = newData.name
                    breedE.innerText = newData.breed
                    sexE.innerText = newData.sex


                    console.log(newData)
                })

                console.log(name, breed, sex)
            })

            })
            
            
        })
       

       
        const idButton = document.getElementsByClassName('button')
       
        


      

        // do a for each on idButton beacuse you returning an array .. add event listner 
        //change the value of input to have the dog name sex n bread 
        // when press submit
        // edit the dog info whichever info button it was clicked 
        //try to use the id of the object that makse sense 
    })

   

    console.log(dogData)
})