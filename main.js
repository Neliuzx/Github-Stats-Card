
const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#563d7c',
    SCSS: '#c6538c',
    Python: '#3572A5',
    Java: '#b07219',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Scala: '#c22d40',
    R: '#198CE7',
    Shell: '#89e051',
    Bash: '#89e051',
    Vue: '#41b883',
    Svelte: '#ff3e00',
    Lua: '#000080',
    Perl: '#0298c3',
    Haskell: '#5e5086',
    Elixir: '#6e4a7e',
    Erlang: '#B83998',
    Clojure: '#db5855',
    OCaml: '#3be133',
    'F#': '#b845fc',
    'Objective-C': '#438eff',
    Assembly: '#6E4C13',
    MATLAB: '#e16737',
    Julia: '#a270ba',
    Groovy: '#4298b8',
    PowerShell: '#012456',
    Vim: '#199f4b',
    Dockerfile: '#384d54',
    Makefile: '#427819',
    SQL: '#e38c00',
    GraphQL: '#e10098',
    JSON: '#292929',
    YAML: '#cb171e',
    XML: '#0060ac',
    Markdown: '#083fa1',
    TeX: '#3D6117',
    Jupyter: '#DA5B0B',
    Astro: '#ff5a03',
    Solidity: '#AA6746',
    Zig: '#ec915c',
    Nix: '#7e7eff',
    WebAssembly: '#04133b',
    Crystal: '#000100',
    Nim: '#ffc200',
    'Vim Script': '#199f4b',
    CoffeeScript: '#244776',
    LiveScript: '#499886',
    PureScript: '#1D222D',
    ReScript: '#ed5051',
    Elm: '#60B5CC',
    Hack: '#878787',
    'Visual Basic': '#945db7',
    Pascal: '#E3F171',
    Fortran: '#4d41b1',
    COBOL: '#a4cc11',
    Lisp: '#3fb68b',
    Scheme: '#1e4aec',
    Prolog: '#74283c',
    Smalltalk: '#596706',
    Tcl: '#e4cc98',
    Verilog: '#b2b7f8',
    VHDL: '#adb2cb',
    Cuda: '#3A4E3A',
    Forth: '#341708',
    Racket: '#3c5caa'
};


const cardEmpty = document.getElementById('card-empty')
const cardLoading = document.getElementById('card-loading')
const cardError = document.getElementById('card-error')
const globalCard = document.querySelector('.global-card')
const downloadGroup = document.querySelector('.download-group')
const form = document.querySelector('form')
const searchbar = document.querySelector('#search-input')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    githubStats(searchbar.value)
})

async function githubStats(username){

    try {
        showState('loading')

        const r = await fetch(`https://api.github.com/users/${username}`)

        if (!r.ok) {
            showState('error')
            return
        }
        const data = await r.json()
        
        const repos = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        .then(r => r.json());

        const languages = repos
        .filter(repo => !repo.fork)
        .map(repo => repo.language)
        .filter(lang => lang !== null);

        
        const counts = {}; 
        languages.forEach(lang => {
            if (counts[lang]) {
                counts[lang] = counts[lang] + 1; 
            } else {
                counts[lang] = 1; 
            }
        });

        const top3 = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([lang]) => lang);

        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        
        changeStats(data.name ,data.login ,data.followers, data.public_repos, totalStars, data.location, data.avatar_url, top3)

        showState('card')

    } catch (error) {
        console.error(error)
        showState('error')

    }
}



function changeStats(name, username, followers, repos, stars, location, avatar, languages){

    const userFollowers = document.querySelector('.stat-followers')
    const userRepos = document.querySelector('.stat-repos')
    const userStars = document.querySelector('.stat-stars')
    const githubLink = document.getElementById('infos-cta')
    const userLocation = document.querySelector('.infos-location')
    const userLogin = document.getElementById('infos-login')
    const userName = document.getElementById('infos-name')
    const userPfp = document.getElementById('card-pfp')
    const userLanguages = document.querySelector('.infos-languages')



    
    userStars.textContent = stars
    userFollowers.textContent = followers
    userRepos.textContent = repos
    githubLink.href = `https://github.com/${username}`
    userPfp.src = avatar
    userPfp.alt = `Profile Picture of ${username}`


    userLanguages.innerHTML = ''; 

    languages.forEach(lang => {
        const span = document.createElement('span');
        span.className = 'language';
        const dot = document.createElement('span');
        dot.className = 'language-dot';
        dot.style.backgroundColor = languageColors[lang] || '#cccccc';
        
        const text = document.createTextNode(lang);
        
        span.appendChild(dot);
        span.appendChild(text);
        
        userLanguages.appendChild(span);
    });

    if(location == null){
        userLocation.textContent = 'No Location'
    }else {
        userLocation.textContent = location

    }
    
    if(name == null) {
        userLogin.textContent = '@' + username
        userName.textContent = upperCaseLetter(username)

    }else{
        userLogin.textContent = '@' + username
        userName.textContent = name
    }
}

function upperCaseLetter(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}


function showState(state) {
    globalCard.style.visibility = 'hidden'
    cardError.classList.remove('active')
    cardLoading.classList.remove('active')
    cardEmpty.classList.remove('active')

    if (state == 'empty') cardEmpty.classList.add('active')
    if (state == 'error') cardError.classList.add('active')
    if (state == 'loading') cardLoading.classList.add('active')
    if (state == 'card') globalCard.style.visibility = 'visible'
}


showState('empty')
