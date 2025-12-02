<!-- README TOP -->
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://leetcomp-frontend.vercel.app/">
    <img src="images/logo.png" alt="LeeComp Logo" width="80" height="80">
  </a>

  <h1 align="center" style="font-family: Arial, sans-serif;">LeeComp</h1>

  <p align="center">
    <i>Where Lee's meet to compete</i>
    <br />
    <a href="https://leetcomp-frontend.vercel.app/"><strong>View Live Demo »</strong></a>
    <br />
    <br />
    <a href="https://github.com/your_username/leecomp/issues/new?labels=bug">Report Bug</a>
    &middot;
    <a href="https://github.com/your_username/leecomp/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Screenshot][product-screenshot]](https://leetcomp-frontend.vercel.app/)

LeeComp is a platform where programmers can **compete together on LeetCode inside private rooms**.  
Instead of solving problems alone, users can **create or join paid coding rooms** and compete for a **prize pool**.

**How it works:**
1. Sign in with Google / OAuth
2. Create a room with room code, entry fee, and end time
3. Users join using the room code and provide their LeetCode ID
4. Track the number of questions solved **before and after joining**
5. At the end time, users with the **most questions solved** win the prize pool

**Prize Pool Calculation:**  
Entry fee × Number of participants

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FEATURES -->
## Features

- Create private coding rooms  
- Join rooms via unique room code  
- Entry fee payment & automatic prize pool calculation  
- Real-time leaderboard  
- Track LeetCode questions solved **before vs after joining**  
- Automatic winner selection at end time  
- Google / OAuth sign-in  
- Room search by code  
- Room countdown / end timer  
- Transaction history / wallet  
- Fully responsive UI (mobile + desktop)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section lists the major frameworks, libraries, and tools used in LeeComp.

* [![React][React.js]][React-url] - Frontend library
* [![Node.js][Node.js]][Node-url] - Backend runtime
* [![Express][Express.js]][Express-url] - Backend framework
* [![PostgreSQL][PostgreSQL.com]][PostgreSQL-url] - Database
* [![Axios][Axios.com]][Axios-url] - HTTP client for frontend
* [![React Router][ReactRouter.com]][ReactRouter-url] - Frontend routing
* [![Prisma][Prisma.com]][Prisma-url] - Database ORM
* [![LeetCode API][LeetCodeAPI.com]][LeetCodeAPI-url] - Track solved problems


<!-- GETTING STARTED -->
## Getting Started

Follow these instructions to set up LeeComp locally.

### Prerequisites

- Node.js & npm installed
- Git installed

### Installation

1. Clone the repo
```sh
git clone https://github.com/your_username/leecomp.git

```


[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[PostgreSQL.com]: https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Axios.com]: https://img.shields.io/badge/Axios-000000?style=for-the-badge&logo=axios&logoColor=white
[Axios-url]: https://axios-http.com/
[ReactRouter.com]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[ReactRouter-url]: https://reactrouter.com/
[Prisma.com]: https://img.shields.io/badge/Prisma-0C344B?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[LeetCodeAPI.com]: https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=black
[LeetCodeAPI-url]: https://leetcode.com/api


