import './style.css';
import getUsers from './users.js';
const app = document.querySelector('#app');
const users = await getUsers();
console.log(users);
users.map(u => {
  const card = document.createElement('section');
  card.classList.add('userCard');
  const name = document.createElement('div');
  name.classList.add('userName');
  name.innerText = u.name;
  card.append(name);
  const website = document.createElement('a');
  website.classList.add('userWebsite');
  website.href = u.website;
  website.innerText = u.website;
  card.append(website);
  const company = document.createElement('div');
  company.classList.add('userCompany');
  const compName = document.createElement('h3');
  compName.innerText = u.company.name;
  company.append(compName);
  const compCatchPhrase = document.createElement('p');
  compCatchPhrase.classList.add('userCompCatchPhrase');
  compCatchPhrase.innerText = u.company.catchPhrase;
  company.append(compCatchPhrase);
  const compBS = document.createElement('p');
  compBS.classList.add('userCompBS');
  compBS.innerText = u.company.bs;
  company.append(compBS);
  card.append(company);
  card.addEventListener('click', () => {handleCardClick(u);});
  app.append(card);
});

async function handleCardClick(user) {
  let posts;
  try {
    const r = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
    if (!r.ok) {
      throw new Error(`${r.status} - ${r.statusText}`);
    }
    posts = await r.json();
    console.log(posts);
  } catch(e) {
    console.error(e);
    return;
  }

  const postsArray = [];
  posts.map(p => postsArray.push(p));

  const companyName = document.createElement('h1');
  companyName.classList.add('postsCompName');
  companyName.innerText = user.company.name;
  const userName = document.createElement('h2');
  userName.classList.add('postsUserName');
  userName.innerText = user.name;
  app.replaceChildren(companyName, userName);

  displayPosts(postsArray, 0);
  
}

function displayPosts(postsArray, startIndex) {
  const POSTS_PER_SCREEN = 3;
  let index = startIndex;

  const postsDiv = document.createElement('div');
  postsDiv.classList.add('postsDiv');
  const prevBut = document.createElement('button');
  prevBut.classList.add('postsPrevBut');
  prevBut.innerText = 'previous posts';

  const nextBut = document.createElement('button');
  nextBut.classList.add('postsNextBut');
  nextBut.innerText = 'next posts';

  function render() {
    postsDiv.replaceChildren();
    postsArray.slice(index, index + POSTS_PER_SCREEN).forEach(p => {
      const post = document.createElement('div');
      post.classList.add('post');
      const title = document.createElement('h3');
      title.classList.add('postsTitle');
      title.innerText = p.title;
      const body = document.createElement('p');
      body.classList.add('postsBody');
      body.innerText = p.body;
      post.append(title, body);
      postsDiv.append(post);
    });
    prevBut.disabled = index === 0;
    nextBut.disabled = index + POSTS_PER_SCREEN >= postsArray.length;
  }

  prevBut.addEventListener('click', () => { index = Math.max(0, index - POSTS_PER_SCREEN); render(); });
  nextBut.addEventListener('click', () => { index += POSTS_PER_SCREEN; render(); });

  app.append(postsDiv, prevBut, nextBut);
  render();
}