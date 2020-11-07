js

```
const Recipe = () => {

     const [name, setName] = React.useState(null);

     function addTest(){
         // creates new random endpoint containing your new object
         db.ref("myRecipes").push({Test: "Test"})

         // Creates a custom endpoint for a new object collection
         // myRecipes/Truong
         db.ref("myRecipes").child("Truong").set({Name: "Truong"});
         db.ref("myRecipes/Do").set({Name: "Do"});

     }

     function removeTest(){

         // remove an entire object endpoint
         db.ref("myRecipes").child("Bao").remove();

     }

     function updateTest(){

        //  remove an entire object endpoint
         db.ref("myRecipes").child("Bao").update({Name: "Baotran"});

     }

     function readTest(){

         db.ref("myRecipes").child("Truong").once("value", snapshot => {

             const data = snapshot.val();

             setName(data.Name);
             console.log("My data is:", data);
         })
     }

     React.useEffect(()=>{
         console.log("Single recipe component is loaded");
        //  readTest();
     },[])
     //Used turnery operator for logic.
     return(
     <div>
        {/* <h1>This is a single Recipe</h1> */}
        {/* {name && <h1>Hi! I'm {name}</h1>} */}
        {/* <button onClick={(ev)=>addTest()}>Add Test</button> */}
        {/* <button onClick={(ev)=>removeTest()}>Remove Test</button> */}
        {/* <button onClick={(ev)=>updateTest()()}>Update Test</button>  */}
        {/* <button onClick={(ev)=>readTest()}>Read Test</button>*/}
        </div>)

}

export default Recipe;

```
