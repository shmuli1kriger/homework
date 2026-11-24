export default function Recipe({recipe: {name, picture, ingredients}}) {

  return (
    <div>
          <h2 id="name">{name}</h2>
          <img id="picture" src={picture}/>
          <h5>ingredients</h5>
          <ul id="ingredients">{ingredients}</ul>
    </div>
  )
}
